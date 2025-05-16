import React, { useState, useEffect } from 'react';
import { getUsersDb } from './UserDb';
import { getPatientsDb } from './PatientsDb';// singleton helper for Patients DB

function SQLQueryPanel() {
  const [usersDb, setUsersDb] = useState(null);
  const [patientsDb, setPatientsDb] = useState(null);
  const [activeDb, setActiveDb] = useState('patients');
  const [sql, setSql] = useState('SELECT * FROM patient_details ORDER BY created_at DESC');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDbs = async () => {
      try {
        const usersInstance = await getUsersDb();
        setUsersDb(usersInstance);

        const patientsInstance = await getPatientsDb();
        setPatientsDb(patientsInstance);
      } catch (err) {
        console.error("Database initialization error:", err);
        setError('Failed to initialize databases');
      }
    };
    initDbs();
  }, []);

  const handleQuery = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    const db = activeDb === 'users' ? usersDb : patientsDb;
    if (!db) {
      setError('Database not initialized yet.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await db.query(sql);
      setResult(res.rows);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 p-6">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Database:</label>
        <select
          value={activeDb}
          onChange={e => setActiveDb(e.target.value)}
          className="border rounded p-1"
        >
          <option value="users">Users DB</option>
          <option value="patients">Patients DB</option>
        </select>
      </div>

      <form onSubmit={handleQuery}>
        <textarea
          value={sql}
          onChange={e => setSql(e.target.value)}
          placeholder="Type your SQL query here"
          className="w-full border rounded p-2 mb-2 font-mono text-sm"
          rows={6}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading || (!usersDb && !patientsDb)}
        >
          {isLoading ? "Running..." : "Run Query"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            Results ({result.length} {result.length === 1 ? 'row' : 'rows'})
          </h3>
          <div className="overflow-auto max-h-96 border rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {result.length > 0 && Object.keys(result[0]).map(key => (
                    <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 text-sm text-gray-500 border">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SQLQueryPanel;

