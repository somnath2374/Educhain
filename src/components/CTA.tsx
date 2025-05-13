
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const CTA = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This would be replaced with an actual API call when connected to backend
    console.log('Joining waitlist with email:', email);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "You're on the waitlist!",
        description: "We'll notify you when EduChain is ready to launch.",
      });
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
            Ready to Turn Your <span className="gradient-text">Chai Money</span> Into Your Future?
          </h2>
          <p className="text-muted-foreground md:text-lg mb-8 max-w-2xl">
            Join the waitlist for early access and get a ₹100 bonus investment when we launch.
            No bank details required until full launch.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-to-r from-educhain-purple to-educhain-darkPurple hover:opacity-90"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </form>
          
          <p className="text-sm text-muted-foreground">
            By joining, you'll get early access and product updates. <br />
            No spam, ever. That's our promise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-educhain-lightPurple flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#6E59A5"/>
                </svg>
              </div>
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-educhain-lightPurple flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="#6E59A5"/>
                </svg>
              </div>
              <span>Twitter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-educhain-lightPurple flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0084 10.4458 14.0072 10.4012 13.9967 10.3578C13.9862 10.3144 13.9666 10.2734 13.939 10.238C13.869 10.158 13.76 10.179 13.67 10.195C13.55 10.216 12.17 11.13 9.53 12.94C9.09 13.24 8.69 13.38 8.34 13.37C7.95 13.361 7.18 13.17 6.62 13.007C5.93 12.81 5.39 12.707 5.44 12.33C5.46 12.135 5.73 11.94 6.25 11.74C9.1 10.42 11.01 9.56 11.97 9.15C14.72 7.95 15.36 7.71 15.78 7.7C15.87 7.7 16.07 7.72 16.2 7.83C16.31 7.92 16.33 8.04 16.34 8.13C16.35 8.21 16.36 8.43 16.34 8.61L16.64 8.8Z" fill="#6E59A5"/>
                </svg>
              </div>
              <span>Telegram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
