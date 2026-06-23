CREATE DATABASE IF NOT EXISTS cms;
USE cms;

-- 1. Create Admin Table
CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 2. Create Doctor Table
CREATE TABLE doctor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL
);

-- 3. Create Doctor Available Times Table (For @ElementCollection)
CREATE TABLE doctor_available_times (
    doctor_id BIGINT NOT NULL,
    available_times VARCHAR(255),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE
);

-- 4. Create Patient Table
CREATE TABLE patient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- 5. Create Appointment Table
CREATE TABLE appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    appointment_time DATETIME NOT NULL,
    status INT NOT NULL DEFAULT 0, -- 0 = Scheduled, 1 = Completed, 2 = Cancelled
    CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES patient(id)
);
