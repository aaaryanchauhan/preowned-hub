
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Car } from '@/types';
import { useCarContext } from '@/context/CarContext';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Activity, 
  Palette, 
  User, 
  ShieldCheck, 
  Check, 
  Phone, 
  CreditCard 
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import EmiCalculator from '@/components/EmiCalculator';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar } = useCarContext();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  
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
    { label: 'KM Driven', value: `${car.mileage.toLocaleString()} km`, icon: Gauge },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Transmission', value: car.transmission, icon: Settings },
    { label: 'Engine', value: car.engineSize, icon: Activity },
    { label: 'Power', value: car.power, icon: Activity },
    { label: 'Exterior Color', value: car.exteriorColor, icon: Palette },
    { label: 'Interior Color', value: car.interiorColor, icon: Palette },
    { label: 'Previous Owners', value: car.previousOwners, icon: User },
    { label: 'Warranty', value: car.warranty, icon: ShieldCheck },
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
              
              <div className="space-y-8">
                {/* Vehicle Information Section */}
                <div className="space-y-6">
                  <div className="prose prose-gray">
                    <h3 className="text-xl font-medium mb-3">Description</h3>
                    <p className="text-gray-700">{car.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4">
                      {specs.map((spec, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md border border-gray-100">
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
                  
                  <Separator className="my-6" />
                </div>

                {/* Features Section */}
                <div>
                  <h3 className="text-xl font-medium mb-3">Features & Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EMI Calculator Section */}
                <EmiCalculator carPrice={car.price} />
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
