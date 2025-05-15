import React, { useState, useEffect } from "react";
import { PGlite } from "@electric-sql/pglite";
import UserList from "./PatientList";
import SQLQueryPanel from "./SQLQueryPannel";

const initialForm = {
  // Patient Information
  name: "",
  maiden: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  dob: "",
  ssn: "",
  phone: "",
  email: "",
  occupation: "",
  employer: "",
  maritalStatus: "",
  spouse: "",
  spouseMaiden: "",
  emergencyContact: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  parentGuardian: "",
  parentGuardianPhone: "",
  // Insurance Information
  insuranceCompany: "",
  insuranceId: "",
  plan: "",
  group: "",
  policyHolder: "",
  policyHolderDob: "",
  policyHolderEmployer: "",
  policyHolderRelationship: "",
  primaryCarePhysician: "",
  pcpPhone: "",
  preferredPharmacy: "",
  pharmacyPhone: "",
  // Medical History
  reasonForVisit: "",
  medicalProblems: "",
  medications: "",
  allergies: "",
};

const tabTitles = [
  "Patient Information",
  "Insurance Information",
  "Medical History",
];

const LOCAL_STORAGE_KEY = "patientDetailsForm";

export default function PatientDetails() {
  // Restore form from localStorage if present
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialForm;
  });
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState("");

  // Save form to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setTab(tab + 1);
  const handlePrev = () => setTab(tab - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    //  check all fields are filled
    for (let key in form) {
      if (!form[key]) {
        setMessage("Please fill all fields before submitting.");
        return;
      }
    }
    try {
      const db = new PGlite("idb://patients-db", { persist: true });
      await db.query(`
        CREATE TABLE IF NOT EXISTS patient_full_details (
          id SERIAL PRIMARY KEY ,
          name TEXT, maiden TEXT, address TEXT, city TEXT, state TEXT, zip TEXT,
          dob TEXT, ssn TEXT, phone TEXT, email TEXT, occupation TEXT, employer TEXT,
          maritalStatus TEXT, spouse TEXT, spouseMaiden TEXT, emergencyContact TEXT,
          emergencyRelationship TEXT, emergencyPhone TEXT, parentGuardian TEXT, parentGuardianPhone TEXT,
          insuranceCompany TEXT, insuranceId TEXT, plan TEXT, "group" TEXT, policyHolder TEXT,
          policyHolderDob TEXT, policyHolderEmployer TEXT, policyHolderRelationship TEXT,
          primaryCarePhysician TEXT, pcpPhone TEXT, preferredPharmacy TEXT, pharmacyPhone TEXT,
          reasonForVisit TEXT, medicalProblems TEXT, medications TEXT, allergies TEXT
        );
      `);
      await db.query(
        `INSERT INTO patient_full_details (
          name, maiden, address, city, state, zip, dob, ssn, phone, email, occupation, employer,
          maritalStatus, spouse, spouseMaiden, emergencyContact, emergencyRelationship, emergencyPhone,
          parentGuardian, parentGuardianPhone, insuranceCompany, insuranceId, plan, "group", policyHolder,
          policyHolderDob, policyHolderEmployer, policyHolderRelationship, primaryCarePhysician, pcpPhone,
          preferredPharmacy, pharmacyPhone, reasonForVisit, medicalProblems, medications, allergies
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36
        )`,
        Object.values(form)
      );
      setMessage("Patient details saved successfully!");
      setForm(initialForm);
      setTab(0);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear persisted form after submit
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (

    
    <div className="min-h-screen bg-[#1a2250] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl mb-8 text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Patient Registration</h1>
  <p className="text-blue-100 text-lg">
    Please fill out the following form to register a new patient. All information is kept confidential and secure.
  </p>
</div>
      {/* Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
        {/* Colored Top Bar */}
        <div className="bg-[#6495ED] h-12 w-full"></div>
        <div className="px-6 md:px-10 pt-0 pb-8 bg-white rounded-b-3xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mt-[-28px] mb-8">
            {[1, 2, 3].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 shadow ${
                      tab === idx
                        ? "bg-[#37875b] border-[#37875b] text-white"
                        : tab > idx
                        ? "bg-[#6495ED] border-[#6495ED] text-white"
                        : "bg-white border-gray-400 text-gray-500"
                    } font-bold text-lg transition`}
                  >
                    {step}
                  </div>
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      tab >= idx + 1 ? "bg-[#6495ED]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Tab Title */}
          <div className="text-center text-2xl font-semibold mb-8 text-[#37875b]">
            {tabTitles[tab]}
          </div>

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tab 0: Patient Information */}
            {tab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name (Last, First, Middle):</label>
                  <input name="name" value={form.name} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Maiden:</label>
                  <input name="maiden" value={form.maiden} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address:</label>
                  <input name="address" value={form.address} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City:</label>
                  <input name="city" value={form.city} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State:</label>
                  <input name="state" value={form.state} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Zip:</label>
                  <input name="zip" value={form.zip} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">DOB:</label>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SSN:</label>
                  <input name="ssn" value={form.ssn} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone:</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email:</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Occupation:</label>
                  <input name="occupation" value={form.occupation} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Employer:</label>
                  <input name="employer" value={form.employer} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Marital Status:</label>
                  <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="inputStyle" required>
                    <option value="">Select</option>
                    <option>Married</option>
                    <option>Single</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Spouse (Last, First, Middle):</label>
                  <input name="spouse" value={form.spouse} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Spouse Maiden:</label>
                  <input name="spouseMaiden" value={form.spouseMaiden} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Contact:</label>
                  <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship:</label>
                  <input name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Phone:</label>
                  <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Parent/Legal Guardian:</label>
                  <input name="parentGuardian" value={form.parentGuardian} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Parent/Guardian Phone:</label>
                  <input name="parentGuardianPhone" value={form.parentGuardianPhone} onChange={handleChange} className="inputStyle" />
                </div>
              </div>
            )}
            {/* Tab 1: Insurance Information */}
            {tab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Insurance Company:</label>
                  <input name="insuranceCompany" value={form.insuranceCompany} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ID#:</label>
                  <input name="insuranceId" value={form.insuranceId} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Plan:</label>
                  <input name="plan" value={form.plan} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Group:</label>
                  <input name="group" value={form.group} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Policy Holder's Name:</label>
                  <input name="policyHolder" value={form.policyHolder} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Policy Holder's DOB:</label>
                  <input name="policyHolderDob" type="date" value={form.policyHolderDob} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Policy Holder's Employer:</label>
                  <input name="policyHolderEmployer" value={form.policyHolderEmployer} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship to Patient:</label>
                  <input name="policyHolderRelationship" value={form.policyHolderRelationship} onChange={handleChange} className="inputStyle" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Care Physician:</label>
                  <input name="primaryCarePhysician" value={form.primaryCarePhysician} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PCP Phone:</label>
                  <input name="pcpPhone" value={form.pcpPhone} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Pharmacy:</label>
                  <input name="preferredPharmacy" value={form.preferredPharmacy} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pharmacy Phone:</label>
                  <input name="pharmacyPhone" value={form.pharmacyPhone} onChange={handleChange} className="inputStyle" />
                </div>
              </div>
            )}
            {/* Tab 2: Medical History */}
            {tab === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Visit:</label>
                  <input name="reasonForVisit" value={form.reasonForVisit} onChange={handleChange} className="inputStyle" required />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium mb-1">Current/Past Medical Problems and Dates:</label>
                  <textarea name="medicalProblems" value={form.medicalProblems} onChange={handleChange} className="inputStyle" required />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium mb-1">Current Medications, Dosage, Duration:</label>
                  <textarea name="medications" value={form.medications} onChange={handleChange} className="inputStyle" required />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium mb-1">Allergies to Medications:</label>
                  <textarea name="allergies" value={form.allergies} onChange={handleChange} className="inputStyle" required />
                </div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              {tab > 0 && (
                <button type="button" onClick={handlePrev} className="bg-gray-400 text-white px-4 py-2 rounded shadow">
                  Previous
                </button>
              )}
              {tab < 2 && (
                <button type="button" onClick={handleNext} className="bg-[#6495ED] hover:bg-[#417fd6] text-white px-4 py-2 rounded shadow ml-auto font-semibold">
                  Next
                </button>
              )}
              {tab === 2 && (
                <button type="submit" className="bg-[#37875b] hover:bg-[#276245] text-white px-4 py-2 rounded shadow ml-auto font-semibold">
                  Submit
                </button>
              )}
            </div>
            {message && <div className="mt-2 text-center text-red-600">{message}</div>}
          </form>
        </div>
      </div>
      {/* SQL Query Panel */}
      {/* <UserList /> */}
      <SQLQueryPanel />
      {/* Tailwind extra style for input */}
      <style>
        {`
          .inputStyle {
            @apply w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6495ED] transition"
          }
        `}
      </style>
    </div>
  );
}
