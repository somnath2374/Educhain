
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";
import { useEduScore } from '@/hooks/useEduScore';

// For demo purposes, we'll use static lesson count
const TOTAL_LESSONS = 15;

const LearningProgress = () => {
  const { score, loading, error } = useEduScore();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-educhain-purple" />
            Learning Progress
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
            <BookOpen className="h-5 w-5 text-educhain-purple" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">-- / {TOTAL_LESSONS} Lessons</div>
          <Progress value={0} className="h-2 mt-2 mb-2" />
          <div className="text-sm text-muted-foreground mt-1">
            Connect Supabase to track your progress
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the completed lessons count safely
  const completedLessons = score?.completed_lessons?.length || 0;
  
  // Calculate percentage complete
  const percentComplete = (completedLessons / TOTAL_LESSONS) * 100;
  
  // Calculate available rewards (1 reward for every 2 completed lessons)
  const availableRewards = Math.floor(completedLessons / 2);

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-educhain-purple" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {completedLessons} / {TOTAL_LESSONS} Lessons
        </div>
        <Progress 
          value={percentComplete} 
          className="h-2 mt-2 mb-2" 
        />
        <div className="text-sm text-muted-foreground mt-1">
          {availableRewards > 0 
            ? `${availableRewards} rewards available` 
            : 'Complete more lessons to earn rewards'}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
