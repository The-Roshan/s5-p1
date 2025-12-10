-- Create Database (if not done)
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    email VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    course_id INT,
    semester INT,
    section VARCHAR(5),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    contact VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(10) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    course_id INT,
    semester INT,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Class Allocations Table
CREATE TABLE IF NOT EXISTS class_allocation (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_id INT,
    subject_id INT,
    semester INT,
    section VARCHAR(5),
    academic_year VARCHAR(10),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Attendance Sessions Table
CREATE TABLE IF NOT EXISTS attendance_session (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    allocation_id INT,
    date DATE NOT NULL,
    period_no INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (allocation_id) REFERENCES class_allocation(allocation_id) ON DELETE CASCADE
);

-- Attendance Details Table
CREATE TABLE IF NOT EXISTS attendance_detail (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    student_id INT,
    status ENUM('Present', 'Absent', 'Late', 'Excused') DEFAULT 'Absent',
    remark TEXT,
    FOREIGN KEY (session_id) REFERENCES attendance_session(session_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (session_id, student_id)
);

-- Sample Data
INSERT INTO departments (department_name, description) VALUES 
('Computer Science', 'CS Department'),
('Mechanical Engineering', 'ME Department'),
('Electrical Engineering', 'EE Department');

INSERT INTO courses (course_name, department_id) VALUES 
('B.Tech CS', 1),
('B.Tech ME', 2),
('B.Tech EE', 3);

INSERT INTO subjects (subject_code, subject_name, course_id, semester) VALUES 
('CS101', 'Programming Fundamentals', 1, 1),
('CS102', 'Data Structures', 1, 1),
('ME101', 'Thermodynamics', 2, 1),
('EE101', 'Circuits', 3, 1);

-- Passwords hashed with password_hash('password', PASSWORD_DEFAULT) placeholder
INSERT INTO users (username, password, role, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'admin@college.edu'),
('faculty1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'faculty', 'fac1@college.edu'),
('student1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', 'stu1@college.edu');

INSERT INTO faculty (user_id, name, department_id, contact) VALUES 
(2, 'Jane Smith', 1, '123-456-7890');

INSERT INTO students (user_id, roll_no, name, department_id, course_id, semester, section) VALUES 
(3, 'CS001', 'John Doe', 1, 1, 1, 'A');

INSERT INTO class_allocation (faculty_id, subject_id, semester, section, academic_year) VALUES 
(1, 1, 1, 'A', '2025');

INSERT INTO attendance_session (allocation_id, date, period_no) VALUES 
(1, '2025-12-01', 1),
(1, '2025-12-08', 2);

INSERT INTO attendance_detail (session_id, student_id, status, remark) VALUES 
(1, 1, 'Present', ''),
(2, 1, 'Absent', 'Sick');
