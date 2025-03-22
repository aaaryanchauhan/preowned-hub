
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Car } from '@/types';
import { useCarContext } from '@/context/CarContext';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Car as CarIcon, Check, Fuel, Gauge } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar } = useCarContext();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState<'information' | 'features' | 'financing'>('information');
  
  useEffect(() => {
    if (id) {
      const foundCar = getCar(id);
      if (foundCar) {
        setCar(foundCar);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, getCar, navigate]);
  
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }
  
  const contactMessage = `I am interested in the ${car.year} ${car.make} ${car.model}. Please contact me with more information.`;
  
  const specs = [
    { label: 'Year', value: car.year, icon: Calendar },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} km`, icon: Gauge },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Transmission', value: car.transmission, icon: CarIcon },
    { label: 'Engine', value: car.engineSize, icon: CarIcon },
    { label: 'Power', value: car.power, icon: CarIcon },
    { label: 'Exterior Color', value: car.exteriorColor, icon: CarIcon },
    { label: 'Interior Color', value: car.interiorColor, icon: CarIcon },
    { label: 'Previous Owners', value: car.previousOwners, icon: CarIcon },
    { label: 'Warranty', value: car.warranty, icon: CarIcon },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild className="px-0 text-gray-600 hover:text-primary">
              <Link to="/cars">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Cars
              </Link>
            </Button>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(car.price)}
                  </p>
                </div>
                
                <ImageGallery 
                  images={car.images} 
                  alt={`${car.year} ${car.make} ${car.model}`} 
                />
              </div>
              
              <div>
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px space-x-8">
                    <button
                      onClick={() => setActiveTab('information')}
                      className={cn("detail-tab", activeTab === 'information' && "active")}
                    >
                      Vehicle Information
                    </button>
                    <button
                      onClick={() => setActiveTab('features')}
                      className={cn("detail-tab", activeTab === 'features' && "active")}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => setActiveTab('financing')}
                      className={cn("detail-tab", activeTab === 'financing' && "active")}
                    >
                      Financing Options
                    </button>
                  </nav>
                </div>
                
                <div className="py-6">
                  {activeTab === 'information' && (
                    <div className="space-y-6">
                      <div className="prose prose-gray">
                        <h3 className="text-lg font-medium mb-3">Description</h3>
                        <p className="text-gray-700">{car.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4">
                          {specs.map((spec, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="bg-gray-100 p-2 rounded-md">
                                <spec.icon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">{spec.label}</p>
                                <p className="font-medium">{spec.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'features' && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Features & Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'financing' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-3">Financing Options</h3>
                      <p className="text-gray-700">
                        We offer flexible financing options to make your purchase easier. 
                        Contact us for personalized financing plans tailored to your needs.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium mb-2">Example Monthly Payment</h4>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(Math.round(car.price / 60))} <span className="text-sm font-normal text-gray-500">/month</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Based on 60 months with 10% down payment at 7.5% APR. Actual terms may vary.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-blue-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-medium mb-4">Interested in this car?</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll contact you shortly.
                </p>
                
                <ContactForm defaultMessage={contactMessage} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetails;
