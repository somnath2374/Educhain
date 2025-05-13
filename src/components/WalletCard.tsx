
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import { Wallet } from '@/types/wallet';

interface WalletCardProps {
  wallet: Wallet | null;
  loading: boolean;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, loading }) => {
  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-educhain-purple" />
            Total Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  // Safe values with fallbacks
  const balance = wallet?.balance || 0;
  const roundupTotal = wallet?.roundup_total || 0;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-educhain-purple" />
          Total Savings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          ₹{balance.toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {roundupTotal > 0 
            ? `₹${roundupTotal.toFixed(2)} from round-ups` 
            : 'No round-ups yet'}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
