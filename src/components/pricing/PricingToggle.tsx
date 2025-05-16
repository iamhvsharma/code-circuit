
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ isYearly, setIsYearly }) => {
  return (
    <div className="flex items-center justify-center space-x-4 my-8">
      <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      <Switch
        checked={isYearly}
        onCheckedChange={setIsYearly}
      />
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
          Yearly
        </span>
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
          Save 20%
        </span>
      </div>
    </div>
  );
};

export default PricingToggle;
