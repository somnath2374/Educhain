
import { supabase, checkSupabaseConfig } from './supabase';
import { Wallet, Transaction } from '@/types/wallet';
import { getCurrentUser } from './auth';

export const fetchWallet = async (): Promise<Wallet | null> => {
  checkSupabaseConfig();
  
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  try {
    // First check if wallet exists
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching wallet:', error);
      throw error;
    }
    
    // If wallet doesn't exist, create one
    if (!data) {
      const { data: newWallet, error: createError } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          balance: 0,
          roundup_total: 0,
          rewards_earned: 0,
          last_transaction_date: new Date().toISOString()
        })
        .select()
        .single();
        
      if (createError) {
        console.error('Error creating wallet:', createError);
        throw createError;
      }
      
      // Return new wallet with empty transactions
      return {
        ...newWallet,
        transactions: []
      } as Wallet;
    }
    
    // Now fetch transactions for this wallet
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('wallet_id', data.id)
      .order('created_at', { ascending: false });
    
    if (txError) {
      console.error('Error fetching transactions:', txError);
      throw txError;
    }
    
    return {
      ...data,
      transactions: transactions || []
    } as Wallet;
  } catch (error) {
    console.error('Wallet fetch error:', error);
    throw error;
  }
};

export const simulateRoundUp = async (amount: number, description: string): Promise<Transaction | null> => {
  checkSupabaseConfig();
  
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  try {
    // First get the wallet
    const wallet = await fetchWallet();
    
    if (!wallet) {
      console.error('No wallet found for user');
      throw new Error('No wallet found for user');
    }
    
    // Calculate roundup (between 5-10 rupees)
    const randomRoundupAmount = Math.random() * 5 + 5; // Random amount between 5-10
    const roundupAmount = Math.floor(randomRoundupAmount * 100) / 100; // Round to 2 decimal places
    
    // Add transaction
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        wallet_id: wallet.id,
        type: 'round-up',
        amount: roundupAmount,
        description: description || 'Round-up from purchase',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
    
    // Update wallet balance with the new values
    const newBalance = (wallet.balance || 0) + roundupAmount;
    const newRoundupTotal = (wallet.roundup_total || 0) + roundupAmount;
    
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        roundup_total: newRoundupTotal,
        last_transaction_date: new Date().toISOString()
      })
      .eq('id', wallet.id);
    
    if (updateError) {
      console.error('Error updating wallet balance:', updateError);
      throw updateError;
    }
    
    return data as Transaction;
  } catch (error) {
    console.error('Round-up error:', error);
    throw error;
  }
};

export const addDeposit = async (amount: number, description: string): Promise<Transaction | null> => {
  checkSupabaseConfig();
  
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  try {
    // First get the wallet
    const wallet = await fetchWallet();
    
    if (!wallet) {
      console.error('No wallet found for user');
      throw new Error('No wallet found for user');
    }
    
    // Add transaction
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        wallet_id: wallet.id,
        type: 'deposit',
        amount: amount,
        description: description || 'Manual deposit',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
    
    // Calculate new balance
    const newBalance = (wallet.balance || 0) + amount;
    
    // Update wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        last_transaction_date: new Date().toISOString()
      })
      .eq('id', wallet.id);
    
    if (updateError) {
      console.error('Error updating wallet balance:', updateError);
      throw updateError;
    }
    
    return data as Transaction;
  } catch (error) {
    console.error('Deposit error:', error);
    throw error;
  }
};
