import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import { useState } from 'react';
import PatientDetails from './Components/PatientDetails';
import RegisterationForm from './Components/RegisterationForm';
import Home from './Components/Layout/Home';
import ServiceAnalytics from './Components/Layout/Services';
import EmergencyContact from './Components/Layout/Contact';
import ProtectedRoute from './Components/ProtectedRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated")
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/home/patients" replace />
            : <LoginForm onLoginSuccess={handleLoginSuccess} />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to="/home/patients" replace />
            : <RegisterationForm />
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="patients" replace />} />
        <Route path="patients" element={<PatientDetails />} />
        <Route path="about" element={<ServiceAnalytics />} />
        <Route path="emergency" element={<EmergencyContact />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/home/patients" : "/login"} replace />}
      />
    </Routes>
  );
}
