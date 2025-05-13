
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-educhain-lightPurple rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-educhain-lightPurple rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                Turn Your <span className="gradient-text">Chai Money</span> Into Your Future
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Auto-invest spare change from your daily transactions, build your EduScore, 
                and unlock a blockchain-powered financial future - one chai at a time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-gradient-purple hover:opacity-90">
                Start Investing <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-educhain-purple text-educhain-darkPurple hover:bg-educhain-lightPurple">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">No minimum balance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Student verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Blockchain secured</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-[400px] md:h-[480px] animate-float">
              <div className="absolute top-0 right-0 md:top-4 md:right-8 glass-card rounded-xl p-4 shadow-lg animate-pulse-gentle">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Transaction</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 bg-educhain-lightPurple rounded-full flex items-center justify-center">
                      <span className="text-educhain-darkPurple">☕</span>
                    </div>
                    <div>
                      <p className="font-medium">Chai Purchase</p>
                      <p className="text-sm text-gray-500">₹46.50</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-educhain-lightPurple rounded-lg">
                    <p className="text-xs text-educhain-darkPurple">
                      <span className="font-medium">+₹3.50</span> auto-invested
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-0 md:bottom-20 glass-card rounded-xl p-4 shadow-lg max-w-[200px] animate-pulse-gentle" style={{ animationDelay: '1s' }}>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">EduScore Update</span>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-educhain-purple h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">70/100</p>
                  </div>
                  <div className="mt-3 p-2 bg-educhain-lightPurple rounded-lg">
                    <p className="text-xs text-educhain-darkPurple">
                      <span className="font-medium">+5 points</span> from quiz completion
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 glass-card rounded-xl p-4 shadow-lg max-w-[220px] animate-pulse-gentle" style={{ animationDelay: '0.5s' }}>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Investment Growth</span>
                  <div className="mt-1">
                    <p className="font-medium">₹1,245.32</p>
                    <p className="text-xs text-green-500">+12.6% this month</p>
                  </div>
                  <div className="mt-2 h-16 flex items-end">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4 bg-educhain-purple mr-1 rounded-t-sm"
                        style={{ 
                          height: `${20 + Math.random() * 40}%`,
                          opacity: 0.6 + (i * 0.05)
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
