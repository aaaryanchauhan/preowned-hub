
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
import { useIsMobile } from '@/hooks/use-mobile';

const Home: React.FC = () => {
  const { getFilteredCars } = useCarContext();
  const featuredCars = getFilteredCars('featured');
  const isMobile = useIsMobile();
  
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

  const howItWorksSteps = [
    {
      image: "/lovable-uploads/804c243b-f848-4fbe-b0f9-cfbb242f076e.png",
      title: "BROWSE FROM OUR COLLECTION",
      description: "Explore our extensive inventory of premium pre-owned vehicles."
    },
    {
      image: "/lovable-uploads/804c243b-f848-4fbe-b0f9-cfbb242f076e.png",
      title: "GET TO KNOW YOUR RIDE",
      description: "Schedule a test drive or virtual tour of your selected vehicle."
    },
    {
      image: "/lovable-uploads/804c243b-f848-4fbe-b0f9-cfbb242f076e.png",
      title: "PAY & BOOK ONLINE OR VISIT SHOWROOM",
      description: "Secure your vehicle with flexible payment options."
    },
    {
      image: "/lovable-uploads/804c243b-f848-4fbe-b0f9-cfbb242f076e.png",
      title: "INSTANT PAYMENT & TRANSFER",
      description: "Complete your purchase and drive away with your dream car."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  Find Your Perfect <span className="text-primary">Pre-Owned</span> Vehicle
                </h1>
                <p className="text-base md:text-lg text-gray-600 max-w-lg">
                  Discover premium pre-owned cars, thoroughly inspected and ready for the road. Quality, transparency, and peace of mind with every purchase.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size={isMobile ? "default" : "lg"} asChild>
                    <Link to="/cars">
                      Browse Inventory
                    </Link>
                  </Button>
                  <Button size={isMobile ? "default" : "lg"} variant="outline" asChild>
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative mt-6 md:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  alt="Premium pre-owned car"
                  className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute -bottom-5 -left-5 bg-primary text-white p-4 rounded-lg shadow-md hidden md:block">
                  <p className="text-lg font-semibold">Premium Selection</p>
                  <p className="text-sm opacity-90">Handpicked by experts</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Brand Logos Section */}
        <section className="py-10 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/17e6cc6b-a8d7-4ca0-a74d-9a696848cf32.png" 
                  alt="Volvo" 
                  className="max-h-18 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/ec2cf5fb-5bc6-4bbd-bf09-722218fa0838.png" 
                  alt="Toyota" 
                  className="max-h-18 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3bd24fba-da8d-46e5-85c5-33230ecc0079.png" 
                  alt="Tata Motors" 
                  className="max-h-15 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/bbd581b6-425c-4eb1-8f5f-7df9087174a8.png" 
                  alt="BMW" 
                  className="max-h-21 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/262abbe3-d57a-4cb0-87ee-0409554ccf7d.png" 
                  alt="Mercedes-Benz" 
                  className="max-h-21 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/48f176eb-fe33-4044-8005-3c80cdc9df2d.png" 
                  alt="MG" 
                  className="max-h-15 w-auto object-contain"
                />
              </div>
              <div className="w-28 h-20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/6f63f253-300b-4f37-9000-ca3af8f7edbd.png" 
                  alt="Kia" 
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">HOW IT WORKS</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg">
                Buying used luxury cars was never this easy. You can now own your dream luxury car in just 4 simple 
                steps at PreownedHub, India's trusted used car portal.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
              {howItWorksSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="h-40 object-contain mb-6"
                  />
                  <h3 className="text-lg font-bold mb-2 underline decoration-primary decoration-2 underline-offset-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Cars Section */}
        <section className="py-12 md:py-16">
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
        <section className="py-12 md:py-16 bg-white">
          <Testimonials />
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-16 bg-gray-50">
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
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/90 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Browse our inventory of premium pre-owned vehicles and find the perfect one that matches your style and budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size={isMobile ? "default" : "lg"} variant="outline" className="bg-white text-primary border-white hover:bg-white/90" asChild>
                <Link to="/cars">View All Vehicles</Link>
              </Button>
              <Button size={isMobile ? "default" : "lg"} variant="ghost" className="text-white border-white hover:bg-white/20" asChild>
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
