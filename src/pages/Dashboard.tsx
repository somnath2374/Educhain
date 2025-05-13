import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, PiggyBank, Wallet, ArrowDownCircle, CircleDollarSign, BookOpen } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';
import WalletCard from '@/components/WalletCard';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionForm from '@/components/AddTransactionForm';
import DepositForm from '@/components/DepositForm';
import LearningProgress from '@/components/LearningProgress';
import EduScoreCard from '@/components/EduScoreCard';
import FinancialTips from '@/components/FinancialTips';
import { signOut, getCurrentUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { wallet, loading, paymentLoading, addRoundUp, addDirectDeposit, initiateUpiPayment, refreshWallet } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (!user) {
          navigate('/login');
          return;
        }
        setUserName(user.email?.split('@')[0] || 'User');
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully logged out.",
      });
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Check if the URL contains payment success or failure parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const txnId = urlParams.get('txnId');
    
    if (status && txnId) {
      // Clear URL parameters without reloading the page
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Handle payment status
      if (status === 'SUCCESS') {
        toast({
          title: "Payment successful!",
          description: `Your payment has been successfully processed. Transaction ID: ${txnId}`,
          variant: "default",
        });
        
        // Refresh wallet data to show updated balance
        refreshWallet();
      } else {
        toast({
          title: "Payment failed",
          description: `Your payment was not successful. Please try again.`,
          variant: "destructive",
        });
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <PiggyBank className="h-12 w-12 mx-auto mb-4 text-educhain-purple animate-pulse" />
          <h2 className="text-xl font-semibold">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-educhain-darkPurple">
              Edu<span className="text-educhain-purple">Chain</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/lessons')}
              className="text-educhain-purple"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Learn
            </Button>
            <div className="hidden md:block">
              <span className="font-medium">Welcome, {userName || 'User'}</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Financial Dashboard</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshWallet} 
            className="text-educhain-purple"
          >
            Refresh Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <WalletCard wallet={wallet} loading={loading} />
          <EduScoreCard />
          <LearningProgress />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionsList 
              transactions={wallet?.transactions || []} 
              loading={loading} 
            />
          </div>
          <div className="space-y-6">
            <Tabs defaultValue="roundup">
              <TabsList className="w-full">
                <TabsTrigger value="roundup" className="flex-1 flex items-center justify-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Round-Up</span>
                </TabsTrigger>
                <TabsTrigger value="deposit" className="flex-1 flex items-center justify-center gap-2">
                  <ArrowDownCircle className="h-4 w-4" />
                  <span>Deposit</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="roundup">
                <AddTransactionForm onAddRoundUp={addRoundUp} />
              </TabsContent>
              <TabsContent value="deposit">
                <DepositForm 
                  onAddDeposit={addDirectDeposit}
                  onInitiatePayment={initiateUpiPayment}
                  paymentLoading={paymentLoading}
                />
              </TabsContent>
            </Tabs>
            <FinancialTips />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
