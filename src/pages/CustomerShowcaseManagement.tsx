
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import AuthRequired from '@/components/AuthRequired';
import CustomerShowcaseManager from '@/components/CustomerShowcaseManager';

const CustomerShowcaseManagement: React.FC = () => {
  const { logout } = useAuth();

  return (
    <AuthRequired>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Customer Showcase Management</h1>
            
            <Button variant="ghost" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="mb-8">
            <CustomerShowcaseManager />
          </div>
        </div>
      </div>
    </AuthRequired>
  );
};

export default CustomerShowcaseManagement;
