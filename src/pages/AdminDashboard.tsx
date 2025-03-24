import React from 'react';
import { useCarContext } from '@/context/CarContext';
import AdminSidebar from '@/components/AdminSidebar';
import DashboardCard from '@/components/DashboardCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Car, CircleDollarSign, LogOut, Search, Star, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthRequired from '@/components/AuthRequired';
import { motion } from 'framer-motion';
import EnquiryManager from '@/components/EnquiryManager';
import CustomerShowcaseManager from '@/components/CustomerShowcaseManager';

const AdminDashboard: React.FC = () => {
  const { stats, cars } = useCarContext();
  const { logout } = useAuth();
  
  // Count cars by make
  const carsByMake: Record<string, number> = cars.reduce((acc, car) => {
    const { make } = car;
    if (!acc[make]) {
      acc[make] = 0;
    }
    acc[make]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AuthRequired>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            
            <Button variant="ghost" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Total Cars" 
              value={stats.totalCars} 
              icon={Car} 
            />
            <DashboardCard 
              title="Active Listings" 
              value={stats.activeCars} 
              icon={Tag} 
            />
            <DashboardCard 
              title="Sold Cars" 
              value={stats.soldCars} 
              icon={CircleDollarSign} 
            />
            <DashboardCard 
              title="Featured Cars" 
              value={stats.featuredCars} 
              icon={Star} 
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Inventory by Make</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(carsByMake).map(([make, count]) => (
                <motion.div 
                  key={make}
                  className="p-4 border border-gray-100 rounded-lg"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{make}</span>
                    <span className="text-lg">{count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Customer Showcases Management Section */}
          <div className="mb-8">
            <CustomerShowcaseManager />
          </div>
          
          {/* Customer Enquiries Section */}
          <div className="mb-8">
            <EnquiryManager />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Inventory Management</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search bikes..."
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <Button asChild>
                  <Link to="/admin/inventory/add">
                    <span className="mr-1">+</span> Add New Car
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="border-b border-gray-200 mb-4">
              <div className="flex space-x-2">
                <Button variant="outline" className="tab-button active">
                  All Cars
                </Button>
                <Button variant="ghost" className="tab-button">
                  Active
                </Button>
                <Button variant="ghost" className="tab-button">
                  Sold
                </Button>
                <Button variant="ghost" className="tab-button">
                  Featured
                </Button>
              </div>
            </div>
            
            {cars.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.slice(0, 5).map((car) => (
                    <tr key={car.id}>
                      <td className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
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
                      <td>
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            car.status === 'featured' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : car.status === 'sold' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                        </span>
                      </td>
                      <td className="font-medium">₹{car.price.toLocaleString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/admin/inventory/edit/${car.id}`}>
                              Edit
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/cars/${car.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <Car className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">No cars found</h3>
                <p className="mb-4">Your inventory is empty. Add your first vehicle to get started.</p>
                <Button asChild>
                  <Link to="/admin/inventory/add">
                    <span className="mr-1">+</span> Add New Car
                  </Link>
                </Button>
              </div>
            )}
            
            {cars.length > 5 && (
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/admin/inventory">
                    View All Inventory
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthRequired>
  );
};

export default AdminDashboard;
