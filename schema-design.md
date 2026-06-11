## MySQL Database Design
Structured and Interrelated data management.
**Instructions:**
1. List of table names which are required to manage and store data.
   Main tables: patients, doctors, appointments, admin
   Other if needed : payemnts, clinca info
For each table:

Define columns
Specify data types
Mark primary keys and any foreign key relationships
Consider constraints:

Should some fields be NOT NULL, UNIQUE, or AUTO_INCREMENT?
Should we validate email or phone formats later via code?
Ask yourself:

What happens if a patient is deleted? Should appointments also be deleted?
Should a doctor be allowed to have overlapping appointments?
### Table: appointments                                      
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)

  ### Table: Doctor                                      
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Primary key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- Doctor_name : VARCHAR 
- Doctor_Education : VARCHAR

    ### Table: Patients                                      
- id: INT, Primary Key, Auto Increment
- doctor_id: INT,Foreign  key → doctors(id)
- patient_id: INT, Primary Key → patients(id)
- Patient_name : VARCHAR 
- Diagnose: VARCHAR

  ### Table: Admin                                      
- id: INT, Primary Key, Auto Increment


 ## MongoDB Collection Design
 ### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}

**### Collection: feedback**
```json
{
  "_id": "ObjectId('64abc123456')",
  "doctorName": "John Smith",
   "feedBack" : "Good "
}
