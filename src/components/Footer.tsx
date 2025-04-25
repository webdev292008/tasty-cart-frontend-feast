
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Savoria</h3>
            <p className="text-white/80">
              Experience the finest culinary delights in an elegant setting, crafted with passion and the freshest ingredients.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Hours</h4>
            <ul className="space-y-2 text-white/80">
              <li>Monday - Thursday: 11am - 10pm</li>
              <li>Friday - Saturday: 11am - 11pm</li>
              <li>Sunday: 11am - 9pm</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Contact</h4>
            <address className="not-italic text-white/80 space-y-2">
              <p>123 Culinary Street</p>
              <p>Gourmet City, GC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@savoria.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Savoria. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
