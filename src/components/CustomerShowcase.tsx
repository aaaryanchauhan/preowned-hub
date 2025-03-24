
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { CustomerCar } from '@/types';

export const CustomerShowcase: React.FC = () => {
  const [customerCars, setCustomerCars] = useState<CustomerCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (customerCars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No customer showcases available yet.</p>
      </div>
    );
  }

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
    </div>
  );
};
