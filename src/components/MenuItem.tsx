
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/lib/placeholderData";
import { useCart } from "@/context/CartContext";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  
  if (!item.available) {
    return null;
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="font-medium text-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button 
          onClick={() => addToCart(item)}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
