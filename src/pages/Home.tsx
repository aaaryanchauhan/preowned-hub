
import React from 'react';
import { Link } from 'react-router-dom';
import { useCarContext } from '@/context/CarContext';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/CarCard';
import { ArrowRight, Car, Phone, ShieldCheck, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Testimonials } from '@/components/ui/testimonials';

const Home: React.FC = () => {
  const { getFilteredCars } = useCarContext();
  const featuredCars = getFilteredCars('featured');
  
  const features = [
    {
      icon: ShieldCheck,
      title: 'Certified Pre-Owned',
      description: 'Every vehicle undergoes a rigorous 150-point inspection before listing.',
    },
    {
      icon: Tag,
      title: 'Transparent Pricing',
      description: 'Fair market pricing with no hidden fees or surprise charges.',
    },
    {
      icon: Car,
      title: 'Premium Selection',
      description: 'Curated inventory of low-mileage, well-maintained luxury vehicles.',
    },
    {
      icon: Phone,
      title: 'Personalized Service',
      description: 'Dedicated consultants to assist you throughout your purchase journey.',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                  Find Your Perfect <span className="text-primary">Pre-Owned</span> Vehicle
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  Discover premium pre-owned cars, thoroughly inspected and ready for the road. Quality, transparency, and peace of mind with every purchase.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/cars">
                      Browse Inventory
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  alt="Premium pre-owned car"
                  className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute -bottom-5 -left-5 bg-primary text-white p-4 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">Premium Selection</p>
                  <p className="text-sm opacity-90">Handpicked by experts</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Cars Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Featured Cars</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our handpicked selection of premium pre-owned vehicles, each thoroughly inspected to ensure quality and reliability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild>
                <Link to="/cars" className="inline-flex items-center">
                  Explore All Cars
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <Testimonials />
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing a premium car buying experience with transparency and peace of mind.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary/90 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Browse our inventory of premium pre-owned vehicles and find the perfect one that matches your style and budget.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90" asChild>
                <Link to="/cars">View All Vehicles</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/20" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
