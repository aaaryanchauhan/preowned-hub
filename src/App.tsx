
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "./context/CarContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AllCars from "./pages/AllCars";
import CarDetails from "./pages/CarDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInventory from "./pages/AdminInventory";
import AddEditCar from "./pages/AddEditCar";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import CustomerShowcaseManagement from "./pages/CustomerShowcaseManagement";

// Install framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<AllCars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/inventory/add" element={<AddEditCar />} />
                <Route path="/admin/inventory/edit/:id" element={<AddEditCar />} />
                <Route path="/admin/showcase" element={<CustomerShowcaseManagement />} />
                
                {/* Status-based routes */}
                <Route path="/admin/active" element={<AdminInventory />} />
                <Route path="/admin/sold" element={<AdminInventory />} />
                <Route path="/admin/featured" element={<AdminInventory />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </CarProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
