
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingToggle from '@/components/pricing/PricingToggle';
import PricingCard from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isYearly, setIsYearly] = useState(false);

  const pricingOptions = [
    {
      name: 'Starter',
      description: 'Everything you need to get started with your business',
      monthlyPrice: 12,
      yearlyPrice: 120,
      features: [
        { text: 'Up to 5 users', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Task management', included: true },
        { text: 'Email support', included: true },
        { text: 'API access', included: false },
        { text: 'Custom branding', included: false },
        { text: 'Advanced security', included: false },
      ],
      ctaText: 'Get started',
      isPopular: false,
    },
    {
      name: 'Professional',
      description: 'Perfect for growing teams and businesses',
      monthlyPrice: 39,
      yearlyPrice: 390,
      features: [
        { text: 'Up to 20 users', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Task management', included: true },
        { text: 'Priority email support', included: true },
        { text: 'API access', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Advanced security', included: false },
      ],
      ctaText: 'Start free trial',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large companies with advanced needs',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { text: 'Unlimited users', included: true },
        { text: 'Custom analytics', included: true },
        { text: 'Task management', included: true },
        { text: '24/7 phone & email support', included: true },
        { text: 'API access', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Advanced security', included: true },
      ],
      ctaText: 'Contact sales',
      isPopular: false,
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-neutral-bg to-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                  Elevate Your Business with Premium Solutions
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-xl">
                  Streamline operations, enhance productivity, and drive growth with our elegant business platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="gap-2">
                    Start free trial <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View demo
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-forest/20 to-indigo/10 rounded-2xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Business platform dashboard" 
                    className="rounded-2xl shadow-elevation relative z-10 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform brings together all the tools your business needs to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Task Management',
                  description: 'Organize, prioritize, and track your team\'s tasks with intuitive drag-and-drop functionality.',
                  linkTo: '/tasks'
                },
                {
                  title: 'Business Analytics',
                  description: 'Gain insights from comprehensive analytics dashboards tailored to your business needs.',
                  linkTo: '/dashboard'
                },
                {
                  title: 'Product Catalog',
                  description: 'Manage your products efficiently with our powerful catalog management system.',
                  linkTo: '/products'
                },
                {
                  title: 'Customer Relationship',
                  description: 'Build and maintain strong customer relationships with our CRM tools.',
                  linkTo: '/'
                },
                {
                  title: 'Secure Payments',
                  description: 'Process payments securely and efficiently with multiple gateway options.',
                  linkTo: '/'
                },
                {
                  title: '24/7 Support',
                  description: 'Access our dedicated support team whenever you need assistance.',
                  linkTo: '/contact'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-card hover:shadow-elevation transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link to={feature.linkTo} className="inline-flex items-center text-forest hover:text-forest/90 font-medium">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section bg-neutral-bg" id="pricing">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your business, with no hidden fees or surprises.
              </p>
            </div>

            <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingOptions.map((option, index) => (
                <PricingCard
                  key={index}
                  name={option.name}
                  description={option.description}
                  monthlyPrice={option.monthlyPrice}
                  yearlyPrice={option.yearlyPrice}
                  isYearly={isYearly}
                  features={option.features}
                  isPopular={option.isPopular}
                  ctaText={option.ctaText}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-forest text-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="lg:w-2/3 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
                <p className="text-white/80 max-w-xl">
                  Join thousands of businesses already using our platform to improve their operations and increase productivity.
                </p>
              </div>
              <div className="lg:w-1/3 flex justify-center lg:justify-end">
                <Button size="lg" className="bg-white text-forest hover:bg-white/90">
                  Start your free trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
