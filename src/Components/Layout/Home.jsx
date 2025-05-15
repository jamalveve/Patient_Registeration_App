import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function Home({ onLogout }) {
 return (
   <div>
     {/* Header with navigation */}
     <header className="bg-[#37875b] text-white p-4 flex justify-between items-center">
       <h1 className="text-2xl font-bold">Patient Register App</h1>
       <nav>
         <Link to="patients" className="mx-2 hover:underline">Patient Details</Link>
         <Link to="about" className="mx-2 hover:underline">About</Link>
         <Link to="emergency" className="mx-2 hover:underline">Emergency Contact</Link>
       </nav>
       <button
         onClick={onLogout}
         className="bg-red-500 px-4 py-2 rounded text-white ml-4"
       >
         Logout
       </button>
     </header>
     {/* Section content */}
     <main className="p-4">
       <Outlet />
     </main>
    <Footer />

   </div>
 );
}
