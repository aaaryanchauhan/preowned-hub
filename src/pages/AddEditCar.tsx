
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCarContext } from '@/context/CarContext';
import AdminSidebar from '@/components/AdminSidebar';
import CarForm from '@/components/CarForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CarFormData } from '@/types';
import AuthRequired from '@/components/AuthRequired';

const AddEditCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar, addCar, updateCar } = useCarContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const car = id ? getCar(id) : undefined;
  const isEditMode = !!car;
  
  const handleSubmit = async (data: CarFormData) => {
    setIsLoading(true);
    
    try {
      if (isEditMode && id) {
        await updateCar(id, data);
        toast.success('Car updated successfully');
      } else {
        await addCar(data);
        toast.success('Car added successfully');
      }
      navigate('/admin/inventory');
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error('Failed to save car');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/admin/inventory');
  };
  
  useEffect(() => {
    if (id && !car) {
      toast.error('Car not found');
      navigate('/admin/inventory');
    }
  }, [id, car, navigate]);
  
  return (
    <AuthRequired>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="px-0 mb-4">
              <Link to="/admin/inventory">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Inventory
              </Link>
            </Button>
            
            <h1 className="text-2xl font-bold">
              {isEditMode ? 'Edit Car' : 'Add New Car'}
            </h1>
            <p className="text-gray-600">
              {isEditMode 
                ? 'Update the information for this vehicle' 
                : 'Enter the details for the new vehicle'}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <CarForm
              initialData={car}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </AuthRequired>
  );
};

export default AddEditCar;
