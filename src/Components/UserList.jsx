// import React, { useEffect, useState } from 'react';

// export default function UserList() {
//  const [Users, setUsers] = useState([]);

//  useEffect(() => {
//    const fetchUsers = async () => {
//      const db = new PGlite('idb://Users-db', { persist: true });
//      const result = await db.query('SELECT username FROM Users');
//      setUsers(result.rows);
//    };
//    fetchUsers();
//  }, []);

//  return (
//    <div>
//      <h3>Registered User</h3>
//      <ul>
//        {Users.map((user, idx) => (
//          <li key={idx}>{user.username}</li>
//        ))}
//      </ul>
//    </div>  
//  );
// }
