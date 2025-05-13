
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/hooks/useWallet';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshWallet } = useWallet();
  const queryParams = new URLSearchParams(location.search);
  
  // Get status from URL params
  const status = queryParams.get('status') || 'SUCCESS'; // Default to success
  const transactionId = queryParams.get('merchantTransactionId') || '';
  const amount = queryParams.get('amount') || '';
  
  // Convert amount from paisa to rupees if exists
  const amountInRupees = amount ? (parseInt(amount) / 100).toFixed(2) : '';

  useEffect(() => {
    // Refresh wallet to get the latest balance
    refreshWallet();
  }, []);

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const isSuccess = status === 'SUCCESS';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="mb-4 flex justify-center">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {isSuccess
                ? 'Your payment has been successfully processed.'
                : 'There was a problem processing your payment.'}
            </p>
          </div>
          
          {amountInRupees && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{amountInRupees}</span>
              </div>
            </div>
          )}
          
          {transactionId && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium text-right break-all">{transactionId}</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleGoHome} 
            className="w-full bg-gradient-to-r from-educhain-purple to-educhain-darkPurple flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
