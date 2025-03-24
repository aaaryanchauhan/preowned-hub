
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Calendar, Check, Shield, Users } from 'lucide-react';

const AboutUs: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '1000+', label: 'Cars Sold' },
    { value: '500+', label: 'Happy Customers' },
    { value: '50+', label: 'Expert Staff' },
  ];

  const values = [
    { 
      icon: Shield, 
      title: 'Quality Assurance', 
      description: 'Every vehicle undergoes a comprehensive inspection process before being listed in our inventory.'
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      description: 'We prioritize building relationships with our customers based on trust, transparency, and exceptional service.'
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Our team comprises automotive experts with decades of combined experience in the industry.'
    },
    {
      icon: Calendar,
      title: 'Continuous Improvement',
      description: 'We constantly update our processes and services to offer you the best possible car buying experience.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About <span className="text-primary">PreownedHub</span>
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your trusted destination for premium pre-owned vehicles, providing quality, transparency, and peace of mind with every purchase.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2010, PreownedHub began with a simple mission: to transform how people buy pre-owned vehicles by bringing transparency, quality, and trust to the process.
                  </p>
                  <p>
                    What started as a small dealership with just 10 cars has now grown into one of the region's most trusted pre-owned vehicle retailers, serving thousands of satisfied customers.
                  </p>
                  <p>
                    Our founder, driven by his own disappointing experiences when buying used cars, set out to create a company where customers could feel confident in their purchase, knowing they were getting a quality vehicle at a fair price.
                  </p>
                  <p>
                    Today, we maintain that founding commitment to excellence, with each vehicle in our inventory undergoing a rigorous multi-point inspection before being offered for sale.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1562065642-d13de46b3f49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Car showroom" 
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute bottom-4 right-4 bg-white py-2 px-4 rounded-lg shadow text-primary font-medium">
                  Since 2010
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary/90 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm md:text-base opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Robert Smith', position: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { name: 'Sarah Johnson', position: 'COO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { name: 'David Williams', position: 'Head of Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { name: 'Jennifer Davis', position: 'Customer Experience Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              ].map((member, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
