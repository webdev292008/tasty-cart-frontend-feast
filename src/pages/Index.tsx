import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("name");
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

const Index = () => {
  const { data: menuItems, isLoading, isError } = useQuery(
    ["menuItems"],
    fetchMenuItems
  );
  const { addToCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  return (
    <div className="bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Restaurant
          </Link>
          <Link
            to="/order"
            className="text-blue-600 hover:text-blue-800"
          >
            Order Now
          </Link>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Restaurant
          </h1>
          <p className="text-lg text-gray-600">
            Delicious food and unforgettable experiences.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1081&q=80"
              alt="Delicious Food"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Our Best Dish
              </h2>
              <p className="text-gray-600">
                Try our chef's special, a culinary masterpiece.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1563379926896-d996f59ba27f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Cozy Ambiance"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Cozy Ambiance
              </h2>
              <p className="text-gray-600">
                Enjoy a relaxed atmosphere with friends and family.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb6cca65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="Friendly Staff"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Friendly Staff
              </h2>
              <p className="text-gray-600">
                Our team is dedicated to providing excellent service.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Menu
          </h2>
          {isLoading && <p>Loading menu...</p>}
          {isError && <p>Error loading menu.</p>}
          {menuItems && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-800 font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      <Button onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Admin Login Link */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">Admin Access</p>
          <Link to="/auth" className="text-sm text-blue-600 hover:text-blue-800">
            Admin Login
          </Link>
        </div>
      </div>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-4 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Restaurant. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
