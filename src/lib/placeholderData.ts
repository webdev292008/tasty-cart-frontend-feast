
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'House Special Pasta',
    description: 'Fresh pasta with our signature sauce, cherry tomatoes, and basil',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format',
    category: 'mains',
    available: true
  },
  {
    id: '2',
    name: 'Mediterranean Salmon',
    description: 'Grilled salmon with lemon, herbs, and a side of seasonal vegetables',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format',
    category: 'mains',
    available: true
  },
  {
    id: '3',
    name: 'Classic Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and our house dressing',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format',
    category: 'starters',
    available: true
  },
  {
    id: '4',
    name: 'Artisanal Cheese Plate',
    description: 'Selection of premium cheeses served with crackers and seasonal fruit',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1535219597580-eba0e685697f?w=500&auto=format',
    category: 'starters',
    available: true
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format',
    category: 'desserts',
    available: true
  },
  {
    id: '6',
    name: 'Crème Brûlée',
    description: 'Classic French dessert with a caramelized sugar crust',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format',
    category: 'desserts',
    available: true
  },
  {
    id: '7',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with wild mushrooms and truffle oil',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c7?w=500&auto=format',
    category: 'mains',
    available: true
  },
  {
    id: '8',
    name: 'Signature Cocktail',
    description: 'Our special blend of premium spirits with fresh fruit and herbs',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1607446045710-d5a8b7400489?w=500&auto=format',
    category: 'drinks',
    available: true
  }
];

export const galleryImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format',
    alt: 'Elegant restaurant interior with ambient lighting'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format',
    alt: 'Chef preparing gourmet meal in kitchen'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&auto=format',
    alt: 'Beautifully plated dish with garnish'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=500&auto=format',
    alt: 'Outdoor dining area with string lights'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=500&auto=format',
    alt: 'Fresh ingredients being prepared'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=500&auto=format',
    alt: 'Dessert with artistic presentation'
  }
];
