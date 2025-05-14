import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './Components/RegisterationForm';
import LoginForm from './Components/LoginForm';
import UserList from './Components/UserList';
export default function App() {
  return (
    <div>
     <UserList/>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />

      <Route path="*" element={<Navigate to="/register" replace />} />
     </Routes>
     
    </div>
  );
}
