import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { EHRProvider } from "./contexts/EHRContext";
import Index from "./pages/Index";
import LabsPage from "./pages/Labs";
import MotorLab from "./components/labs/MotorLab";
import { VoiceLab } from "./components/labs/VoiceLab";
import { EyeLab } from "./components/labs/EyeLab";
import CardiovascularLab from "./components/labs/CardiovascularLab";
import MentalHealthLab from "./components/labs/MentalHealthLab";
import VisionHearingLab from "./components/labs/VisionHearingLab";
import Purpose from "./pages/Purpose";
import About from "./pages/About";
import HardwareIntegration from "./pages/HardwareIntegration";
import DeviceModel from "./pages/DeviceModel";
import { EHRPage } from "./pages/EHRPage";
import Dashboard from "./pages/Dashboard";
import ReportsPage from "./pages/ReportsPage";
import BPTrackerPage from "./pages/BPTrackerPage";
import PatientProfilePage from "./pages/PatientProfilePage";
import DiabetesManagementPage from "./pages/DiabetesManagementPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/bp-tracker" element={
          <ProtectedRoute>
            <BPTrackerPage />
          </ProtectedRoute>
        } />
        <Route path="/diabetes" element={
          <ProtectedRoute>
            <DiabetesManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <PatientProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/labs" element={
          <ProtectedRoute>
            <LabsPage />
          </ProtectedRoute>
        }>
          <Route path="motor" element={<MotorLab />} />
          <Route path="voice" element={<VoiceLab />} />
          <Route path="eye" element={<EyeLab />} />
          <Route path="cardiovascular" element={<CardiovascularLab />} />
          <Route path="mental-health" element={<MentalHealthLab />} />
          <Route path="vision-hearing" element={<VisionHearingLab />} />
        </Route>
        <Route path="/ehr" element={
          <ProtectedRoute>
            <EHRPage />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/purpose" element={<Purpose />} />
        <Route path="/about" element={<About />} />
        <Route path="/hardware-integration" element={<HardwareIntegration />} />
        <Route path="/device-model" element={<DeviceModel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <EHRProvider>
          <ThemeProvider>
            <AuthProvider>
              <TooltipProvider>
                <Sonner />
                <Router>
                  <AppContent />
                </Router>
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </EHRProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default App;
