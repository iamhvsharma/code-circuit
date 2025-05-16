
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28">
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Have questions about our products or services? We're here to help and answer any question you might have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-forest/10 mb-4">
                  <Mail className="h-6 w-6 text-forest" />
                </div>
                <h3 className="text-lg font-medium mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-3">Our friendly team is here to help.</p>
                <a href="mailto:hello@horizon.com" className="text-forest hover:underline">
                  hello@horizon.com
                </a>
              </Card>
              
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-forest/10 mb-4">
                  <MapPin className="h-6 w-6 text-forest" />
                </div>
                <h3 className="text-lg font-medium mb-2">Office</h3>
                <p className="text-muted-foreground mb-3">Come say hello at our office.</p>
                <address className="not-italic text-forest">
                  100 Main Street<br />
                  San Francisco, CA 94103
                </address>
              </Card>
              
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-forest/10 mb-4">
                  <Phone className="h-6 w-6 text-forest" />
                </div>
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <p className="text-muted-foreground mb-3">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+1-555-123-4567" className="text-forest hover:underline">
                  +1 (555) 123-4567
                </a>
              </Card>
            </div>

            <Card className="p-6 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-muted-foreground">
                  We'll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm />
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
