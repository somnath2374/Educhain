
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/auth';

export interface EduScore {
  id: string;
  user_id: string;
  score: number;
  completed_lessons: string[];
  last_updated: string;
}

export const useEduScore = () => {
  const [score, setScore] = useState<EduScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEduScore = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated first
      const user = await getCurrentUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }
      
      // Try to get the user's EduScore using raw SQL query instead of typed client
      // This works around TypeScript errors with tables not in the generated types
      const { data, error: fetchError } = await supabase
        .from('edu_scores')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching EduScore:', fetchError);
        setError(fetchError.message);
        return;
      }
      
      // If no EduScore exists, create one
      if (!data) {
        const { data: newScore, error: createError } = await supabase
          .from('edu_scores')
          .insert({
            user_id: user.id,
            score: 0,
            completed_lessons: [],
            last_updated: new Date().toISOString()
          })
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating EduScore:', createError);
          setError(createError.message);
          return;
        }
        
        setScore(newScore as unknown as EduScore);
      } else {
        setScore(data as unknown as EduScore);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('EduScore fetch error:', err);
      setError(err?.message || 'Failed to fetch EduScore data');
      toast({
        title: "Error",
        description: "Failed to load EduScore data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeLesson = async (lessonId: string, pointsEarned: number = 10) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to continue.",
          variant: "destructive",
        });
        return { success: false, scoreEarned: 0 };
      }

      // Make sure we have the latest score
      await fetchEduScore();
      
      if (!score) {
        throw new Error("EduScore not initialized");
      }
      
      // Check if the lesson is already completed
      if (score.completed_lessons.includes(lessonId)) {
        toast({
          title: "Already completed",
          description: "You've already completed this lesson.",
        });
        return { success: false, scoreEarned: 0 };
      }
      
      // Update the score
      const newCompletedLessons = [...score.completed_lessons, lessonId];
      const newScore = score.score + pointsEarned;
      
      const { data, error } = await supabase
        .from('edu_scores')
        .update({
          score: newScore,
          completed_lessons: newCompletedLessons,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating EduScore:', error);
        throw error;
      }
      
      setScore(data as unknown as EduScore);
      
      return { 
        success: true, 
        scoreEarned: pointsEarned 
      };
    } catch (err: any) {
      console.error('Error completing lesson:', err);
      toast({
        title: "Error",
        description: err?.message || "Could not update your progress. Please try again.",
        variant: "destructive",
      });
      return { 
        success: false, 
        scoreEarned: 0 
      };
    }
  };

  // Add listener for auth state changes and fetch on component mount
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchEduScore(); // Fetch EduScore when user signs in
      } else if (event === 'SIGNED_OUT') {
        setScore(null); // Clear EduScore when user signs out
      }
    });
    
    // Then check if user is authenticated and fetch EduScore
    fetchEduScore();
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    score,
    loading,
    error,
    fetchEduScore,
    completeLesson
  };
};
