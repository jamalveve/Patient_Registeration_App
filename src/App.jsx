import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './Components/RegisterationForm';
export default function App() {
  return (
    <div>
     
      <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
     </Routes>
     
    </div>
  );
}
