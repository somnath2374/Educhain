
import { supabase, checkSupabaseConfig } from './supabase';
import { getCurrentUser } from './auth';

export const getLearningProgress = async () => {
  try {
    checkSupabaseConfig();
    
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the user's EduScore from the database using raw query
    const { data, error } = await supabase
      .from('edu_scores')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching EduScore:', error);
      throw error;
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
        throw createError;
      }
      
      return {
        completedLessons: 0,
        totalLessons: 15,
        availableRewards: 0,
        lastCompleted: newScore.last_updated
      };
    }
    
    // Calculate available rewards based on completed lessons
    const completedLessonsCount = data.completed_lessons?.length || 0;
    const availableRewards = Math.floor(completedLessonsCount / 2);
    
    return {
      completedLessons: completedLessonsCount,
      totalLessons: 15,
      availableRewards,
      lastCompleted: data.last_updated
    };
  } catch (error) {
    console.error('Error getting learning progress:', error);
    // Return fallback data
    return {
      completedLessons: 0, 
      totalLessons: 15,
      availableRewards: 0,
      lastCompleted: new Date().toISOString()
    };
  }
};

export const getEduScore = async () => {
  try {
    checkSupabaseConfig();
    
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the user's EduScore from the database
    const { data, error } = await supabase
      .from('edu_scores')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching EduScore:', error);
      throw error;
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
        throw createError;
      }
      
      return {
        score: 0,
        change: 0,
        lastUpdated: newScore.last_updated
      };
    }
    
    // Calculate change in the last week (in a real app, this would be more sophisticated)
    const change = 0; // Simplified for demo
    
    return {
      score: data.score,
      change,
      lastUpdated: data.last_updated
    };
  } catch (error) {
    console.error('Error getting EduScore:', error);
    return {
      score: 0,
      change: 0,
      lastUpdated: new Date().toISOString()
    };
  }
};

export const completeLesson = async (lessonId: string) => {
  try {
    checkSupabaseConfig();
    
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the current EduScore
    const { data, error } = await supabase
      .from('edu_scores')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching EduScore:', error);
      throw error;
    }
    
    // Calculate the points to award
    const pointsEarned = 10;
    
    // If no EduScore exists, create one
    if (!data) {
      const { error: createError } = await supabase
        .from('edu_scores')
        .insert({
          user_id: user.id,
          score: pointsEarned,
          completed_lessons: [lessonId],
          last_updated: new Date().toISOString()
        });
      
      if (createError) {
        console.error('Error creating EduScore:', createError);
        throw createError;
      }
    } else {
      // Check if the lesson is already completed
      const completedLessons = data.completed_lessons || [];
      if (completedLessons.includes(lessonId)) {
        return {
          success: true,
          scoreEarned: 0,
        };
      }
      
      // Update the existing EduScore
      const newCompletedLessons = [...completedLessons, lessonId];
      const newScore = data.score + pointsEarned;
      
      const { error: updateError } = await supabase
        .from('edu_scores')
        .update({
          score: newScore,
          completed_lessons: newCompletedLessons,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (updateError) {
        console.error('Error updating EduScore:', updateError);
        throw updateError;
      }
    }
    
    return {
      success: true,
      scoreEarned: pointsEarned,
    };
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
};
