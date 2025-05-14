import React, { useState, useEffect } from 'react';
import { PGlite } from '@electric-sql/pglite';

function SQLQueryPanel() {
  const [db, setDb] = useState(null);
  const [sql, setSql] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize the database (ensure you use the same DB as your main app)
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

  const handleQuery = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!db) return;
    try {
      const res = await db.query(sql); // Executes any SQL the user enters[3].
      setResult(res.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded">
      <form onSubmit={handleQuery}>
        <textarea
          value={sql}
          onChange={e => setSql(e.target.value)}
          placeholder="Type your SQL query here"
          className="w-full border rounded p-2 mb-2"
          rows={4}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Run Query</button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <pre className="bg-white p-2 mt-2 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default SQLQueryPanel;
