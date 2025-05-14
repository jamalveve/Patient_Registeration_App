ap.jsx
import RegistrationForm from './Components/Registeration';
import LoginForm from './Components/Login';
import { Routes, Route, Navigate } from 'react-router-dom';


export default function App() {
 return (
   <div>
     <Routes>
       <Route path="/register" element={<RegistrationForm />} />
       <Route path="/login" element={<LoginForm />} />
       <Route path="*" element={<Navigate to="/register" replace />} />
     </Routes>
   </div>
 );
}
