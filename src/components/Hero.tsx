
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div 
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format')" 
      }}
    >
      <div className="text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-text-shadow animate-fade-in">
          Experience Culinary Excellence
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto hero-text-shadow opacity-90 animate-fade-in">
          Indulge in exceptional flavors crafted with passion and the finest ingredients
        </p>
        <Link to="/order">
          <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-md transition-all duration-300 animate-fade-in">
            Order Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
