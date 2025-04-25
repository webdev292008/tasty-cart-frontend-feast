
import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium">{name}</h4>
        <p className="text-primary text-sm font-medium">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => updateQuantity(id, quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-6 text-center">{quantity}</span>
        
        <Button
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="ml-4 w-20 text-right font-medium">
        ${(price * quantity).toFixed(2)}
      </div>
      
      <Button
        variant="ghost" 
        size="icon" 
        className="ml-2" 
        onClick={() => removeFromCart(id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
