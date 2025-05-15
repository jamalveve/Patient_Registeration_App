import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import PGlite
import { PGlite } from '@electric-sql/pglite';


function RegisterationForm({ onSuccess }) {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [db, setDb] = useState(null);
 const navigate = useNavigate();


 // Initialize PGlite and create patients table
 useEffect(() => {
   const initDb = async () => {
     const dbInstance = new PGlite('idb://patients-db', { persist: true });
     await dbInstance.query(`
       CREATE TABLE IF NOT EXISTS patients (
         id SERIAL PRIMARY KEY,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL
       );
     `);
     setDb(dbInstance);
   };
   initDb();
 }, []);


 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!db) return;


   // Check if username exists
   const { rows } = await db.query('SELECT * FROM patients WHERE username = $1', [username]);
   if (rows.length > 0) {
     alert('Username already exists. Please choose another.');
     return;
   }


   // Insert new user
   await db.query('INSERT INTO patients (username, password) VALUES ($1, $2)', [username, password]);


   alert('Registration successful!');
   if (onSuccess) onSuccess();
   navigate('/login');
 };


 const handleLoginRedirect = () => {
   navigate('/login');
 };


 return (
<div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-100 to-purple-200">      <form onSubmit={handleSubmit} className="w-85 max-w-md bg-white rounded-3xl shadow-2xl p-8">
       <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Register</h2>
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
       <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-full font-bold hover:bg-green-600 transition">
         Register
       </button>
       <p className="mt-4 text-center">
         Already have an account?{' '}
         <button type="button" onClick={handleLoginRedirect} className="text-green-600 hover:underline">
           Login here
         </button>
       </p>
     </form>
   </div>
 );
}


export default RegisterationForm;


