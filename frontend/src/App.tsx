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
import StudentProfilePage from "./pages/student/ProfilePage";
import StudentApplicationsPage from "./pages/student/ApplicationsPage";
import StudentInternshipsPage from "./pages/student/InternshipsPage";
import StudentEvaluationsPage from "./pages/student/EvaluationsPage";
import HospitalApplicationsPage from "./pages/hospital/ApplicationsPage";
import HospitalPostingsPage from "./pages/hospital/PostingsPage";
import HospitalServicesPage from "./pages/hospital/ServicesPage";
import HospitalAnnouncementsPage from "./pages/hospital/AnnouncementsPage";
import HospitalStatsPage from "./pages/hospital/StatsPage";
import DoctorApplicationsPage from "./pages/doctor/ApplicationsPage";
import DoctorEvaluationsPage from "./pages/doctor/EvaluationsPage";
import DoctorInternsPage from "./pages/doctor/InternsPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminHospitalsPage from "./pages/admin/HospitalsPage";
import AdminStatsPage from "./pages/admin/StatsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";
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
          <Route path="/dashboard/student/profile" element={<StudentProfilePage />} />
          <Route path="/dashboard/student/applications" element={<StudentApplicationsPage />} />
          <Route path="/dashboard/student/internships" element={<StudentInternshipsPage />} />
          <Route path="/dashboard/student/evaluations" element={<StudentEvaluationsPage />} />
          
          {/* Hospital Dashboard */}
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/dashboard/hospital/applications" element={<HospitalApplicationsPage />} />
          <Route path="/dashboard/hospital/postings" element={<HospitalPostingsPage />} />
          <Route path="/dashboard/hospital/services" element={<HospitalServicesPage />} />
          <Route path="/dashboard/hospital/announcements" element={<HospitalAnnouncementsPage />} />
          <Route path="/dashboard/hospital/stats" element={<HospitalStatsPage />} />
          
          {/* Doctor Dashboard */}
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/doctor/applications" element={<DoctorApplicationsPage />} />
          <Route path="/dashboard/doctor/evaluations" element={<DoctorEvaluationsPage />} />
          <Route path="/dashboard/doctor/interns" element={<DoctorInternsPage />} />
          
          {/* Admin Dashboard */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
          <Route path="/dashboard/admin/hospitals" element={<AdminHospitalsPage />} />
          <Route path="/dashboard/admin/stats" element={<AdminStatsPage />} />
          <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
