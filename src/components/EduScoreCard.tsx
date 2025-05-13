
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ArrowUp, ArrowDown } from "lucide-react";
import { useEduScore } from '@/hooks/useEduScore';

const EduScoreCard = () => {
  const { score, loading, error } = useEduScore();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-educhain-purple" />
            EduScore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-educhain-purple" />
            EduScore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">--</div>
          <div className="text-sm text-muted-foreground mt-1">
            Connect Supabase to track your EduScore
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the current score safely
  const currentScore = score?.score || 0;
  
  // In a real app, this would come from the database
  const change = 0;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-educhain-purple" />
          EduScore
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{currentScore}</div>
        {change !== 0 && (
          <div className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {change > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 mr-1" />
                +{change} points this week
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 mr-1" />
                {change} points this week
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EduScoreCard;
