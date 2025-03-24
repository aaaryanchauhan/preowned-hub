
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { PlusCircle, Trash2, ImageIcon } from 'lucide-react';
import { CustomerCar } from '@/types';

const CustomerShowcaseManager: React.FC = () => {
  const [customerCars, setCustomerCars] = useState<CustomerCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCar, setNewCar] = useState<Partial<CustomerCar>>({
    image: '',
    carName: '',
    customerName: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCustomerCars();
  }, []);

  const fetchCustomerCars = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_showcases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCustomerCars(data as CustomerCar[] || []);
    } catch (error) {
      console.error('Error fetching customer cars:', error);
      toast.error('Failed to load customer showcase data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCar.carName || !newCar.customerName || (!newCar.image && !selectedFile)) {
      toast.error('Please fill in all fields and select an image');
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = newCar.image;

      // Upload image if file is selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `customer_showcases/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('car_images')
          .upload(filePath, selectedFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('car_images')
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // Add to database
      const { error: insertError } = await supabase
        .from('customer_showcases')
        .insert([{
          carName: newCar.carName,
          customerName: newCar.customerName,
          image: imageUrl,
        }]);

      if (insertError) {
        throw insertError;
      }

      // Reset form
      setNewCar({ image: '', carName: '', customerName: '' });
      setSelectedFile(null);
      toast.success('Customer car added successfully');
      fetchCustomerCars();
    } catch (error) {
      console.error('Error adding customer car:', error);
      toast.error('Failed to add customer car');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer car?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('customer_showcases')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setCustomerCars(prev => prev.filter(car => car.id !== id));
      toast.success('Customer car removed successfully');
    } catch (error) {
      console.error('Error removing customer car:', error);
      toast.error('Failed to remove customer car');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Customer Showcase Management</h2>
      </div>

      <form onSubmit={handleAddCar} className="mb-8 p-4 border border-gray-100 rounded-lg">
        <h3 className="text-md font-medium mb-4">Add New Customer Car</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Car Name</label>
            <Input
              type="text"
              name="carName"
              value={newCar.carName}
              onChange={handleInputChange}
              placeholder="e.g. BMW 5 Series"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Customer Name</label>
            <Input
              type="text"
              name="customerName"
              value={newCar.customerName}
              onChange={handleInputChange}
              placeholder="e.g. John Smith"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm mb-1">Image URL</label>
          <Input
            type="text"
            name="image"
            value={newCar.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            disabled={!!selectedFile}
          />
          <p className="text-xs text-gray-500 mt-1">Or upload an image file:</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Upload Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2"
            disabled={!!newCar.image}
          />
        </div>

        {selectedFile && (
          <div className="mb-4 p-2 border rounded flex items-center gap-2">
            <ImageIcon size={18} />
            <span className="text-sm">{selectedFile.name}</span>
          </div>
        )}

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            <span className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Customer Car
            </span>
          )}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerCars.length === 0 ? (
          <p className="col-span-full text-center py-8 text-gray-500">No customer cars added yet</p>
        ) : (
          customerCars.map((car) => (
            <div key={car.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100">
                <img 
                  src={car.image} 
                  alt={car.carName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium">{car.carName}</h3>
                <p className="text-sm text-gray-600">{car.customerName}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(car.id)}
                  className="mt-2 w-full"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerShowcaseManager;
