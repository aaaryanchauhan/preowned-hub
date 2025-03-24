
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
    <Carousel 
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {customerCars.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <motion.div 
              className="h-full p-1"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden flex flex-col h-full bg-gray-800">
                <div className="aspect-[4/3] bg-gray-700 relative">
                  <img 
                    src={item.image} 
                    alt={item.carName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{item.carName}</h3>
                  <p className="text-gray-400">Owned by {item.customerName}</p>
                </div>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-8 gap-4">
        <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30" />
        <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30" />
      </div>
    </Carousel>
  );
};
