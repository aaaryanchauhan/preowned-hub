
import React, { useState, useEffect } from 'react';
import { Car, CarFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { useCarContext } from '@/context/CarContext';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: CarFormData) => void;
  onCancel: () => void;
}

const CarForm: React.FC<CarFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const isEditMode = !!initialData;
  
  const [formData, setFormData] = useState<CarFormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    exteriorColor: '',
    interiorColor: '',
    previousOwners: 0,
    engineSize: '',
    power: '',
    acceleration: '',
    topSpeed: '',
    warranty: '1 Year',
    description: '',
    features: [],
    images: [],
  });
  
  const [tab, setTab] = useState('basic');
  const [newFeature, setNewFeature] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  
  // Common features list
  const commonFeatures = [
    'Panoramic Sunroof',
    'Lane Departure Warning',
    'Apple CarPlay & Android Auto',
    'Leather Seats',
    'Power Windows',
    'Heated Seats',
    'Blind Spot Detection',
    'Keyless Entry',
    'Backup Camera',
    'Climate Control',
    'Navigation System',
    'Parking Sensors',
    'Power Tailgate',
    'Bluetooth',
    'Hill Assist',
    'Adaptive Cruise Control',
    'Premium Sound System',
    'Ambient Lighting',
    'Alloy Wheels',
  ];
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value ? Number(value) : 0 }));
  };
  
  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      if (prev.features.includes(feature)) {
        return { ...prev, features: prev.features.filter(f => f !== feature) };
      } else {
        return { ...prev, features: [...prev.features, feature] };
      }
    });
  };
  
  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };
  
  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl('');
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.make || !formData.model || !formData.year) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          className={cn(
            "py-4 px-6 font-medium text-sm",
            tab === 'basic' ? "border-b-2 border-primary text-primary" : "text-gray-500"
          )}
          onClick={() => setTab('basic')}
        >
          Basic Information
        </button>
        <button
          type="button"
          className={cn(
            "py-4 px-6 font-medium text-sm",
            tab === 'performance' ? "border-b-2 border-primary text-primary" : "text-gray-500"
          )}
          onClick={() => setTab('performance')}
        >
          Performance & Pricing
        </button>
        <button
          type="button"
          className={cn(
            "py-4 px-6 font-medium text-sm",
            tab === 'appearance' ? "border-b-2 border-primary text-primary" : "text-gray-500"
          )}
          onClick={() => setTab('appearance')}
        >
          Appearance & Protection
        </button>
      </div>
      
      {tab === 'basic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make <span className="text-red-500">*</span>
            </label>
            <select
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Make</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Audi">Audi</option>
              <option value="Lexus">Lexus</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="previousOwners" className="block text-sm font-medium text-gray-700 mb-1">
              Previous Owners
            </label>
            <input
              id="previousOwners"
              name="previousOwners"
              type="number"
              min="0"
              value={formData.previousOwners}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
              <option value="DCT">DCT</option>
            </select>
          </div>
        </div>
      )}
      
      {tab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleNumberChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
              Mileage (km)
            </label>
            <input
              id="mileage"
              name="mileage"
              type="number"
              min="0"
              value={formData.mileage}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 mb-1">
              Engine Size
            </label>
            <input
              id="engineSize"
              name="engineSize"
              type="text"
              placeholder="e.g. 2.0L"
              value={formData.engineSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="power" className="block text-sm font-medium text-gray-700 mb-1">
              Power
            </label>
            <input
              id="power"
              name="power"
              type="text"
              placeholder="e.g. 250 hp"
              value={formData.power}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="acceleration" className="block text-sm font-medium text-gray-700 mb-1">
              Acceleration (0-100 km/h)
            </label>
            <input
              id="acceleration"
              name="acceleration"
              type="text"
              placeholder="e.g. 6.5 seconds"
              value={formData.acceleration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="topSpeed" className="block text-sm font-medium text-gray-700 mb-1">
              Top Speed
            </label>
            <input
              id="topSpeed"
              name="topSpeed"
              type="text"
              placeholder="e.g. 250 km/h"
              value={formData.topSpeed}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      )}
      
      {tab === 'appearance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="exteriorColor" className="block text-sm font-medium text-gray-700 mb-1">
                Exterior Color
              </label>
              <input
                id="exteriorColor"
                name="exteriorColor"
                type="text"
                placeholder="e.g. Midnight Blue"
                value={formData.exteriorColor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="interiorColor" className="block text-sm font-medium text-gray-700 mb-1">
                Interior Color
              </label>
              <input
                id="interiorColor"
                name="interiorColor"
                type="text"
                placeholder="e.g. Beige Leather"
                value={formData.interiorColor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="warranty" className="block text-sm font-medium text-gray-700 mb-1">
                Warranty
              </label>
              <select
                id="warranty"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="None">None</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="Extended">Extended</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the vehicle..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Features
            </label>
            
            {formData.features.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Selected Features</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map(feature => (
                    <span 
                      key={feature} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <h4 className="text-sm font-medium text-gray-600 mb-2">Common Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {commonFeatures.map(feature => (
                <label key={feature} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-4 flex">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g. Heads-up Display"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                className="rounded-l-none"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images <span className="text-red-500">*</span>
            </label>
            
            {formData.images.length > 0 ? (
              <div className="mb-4">
                <h4 className="text-sm text-gray-600 mb-2">Current images</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden border border-gray-200 aspect-video">
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 hover:bg-white hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-4 text-amber-500 text-sm">
                No images added yet. Please add at least one image.
              </div>
            )}
            
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Add Image URL</h4>
              <div className="flex">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/car-image.jpg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="rounded-l-none"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditMode ? 'Save Vehicle' : 'Add Vehicle'}
        </Button>
      </div>
    </form>
  );
};

export default CarForm;
