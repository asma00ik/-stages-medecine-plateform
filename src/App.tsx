import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import HospitalDashboard from "./pages/dashboard/HospitalDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student Dashboard */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/*" element={<StudentDashboard />} />
          
          {/* Hospital Dashboard */}
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/dashboard/hospital/*" element={<HospitalDashboard />} />
          
          {/* Doctor Dashboard */}
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/doctor/*" element={<DoctorDashboard />} />
          
          {/* Admin Dashboard */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
