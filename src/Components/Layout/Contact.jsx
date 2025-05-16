import React, { useState } from "react";
// import Emergency from  '.../assets/sos_emergency_'

// Dummy data 
const patientData = [
  { id: "P001", name: "John Doe", emergencyContact: "9876543210" },
  { id: "P002", name: "Jane Smith", emergencyContact: "9123456780" },
];

const doctorAssignmentData = [
  { id: "P001", name: "John Doe", doctor: "Dr. Alice", doctorContact: "9001122233" },
  { id: "P002", name: "Jane Smith", doctor: "Dr. Bob", doctorContact: "9003344455" },
];

export default function EmergencyContactSection() {
  const [activeTab, setActiveTab] = useState("contact");

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientResult, setPatientResult] = useState(null);

  const [docPatientId, setDocPatientId] = useState("");
  const [docPatientName, setDocPatientName] = useState("");
  const [doctorResult, setDoctorResult] = useState(null);

  // Patient search
  const handlePatientSearch = (e) => {
    e.preventDefault();
    const found = patientData.find(
      (p) =>
        p.id.toLowerCase() === patientId.trim().toLowerCase() &&
        p.name.toLowerCase() === patientName.trim().toLowerCase()
    );
    setPatientResult(found || null);
  };

  // Doctor search
  const handleDoctorSearch = (e) => {
    e.preventDefault();
    const found = doctorAssignmentData.find(
      (p) =>
        p.id.toLowerCase() === docPatientId.trim().toLowerCase() &&
        p.name.toLowerCase() === docPatientName.trim().toLowerCase()
    );
    setDoctorResult(found || null);
  };

  return (
    <div className="min-h-screen bg-[#1a2250] flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#1a2250] to-[#37875b] text-white flex flex-col justify-center items-center p-10 relative">
          <div className="max-w-md w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Emergency Support</h2>
            <p className="mb-8 text-lg opacity-90">
              Need to reach a patient's emergency contact or their assigned doctor? Use the search on the right to quickly find and connect!
            </p>
            <div className="bg-white bg-opacity-10 border border-white/20 rounded-2xl px-6 py-4 mt-10 mx-auto max-w-sm shadow-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="18" fill="#E53935" stroke="#B71C1C" />
                <g>
                  <rect x="17" y="10" width="6" height="14" rx="3" fill="#fff" />
                  <rect x="17" y="26" width="6" height="4" rx="2" fill="#fff" />
                </g>
                <circle cx="20" cy="20" r="18" fill="none" stroke="#B71C1C" />
              </svg>



              <div className="italic text-sm text-black mb-1">
                “Fast, reliable, and secure emergency contact access for our staff.”
              </div>
              <div className="text-xs text-white/70">- Hospital Admin</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
          {/* Tabs */}
          <div className="flex mb-6 w-full max-w-md">
            <button
              className={`flex-1 py-2 text-lg font-semibold rounded-tl-2xl focus:outline-none
                ${activeTab === "contact" ? "bg-[#6495ED] text-white" : "bg-gray-100 text-gray-700"}
              `}
              onClick={() => setActiveTab("contact")}
            >
              Emergency Contact
            </button>
            <button
              className={`flex-1 py-2 text-lg font-semibold rounded-tr-2xl focus:outline-none
                ${activeTab === "doctor" ? "bg-[#6495ED] text-white" : "bg-gray-100 text-gray-700"}
              `}
              onClick={() => setActiveTab("doctor")}
            >
              Emergency Doctor
            </button>
          </div>

          {/* Tab Content */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
            {activeTab === "contact" && (
              <form onSubmit={handlePatientSearch} className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  required
                />
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#6495ED] hover:bg-[#417fd6] text-white font-semibold py-3 rounded-lg transition"
                >
                  Search
                </button>
                {patientResult && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4 text-center text-[#37875b]">
                    <div className="font-semibold mb-2">Emergency Contact:</div>
                    <div className="text-lg font-bold mb-3">{patientResult.emergencyContact}</div>
                    <a
                      href={`tel:${patientResult.emergencyContact}`}
                      className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
                    >
                      Call
                    </a>
                  </div>
                )}
                {patientResult === null && patientId && patientName && (
                  <div className="mt-4 text-red-500 text-center">No matching patient found.</div>
                )}
              </form>
            )}

            {activeTab === "doctor" && (
              <form onSubmit={handleDoctorSearch} className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient ID"
                  value={docPatientId}
                  onChange={(e) => setDocPatientId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  required
                />
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={docPatientName}
                  onChange={(e) => setDocPatientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#6495ED] hover:bg-[#417fd6] text-white font-semibold py-3 rounded-lg transition"
                >
                  Search
                </button>
                {doctorResult && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4 text-center text-[#37875b]">
                    <div className="font-semibold mb-2">Doctor Name:</div>
                    <div className="text-lg font-bold mb-1">{doctorResult.doctor}</div>
                    <div className="font-semibold mt-2 mb-1">Doctor Contact:</div>
                    <div className="text-lg font-bold mb-3">{doctorResult.doctorContact}</div>
                    <a
                      href={`tel:${doctorResult.doctorContact}`}
                      className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
                    >
                      Call Doctor
                    </a>
                  </div>
                )}
                {doctorResult === null && docPatientId && docPatientName && (
                  <div className="mt-4 text-red-500 text-center">No matching patient found.</div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
