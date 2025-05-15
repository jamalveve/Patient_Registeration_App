import React, { useEffect, useState } from 'react';
import { PGlite } from '@electric-sql/pglite';

export default function UserList() {
 const [patients, setPatients] = useState([]);

 useEffect(() => {
   const fetchPatients = async () => {
     const db = new PGlite('idb://patients-db', { persist: true });
     const result = await db.query('SELECT username FROM patients');
     setPatients(result.rows);
   };
   fetchPatients();
 }, []);

 return (
   <div>
     <h3>Registered Patients</h3>
     <ul>
       {patients.map((user, idx) => (
         <li key={idx}>{user.username}</li>
       ))}
     </ul>
   </div>  
 );
}
