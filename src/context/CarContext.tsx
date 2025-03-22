
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, CarFormData, DashboardStats } from '@/types';
import { toast } from 'sonner';

// Sample car data
const sampleCars: Car[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    price: 5800000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    exteriorColor: 'Mineral White',
    interiorColor: 'Black Leather',
    previousOwners: 1,
    engineSize: '3.0L',
    power: '340 hp',
    acceleration: '5.5 seconds',
    topSpeed: '250 km/h',
    warranty: '1 Year',
    description: 'This BMW X5 is in immaculate condition and has been meticulously maintained by its previous owner. It comes with a comprehensive service history and has passed our rigorous 150-point inspection. The Mineral White exterior paired with the Black Leather interior gives this luxury SUV a timeless appeal.',
    features: ['Panoramic Sunroof', 'Lane Departure Warning', 'Apple CarPlay & Android Auto', 'Leather Seats', 'Power Windows', 'Heated Seats', 'Blind Spot Detection', 'Navigation System', 'Parking Sensors', 'Power Tailgate'],
    images: ['/lovable-uploads/b9056c67-e943-44a9-99e1-791bac357bf6.png', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    status: 'featured'
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 4800000,
    mileage: 20000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    exteriorColor: 'Selenite Grey',
    interiorColor: 'Beige Leather',
    previousOwners: 1,
    engineSize: '2.0L',
    power: '255 hp',
    acceleration: '5.7 seconds',
    topSpeed: '240 km/h',
    warranty: '1 Year',
    description: 'This Mercedes-Benz C-Class is in excellent condition with one careful previous owner. The hybrid engine provides excellent fuel economy without compromising on performance. Comes with a full service history and our comprehensive warranty package.',
    features: ['Panoramic Sunroof', 'Lane Departure Warning', 'Apple CarPlay & Android Auto', 'Leather Seats', 'Power Windows', 'Heated Seats', 'Blind Spot Detection', 'Navigation System', 'Parking Sensors', 'Ambient Lighting'],
    images: ['/lovable-uploads/b680f084-4e82-4cd7-b1b0-d442e1e1930e.png', '/placeholder.svg', '/placeholder.svg'],
    status: 'featured'
  },
  {
    id: '3',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    price: 4500000,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    exteriorColor: 'Daytona Grey',
    interiorColor: 'Black',
    previousOwners: 1,
    engineSize: '2.0L',
    power: '248 hp',
    acceleration: '5.6 seconds',
    topSpeed: '210 km/h',
    warranty: '1 Year',
    description: 'This Audi A4 is in pristine condition with low mileage. It features Audi's renowned Quattro all-wheel drive system for exceptional handling in all conditions. The vehicle has been thoroughly inspected and comes with our premium warranty package.',
    features: ['Panoramic Sunroof', 'Lane Departure Warning', 'Apple CarPlay & Android Auto', 'Leather Seats', 'Power Windows', 'Heated Seats', 'Blind Spot Detection', 'Navigation System', 'Parking Sensors', 'Premium Sound System'],
    images: ['/lovable-uploads/53c68334-47d0-4eca-8459-4b1289042e3a.png', '/placeholder.svg', '/placeholder.svg'],
    status: 'featured'
  }
];

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

  useEffect(() => {
    // Load cars from local storage or use sample data
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      setCars(sampleCars);
      localStorage.setItem('cars', JSON.stringify(sampleCars));
    }
    setIsLoading(false);
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
      // Save to local storage
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars]);

  const addCar = async (carData: CarFormData) => {
    try {
      setIsLoading(true);
      const newCar: Car = {
        ...carData,
        id: Date.now().toString(),
        status: carData.status || 'active',
      };
      
      setCars(prevCars => [...prevCars, newCar]);
      toast.success('Car added successfully');
    } catch (err) {
      setError('Failed to add car');
      toast.error('Failed to add car');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCar = async (id: string, carData: Partial<Car>) => {
    try {
      setIsLoading(true);
      setCars(prevCars => 
        prevCars.map(car => 
          car.id === id ? { ...car, ...carData } : car
        )
      );
      toast.success('Car updated successfully');
    } catch (err) {
      setError('Failed to update car');
      toast.error('Failed to update car');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      setIsLoading(true);
      setCars(prevCars => prevCars.filter(car => car.id !== id));
      toast.success('Car removed successfully');
    } catch (err) {
      setError('Failed to delete car');
      toast.error('Failed to delete car');
      console.error(err);
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
