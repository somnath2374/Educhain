
import React from 'react';
import { Transaction } from '@/types/wallet';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  PiggyBank, 
  CreditCard,
  ArrowDownCircle,
  ArrowUpCircle,
  Trophy
} from "lucide-react";

interface TransactionsListProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, loading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'round-up':
        return <PiggyBank className="h-5 w-5 text-educhain-purple" />;
      case 'deposit':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
      case 'reward':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <PiggyBank className="h-12 w-12 text-educhain-purple mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
        <p className="text-muted-foreground">
          Make a purchase or add funds to start building your savings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-educhain-lightPurple p-1.5 rounded-full">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <span className="capitalize">{transaction.type.replace('-', ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                <TableCell className="text-right font-medium">
                  <span className={transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-600'}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}₹{transaction.amount.toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsList;
