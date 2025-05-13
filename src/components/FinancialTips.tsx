
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

const tips = [
  "Save 20% of your monthly income for emergencies and future goals.",
  "Track your expenses to understand where your money goes.",
  "Avoid unnecessary subscription services that you rarely use.",
  "Start investing early, even with small amounts.",
  "Pay off high-interest debt first before focusing on savings."
];

const FinancialTips = () => {
  // Get a random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Financial Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {randomTip}
        </p>
      </CardContent>
    </Card>
  );
};

export default FinancialTips;
