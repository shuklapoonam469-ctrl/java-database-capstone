USE cms;

-- 1. Inserts for Admin
INSERT INTO admin (username, password) VALUES
('admin_john', 'adminPass123'), ('admin_sarah', 'secureAdmin456'), ('admin_mike', 'mikePass789'),
('admin_emily', 'emilyPass101'), ('admin_david', 'davidSecured'), ('admin_jess', 'jessica992'),
('admin_brian', 'brianAdm00'), ('admin_clara', 'claraPass77'), ('admin_kevin', 'kevinB123'),
('admin_rachel', 'rachelAdm88');

-- 2. Inserts for Doctor
INSERT INTO doctor (name, specialty, email, password, phone) VALUES
('Dr. Alice Smith', 'Cardiology', 'alice.smith@hospital.com', 'docpass1', '1234567890'),
('Dr. Bob Jones', 'Pediatrics', 'bob.jones@hospital.com', 'docpass2', '2345678901'),
('Dr. Charlie Brown', 'Dermatology', 'charlie.brown@hospital.com', 'docpass3', '3456789012'),
('Dr. Diana Prince', 'Neurology', 'diana.prince@hospital.com', 'docpass4', '4567890123'),
('Dr. Evan Wright', 'Orthopedics', 'evan.wright@hospital.com', 'docpass5', '5678901234'),
('Dr. Fiona Gallagher', 'General Medicine', 'fiona.g@hospital.com', 'docpass6', '6789012345'),
('Dr. George Brooks', 'Oncology', 'george.b@hospital.com', 'docpass7', '7890123456'),
('Dr. Hannah Abbott', 'Psychiatry', 'hannah.a@hospital.com', 'docpass8', '8901234567'),
('Dr. Ian Malcolm', 'Endocrinology', 'ian.m@hospital.com', 'docpass9', '9012345678'),
('Dr. Julia Roberts', 'Gynaecology', 'julia.r@hospital.com', 'docpass10', '0123456789');

-- 3. Inserts for Doctor Available Times (@ElementCollection)
INSERT INTO doctor_available_times (doctor_id, available_times) VALUES
(1, '09:00 AM'), (1, '11:00 AM'), (2, '10:00 AM'), (2, '02:00 PM'),
(3, '01:00 PM'), (4, '03:00 PM'), (5, '09:30 AM'), (6, '08:00 AM'),
(7, '04:00 PM'), (8, '11:30 AM'), (9, '02:30 PM'), (10, '10:30 AM');

-- 4. Inserts for Patient
INSERT INTO patient (name, email, password, phone, address) VALUES
('John Doe', 'john.doe@email.com', 'patpass1', '9876543210', '123 Elm St, NY'),
('Jane Doe', 'jane.doe@email.com', 'patpass2', '8765432109', '456 Oak St, CA'),
('Mark Twin', 'mark.t@email.com', 'patpass3', '7654321098', '789 Pine St, TX'),
('Lucy Heart', 'lucy.h@email.com', 'patpass4', '6543210987', '321 Maple Av, FL'),
('Tom Saw', 'tom.s@email.com', 'patpass5', '5432109876', '654 Cedar Rd, IL'),
('Mary Jane', 'mj@email.com', 'patpass6', '4321098765', '987 Birch Blvd, GA'),
('Peter Parker', 'spidey@email.com', 'patpass7', '3210987654', '20 Ingram St, Queens'),
('Bruce Wayne', 'batman@email.com', 'patpass8', '2109876543', '1007 Mountain Dr, NJ'),
('Clark Kent', 'supes@email.com', 'patpass9', '1098765432', '344 Clinton St, Metropolis'),
('Tony Stark', 'ironman@email.com', 'patpass10', '0987654321', '10880 Malibu Point, CA');

-- 5. Inserts for Appointment
INSERT INTO appointment (doctor_id, patient_id, appointment_time, status) VALUES
(1, 1, '2026-07-10 09:00:00', 0),
(2, 2, '2026-07-11 10:00:00', 0),
(3, 3, '2026-07-12 13:00:00', 1),
(4, 4, '2026-07-13 15:00:00', 0),
(5, 5, '2026-07-14 09:30:00', 2),
(6, 6, '2026-07-15 08:00:00', 1),
(7, 7, '2026-07-16 16:00:00', 0),
(8, 8, '2026-07-17 11:30:00', 0),
(9, 9, '2026-07-18 14:30:00', 1),
(10, 10, '2026-07-19 10:30:00', 0);
