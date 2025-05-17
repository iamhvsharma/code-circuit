import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onToggleSelect }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 hover:text-white';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 hover:text-white';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 hover:text-white';
      default:
        return 'bg-gray-100 text-gray-800 hover:text-white';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="card-hover overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <motion.div 
            className="h-48 bg-center bg-cover"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute top-3 right-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className={getAvailabilityColor(product.availability)}>
              {product.availability}
            </Badge>
          </motion.div>
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Checkbox 
              className="h-5 w-5 bg-white"
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(product.id)}
            />
          </motion.div>
        </div>
        <CardContent className="p-4">
          <motion.div 
            className="mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </motion.div>
          <motion.h3 
            className="font-medium text-lg mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {product.name}
          </motion.h3>
          <motion.p 
            className="text-sm text-muted-foreground mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {product.description}
          </motion.p>
          <motion.p 
            className="font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            ${product.price.toFixed(2)}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
