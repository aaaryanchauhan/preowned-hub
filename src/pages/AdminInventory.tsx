
import React, { useState } from 'react';
import { useCarContext } from '@/context/CarContext';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Edit, EyeIcon, Plus, Search, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import AuthRequired from '@/components/AuthRequired';

const AdminInventory: React.FC = () => {
  const { cars, deleteCar, updateCar } = useCarContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'sold' | 'featured'>('all');
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = searchTerm 
      ? `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
      
    const matchesFilter = activeFilter === 'all' 
      ? true 
      : car.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleDeleteConfirm = async () => {
    if (carToDelete) {
      await deleteCar(carToDelete);
      setCarToDelete(null);
    }
  };
  
  const handleStatusChange = async (carId: string, status: 'active' | 'sold' | 'featured') => {
    await updateCar(carId, { status });
    toast.success(`Car status updated to ${status}`);
  };
  
  return (
    <AuthRequired>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-gray-600">Add, edit, or remove cars from your inventory</p>
            </div>
            
            <Button asChild>
              <Link to="/admin/inventory/add">
                <Plus className="w-4 h-4 mr-2" />
                Add New Car
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div className="flex space-x-2">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'ghost'} 
                  onClick={() => setActiveFilter('all')}
                  className="tab-button"
                >
                  All Cars
                </Button>
                <Button 
                  variant={activeFilter === 'active' ? 'default' : 'ghost'} 
                  onClick={() => setActiveFilter('active')}
                  className="tab-button"
                >
                  Active
                </Button>
                <Button 
                  variant={activeFilter === 'sold' ? 'default' : 'ghost'} 
                  onClick={() => setActiveFilter('sold')}
                  className="tab-button"
                >
                  Sold
                </Button>
                <Button 
                  variant={activeFilter === 'featured' ? 'default' : 'ghost'} 
                  onClick={() => setActiveFilter('featured')}
                  className="tab-button"
                >
                  Featured
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cars..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            
            {filteredCars.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Year</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCars.map((car) => (
                      <tr key={car.id}>
                        <td className="flex items-center space-x-3">
                          <div className="w-12 h-9 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={car.images[0] || '/placeholder.svg'} 
                              alt={car.model} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">
                            {car.make} {car.model}
                          </span>
                        </td>
                        <td>{car.year}</td>
                        <td className="font-medium">₹{car.price.toLocaleString()}</td>
                        <td>
                          <select
                            value={car.status}
                            onChange={(e) => handleStatusChange(car.id, e.target.value as any)}
                            className="px-2 py-1 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="active">Active</option>
                            <option value="sold">Sold</option>
                            <option value="featured">Featured</option>
                          </select>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-800">
                              <Link to={`/admin/inventory/edit/${car.id}`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="text-green-600 hover:text-green-800">
                              <Link to={`/cars/${car.id}`} target="_blank">
                                <EyeIcon className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => setCarToDelete(car.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <Car className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">No cars found</h3>
                {activeFilter !== 'all' ? (
                  <p className="mb-4">No {activeFilter} cars found. Try a different filter.</p>
                ) : searchTerm ? (
                  <p className="mb-4">No cars match your search. Try different keywords.</p>
                ) : (
                  <p className="mb-4">Your inventory is empty. Add your first vehicle to get started.</p>
                )}
                <Button asChild>
                  <Link to="/admin/inventory/add">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Car
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <Dialog open={!!carToDelete} onOpenChange={() => setCarToDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this car? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCarToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthRequired>
  );
};

export default AdminInventory;
