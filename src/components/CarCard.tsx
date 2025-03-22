
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '@/types';
import { Calendar, Fuel, Gauge } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <motion.div 
      className="car-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="car-image-container">
        <img 
          src={car.images[0] || "/placeholder.svg"} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          className="car-image"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-sm">
          {formatCurrency(car.price)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium">
          {car.make} {car.model}
        </h3>
        
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="spec-item">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{car.year}</span>
          </div>
          <div className="spec-item">
            <Fuel className="w-4 h-4 text-primary" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-sm">{car.transmission}</span>
          </div>
        </div>
        
        <Link 
          to={`/cars/${car.id}`}
          className="mt-4 block text-center w-full py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-md text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CarCard;
