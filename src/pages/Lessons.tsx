import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Award, Video, FileText, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser, signOut } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useEduScore } from '@/hooks/useEduScore';

// Sample lesson data
const lessons = [
  {
    id: "basics",
    title: "Basics of Personal Finance",
    type: "article",
    description: "Learn the foundations of managing your money effectively",
    duration: "10 minutes",
    icon: <FileText className="h-6 w-6 text-educhain-purple" />,
    difficulty: "Beginner"
  },
  {
    id: "investing101",
    title: "Introduction to Investing",
    type: "video",
    description: "Understand how investments work and where to start",
    duration: "15 minutes",
    icon: <Video className="h-6 w-6 text-educhain-purple" />,
    difficulty: "Beginner"
  },
  {
    id: "budgeting",
    title: "Creating a Budget That Works",
    type: "article",
    description: "Master the art of budgeting to reach your financial goals",
    duration: "8 minutes",
    icon: <FileText className="h-6 w-6 text-educhain-purple" />,
    difficulty: "Beginner"
  },
  {
    id: "debt",
    title: "Managing and Reducing Debt",
    type: "quiz",
    description: "Test your knowledge on handling debt effectively",
    duration: "5 minutes",
    icon: <HelpCircle className="h-6 w-6 text-educhain-purple" />,
    difficulty: "Intermediate"
  },
];

// Sample video courses
const videoCourses = [
  {
    id: "stock-market",
    title: "Understanding the Stock Market",
    description: "Learn the basics of how stocks work",
    lessons: 5,
    duration: "45 minutes",
    level: "Beginner"
  },
  {
    id: "retirement",
    title: "Planning for Retirement",
    description: "Start early and secure your future",
    lessons: 4,
    duration: "35 minutes",
    level: "Intermediate"
  },
  {
    id: "crypto",
    title: "Cryptocurrency Explained",
    description: "Make sense of blockchain and digital currencies",
    lessons: 6,
    duration: "50 minutes",
    level: "Advanced"
  }
];

// Sample quizzes
const quizzes = [
  {
    id: "finance-basics",
    title: "Financial Literacy Basics",
    questions: 10,
    difficulty: "Easy"
  },
  {
    id: "investment-quiz",
    title: "Investment Knowledge Check",
    questions: 15,
    difficulty: "Medium"
  },
  {
    id: "tax-planning",
    title: "Tax Planning Strategies",
    questions: 8,
    difficulty: "Hard"
  }
];

const Lessons = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { score, loading: eduScoreLoading, completeLesson } = useEduScore();

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

  const handleCompleteLesson = async (lessonId: string) => {
    const result = await completeLesson(lessonId);
    if (result.success) {
      toast({
        title: "Lesson Completed!",
        description: `You earned ${result.scoreEarned} points for your EduScore.`,
      });
    }
  };

  if (isLoading || eduScoreLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-educhain-purple animate-pulse" />
          <h2 className="text-xl font-semibold">Loading your lessons...</h2>
        </div>
      </div>
    );
  }

  const completedLessonIds = score?.completed_lessons || [];
  const currentScore = score?.score || 0;

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
              onClick={() => navigate('/dashboard')}
              className="text-educhain-purple"
            >
              Dashboard
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
          <h2 className="text-2xl font-bold">Financial Education Center</h2>
          <div className="flex items-center gap-2">
            <Award className="text-yellow-500 h-5 w-5" />
            <span className="font-semibold">Your EduScore: {currentScore}</span>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Complete lessons to increase your EduScore and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{completedLessonIds.length} completed</span>
                  <span>{lessons.length} total lessons</span>
                </div>
                <Progress value={(completedLessonIds.length / lessons.length) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lessons" className="mb-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="videos">Video Courses</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <CardHeader className="bg-educhain-lightPurple bg-opacity-30 pb-2">
                    <div className="flex justify-between items-center">
                      <div className="bg-white p-2 rounded-full shadow">
                        {lesson.icon}
                      </div>
                      <div className="text-sm font-medium px-2 py-1 bg-white rounded-full shadow">
                        {lesson.type}
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-lg">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div>{lesson.duration}</div>
                      <div>{lesson.difficulty}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 flex justify-between">
                    <Button 
                      variant="link"
                      className="text-educhain-purple"
                      onClick={() => navigate(`/lessons/${lesson.id}`)}
                    >
                      Read Lesson
                    </Button>
                    <Button 
                      variant={completedLessonIds.includes(lesson.id) ? "outline" : "default"}
                      size="sm"
                      disabled={completedLessonIds.includes(lesson.id)}
                      onClick={() => handleCompleteLesson(lesson.id)}
                      className={completedLessonIds.includes(lesson.id) ? "bg-gray-100" : "bg-educhain-purple"}
                    >
                      {completedLessonIds.includes(lesson.id) ? "Completed" : "Mark Complete"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="bg-educhain-darkPurple text-white p-4 mb-3 rounded-md flex items-center justify-center">
                      <Video className="h-12 w-12" />
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-1 items-center">
                        <FileText className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div>{course.duration}</div>
                    </div>
                    <div className="mt-2 text-sm">
                      Level: {course.level}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50">
                    <Button className="w-full bg-educhain-purple">Start Course</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <div className="text-center">
                      <HelpCircle className="h-12 w-12 text-educhain-purple mx-auto" />
                    </div>
                    <CardTitle className="text-center">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-4 text-sm">
                      <div className="px-3 py-1 bg-educhain-lightPurple rounded-full">
                        {quiz.questions} questions
                      </div>
                      <div className="px-3 py-1 bg-educhain-lightPurple rounded-full">
                        {quiz.difficulty}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50">
                    <Button className="w-full bg-educhain-purple">Take Quiz</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Lessons;
