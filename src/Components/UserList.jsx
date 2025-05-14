import React, { useEffect, useState } from 'react';
import { PGlite } from '@electric-sql/pglite';


export default function UserList() {
 const [users, setUsers] = useState([]);


 useEffect(() => {
   const fetchUsers = async () => {
     const db = new PGlite('idb://user-db', { persist: true });
     const result = await db.query('SELECT username FROM users');
     setUsers(result.rows);
   };
   fetchUsers();
 }, []);


 return (
   <div>
     <h3>Registered Users</h3>
     <ul>
       {users.map((user, idx) => (
         <li key={idx}>{user.username}</li>
       ))}
     </ul>
   </div>
 );
}
