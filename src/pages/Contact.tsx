
import React from 'react';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '(555) 123-4567',
      link: 'tel:5551234567',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@preownedhub.com',
      link: 'mailto:info@preownedhub.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Example Street, City, State 12345',
      link: 'https://maps.google.com',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our inventory or services? Get in touch with our team and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-start space-x-4 text-gray-700 hover:text-primary"
                      target={item.icon === MapPin ? '_blank' : undefined}
                      rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                    >
                      <div className="bg-primary/10 p-3 rounded-full">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                <h2 className="text-xl font-medium mb-6">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="font-medium">9:00 AM - 7:00 PM</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Saturday</p>
                    <p className="font-medium">10:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Sunday</p>
                    <p className="font-medium">Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
