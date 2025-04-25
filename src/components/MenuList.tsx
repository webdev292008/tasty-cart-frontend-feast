
import React, { useState } from "react";
import MenuItem from "@/components/MenuItem";
import { menuItems } from "@/lib/placeholderData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MenuList: React.FC = () => {
  const categories = ["all", ...new Set(menuItems.map(item => item.category))];
  
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>
      
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="w-full flex overflow-x-auto pb-2 justify-start md:justify-center">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setActiveCategory(category)}
              className="capitalize px-4"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter(item => category === "all" || item.category === category)
                .map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuList;
