
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuList from "@/components/MenuList";
import Cart from "@/components/Cart";

const Order: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Our Menu</h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Explore our selection of gourmet dishes, crafted with precision and passion
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MenuList />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Order;
