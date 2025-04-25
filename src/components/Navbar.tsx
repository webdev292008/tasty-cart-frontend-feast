
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-semibold text-accent hover:text-primary transition-colors"
          >
            Savoria
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-accent-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/order" className="text-accent-foreground hover:text-primary transition-colors">
              Menu
            </Link>
            <Link to="/" className="text-accent-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/" className="text-accent-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/order" className="relative">
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/order">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-accent-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/order" 
                className="text-accent-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/" 
                className="text-accent-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/" 
                className="text-accent-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center justify-between">
                <Link 
                  to="/order" 
                  className="relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                    <ShoppingCart />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/order" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
