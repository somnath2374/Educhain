
import React from 'react';
import { Button } from "@/components/ui/button";

const EduScore = () => {
  return (
    <section id="eduScore" className="py-16 md:py-24 bg-gradient-purple text-white">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm mb-2 w-fit">
              EduScore
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Your Financial Reputation, <br />Built Before Graduation
            </h2>
            <p className="text-white/80 md:text-lg max-w-[500px]">
              Traditional credit scores require borrowing history. EduScore creates a 
              blockchain-verified financial reputation based on your consistent 
              saving habits and financial literacy - perfect for students.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Savings Consistency</h4>
                  <p className="text-white/70 text-sm">Measured by regular micro-investments from transactions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Financial Knowledge</h4>
                  <p className="text-white/70 text-sm">Improved by completing quizzes and learning modules</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Smart Money Goals</h4>
                  <p className="text-white/70 text-sm">Setting and achieving personal financial targets</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="bg-white text-educhain-darkPurple hover:bg-educhain-lightPurple hover:text-educhain-darkPurple border-0 w-fit">
              View Sample EduScore
            </Button>
          </div>
          
          <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Your EduScore</h3>
                <span className="text-2xl font-bold">78/100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Savings Consistency</span>
                  <span>86%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Financial Knowledge</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Goal Achievement</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <h4 className="font-medium mb-2">Current Benefits Unlocked</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>50% off Udemy Finance Courses</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Eligible for ₹2,000 micro-loan</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>10% cashback on academic purchases</span>
                </li>
              </ul>
            </div>
            
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center rotate-12">
              <div className="text-center">
                <div className="text-xs font-semibold">VERIFIED BY</div>
                <div className="font-bold">BLOCKCHAIN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduScore;
