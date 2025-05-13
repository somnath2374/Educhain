
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IndianRupee, Smartphone } from "lucide-react";

interface UpiPaymentFormProps {
  onInitiatePayment: (amount: number, description: string, upiId: string) => Promise<any>;
  loading: boolean;
}

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Amount must be greater than 0" }
  ),
  description: z.string().optional(),
  upiId: z.string()
    .min(5, "Valid UPI ID required")
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/, "UPI ID must be in format username@bankname")
});

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({ onInitiatePayment, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      upiId: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onInitiatePayment(
        parseFloat(data.amount), 
        data.description || "UPI deposit", 
        data.upiId
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-educhain-purple" />
          Add Real Money via UPI
        </CardTitle>
        <CardDescription>
          Enter your PhonePe UPI ID to receive payment request directly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        placeholder="100.00"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="upiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your PhonePe UPI ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username@ybl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Example: yourname@ybl, yourname@paytm, etc.
                  </p>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add to savings"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Request Payment via PhonePe'}
            </Button>
            
            <div className="text-xs text-center text-gray-500 mt-2">
              Powered by PhonePe | Secure Payment
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpiPaymentForm;
