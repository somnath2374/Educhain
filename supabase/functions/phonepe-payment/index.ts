
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// CORS Headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PhonePe API configuration
const PHONEPE_API_URL = "https://api.phonepe.com/apis/hermes";
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
  console.log(`[PHONEPE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Payment request received");
    
    // Check if PhonePe credentials are configured
    if (!PHONEPE_SALT_KEY || !PHONEPE_MERCHANT_ID) {
      throw new Error("PhonePe credentials not configured");
    }

    // Create Supabase client using service role for admin rights
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get request data
    const { amount, description, userId, upiId, callbackUrl, redirectUrl } = await req.json();
    
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!upiId) {
      throw new Error("UPI ID is required");
    }

    logStep("Creating payment request", { amount, upiId, userId });

    // Generate a transaction ID
    const transactionId = crypto.randomUUID();
    
    // Create payload for PhonePe direct UPI payment
    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paisa (PhonePe requires amount in paisa)
      redirectUrl: redirectUrl || `${req.headers.get("origin") || ""}/payment-success`,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl || `${supabaseUrl}/functions/v1/phonepe-callback`,
      paymentInstrument: {
        type: "UPI_INTENT",
        targetApp: "PHONEPE",
        vpa: upiId  // Using the user's provided UPI ID
      }
    };

    // Convert payload to base64
    const payloadString = JSON.stringify(payload);
    const payloadBase64 = btoa(payloadString);
    
    // Generate checksum
    const stringToHash = payloadBase64 + "/pg/v1/pay" + PHONEPE_SALT_KEY;
    const sha256Hash = await generateSHA256Hash(stringToHash);
    const checksum = `${sha256Hash}###1`; // Format: SHA256(payload + apiEndpoint + salt) + "###" + saltIndex

    // Create request headers
    const headers = {
      "Content-Type": "application/json",
      "X-VERIFY": checksum
    };

    // Store transaction in database for tracking
    await supabase.from('payment_transactions').insert({
      id: transactionId,
      user_id: userId,
      amount: amount,
      description: description || "Wallet deposit",
      status: "INITIATED",
      payment_method: "PHONEPE_UPI",
      created_at: new Date().toISOString()
    });

    logStep("Sending request to PhonePe");
    
    // Send request to PhonePe
    const response = await fetch(`${PHONEPE_API_URL}/pg/v1/pay`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        request: payloadBase64
      })
    });

    const responseData = await response.json();
    logStep("PhonePe response", responseData);

    if (!response.ok) {
      throw new Error(`PhonePe API error: ${responseData?.message || response.statusText}`);
    }

    // Return payment URL to client
    return new Response(JSON.stringify({
      success: true,
      paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
      transactionId
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
