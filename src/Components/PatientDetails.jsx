import React, { useState, useEffect } from "react";
import SQLQueryPanel from "./SQLQueryPannel";
import '../index.css'
import { getPatientsDb } from "./PatientsDb";

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

// Define the mandatory fields:
const mandatoryFields = [
  "name",
  "address",
  "city",
  "state",
  "zip",
  "dob",
  "phone",
  "email",
  "maritalStatus",
  "emergencyContact",
  "emergencyRelationship",
  "emergencyPhone",
  "insuranceCompany",
  "insuranceId",
  "plan",
  "group",
  "policyHolder",
  "policyHolderDob",
  "policyHolderRelationship",
  "reasonForVisit",
  "medicalProblems",
  "medications",
  "allergies",
];



function Label({ htmlFor, children, isMandatory }) {
  return (
    <label className="block text-sm font-medium mb-1" htmlFor={htmlFor}>
      {children} {isMandatory && <span className="text-red-600">*</span>}
    </label>
  );
}

export default function PatientDetails() {
  // Restore form from localStorage if present
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialForm;
  });

  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    let mounted = true;
    const initializeDb = async () => {
      try {
        const dbInstance = await getPatientsDb();
        if (mounted) setDb(dbInstance);
      } catch (err) {
        console.error("Failed to initialize DB:", err);
      }
    };
    initializeDb();
    return () => { mounted = false; };
  }, []);

  // Save form to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
  }, [form]);


  // Sync form state across tabs using storage event
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        if (event.newValue) {
          const updatedForm = JSON.parse(event.newValue);
          setForm((currentForm) => {
            //update if data is different
            if (JSON.stringify(currentForm) !== JSON.stringify(updatedForm)) {
              return updatedForm;
            }
            return currentForm;
          });
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setTab(tab + 1);
  const handlePrev = () => setTab(tab - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!db) {
      setMessage("Database is still loading. Please wait.");
      return;
    }
    for (let key of mandatoryFields) {
      if (!form[key]) {
        setMessage("Please fill all mandatory fields before submitting.");
        return;
      }
    }
    try {
      await db.query(
        `INSERT INTO patient_details (
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
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };


  const isMandatory = (fieldName) => mandatoryFields.includes(fieldName);

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
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 shadow ${tab === idx
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
                    className={`w-16 h-1 ${tab >= idx + 1 ? "bg-[#6495ED]" : "bg-gray-300"
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
                  <Label htmlFor="name" isMandatory={isMandatory("name")}>Name (Last, First, Middle):</Label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("name")}
                  />
                </div>
                <div>
                  <Label htmlFor="maiden" isMandatory={isMandatory("maiden")}>Maiden:</Label>
                  <input name="maiden" value={form.maiden} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="address" isMandatory={isMandatory("address")}>Address:</Label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("address")}
                  />
                </div>
                <div>
                  <Label htmlFor="city" isMandatory={isMandatory("city")}>City:</Label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("city")}
                  />
                </div>
                <div>
                  <Label htmlFor="state" isMandatory={isMandatory("state")}>State:</Label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("state")}
                  />
                </div>
                <div>
                  <Label htmlFor="zip" isMandatory={isMandatory("zip")}>Zip:</Label>
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("zip")}
                  />
                </div>
                <div>
                  <Label htmlFor="dob" isMandatory={isMandatory("dob")}>Date of Birth:</Label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("dob")}
                  />
                </div>
                <div>
                  <Label htmlFor="ssn" isMandatory={isMandatory("ssn")}>SSN:</Label>
                  <input name="ssn" value={form.ssn} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="phone" isMandatory={isMandatory("phone")}>Phone Number:</Label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("phone")}
                  />
                </div>
                <div>
                  <Label htmlFor="email" isMandatory={isMandatory("email")}>Email:</Label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("email")}
                  />
                </div>
                <div>
                  <Label htmlFor="occupation" isMandatory={isMandatory("occupation")}>Occupation:</Label>
                  <input name="occupation" value={form.occupation} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="employer" isMandatory={isMandatory("employer")}>Employer:</Label>
                  <input name="employer" value={form.employer} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="maritalStatus" isMandatory={isMandatory("maritalStatus")}>Marital Status:</Label>
                  <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="border p-2 w-full" required>
                    <option value="">Select</option>
                    <option>Married</option>
                    <option>Single</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="spouse" isMandatory={isMandatory("spouse")}>Spouse:</Label>
                  <input name="spouse" value={form.spouse} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="spouseMaiden" isMandatory={isMandatory("spouseMaiden")}>Spouse Maiden:</Label>
                  <input name="spouseMaiden" value={form.spouseMaiden} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="emergencyContact" isMandatory={isMandatory("emergencyContact")}>Emergency Contact:</Label>
                  <input
                    name="emergencyContact"
                    value={form.emergencyContact}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("emergencyContact")}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyRelationship" isMandatory={isMandatory("emergencyRelationship")}>Emergency Relationship:</Label>
                  <input
                    name="emergencyRelationship"
                    value={form.emergencyRelationship}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("emergencyRelationship")}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" isMandatory={isMandatory("emergencyPhone")}>Emergency Phone:</Label>
                  <input
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("emergencyPhone")}
                  />
                </div>
                <div>
                  <Label htmlFor="parentGuardian" isMandatory={isMandatory("parentGuardian")}>Parent/Guardian:</Label>
                  <input name="parentGuardian" value={form.parentGuardian} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="parentGuardianPhone" isMandatory={isMandatory("parentGuardianPhone")}>Parent/Guardian Phone:</Label>
                  <input name="parentGuardianPhone" value={form.parentGuardianPhone} onChange={handleChange} className="inputStyle" />
                </div>
              </div>
            )}

            {/* Tab 1: Insurance Information */}
            {tab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="insuranceCompany" isMandatory={isMandatory("insuranceCompany")}>Insurance Company:</Label>
                  <input
                    name="insuranceCompany"
                    value={form.insuranceCompany}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("insuranceCompany")}
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceId" isMandatory={isMandatory("insuranceId")}>Insurance ID:</Label>
                  <input
                    name="insuranceId"
                    value={form.insuranceId}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("insuranceId")}
                  />
                </div>
                <div>
                  <Label htmlFor="plan" isMandatory={isMandatory("plan")}>Plan:</Label>
                  <input
                    name="plan"
                    value={form.plan}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("plan")}
                  />
                </div>
                <div>
                  <Label htmlFor="group" isMandatory={isMandatory("group")}>Group:</Label>
                  <input
                    name="group"
                    value={form.group}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("group")}
                  />
                </div>
                <div>
                  <Label htmlFor="policyHolder" isMandatory={isMandatory("policyHolder")}>Policy Holder:</Label>
                  <input
                    name="policyHolder"
                    value={form.policyHolder}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("policyHolder")}
                  />
                </div>
                <div>
                  <Label htmlFor="policyHolderDob" isMandatory={isMandatory("policyHolderDob")}>Policy Holder DOB:</Label>
                  <input
                    type="date"
                    name="policyHolderDob"
                    value={form.policyHolderDob}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("policyHolderDob")}
                  />
                </div>
                <div>
                  <Label htmlFor="policyHolderEmployer" isMandatory={isMandatory("policyHolderEmployer")}>Policy Holder Employer:</Label>
                  <input name="policyHolderEmployer" value={form.policyHolderEmployer} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="policyHolderRelationship" isMandatory={isMandatory("policyHolderRelationship")}>Policy Holder Relationship:</Label>
                  <input
                    name="policyHolderRelationship"
                    value={form.policyHolderRelationship}
                    onChange={handleChange}
                    className="inputStyle"
                    required={isMandatory("policyHolderRelationship")}
                  />
                </div>
                <div>
                  <Label htmlFor="primaryCarePhysician" isMandatory={isMandatory("primaryCarePhysician")}>Primary Care Physician:</Label>
                  <input name="primaryCarePhysician" value={form.primaryCarePhysician} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="pcpPhone" isMandatory={isMandatory("pcpPhone")}>PCP Phone:</Label>
                  <input name="pcpPhone" value={form.pcpPhone} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="preferredPharmacy" isMandatory={isMandatory("preferredPharmacy")}>Preferred Pharmacy:</Label>
                  <input name="preferredPharmacy" value={form.preferredPharmacy} onChange={handleChange} className="inputStyle" />
                </div>
                <div>
                  <Label htmlFor="pharmacyPhone" isMandatory={isMandatory("pharmacyPhone")}>Pharmacy Phone:</Label>
                  <input name="pharmacyPhone" value={form.pharmacyPhone} onChange={handleChange} className="inputStyle" />
                </div>
              </div>
            )}

            {/* Tab 2: Medical History */}
            {tab === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="reasonForVisit" isMandatory={isMandatory("reasonForVisit")}>Reason for Visit:</Label>
                  <textarea
                    name="reasonForVisit"
                    value={form.reasonForVisit}
                    onChange={handleChange}
                    rows={3}
                    className="inputStyle resize-none"
                    required={isMandatory("reasonForVisit")}
                  />
                </div>
                <div>
                  <Label htmlFor="medicalProblems" isMandatory={isMandatory("medicalProblems")}>Medical Problems:</Label>
                  <textarea
                    name="medicalProblems"
                    value={form.medicalProblems}
                    onChange={handleChange}
                    rows={3}
                    className="inputStyle resize-none"
                    required={isMandatory("medicalProblems")}
                  />
                </div>
                <div>
                  <Label htmlFor="medications" isMandatory={isMandatory("medications")}>Medications:</Label>
                  <textarea
                    name="medications"
                    value={form.medications}
                    onChange={handleChange}
                    rows={3}
                    className="inputStyle resize-none"
                    required={isMandatory("medications")}
                  />
                </div>
                <div>
                  <Label htmlFor="allergies" isMandatory={isMandatory("allergies")}>Allergies:</Label>
                  <textarea
                    name="allergies"
                    value={form.allergies}
                    onChange={handleChange}
                    rows={3}
                    className="inputStyle resize-none"
                    required={isMandatory("allergies")}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-10">
              {tab > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="btnStyle border border-[#37875b] text-[#37875b] hover:bg-[#37875b] hover:text-white"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              {tab < tabTitles.length - 1 ? (
                <button type="button"
                  onClick={handleNext}
                  className="bg-[#6495ED] hover:bg-[#417fd6] text-white px-4 py-2 rounded shadow ml-auto font-semibold">

                  Next
                </button>
              ) : (
                <button type="submit" disabled={!db} className="bg-[#37875b] hover:bg-[#276245] text-white px-4 py-2 rounded shadow ml-auto font-semibold">

                  Submit
                </button>
              )}
            </div>
            {message && <p className="mt-6 text-center text-red-600 font-semibold">{message}</p>}
          </form>
        </div>
      </div>
      <SQLQueryPanel />
    </div>
  );
}




