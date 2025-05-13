
export interface Transaction {
  id: string;
  type: 'round-up' | 'deposit' | 'withdrawal' | 'reward';
  amount: number;
  description: string;
  created_at: string;
  wallet_id?: string; // Add this to match Supabase schema
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  roundup_total: number;
  rewards_earned: number;
  last_transaction_date: string;
  transactions: Transaction[];
}
