
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, CarFormData, DashboardStats } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CarContextType {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  stats: DashboardStats;
  addCar: (car: CarFormData) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  getCar: (id: string) => Car | undefined;
  getFilteredCars: (status?: 'active' | 'sold' | 'featured', searchTerm?: string) => Car[];
}

const CarContext = createContext<CarContextType>({
  cars: [],
  isLoading: false,
  error: null,
  stats: { totalCars: 0, activeCars: 0, soldCars: 0, featuredCars: 0 },
  addCar: async () => {},
  updateCar: async () => {},
  deleteCar: async () => {},
  getCar: () => undefined,
  getFilteredCars: () => [],
});

export const useCarContext = () => useContext(CarContext);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    activeCars: 0,
    soldCars: 0,
    featuredCars: 0,
  });

  // Transform Supabase data to our Car type
  const transformSupabaseCars = (supabaseCars: any[]): Car[] => {
    return supabaseCars.map(car => ({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuel_type,
      transmission: car.transmission,
      exteriorColor: car.exterior_color,
      interiorColor: car.interior_color,
      previousOwners: car.previous_owners,
      engineSize: car.engine_size,
      power: car.power,
      acceleration: car.acceleration,
      topSpeed: car.top_speed,
      warranty: car.warranty,
      description: car.description,
      features: car.features || [],  // Ensure features is always an array
      images: car.images || [],      // Ensure images is always an array
      status: car.status || 'active',
    }));
  };

  // Transform our Car type to Supabase format
  const transformCarToSupabase = (car: Car | CarFormData) => {
    return {
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuel_type: car.fuelType,
      transmission: car.transmission,
      exterior_color: car.exteriorColor,
      interior_color: car.interiorColor,
      previous_owners: car.previousOwners,
      engine_size: car.engineSize,
      power: car.power,
      acceleration: car.acceleration,
      top_speed: car.topSpeed,
      warranty: car.warranty,
      description: car.description,
      features: car.features || [],
      images: car.images || [],
      status: (car as Car).status || 'active',
    };
  };

  // Fetch cars from Supabase
  const fetchCars = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching cars from Supabase');
      
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      if (data) {
        console.log('Cars fetched successfully:', data.length, 'cars');
        const transformedCars = transformSupabaseCars(data);
        setCars(transformedCars);
      } else {
        console.log('No cars data returned');
      }
    } catch (error: any) {
      console.error('Error fetching cars:', error.message);
      setError('Failed to fetch cars');
      toast.error('Failed to fetch cars');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    
    // Set up a subscription to listen for changes
    const subscription = supabase
      .channel('public:cars')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, payload => {
        console.log('Database change detected:', payload);
        fetchCars();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Update stats whenever cars change
    if (cars.length > 0) {
      setStats({
        totalCars: cars.length,
        activeCars: cars.filter(car => car.status === 'active').length,
        soldCars: cars.filter(car => car.status === 'sold').length,
        featuredCars: cars.filter(car => car.status === 'featured').length,
      });
    }
  }, [cars]);

  const addCar = async (carData: CarFormData) => {
    try {
      setIsLoading(true);
      const supabaseData = transformCarToSupabase(carData);
      
      console.log('Adding car to Supabase:', supabaseData);
      
      const { data, error } = await supabase
        .from('cars')
        .insert(supabaseData)
        .select()
        .single();

      if (error) {
        console.error('Error adding car:', error);
        throw error;
      }

      if (data) {
        console.log('Car added successfully:', data);
        const newCar = transformSupabaseCars([data])[0];
        setCars(prevCars => [newCar, ...prevCars]);
        toast.success('Car added successfully');
        
        // Refetch all cars to ensure UI is in sync with the database
        fetchCars();
      }
    } catch (error: any) {
      setError('Failed to add car');
      toast.error(`Failed to add car: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCar = async (id: string, carData: Partial<Car>) => {
    try {
      setIsLoading(true);
      
      // Convert to Supabase format (only for the updated fields)
      const updateData: any = {};
      
      if (carData.make) updateData.make = carData.make;
      if (carData.model) updateData.model = carData.model;
      if (carData.year) updateData.year = carData.year;
      if (carData.price) updateData.price = carData.price;
      if (carData.mileage) updateData.mileage = carData.mileage;
      if (carData.fuelType) updateData.fuel_type = carData.fuelType;
      if (carData.transmission) updateData.transmission = carData.transmission;
      if (carData.exteriorColor) updateData.exterior_color = carData.exteriorColor;
      if (carData.interiorColor) updateData.interior_color = carData.interiorColor;
      if (carData.previousOwners !== undefined) updateData.previous_owners = carData.previousOwners;
      if (carData.engineSize) updateData.engine_size = carData.engineSize;
      if (carData.power) updateData.power = carData.power;
      if (carData.acceleration) updateData.acceleration = carData.acceleration;
      if (carData.topSpeed) updateData.top_speed = carData.topSpeed;
      if (carData.warranty) updateData.warranty = carData.warranty;
      if (carData.description) updateData.description = carData.description;
      if (carData.features) updateData.features = carData.features;
      if (carData.images) updateData.images = carData.images;
      if (carData.status) updateData.status = carData.status;

      const { error } = await supabase
        .from('cars')
        .update(updateData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state after successful update
      setCars(prevCars => 
        prevCars.map(car => 
          car.id === id ? { ...car, ...carData } : car
        )
      );
      
      toast.success('Car updated successfully');
    } catch (error: any) {
      setError('Failed to update car');
      toast.error(`Failed to update car: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state after successful deletion
      setCars(prevCars => prevCars.filter(car => car.id !== id));
      toast.success('Car removed successfully');
    } catch (error: any) {
      setError('Failed to delete car');
      toast.error(`Failed to delete car: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCar = (id: string) => {
    return cars.find(car => car.id === id);
  };

  const getFilteredCars = (status?: 'active' | 'sold' | 'featured', searchTerm?: string) => {
    let filteredCars = cars;
    
    if (status) {
      filteredCars = filteredCars.filter(car => car.status === status);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredCars = filteredCars.filter(car => 
        car.make.toLowerCase().includes(term) || 
        car.model.toLowerCase().includes(term) ||
        car.year.toString().includes(term)
      );
    }
    
    return filteredCars;
  };

  return (
    <CarContext.Provider 
      value={{ 
        cars, 
        isLoading, 
        error, 
        stats,
        addCar, 
        updateCar, 
        deleteCar, 
        getCar,
        getFilteredCars
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
