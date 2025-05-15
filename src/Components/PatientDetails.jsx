

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
   // Simple validation: check all fields are filled
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
   <div className="p-4">
     <div className="mb-4 flex space-x-2">
       {tabTitles.map((title, idx) => (
         <button
           key={title}
           className={`px-4 py-2 rounded-t ${
             tab === idx
               ? "bg-blue-500 text-white font-bold"
               : "bg-gray-200 text-gray-700"
           }`}
           onClick={() => setTab(idx)}
           type="button"
         >
           {title}
         </button>
       ))}
     </div>
     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-3xl mb-8">
       {/* Tab 0: Patient Information */}
       {tab === 0 && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label>Name (Last, First, Middle):</label>
             <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Maiden:</label>
             <input name="maiden" value={form.maiden} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Address:</label>
             <input name="address" value={form.address} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>City:</label>
             <input name="city" value={form.city} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>State:</label>
             <input name="state" value={form.state} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Zip:</label>
             <input name="zip" value={form.zip} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>DOB:</label>
             <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>SSN:</label>
             <input name="ssn" value={form.ssn} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Phone:</label>
             <input name="phone" value={form.phone} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Email:</label>
             <input name="email" type="email" value={form.email} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Occupation:</label>
             <input name="occupation" value={form.occupation} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Employer:</label>
             <input name="employer" value={form.employer} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Marital Status:</label>
             <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="border p-2 w-full" required>
               <option value="">Select</option>
               <option>Married</option>
               <option>Single</option>
               <option>Divorced</option>
               <option>Widowed</option>
             </select>
           </div>
           <div>
             <label>Spouse (Last, First, Middle):</label>
             <input name="spouse" value={form.spouse} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Spouse Maiden:</label>
             <input name="spouseMaiden" value={form.spouseMaiden} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Emergency Contact:</label>
             <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Relationship:</label>
             <input name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Emergency Phone:</label>
             <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Parent/Legal Guardian:</label>
             <input name="parentGuardian" value={form.parentGuardian} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Parent/Guardian Phone:</label>
             <input name="parentGuardianPhone" value={form.parentGuardianPhone} onChange={handleChange} className="border p-2 w-full" />
           </div>
         </div>
       )}
       {/* Tab 1: Insurance Information */}
       {tab === 1 && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label>Insurance Company:</label>
             <input name="insuranceCompany" value={form.insuranceCompany} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>ID#:</label>
             <input name="insuranceId" value={form.insuranceId} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Plan:</label>
             <input name="plan" value={form.plan} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Group:</label>
             <input name="group" value={form.group} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Policy Holder's Name:</label>
             <input name="policyHolder" value={form.policyHolder} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Policy Holder's DOB:</label>
             <input name="policyHolderDob" type="date" value={form.policyHolderDob} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Policy Holder's Employer:</label>
             <input name="policyHolderEmployer" value={form.policyHolderEmployer} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Relationship to Patient:</label>
             <input name="policyHolderRelationship" value={form.policyHolderRelationship} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div>
             <label>Primary Care Physician:</label>
             <input name="primaryCarePhysician" value={form.primaryCarePhysician} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>PCP Phone:</label>
             <input name="pcpPhone" value={form.pcpPhone} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Preferred Pharmacy:</label>
             <input name="preferredPharmacy" value={form.preferredPharmacy} onChange={handleChange} className="border p-2 w-full" />
           </div>
           <div>
             <label>Pharmacy Phone:</label>
             <input name="pharmacyPhone" value={form.pharmacyPhone} onChange={handleChange} className="border p-2 w-full" />
           </div>
         </div>
       )}
       {/* Tab 2: Medical History */}
       {tab === 2 && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label>Reason for Visit:</label>
             <input name="reasonForVisit" value={form.reasonForVisit} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div className="md:col-span-3">
             <label>Current/Past Medical Problems and Dates:</label>
             <textarea name="medicalProblems" value={form.medicalProblems} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div className="md:col-span-3">
             <label>Current Medications, Dosage, Duration:</label>
             <textarea name="medications" value={form.medications} onChange={handleChange} className="border p-2 w-full" required />
           </div>
           <div className="md:col-span-3">
             <label>Allergies to Medications:</label>
             <textarea name="allergies" value={form.allergies} onChange={handleChange} className="border p-2 w-full" required />
           </div>
         </div>
       )}
       <div className="flex justify-between mt-4">
         {tab > 0 && (
           <button type="button" onClick={handlePrev} className="bg-gray-400 text-white px-4 py-2 rounded">
             Previous
           </button>
         )}
         {tab < 2 && (
           <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded ml-auto">
             Next
           </button>
         )}
         {tab === 2 && (
           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded ml-auto">
             Submit
           </button>
         )}
       </div>
       {message && <div className="mt-2 text-center text-red-600">{message}</div>}
     </form>
      <UserList />
    <SQLQueryPanel />
   </div>
 );
}


