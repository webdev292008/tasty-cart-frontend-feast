
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { ShoppingCart } from "lucide-react";

const Cart: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before ordering.",
        variant: "destructive",
      });
      return;
    }
    
    if (!customerName || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this is where we would save the order to Supabase
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderData = {
        items,
        customerName,
        email,
        phone,
        total: getTotalPrice(),
        timestamp: new Date().toISOString(),
      };
      
      console.log("Order data to be sent to Supabase:", orderData);
      
      // Clear form and cart
      setCustomerName("");
      setEmail("");
      setPhone("");
      clearCart();
      setIsSubmitting(false);
      
      toast({
        title: "Order successful!",
        description: "Your order has been placed. Thank you for your business!",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Your Order
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              required
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={handleSubmitOrder}
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;
