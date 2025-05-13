
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpiPaymentForm from "@/components/UpiPaymentForm";
import { CreditCard, Smartphone } from "lucide-react";

interface DepositFormProps {
  onAddDeposit: (amount: number, description: string) => Promise<any>;
  onInitiatePayment?: (amount: number, description: string, upiId: string) => Promise<any>;
  paymentLoading?: boolean;
}

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Amount must be greater than 0" }
  ),
  description: z.string().optional(),
});

const DepositForm: React.FC<DepositFormProps> = ({ 
  onAddDeposit, 
  onInitiatePayment,
  paymentLoading = false
}) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await onAddDeposit(parseFloat(data.amount), data.description || "Manual deposit");
      form.reset();
    } catch (error) {
      console.error('Error adding deposit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="simulate">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="simulate" className="flex-1 flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Simulate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="upi" 
              className="flex-1 flex items-center justify-center gap-2"
              disabled={!onInitiatePayment}
            >
              <Smartphone className="h-4 w-4" />
              <span>UPI (Real)</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulate">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Monthly deposit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-educhain-purple to-educhain-darkPurple hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Simulate Deposit'}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  This is a simulated deposit and does not involve real money
                </p>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="upi">
            {onInitiatePayment ? (
              <UpiPaymentForm 
                onInitiatePayment={onInitiatePayment} 
                loading={paymentLoading} 
              />
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">UPI payments are not configured.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DepositForm;
