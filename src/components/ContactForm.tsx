
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ContactFormData } from '@/types';
import { Phone, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  defaultMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ defaultMessage = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save the enquiry to Supabase
      const { error } = await supabase
        .from('enquiries')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            status: 'new'
          }
        ]);
        
      if (error) {
        throw error;
      }
      
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-1 text-sm">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-1 text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-gray-700 mb-1 text-sm">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-gray-700 mb-1 text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message..."
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>
      
      <div className="flex justify-around pt-4">
        <a href="tel:5551234567" className="flex items-center text-gray-700 hover:text-primary">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">(555) 123-4567</span>
        </a>
        <a href="https://wa.me/5551234567" className="flex items-center text-gray-700 hover:text-primary">
          <MessageSquare className="w-4 h-4 mr-2" />
          <span className="text-sm">WhatsApp</span>
        </a>
      </div>
    </form>
  );
};

export default ContactForm;
