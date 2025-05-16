import { PGlite } from "@electric-sql/pglite";

let patientsDbInstance = null;

export async function getPatientsDb() {
  if (patientsDbInstance) return patientsDbInstance;
  patientsDbInstance = new PGlite("idb://Patients-db", { persist: true });
  await patientsDbInstance.query(`
    CREATE TABLE IF NOT EXISTS patient_details (
      id SERIAL PRIMARY KEY,
      name TEXT,
      maiden TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      zip TEXT,
      dob TEXT,
      ssn TEXT,
      phone TEXT,
      email TEXT,
      occupation TEXT,
      employer TEXT,
      maritalStatus TEXT,
      spouse TEXT,
      spouseMaiden TEXT,
      emergencyContact TEXT,
      emergencyRelationship TEXT,
      emergencyPhone TEXT,
      parentGuardian TEXT,
      parentGuardianPhone TEXT,
      insuranceCompany TEXT,
      insuranceId TEXT,
      plan TEXT,
      "group" TEXT,
      policyHolder TEXT,
      policyHolderDob TEXT,
      policyHolderEmployer TEXT,
      policyHolderRelationship TEXT,
      primaryCarePhysician TEXT,
      pcpPhone TEXT,
      preferredPharmacy TEXT,
      pharmacyPhone TEXT,
      reasonForVisit TEXT,
      medicalProblems TEXT,
      medications TEXT,
      allergies TEXT
    );
  `);
  return patientsDbInstance;
}
