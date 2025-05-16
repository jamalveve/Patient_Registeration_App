import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PGlite } from "@electric-sql/pglite";
import loginIllustration from '../assets/illustration_green.svg';
import { Eye, EyeOff } from "lucide-react";

export default function RegistrationForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      const dbInstance = new PGlite("idb://patients-db", { persist: true });
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
    setError("");
    setSuccess("");

    if (!db) return;

    const { rows } = await db.query(
      "SELECT * FROM patients WHERE username = $1",
      [username]
    );
    if (rows.length > 0) {
      setError("Username already exists. Please choose another.");
      return;
    }

    await db.query(
      "INSERT INTO patients (username, password) VALUES ($1, $2)",
      [username, password]
    );

    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      if (onSuccess) onSuccess();
      navigate("/login");
    }, 1000);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8db89e] px-2">
      <div className="w-full max-w-5xl bg-[#f7f5f2] rounded-3xl shadow-2xl flex flex-col md:flex-row items-center overflow-hidden">
        {/* Left: Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center py-12 px-8">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center mb-2">Sign up</h2>
            <p className="text-gray-500 text-center mb-8">
              Nice to meet you! Enter your details to register.
            </p>
            <div className="mb-5">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8dbc8] bg-[#f9f9f9] font-medium"
                placeholder="Enter Email / Phone No"
                required
              />
            </div>
            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8dbc8] bg-[#f9f9f9] font-medium"
                placeholder="Passcode"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>



            {error && (
              <div className="mb-4 text-red-600 text-center">{error}</div>
            )}
            {success && (
              <div className="mb-4 text-green-700 text-center font-medium animate-pulse">
                {success}
              </div>
            )}

            <div className="mb-4 flex justify-between text-xs text-gray-500">
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="text-green-700 font-semibold hover:underline"
                >
                  Login here
                </button>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8db89e] hover:bg-[#6f967b] text-white font-bold py-3 rounded-lg transition mb-4"
            >
              Sign up
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400 text-sm">Or Sign up with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 mr-2" />
                Apple ID
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
              >
                <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#f7f5f2] py-12 px-8">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="max-w-xl w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
