
import React, { useState } from 'react';
import { useCarContext } from '@/context/CarContext';
import CarCard from '@/components/CarCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AllCars: React.FC = () => {
  const { getFilteredCars } = useCarContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    status: 'active' | 'featured' | '';
    make: string;
    transmission: string;
    fuelType: string;
  }>({
    status: '',
    make: '',
    transmission: '',
    fuelType: '',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const makes = ['All', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Toyota', 'Honda', 'Ford', 'Chevrolet'];
  const transmissions = ['All', 'Automatic', 'Manual', 'CVT', 'DCT'];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
  
  // Get all active and featured cars
  const availableCars = getFilteredCars().filter(car => car.status !== 'sold');
  
  // Filter cars based on search term and filters
  const filteredCars = availableCars.filter(car => {
    const matchesSearch = searchTerm 
      ? `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
      
    const matchesStatus = filters.status
      ? car.status === filters.status
      : true;
      
    const matchesMake = filters.make
      ? car.make === filters.make
      : true;
      
    const matchesTransmission = filters.transmission
      ? car.transmission === filters.transmission
      : true;
      
    const matchesFuelType = filters.fuelType
      ? car.fuelType === filters.fuelType
      : true;
    
    return matchesSearch && matchesStatus && matchesMake && matchesTransmission && matchesFuelType;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      status: '',
      make: '',
      transmission: '',
      fuelType: '',
    });
    setSearchTerm('');
  };
  
  const hasActiveFilters = !!searchTerm || Object.values(filters).some(value => !!value);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Our Inventory</h1>
            <p className="text-gray-600 max-w-2xl">
              Browse our collection of premium pre-owned vehicles. Each car is meticulously inspected and maintained to ensure quality and reliability.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by make, model, or year..."
                  className="pl-10 w-full h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <Button
                variant="outline"
                className="md:w-auto w-full justify-between"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                    {Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>
            
            {showFilters && (
              <motion.div 
                className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter Options</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value as any)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All</option>
                      <option value="featured">Featured</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <select
                      value={filters.make}
                      onChange={(e) => handleFilterChange('make', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {makes.map((make) => (
                        <option key={make} value={make === 'All' ? '' : make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <select
                      value={filters.transmission}
                      onChange={(e) => handleFilterChange('transmission', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission === 'All' ? '' : transmission}>
                          {transmission}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </label>
                    <select
                      value={filters.fuelType}
                      onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {fuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType === 'All' ? '' : fuelType}>
                          {fuelType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div>
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">
                  No cars match your current filters. Try adjusting your search criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCars;
