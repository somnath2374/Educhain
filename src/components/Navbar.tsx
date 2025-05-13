
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-2xl font-bold text-educhain-darkPurple">
              Edu<span className="text-educhain-purple">Chain</span>
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-educhain-purple transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-educhain-purple transition-colors">
            How It Works
          </a>
          <a href="#eduScore" className="text-sm font-medium hover:text-educhain-purple transition-colors">
            EduScore
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-educhain-purple transition-colors">
            Testimonials
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-educhain-darkPurple hover:text-educhain-purple hover:bg-educhain-lightPurple transition-colors"
            >
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button
              className="bg-gradient-to-r from-educhain-purple to-educhain-darkPurple hover:opacity-90 transition-opacity"
            >
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white pt-16 px-4",
        isMenuOpen ? "flex flex-col" : "hidden"
      )}>
        <nav className="flex flex-col space-y-4 mt-4">
          <a 
            href="#features" 
            className="py-2 text-lg border-b border-gray-100"
            onClick={toggleMenu}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="py-2 text-lg border-b border-gray-100"
            onClick={toggleMenu}
          >
            How It Works
          </a>
          <a 
            href="#eduScore" 
            className="py-2 text-lg border-b border-gray-100"
            onClick={toggleMenu}
          >
            EduScore
          </a>
          <a 
            href="#testimonials" 
            className="py-2 text-lg border-b border-gray-100"
            onClick={toggleMenu}
          >
            Testimonials
          </a>
        </nav>
        <div className="mt-6 space-y-4">
          <Link to="/login" className="block w-full">
            <Button
              variant="ghost"
              className="w-full text-educhain-darkPurple hover:text-educhain-purple hover:bg-educhain-lightPurple"
              onClick={toggleMenu}
            >
              Log In
            </Button>
          </Link>
          <Link to="/register" className="block w-full">
            <Button 
              className="w-full bg-gradient-to-r from-educhain-purple to-educhain-darkPurple hover:opacity-90"
              onClick={toggleMenu}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
