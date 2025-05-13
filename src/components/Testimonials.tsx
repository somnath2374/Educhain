
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "I never thought saving could be so easy. EduChain helped me build an emergency fund from my chai money without even trying!",
    name: "Aditya Sharma",
    title: "Engineering Student, Delhi",
    avatar: "AS"
  },
  {
    quote: "My EduScore helped me secure an internship at a fintech company. The recruiter was impressed with my financial literacy.",
    name: "Priya Patel",
    title: "Finance Student, Mumbai",
    avatar: "PP"
  },
  {
    quote: "I used to waste money on unnecessary things. Now I've saved enough for my certification course using just spare change.",
    name: "Rohit Kumar",
    title: "Computer Science Student, Bangalore",
    avatar: "RK"
  },
  {
    quote: "The financial quizzes taught me more about investing than my entire college education. And I got rewards for learning!",
    name: "Neha Gupta",
    title: "Design Student, Pune",
    avatar: "NG"
  }
];

const stats = [
  { value: "25,000+", label: "Active Students" },
  { value: "₹1.2 Cr+", label: "Total Savings" },
  { value: "86%", label: "Improved Financial Literacy" },
  { value: "200+", label: "Partner Rewards" }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <div className="inline-block rounded-lg bg-educhain-lightPurple px-3 py-1 text-sm text-educhain-darkPurple">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            What <span className="gradient-text">Students Say</span>
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Join thousands of students who've transformed their financial future with EduChain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-educhain-purple">
                      <path d="M10 11L8 17H5L7 11H5V5H11V11H10ZM18 11L16 17H13L15 11H13V5H19V11H18Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="mb-4 text-muted-foreground italic">{testimonial.quote}</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-10 h-10 rounded-full bg-educhain-lightPurple flex items-center justify-center text-educhain-darkPurple font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-educhain-darkPurple rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Our Impact</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-educhain-purple mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
