
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
  registrationState: string;
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

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface CustomerCar {
  id: string;
  image: string;
  carName: string;
  customerName: string;
  created_at?: string;
}
