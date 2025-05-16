
import React from 'react';
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
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="card-hover overflow-hidden">
      <div className="relative">
        <div 
          className="h-48 bg-center bg-cover"
          style={{ backgroundImage: `url(${product.imageUrl})` }}
        />
        <div className="absolute top-3 right-3">
          <Badge className={getAvailabilityColor(product.availability)}>
            {product.availability}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Checkbox 
            className="h-5 w-5 bg-white"
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(product.id)}
          />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
