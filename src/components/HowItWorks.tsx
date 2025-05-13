
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Connect Your UPI",
    description: "Link your UPI ID to EduChain securely. We never store your bank details, only transaction metadata.",
    icon: "📱"
  },
  {
    number: "02",
    title: "Spend As Usual",
    description: "Continue buying your chai, snacks, and essentials. EduChain works silently in the background.",
    icon: "☕"
  },
  {
    number: "03",
    title: "Auto-Round Up & Invest",
    description: "We round up transactions to the nearest ₹5 or ₹10 and invest that spare change automatically.",
    icon: "💰"
  },
  {
    number: "04",
    title: "Level Up Your EduScore",
    description: "Complete financial literacy quizzes and maintain consistent savings to build your EduScore.",
    icon: "📈"
  },
  {
    number: "05",
    title: "Unlock Rewards",
    description: "Access micro-loans, student discounts, and exclusive opportunities based on your EduScore.",
    icon: "🎁"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <div className="inline-block rounded-lg bg-educhain-lightPurple px-3 py-1 text-sm text-educhain-darkPurple">
            Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            How <span className="gradient-text">EduChain Works</span>
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Turn your small everyday purchases into investments for your future, 
            all while building your financial knowledge and reputation.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-educhain-lightPurple hidden md:block" />
          
          {steps.map((step, index) => (
            <div key={index} className="mb-12 md:mb-0 relative animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className={`flex flex-col md:flex-row gap-4 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-16 h-16 bg-educhain-lightPurple rounded-full flex items-center justify-center text-2xl z-10">
                    {step.icon}
                  </div>
                </div>
                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-sm font-semibold text-educhain-purple mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-educhain-lightPurple bottom-0 translate-y-full hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
