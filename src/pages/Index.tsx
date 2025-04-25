
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Savoria</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the perfect blend of taste and tradition in every dish we serve. 
              Our chefs use only the freshest ingredients to create culinary masterpieces 
              that delight the senses and satisfy the soul.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Artisan Quality</h3>
                <p className="text-muted-foreground">
                  Crafted with care using traditional techniques and premium ingredients.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Seasonal Menu</h3>
                <p className="text-muted-foreground">
                  Our menu evolves with the seasons, featuring the freshest local produce.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Elegant Atmosphere</h3>
                <p className="text-muted-foreground">
                  Dine in a sophisticated yet comfortable setting designed for memorable experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Gallery />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enjoy our delicious cuisine from the comfort of your home.
            Place your order now for pickup or delivery.
          </p>
          <a href="/order">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
              Order Now
            </button>
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
