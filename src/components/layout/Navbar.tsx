
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full backdrop-blur-sm bg-background/90 border-b border-border z-50 py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-playfair font-semibold text-2xl text-forest">Horizon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-sm font-medium hover:text-forest transition-colors">
            Products
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-forest transition-colors">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-sm font-medium hover:text-forest transition-colors">
            Tasks
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-forest transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </div>

        {/* Mobile Navigation */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/products" className="w-full cursor-pointer">Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/tasks" className="w-full cursor-pointer">Tasks</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/contact" className="w-full cursor-pointer">Contact</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="mt-2">
              <Link to="/" className="w-full cursor-pointer">Sign in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/" className="w-full cursor-pointer">Get started</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
