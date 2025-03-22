
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  previousOwners: number;
  engineSize: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  warranty: string;
  description: string;
  features: string[];
  images: string[];
  status: 'active' | 'sold' | 'featured';
}

export interface CarFormData extends Omit<Car, 'id' | 'status'> {
  status?: 'active' | 'sold' | 'featured';
}

export interface DashboardStats {
  totalCars: number;
  activeCars: number;
  soldCars: number;
  featuredCars: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
