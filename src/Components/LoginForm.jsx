import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PGlite } from '@electric-sql/pglite';


function LoginForm({ onLoginSuccess }) {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [db, setDb] = useState(null);
 const navigate = useNavigate();


 // Initialize PGlite and connect to users table
 useEffect(() => {
   const initDb = async () => {
     const dbInstance = new PGlite('idb://user-db', { persist: true });
     // Table should already exist from registration, but safe to ensure
     await dbInstance.query(`
       CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL
       );
     `);
     setDb(dbInstance);
   };
   initDb();
 }, []);


 const handleLogin = async (e) => {
   e.preventDefault();
   if (!db) return;


   // Query for user with matching username and password
   const { rows } = await db.query(
     'SELECT * FROM users WHERE username = $1 AND password = $2',
     [username, password]
   );


   if (rows.length > 0) {
     alert('Login successful!');
     if (onLoginSuccess) onLoginSuccess(rows[0]);
     // Redirect or set login state as needed
     // Example: navigate('/dashboard');
   } else {
     alert('Invalid username or password.');
   }
 };


 const handleRegisterRedirect = () => {
   navigate('/register');
 };


 return (
<div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-100 to-purple-200">      <form onSubmit={handleLogin} className="w-85 max-w-md bg-white rounded-3xl shadow-2xl p-8">
       <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Login</h2>
       <div className="mb-4">
         <label className="block text-gray-700 font-semibold mb-2">
           Username:
           <input
             type="text"
             value={username}
             onChange={e => setUsername(e.target.value)}
             className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
             placeholder="Enter your username"
             required
           />
         </label>
       </div>
       <div className="mb-6">
         <label className="block text-gray-700 font-semibold mb-2">
           Password:
           <input
             type="password"
             value={password}
             onChange={e => setPassword(e.target.value)}
             className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
             placeholder="Enter your password"
             required
           />
         </label>
       </div>
       <button
         type="submit"
         className="w-full bg-green-600 text-white py-2 rounded-full font-bold hover:bg-green-700 transition"
       >
         Login
       </button>
       <p className="mt-4 text-center">
         <button
           type="button"
           onClick={handleRegisterRedirect}
           className="text-green-600 hover:underline"
         >
           Back to register
         </button>
       </p>
     </form>
   </div>
 );
}


export default LoginForm;


