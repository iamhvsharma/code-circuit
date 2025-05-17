import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import debounce from 'lodash/debounce';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Enhanced validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must not exceed 50 characters' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
    .refine((val) => val.trim().length > 0, {
      message: 'Name cannot be empty or just spaces'
    }),
  
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email format'
    }),
  
  inquiryType: z.string({
    required_error: 'Please select an inquiry type',
  }).refine((val) => val !== '', {
    message: 'Please select an inquiry type'
  }),
  
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1000, { message: 'Message must not exceed 1000 characters' })
    .refine((val) => val.trim().length > 0, {
      message: 'Message cannot be empty or just spaces'
    }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      inquiryType: '',
      message: '',
    },
    mode: 'onTouched', // Only validate after field is touched
    reValidateMode: 'onBlur', // Re-validate on blur
  });

  // Debounced validation function
  const debouncedValidate = useCallback(
    debounce((fieldName: keyof ContactFormValues) => {
      form.trigger(fieldName);
    }, 500),
    [form]
  );

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(values);
      toast.success('Your message has been sent!', {
        description: 'We will get back to you as soon as possible.',
      });
      form.reset();
      setCharCount(0);
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        {...field} 
                        className={`h-12 transition-all duration-200 focus:ring-2 ${
                          form.formState.errors.name && form.formState.touchedFields.name
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'focus:ring-forest/20'
                        }`}
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedValidate('name');
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('name');
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        className={`h-12 transition-all duration-200 focus:ring-2 ${
                          form.formState.errors.email && form.formState.touchedFields.email
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'focus:ring-forest/20'
                        }`}
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedValidate('email');
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('email');
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Inquiry Type</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger('inquiryType');
                    }} 
                    defaultValue={field.value}
                    onOpenChange={(open) => {
                      if (!open) {
                        form.trigger('inquiryType');
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={`h-12 transition-all duration-200 focus:ring-2 ${
                          form.formState.errors.inquiryType && form.formState.touchedFields.inquiryType
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'focus:ring-forest/20'
                        }`}
                      >
                        <SelectValue placeholder="Select an inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-sm">
                    Please select the type of inquiry you're making.
                  </FormDescription>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Message</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Please describe your inquiry or request"
                        className={`min-h-[150px] resize-none transition-all duration-200 focus:ring-2 ${
                          form.formState.errors.message && form.formState.touchedFields.message
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'focus:ring-forest/20'
                        }`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                          debouncedValidate('message');
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('message');
                        }}
                      />
                      <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                        {charCount}/1000
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-end"
          >
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto px-8 h-12 bg-forest hover:bg-forest/90 transition-all duration-200"
              disabled={isSubmitting || !form.formState.isValid}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Send Message
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;
