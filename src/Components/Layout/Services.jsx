import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Dummy analytics data
const analyticsData = [
  {
    label: "Appointments",
    count: 113,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="8" width="18" height="13" rx="2" fill="none" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "New Patient",
    count: 102,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11v6M14 14h6" />
        <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    label: "Existing Patients",
    count: 59,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" />
        <circle cx="17" cy="7" r="4" />
        <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    label: "Ready to Discharge",
    count: 10,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="9" y="2" width="6" height="4" rx="2" />
        <rect x="4" y="6" width="16" height="16" rx="2" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Recently Discharged",
    count: 24,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
        <path d="M3 21V3" />
      </svg>
    ),
  },
  {
    label: "Total Admission",
    count: 8,
    icon: (
      <svg className="w-7 h-7 mb-2" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 9.75L12 4l9 5.75M4.5 10.5V20a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V10.5" />
      </svg>
    ),
  },
];

export default function ServiceAnalytics() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Explore");
  const [userName, setUserName] = useState(location.state?.name || "User");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#1a2250] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-4 bg-[#6495ED] rounded-b-3xl shadow">
        <div>
          <div className="text-lg font-semibold text-white">Hi User</div>
          <div className="text-sm text-blue-100">Welcome</div>
          <div className="text-xs text-blue-100 mt-1">{today}</div>
        </div>
        <div>
          <div className="w-12 h-12 rounded-full bg-[#37875b] flex items-center justify-center text-2xl font-bold text-white shadow-lg border-4 border-white">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mx-4 mt-6">
        {["Explore", "Pharmacy"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium transition-all duration-200 ${activeTab === tab
                ? "text-[#6495ED] border-b-2 border-[#6495ED] bg-white rounded-t-lg shadow"
                : "text-gray-500 hover:text-[#37875b]"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Analytics */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-semibold text-[#37875b]">Analytics</div>
          <select className="bg-gray-100 rounded px-2 py-1 text-sm text-[#37875b] border border-[#6495ED]">
            <option>Last Month</option>
            <option>This Month</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {analyticsData.map((item) => (
            <div
              key={item.label}
              className="bg-[#6495ED] rounded-2xl p-6 flex flex-col items-center shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="mb-2">{item.icon}</div>
              <div className="text-3xl font-bold text-white">{item.count}</div>
              <div className="text-xs text-white mt-2 text-center uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
