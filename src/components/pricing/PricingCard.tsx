
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isYearly: boolean;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  isYearly,
  features,
  isPopular = false,
  ctaText,
}) => {
  const price = isYearly ? yearlyPrice : monthlyPrice;
  const billingPeriod = isYearly ? '/year' : '/month';
  
  return (
    <div className={`relative rounded-2xl p-8 h-full flex flex-col justify-between
      ${isPopular 
        ? 'bg-forest text-white border-2 border-forest shadow-elevation' 
        : 'bg-white border border-border shadow-card'}`}>
      
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo px-4 py-1 rounded-full text-white text-xs font-medium">
          Most popular
        </div>
      )}

      <div>
        <h3 className={`text-xl font-semibold ${isPopular ? 'text-white' : ''}`}>{name}</h3>
        <p className={`mt-2 text-sm ${isPopular ? 'text-white/80' : 'text-muted-foreground'}`}>
          {description}
        </p>
        
        <div className="mt-5 mb-6">
          <span className={`text-4xl font-semibold ${isPopular ? 'text-white' : ''}`}>
            ${price}
          </span>
          <span className={`text-sm ${isPopular ? 'text-white/80' : 'text-muted-foreground'}`}>
            {billingPeriod}
          </span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span 
                className={`mr-2 rounded-full p-0.5 ${
                  isPopular 
                    ? feature.included ? 'bg-white/20' : 'bg-white/10' 
                    : feature.included ? 'bg-forest/10' : 'bg-neutral-bg'
                }`}
              >
                <Check className={`h-4 w-4 ${
                  isPopular 
                    ? 'text-white' 
                    : feature.included ? 'text-forest' : 'text-muted-foreground/30'
                }`} />
              </span>
              <span 
                className={`text-sm ${
                  isPopular 
                    ? feature.included ? 'text-white' : 'text-white/60' 
                    : feature.included ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={`w-full ${
          isPopular
            ? 'bg-white text-forest hover:bg-white/90' 
            : ''
        }`}
        variant={isPopular ? 'outline' : 'default'}
      >
        {ctaText}
      </Button>
    </div>
  );
};

export default PricingCard;
