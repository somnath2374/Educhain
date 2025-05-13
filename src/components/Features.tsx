
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "💸",
    title: "Auto-Micro-Investments",
    description: "Round up everyday UPI transactions and auto-invest the spare change into your future."
  },
  {
    icon: "🏆",
    title: "EduScore",
    description: "Build your blockchain-verified alternative to traditional credit scores while still in college."
  },
  {
    icon: "🔗",
    title: "Blockchain Transparency",
    description: "Every financial achievement is securely recorded on blockchain, building your verifiable reputation."
  },
  {
    icon: "🎮",
    title: "Gamified Learning",
    description: "Complete quizzes, earn badges, and level up your financial knowledge through fun missions."
  },
  {
    icon: "👥",
    title: "Social Proof",
    description: "Share your EduScore like your GitHub for internships, scholarships or as proof of financial literacy."
  },
  {
    icon: "🎁",
    title: "Real Rewards",
    description: "Unlock student perks, micro-loans, and partner discounts based on your consistent saving habits."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <div className="inline-block rounded-lg bg-educhain-lightPurple px-3 py-1 text-sm text-educhain-darkPurple">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Why Students <span className="gradient-text">Love EduChain</span>
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            We've reimagined financial growth for students with features that make saving, 
            learning, and building credit accessible and fun.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
