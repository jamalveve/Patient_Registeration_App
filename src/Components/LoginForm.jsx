import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from '../assets/illustration_green.svg'
import { Eye, EyeOff } from "lucide-react";
import { getUsersDb } from "./UserDb";

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let mounted = true;
    const initDb = async () => {
      const dbInstance = await getUsersDb();
      if (mounted) setDb(dbInstance);
    };
    initDb();
    return () => { mounted = false; };
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
    if (!db) return;
    const { rows } = await db.query(
      "SELECT * FROM Users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (rows.length > 0) {
      if (onLoginSuccess) onLoginSuccess(rows[0]);
      // Pass name to the next route using state
      navigate("/home/patients", { state: { name } });
    } else {
      alert("Invalid username or password.");
    }
  };


  const handleRegisterRedirect = () => navigate("/register");


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8db89e] px-2">
      <div className="w-full max-w-5xl bg-[#f7f5f2] rounded-3xl shadow-2xl flex flex-col md:flex-row items-center overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center py-12 px-8">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center mb-2">Sign in</h2>
            <p className="text-gray-500 text-center mb-8">
              Hey, Enter your details to login to your account
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


            <div className="mb-4 flex justify-between text-xs text-gray-500">
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  className="text-green-700 font-semibold hover:underline"
                >
                  Register now!
                </button>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#8db89e] hover:bg-[#6f967b] text-white font-bold py-3 rounded-lg transition mb-4"
            >
              Sign in
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400 text-sm">Or Sign in with</span>
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
            <div className="mt-4 text-center text-xs text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleRegisterRedirect}
                className="text-green-700 font-semibold hover:underline"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#f7f5f2] py-12 px-8">
          <p className="text-2xl font-bold text-[#37875b] bg-[#e6f4ee] rounded-xl px-6 py-3 mb-8 mt-4 text-center tracking-wide shadow">
            Patient Registration App</p>
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


