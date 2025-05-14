import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegistrationForm from './Components/RegisterationForm';
import LoginForm from './Components/LoginForm';
import UserList from './Components/PatientList';
import SQLQueryPanel from './Components/SQLQueryPannel';
import ProtectedRoute from './Components/protectedRoute';
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated")
  );

  // When login is successful, set auth state and persist it
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // When logging out, clear auth state
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/home" replace />
              : <LoginForm onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated
              ? <Navigate to="/home" replace />
              : <RegistrationForm />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserList />
              <SQLQueryPanel />
              <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}
