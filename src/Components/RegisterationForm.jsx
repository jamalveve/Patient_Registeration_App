import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from '../assets/illustration_green.svg';
import { Eye, EyeOff } from "lucide-react";
import { getUsersDb } from "./UserDb";
import Logo from '../assets/patient.png';


// Gmail validator, no numbers before @
function isValidGmail(username) {
 return /^[a-zA-Z._%+-]+@gmail\.com$/.test(username);
}


// Password: min 8 chars, at least 1 letter and 1 number
function isStrongPassword(password) {
 // At least 8 characters, one letter, one number, one special character
 return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}
// Check if string contains any digit
function containsNumber(str) {
 return /\d/.test(str);
}


export default function RegistrationForm({ onSuccess }) {
 const [username, setUsername] = useState("");
 const [usernameError, setUsernameError] = useState("");
 const [password, setPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [confirmPasswordError, setConfirmPasswordError] = useState("");
 const [db, setDb] = useState(null);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);


 useEffect(() => {
   let mounted = true;
   const initDb = async () => {
     const dbInstance = await getUsersDb();
     if (mounted) setDb(dbInstance);
   };
   initDb();
   return () => { mounted = false; };
 }, []);


 // Username validation
 const handleUsernameChange = (e) => {
   const value = e.target.value;
   setUsername(value);


   if (containsNumber(value)) {
     setUsernameError("Username should not contain numbers.");
   } else if (value && !isValidGmail(value)) {
     setUsernameError("Username must be a valid Gmail address (e.g., user@gmail.com) and not contain numbers.");
   } else {
     setUsernameError("");
   }
 };


 // Password validation
 const handlePasswordChange = (e) => {
   const value = e.target.value;
   setPassword(value);


   if (!isStrongPassword(value)) {
     setPasswordError("Password must be at least 8 characters and include both letters and numbers.");
   } else {
     setPasswordError("");
   }


   // Also check confirm password if already entered
   if (confirmPassword && value !== confirmPassword) {
     setConfirmPasswordError("Passwords do not match.");
   } else {
     setConfirmPasswordError("");
   }
 };


 // Confirm password validation
 const handleConfirmPasswordChange = (e) => {
   const value = e.target.value;
   setConfirmPassword(value);


   if (password !== value) {
     setConfirmPasswordError("Passwords do not match.");
   } else {
     setConfirmPasswordError("");
   }
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setSuccess("");


   // Validate all fields before DB
   if (usernameError || passwordError || confirmPasswordError) {
     setError("Please fix the errors above before submitting.");
     return;
   }
   if (!username) {
     setUsernameError("Username is required.");
     return;
   }
   if (!isValidGmail(username)) {
     setUsernameError("Username must be a valid Gmail address (e.g., user@gmail.com) and not contain numbers.");
     return;
   }
   if (!password) {
     setPasswordError("Password is required.");
     return;
   }
   if (!isStrongPassword(password)) {
     setPasswordError("Password must be at least 8 characters and include both letters and numbers.");
     return;
   }
   if (password !== confirmPassword) {
     setConfirmPasswordError("Passwords do not match.");
     return;
   }
   if (!db) return;


   // Check for existing user
   const { rows } = await db.query(
     "SELECT * FROM Users WHERE username = $1",
     [username]
   );
   if (rows.length > 0) {
     setError("Username already exists. Please choose another.");
     return;
   }


   // Insert new user
   await db.query(
     "INSERT INTO Users (username, password) VALUES ($1, $2)",
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
               onChange={handleUsernameChange}
               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 font-medium
                 ${usernameError ? "border-red-500 focus:ring-red-400 bg-red-50" : "border-gray-300 focus:ring-[#b8dbc8] bg-[#f9f9f9]"}`}
               placeholder="Enter Gmail address"
               required
             />
             {usernameError && (
               <div className="text-red-600 text-xs mt-1">{usernameError}</div>
             )}
           </div>
           <div className="mb-5 relative">
             <input
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={handlePasswordChange}
               className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-medium
                 ${passwordError ? "border-red-500 focus:ring-red-400 bg-red-50" : "border-gray-300 focus:ring-[#b8dbc8] bg-[#f9f9f9]"}`}
               placeholder="Password"
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
             {passwordError && (
               <div className="text-red-600 text-xs mt-1">{passwordError}</div>
             )}
           </div>
           <div className="mb-5 relative">
             <input
               type={showConfirmPassword ? "text" : "password"}
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-medium
                 ${confirmPasswordError ? "border-red-500 focus:ring-red-400 bg-red-50" : "border-gray-300 focus:ring-[#b8dbc8] bg-[#f9f9f9]"}`}
               placeholder="Confirm Password"
               required
             />
             <button
               type="button"
               onClick={() => setShowConfirmPassword(prev => !prev)}
               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
               tabIndex={-1}
             >
               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
             </button>
             {confirmPasswordError && (
               <div className="text-red-600 text-xs mt-1">{confirmPasswordError}</div>
             )}
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
           src={Logo}
           alt="App Logo"
           className="h-12 w-12 mr-3 rounded-full object-cover bg-white"
           style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
         />
         <p className="text-2xl font-bold text-[#37875b] bg-[#e6f4ee] rounded-xl px-6 py-3 mb-8 mt-4 text-center tracking-wide shadow">
           Patient Registration App
         </p>
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



