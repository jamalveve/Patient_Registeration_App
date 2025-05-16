import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Home({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuLinkClick = () => setMenuOpen(false);

  const phoneNumber = "1234567890";

  return (
    <div className="min-h-screen bg-[#1a2250] flex flex-col">
      {/* Header */}
      <header className="bg-[#37875b] text-white p-4 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">Patient Register App</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <Link to="patients" className="mx-2 hover:underline">Patient Details</Link>
          <Link to="about" className="mx-2 hover:underline">Services</Link>
          <Link to="emergency" className="mx-2 hover:underline">Emergency Contact</Link>
          <a
            href={`tel:${phoneNumber}`}
            className="mx-4"
            title="Call"
            aria-label="Call"
          >
            <CallIcon style={{ fontSize: 28, color: "white" }} className="hover:text-green-200 transition" />
          </a>
          <button className="flex flex-col items-center justify-center bg-white rounded-full w-12 h-12 shadow text-red-700"
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
              <path d="M3 21V3" />
            </svg>
          </button>
        </nav>

        {/* Hamburger and Call Icon for mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Call Icon Mobile */}
          <a
            href={`tel:${phoneNumber}`}
            className="mr-2"
            title="Call"
            aria-label="Call"
          >
            <CallIcon style={{ fontSize: 28, color: "white" }} className="hover:text-green-200 transition" />
          </a>
          {/* Hamburger */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Slide Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-30"
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className="absolute top-0 left-0 h-full w-72 bg-[#37875b] text-white shadow-lg flex flex-col py-8 px-6 rounded-tr-3xl animate-slide-in">
              <div className="flex flex-col items-center mb-10">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full border-4 border-white mb-2 object-cover"
                />
                <div className="font-semibold text-lg">User</div>
              </div>
              {/* Menu Items */}
              <nav className="flex-1 flex flex-col gap-2">
                <Link to="patients" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition " onClick={handleMenuLinkClick}>
                  <HomeIcon fontSize="medium" />
                  Home
                </Link>
                <Link to="about" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition" onClick={handleMenuLinkClick}>
                  <PersonIcon fontSize="medium" />
                  Services
                </Link>
                <Link to="emergency" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition" onClick={handleMenuLinkClick}>
                  <PodcastsIcon fontSize="medium" />
                  Contact
                </Link>
                <Link to="notifications" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition" onClick={handleMenuLinkClick}>
                  <NotificationsIcon fontSize="medium" />
                  Notifications
                </Link>
                <Link to="settings" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition" onClick={handleMenuLinkClick}>
                  <SettingsIcon fontSize="medium" />
                  Settings
                </Link>
                <button
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-orange-200 hover:text-white hover:bg-white/20 transition mt-2"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                >
                  <LogoutIcon fontSize="medium" />
                  Sign out
                </button>
              </nav>
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-3xl text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
}
