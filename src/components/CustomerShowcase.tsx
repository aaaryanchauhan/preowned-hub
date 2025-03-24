
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { CustomerCar } from '@/types';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

export const CustomerShowcase: React.FC = () => {
  const [customerCars, setCustomerCars] = useState<CustomerCar[]>([
    // Initial placeholder data
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?q=80&w=1000',
      carName: 'Mercedes C-Class',
      customerName: 'John Smith'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1617814076668-8dfc6be2d65c?q=80&w=1000',
      carName: 'BMW 5 Series',
      customerName: 'Emma Johnson'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000',
      carName: 'Audi A4',
      customerName: 'Michael Brown'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000',
      carName: 'Toyota Camry',
      customerName: 'Sarah Wilson'
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000',
      carName: 'Honda Accord',
      customerName: 'David Miller'
    },
  ]);

  useEffect(() => {
    fetchCustomerCars();
  }, []);

  const fetchCustomerCars = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_showcases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customer cars:', error);
        return;
      }

      if (data && data.length > 0) {
        // Map database fields to our interface properties
        const mappedData = data.map(item => ({
          id: item.id,
          image: item.image,
          carName: item.carname,
          customerName: item.customername,
          created_at: item.created_at
        }));
        setCustomerCars(mappedData);
      }
    } catch (error) {
      console.error('Error fetching customer cars:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {customerCars.slice(0, 5).map((item, index) => (
          <motion.div 
            key={item.id}
            className="relative group overflow-hidden rounded-lg"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.carName} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <h3 className="font-semibold text-base mb-1">{item.carName}</h3>
              <p className="text-sm text-white/90">Owned by {item.customerName}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile carousel for smaller screens */}
      <div className="block md:hidden mt-6">
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {customerCars.map((item) => (
              <CarouselItem key={item.id} className="basis-3/4">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.carName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <h3 className="font-semibold text-base mb-1">{item.carName}</h3>
                    <p className="text-sm text-white/90">Owned by {item.customerName}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 h-8 w-8" />
            <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 h-8 w-8" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
