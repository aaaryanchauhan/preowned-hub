
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Car,
  CircleDollarSign,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Star,
  Tag,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Car, label: 'Inventory', path: '/admin/inventory' },
    { icon: Tag, label: 'Active Listings', path: '/admin/active' },
    { icon: CircleDollarSign, label: 'Sold Cars', path: '/admin/sold' },
    { icon: Star, label: 'Featured Cars', path: '/admin/featured' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];
  
  return (
    <div className="min-h-screen w-64 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <Car className="w-6 h-6 text-primary" />
        <h1 className="font-semibold text-lg">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === link.path
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 space-y-3">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Website</span>
        </Link>
        
        <Button
          variant="outline"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
