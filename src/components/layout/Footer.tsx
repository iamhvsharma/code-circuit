
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-bg border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="font-playfair font-semibold text-xl text-forest">Horizon</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Elevate your business with our premium solutions designed for modern enterprises.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Analytics</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Task Management</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">CRM Solutions</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Documentation</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Guides</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-forest transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-forest transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© 2025 Horizon. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/" className="text-xs text-muted-foreground hover:text-forest transition-colors">Privacy</Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-forest transition-colors">Terms</Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-forest transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
