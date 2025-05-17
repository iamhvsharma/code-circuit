import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/products/ProductCard';
import ProductFilters, { FilterState } from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Business Analytics Suite',
    description: 'Comprehensive analytics tools for your business',
    price: 99.99,
    category: 'Software',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Premium CRM Platform',
    description: 'Manage your customer relationships effectively',
    price: 149.99,
    category: 'Software',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Task Management Pro',
    description: 'Organize and prioritize your tasks',
    price: 79.99,
    category: 'Software',
    availability: 'Low Stock',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Enterprise Security Package',
    description: 'Complete security solution for businesses',
    price: 299.99,
    category: 'Security',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Business Consulting Services',
    description: '10 hours of professional consulting',
    price: 499.99,
    category: 'Services',
    availability: 'Low Stock',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Premium Support Plan',
    description: '24/7 priority support for your business',
    price: 199.99,
    category: 'Services',
    availability: 'Out of Stock',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Products: React.FC = () => {
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
  const availabilityOptions = [...new Set(MOCK_PRODUCTS.map(p => p.availability))];
  const maxPrice = Math.max(...MOCK_PRODUCTS.map(p => p.price));
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    availability: [],
    priceRange: [0, maxPrice]
  });

  useEffect(() => {
    let result = products;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    
    // Filter by availability
    if (filters.availability.length > 0) {
      result = result.filter(p => filters.availability.includes(p.availability));
    }
    
    // Filter by price range
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [searchQuery, filters, products]);

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleAddToCart = () => {
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${selectedProducts.length} item(s) added to your cart`,
    });
    
    setSelectedProducts([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground text-sm">Browse our catalog of business solutions</p>
            </div>
            
            <div className="w-full md:w-auto flex items-center justify-between gap-4">
              <div className="relative flex-grow mr-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
                <Button 
                  disabled={selectedProducts.length === 0} 
                  variant="outline"
                  onClick={handleAddToCart}
                >
                  Add to Cart ({selectedProducts.length})
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <ProductFilters
                filters={filters}
                categories={categories}
                availabilityOptions={availabilityOptions}
                priceRange={[0, maxPrice]}
                maxPrice={maxPrice}
                onChange={handleFilterChange}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    key="no-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="products-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map(product => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        layout
                      >
                        <ProductCard
                          product={product}
                          isSelected={selectedProducts.includes(product.id)}
                          onToggleSelect={toggleProductSelection}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
