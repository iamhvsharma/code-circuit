import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <motion.section 
          className="container mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-forest to-forest/80">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions about our products or services? We're here to help and answer any question you might have.
              </p>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div 
              variants={itemVariants}
              className="mb-24"
            >
              <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-forest/10">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-forest to-forest/80">
                    Send us a message
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
                <ContactForm />
              </Card>
            </motion.div>

            {/* Contact Cards Section */}
            <motion.div 
              variants={itemVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-forest to-forest/80">
                Other Ways to Reach Us
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
                Prefer to contact us directly? Here are alternative ways to get in touch with our team.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-full bg-forest/10 mb-6 group-hover:bg-forest/20 transition-colors duration-300">
                    <Mail className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                  <p className="text-muted-foreground mb-4">Our friendly team is here to help.</p>
                  <a 
                    href="mailto:hello@horizon.com" 
                    className="text-forest hover:text-forest/80 transition-colors duration-200"
                  >
                    hello@horizon.com
                  </a>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-full bg-forest/10 mb-6 group-hover:bg-forest/20 transition-colors duration-300">
                    <MapPin className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Office</h3>
                  <p className="text-muted-foreground mb-4">Come say hello at our office.</p>
                  <address className="not-italic text-forest">
                    100 Main Street<br />
                    San Francisco, CA 94103
                  </address>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-full bg-forest/10 mb-6 group-hover:bg-forest/20 transition-colors duration-300">
                    <Phone className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Phone</h3>
                  <p className="text-muted-foreground mb-4">Mon-Fri from 8am to 5pm.</p>
                  <a 
                    href="tel:+1-555-123-4567" 
                    className="text-forest hover:text-forest/80 transition-colors duration-200"
                  >
                    +1 (555) 123-4567
                  </a>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
