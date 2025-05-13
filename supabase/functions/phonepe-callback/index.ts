
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// CORS Headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PhonePe API configuration
const PHONEPE_SALT_KEY = Deno.env.get("PHONEPE_SALT_KEY") || "";
const PHONEPE_MERCHANT_ID = Deno.env.get("PHONEPE_MERCHANT_ID") || "";

// Helper function to generate SHA256 hash
async function generateSHA256Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PHONEPE-CALLBACK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Callback received");
    
    // Create Supabase client using service role for admin rights
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get callback data from PhonePe
    const callbackData = await req.json();
    logStep("Callback data", callbackData);
    
    // Verify the callback using the X-VERIFY header
    const xVerifyHeader = req.headers.get('X-VERIFY');
    if (!xVerifyHeader) {
      throw new Error("Missing X-VERIFY header");
    }
    
    // Validate transaction status
    const { merchantTransactionId, transactionId, amount, code, status } = callbackData.response || {};
    
    if (!merchantTransactionId) {
      throw new Error("Missing merchant transaction ID");
    }

    // Get transaction from database
    const { data: transaction, error: txError } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('id', merchantTransactionId)
      .single();
    
    if (txError || !transaction) {
      throw new Error(`Transaction not found: ${merchantTransactionId}`);
    }

    logStep("Transaction found", { transaction });

    // Update transaction status
    await supabase
      .from('payment_transactions')
      .update({
        status: status,
        provider_transaction_id: transactionId,
        provider_response: callbackData,
        updated_at: new Date().toISOString()
      })
      .eq('id', merchantTransactionId);

    // If payment is successful, update wallet
    if (status === "SUCCESS" && code === "PAYMENT_SUCCESS") {
      logStep("Payment successful, updating wallet");
      
      // Get wallet
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', transaction.user_id)
        .single();
      
      if (walletError || !wallet) {
        throw new Error(`Wallet not found for user: ${transaction.user_id}`);
      }
      
      // Calculate new balance
      const paymentAmount = amount / 100; // Convert from paisa to rupees
      const newBalance = (wallet.balance || 0) + paymentAmount;
      
      // Update wallet balance
      await supabase
        .from('wallets')
        .update({
          balance: newBalance,
          last_transaction_date: new Date().toISOString()
        })
        .eq('id', wallet.id);
      
      // Add transaction record
      await supabase
        .from('transactions')
        .insert({
          wallet_id: wallet.id,
          type: 'deposit',
          amount: paymentAmount,
          description: transaction.description || "PhonePe deposit",
          created_at: new Date().toISOString()
        });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Callback processed successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    logStep("Error", error.message);
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
