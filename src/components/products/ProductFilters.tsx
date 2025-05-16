
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export interface FilterState {
  categories: string[];
  availability: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  filters: FilterState;
  categories: string[];
  availabilityOptions: string[];
  priceRange: [number, number];
  maxPrice: number;
  onChange: (filters: FilterState) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  categories,
  availabilityOptions,
  priceRange,
  maxPrice,
  onChange,
}) => {
  const toggleCategory = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const toggleAvailability = (availability: string) => {
    const updatedAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    
    onChange({
      ...filters,
      availability: updatedAvailability
    });
  };

  const handlePriceChange = (value: number[]) => {
    onChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div className="flex items-center space-x-2" key={category}>
                  <Checkbox 
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {availabilityOptions.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <Checkbox 
                    id={`availability-${option}`}
                    checked={filters.availability.includes(option)}
                    onCheckedChange={() => toggleAvailability(option)}
                  />
                  <Label 
                    htmlFor={`availability-${option}`}
                    className="text-sm cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={1}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  ${filters.priceRange[0]}
                </span>
                <span className="text-sm">
                  ${filters.priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
