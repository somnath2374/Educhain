
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface AddTransactionFormProps {
  onAddRoundUp: (amount: number, description: string) => Promise<any>;
}

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Amount must be greater than 0" }
  ),
  description: z.string().optional(),
});

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddRoundUp }) => {
  const [loading, setLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<{ amount: number; description: string } | null>(null);
  const { toast } = useToast();
  
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
      const amount = parseFloat(data.amount);
      const description = data.description || "Manual round-up";
      
      await onAddRoundUp(amount, description);
      
      // Store the transaction details to display the message
      setLastTransaction({
        amount: amount,
        description: description
      });
      
      // Show toast to inform the user
      toast({
        title: "Round-up saved!",
        description: `₹${amount.toFixed(2)} was paid to the vendor, and 5-10 rupees were added to your wallet.`,
      });
      
      form.reset();
    } catch (error) {
      console.error('Error adding round-up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-educhain-purple" />
          Simulate Round-Up
        </CardTitle>
        <CardDescription>
          Add a ₹5-10 round-up to your savings
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
                  <FormLabel>Original Amount (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="46.50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="px-3 py-2 bg-educhain-lightPurple rounded-md text-sm">
              <span className="font-medium">Roundup amount: </span>
              <span className="text-educhain-darkPurple">₹5.00 - ₹10.00 (random)</span>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coffee at Starbucks"
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
              {loading ? 'Processing...' : 'Save Round-Up'}
            </Button>
            
            {lastTransaction && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                <p className="font-medium">Transaction simulated:</p>
                <p>₹{lastTransaction.amount.toFixed(2)} was paid to the vendor for {lastTransaction.description}</p>
                <p>A portion was saved in your wallet as round-up.</p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTransactionForm;
