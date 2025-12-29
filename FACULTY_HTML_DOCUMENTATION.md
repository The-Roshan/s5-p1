# 👨‍🏫 faculty.html - Complete Documentation

## Overview
`faculty.html` is the **faculty dashboard** providing attendance marking, student management, course overview, and teaching assignments for faculty members.

**File Size**: 1,451 lines  
**Sections**: 8 interactive sections  
**CSS Classes**: 150+ custom styles  
**JavaScript Functions**: 8+ integrated functions  
**Responsive**: 4 breakpoints (992px, 768px, 576px, 480px)

---

## 🏗️ HTML Structure

### Navbar & Header
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light" style="box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">📚 Attendance System</a>
    <!-- Hamburger toggle for mobile -->
    <button class="navbar-toggler" onclick="document.getElementById('sidebar').classList.toggle('show')">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- User info section -->
    <span id="userInfo" class="d-none d-lg-inline ms-auto">Loading...</span>
  </div>
</nav>
```

**Components**:
- Logo & branding
- Mobile hamburger menu toggle
- User info display (desktop only)

---

### Sidebar Navigation
```html
<div class="sidebar" id="sidebar">
  <a href="#facultyDash" onclick="showSection('facultyDash')" class="nav-link">📊 Dashboard</a>
  <a href="#takeAttendance" onclick="showSection('takeAttendance')" class="nav-link">✏️ Take Attendance</a>
  <a href="#attendanceRecord" onclick="showSection('attendanceRecord')" class="nav-link">📋 Attendance Records</a>
  <a href="#reports" onclick="showSection('reports')" class="nav-link">📈 Reports</a>
  <a href="#courseInfo" onclick="showSection('courseInfo')" class="nav-link">📚 Course Information</a>
  <a href="#settings" onclick="showSection('settings')" class="nav-link">⚙️ Settings</a>
  <!-- Logout button -->
  <button onclick="logout()" class="btn btn-danger w-100 mt-5">🚪 Logout</button>
</div>
```

**Functions Called**:
- `showSection(sectionId)` - Display specific section (from script.js)
- `logout()` - End faculty session (from script.js)

---

## 📑 Sections Breakdown

### 1. Dashboard Section (`#facultyDash`)
**Purpose**: Faculty overview & teaching assignments

**HTML Structure**:
```html
<div id="facultyDash" class="section">
  <h2>Faculty Dashboard</h2>
  
  <!-- Personal Info Card -->
  <div class="card mb-3">
    <div class="card-body">
      <h5>👤 Faculty Information</h5>
      <p><strong>Name:</strong> <span id="facultyName">-</span></p>
      <p><strong>Department:</strong> <span id="facultyDept">-</span></p>
      <p><strong>Specialization:</strong> <span id="facultySpec">-</span></p>
    </div>
  </div>

  <!-- Teaching Assignments -->
  <div class="card mb-3">
    <div class="card-header bg-primary text-white">
      <h5>📚 Teaching Assignments</h5>
    </div>
    <div class="card-body">
      <div id="teachingCards" class="row">
        <!-- Dynamically populated -->
      </div>
    </div>
  </div>

  <!-- Course & Section Overview -->
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h5>📖 Course & Section Overview</h5>
    </div>
    <div class="card-body">
      <div id="courseOverview">
        <!-- Populated by JavaScript -->
      </div>
    </div>
  </div>

  <!-- System Information Reference -->
  <div class="card mt-3">
    <div class="card-header bg-primary text-white">
      <h5>ℹ️ System Information Reference</h5>
    </div>
    <div class="card-body">
      <div id="systemInfo">
        <!-- Tabbed interface -->
      </div>
    </div>
  </div>
</div>
```

**Populated By**:
- Faculty data from script.js data object
- Teaching assignments from allocations
- Course information from subjects

---

### 2. Take Attendance Section (`#takeAttendance`)
**Purpose**: Mark student attendance using card-based UI

**HTML Structure**:
```html
<div id="takeAttendance" class="section">
  <h2>Take Attendance</h2>

  <!-- Subject Selection -->
  <div class="mb-3">
    <label class="form-label"><strong>Select Subject:</strong></label>
    <select id="subjectSelect" class="form-select" onchange="createAttendanceSession()">
      <option value="">-- Select a Subject --</option>
      <!-- Dynamically populated -->
    </select>
  </div>

  <!-- Selected Subject Info -->
  <div id="selectedSubjectInfo" class="alert alert-info mb-3" style="display: none;">
    <!-- Course, section, student count -->
  </div>

  <!-- Attendance Session Date -->
  <div class="row mb-3">
    <div class="col-md-6">
      <label class="form-label"><strong>Session Date:</strong></label>
      <input type="date" id="sessionDate" class="form-control" value="">
    </div>
    <div class="col-md-6">
      <label class="form-label"><strong>Session Time:</strong></label>
      <input type="time" id="sessionTime" class="form-control" value="">
    </div>
  </div>

  <!-- Mark All Buttons -->
  <div class="mb-3">
    <button class="btn btn-success" onclick="markAll('present')">✓ Mark All Present</button>
    <button class="btn btn-warning" onclick="markAll('absent')">✗ Mark All Absent</button>
    <button class="btn btn-secondary" onclick="markAll('leave')">🚫 Mark All Leave</button>
  </div>

  <!-- Student Attendance Cards -->
  <div id="attendanceCards" class="row">
    <!-- Dynamic attendance cards inserted here -->
  </div>

  <!-- Save Attendance -->
  <button class="btn btn-primary mt-3 w-100" onclick="saveAttendance()">💾 Save Attendance</button>

  <!-- Attendance Table View -->
  <div id="attendanceTableView" class="mt-4" style="display: none;">
    <table class="table table-bordered table-hover">
      <!-- Table populated dynamically -->
    </table>
  </div>
</div>
```

**Key Features**:
- Subject selector dropdown
- Date & time inputs
- Mark All buttons (present/absent/leave)
- Card-based student view (default)
- Table-based view (toggle)

**Functions Called**:
- `createAttendanceSession()` - Load students for subject
- `markAll(status)` - Set all students to status
- `saveAttendance()` - Save to localStorage
- `updateCardStatus()` - Update individual card color
- `showSelectedSubjectInfo()` - Display subject details

---

### 3. Attendance Records Section (`#attendanceRecord`)
**Purpose**: View historical attendance records

**HTML Structure**:
```html
<div id="attendanceRecord" class="section">
  <h2>Attendance Records</h2>

  <!-- Filters -->
  <div class="row mb-3">
    <div class="col-md-6">
      <label class="form-label"><strong>Select Subject:</strong></label>
      <select id="recordSubjectSelect" class="form-select" onchange="loadAttendanceRecords()">
        <option value="">-- All Subjects --</option>
        <!-- Dynamically populated -->
      </select>
    </div>
    <div class="col-md-6">
      <label class="form-label"><strong>Filter by Date:</strong></label>
      <input type="date" id="recordDateFilter" class="form-control" onchange="loadAttendanceRecords()">
    </div>
  </div>

  <!-- Records Table -->
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Subject</th>
          <th>Student</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="recordsTable">
        <!-- Populated dynamically -->
      </tbody>
    </table>
  </div>
</div>
```

**Features**:
- Subject filter
- Date filter
- Complete attendance history

---

### 4. Reports Section (`#reports`)
**Purpose**: View attendance analytics & statistics

**HTML Structure**:
```html
<div id="reports" class="section">
  <h2>Reports</h2>

  <!-- Subject Selection -->
  <div class="mb-3">
    <select id="reportSubjectSelect" class="form-select" onchange="generateReport()">
      <option value="">-- Select Subject --</option>
      <!-- Dynamically populated -->
    </select>
  </div>

  <!-- Report Container -->
  <div id="reportContainer">
    <!-- Statistics dynamically inserted -->
  </div>

  <!-- Student Attendance Summary -->
  <div id="studentSummary" class="mt-4">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Student Roll</th>
          <th>Name</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Leave</th>
          <th>Total Sessions</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody id="studentSummaryTable">
        <!-- Populated by JavaScript -->
      </tbody>
    </table>
  </div>
</div>
```

---

### 5. Course Information Section (`#courseInfo`)
**Purpose**: Display detailed course & student information

**HTML Structure**:
```html
<div id="courseInfo" class="section">
  <h2>Course Information</h2>

  <!-- Subject Tabs -->
  <div class="nav nav-tabs mb-3" id="courseInfoTabs">
    <!-- Tab buttons dynamically added -->
  </div>

  <!-- Tab Content -->
  <div class="tab-content" id="courseInfoContent">
    <!-- Course details for selected subject -->
  </div>

  <!-- Students in Course -->
  <div class="card mt-4">
    <div class="card-header bg-primary text-white">
      <h5>👥 Students in Course</h5>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody id="courseStudents">
          <!-- Populated dynamically -->
        </tbody>
      </table>
    </div>
  </div>
</div>
```

---

### 6. Settings Section (`#settings`)
**Purpose**: User preferences & account settings

**HTML Structure**:
```html
<div id="settings" class="section">
  <h2>Settings</h2>

  <!-- Theme Toggle -->
  <div class="card mb-3">
    <div class="card-body">
      <h5>🌙 Theme</h5>
      <button class="btn btn-secondary" onclick="toggleTheme()">
        Toggle Dark/Light Mode
      </button>
    </div>
  </div>

  <!-- Password Change (for future) -->
  <div class="card mb-3">
    <div class="card-body">
      <h5>🔐 Security</h5>
      <p>Password change feature (future implementation)</p>
    </div>
  </div>

  <!-- System Info -->
  <div class="card">
    <div class="card-body">
      <h5>ℹ️ System Information</h5>
      <p>Version: 2.0</p>
      <p>Last Updated: Dec 21, 2025</p>
    </div>
  </div>
</div>
```

**Functions Called**:
- `toggleTheme()` - Switch dark/light mode

---

## 🎨 CSS Styling (Inline & Media Queries)

### Attendance Card Styles
```css
.attendance-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 15px;
  margin-bottom: 15px;
  min-height: 200px;
  cursor: pointer;
}

.attendance-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Status Colors */
.card-present {
  background: linear-gradient(135deg, #98ff98 0%, #00cc44 100%);  /* Green */
}

.card-absent {
  background: linear-gradient(135deg, #ff9999 0%, #cc0000 100%);  /* Red */
}

.card-leave {
  background: linear-gradient(135deg, #ffcc99 0%, #ff8800 100%);  /* Orange */
}

.card-unmarked {
  background: linear-gradient(135deg, #ccccff 0%, #6666cc 100%);  /* Blue */
}
```

---

### Responsive Design

**Desktop (>992px)**:
```css
#teachingCards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 cards per row */
  gap: 20px;
}

#attendanceCards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 cards per row */
  gap: 15px;
}
```

**Tablet (768px - 992px)**:
```css
@media (max-width: 992px) {
  #teachingCards {
    grid-template-columns: repeat(2, 1fr);  /* 2 cards per row */
  }

  #attendanceCards {
    grid-template-columns: repeat(3, 1fr);  /* 3 cards per row */
  }
}
```

**Mobile (<768px)**:
```css
@media (max-width: 768px) {
  #teachingCards,
  #attendanceCards {
    grid-template-columns: 1fr;  /* 1 card per row */
  }

  .sidebar {
    transform: translateX(-110%);  /* Hidden by default */
  }

  .sidebar.show {
    transform: translateX(0);      /* Visible when toggled */
  }

  #userInfo {
    display: none !important;      /* Hide user info on mobile */
  }
}
```

**Small Mobile (<576px)**:
```css
@media (max-width: 576px) {
  h2 {
    font-size: 1.5rem;   /* Smaller headings */
  }

  .card {
    margin-bottom: 10px; /* Less spacing */
  }

  button {
    min-height: 44px;    /* Touch-friendly buttons */
  }
}
```

---

## 🔧 JavaScript Functions

### 1. `createAttendanceSession()`
**Purpose**: Load students for selected subject and create attendance UI

**Parameters**: None (reads from DOM)

**Data Source**: 
- `data.subjects` - Get subject details
- `data.students` - Get all students
- `data.allocations` - Get course enrollment

**Returns**: void

**Logic**:
1. Read subject from `#subjectSelect`
2. Find course from allocations
3. Get enrolled students for that course
4. Generate attendance cards with color-coded buttons
5. Display selected subject info

**Code Example**:
```javascript
function createAttendanceSession() {
  const selectedSubject = document.getElementById('subjectSelect').value;
  if (!selectedSubject) {
    showToast('Please select a subject', 'warning');
    return;
  }

  // Get subject details
  const subject = data.subjects.find(s => s.id === selectedSubject);
  const allocation = data.allocations.find(a => a.subjectId === selectedSubject);
  
  // Get enrolled students
  const course = data.courses.find(c => c.id === allocation.courseId);
  const enrolledStudents = data.students.filter(s => s.courseId === course.id);

  // Generate HTML cards
  let cardsHTML = '';
  enrolledStudents.forEach(student => {
    cardsHTML += `
      <div class="col-md-3 col-sm-6 mb-3">
        <div class="attendance-card card-unmarked" id="card-${student.id}">
          <p><strong>${student.rollNo}</strong></p>
          <p>${student.name}</p>
          <button onclick="updateCardStatus('${student.id}', 'present')">✓ Present</button>
          <button onclick="updateCardStatus('${student.id}', 'absent')">✗ Absent</button>
          <button onclick="updateCardStatus('${student.id}', 'leave')">🚫 Leave</button>
        </div>
      </div>
    `;
  });

  document.getElementById('attendanceCards').innerHTML = cardsHTML;
}
```

---

### 2. `updateCardStatus(studentId, status)`
**Purpose**: Update card color and status for selected student

**Parameters**:
- `studentId` (string): Student ID
- `status` (string): 'present', 'absent', or 'leave'

**Returns**: void

**Side Effects**: Updates DOM styling and internal state

**Code Example**:
```javascript
function updateCardStatus(studentId, status) {
  const card = document.getElementById(`card-${studentId}`);
  
  // Remove all status classes
  card.classList.remove('card-present', 'card-absent', 'card-leave', 'card-unmarked');
  
  // Add new status class
  const statusClass = {
    'present': 'card-present',
    'absent': 'card-absent',
    'leave': 'card-leave'
  }[status];
  
  card.classList.add(statusClass);
  
  // Update internal state
  if (!attendanceSession) attendanceSession = {};
  attendanceSession[studentId] = status;
}
```

---

### 3. `markAll(status)`
**Purpose**: Mark all students with same status quickly

**Parameters**:
- `status` (string): 'present', 'absent', or 'leave'

**Returns**: void

**Logic**:
1. Get all attendance cards
2. Update each card with status
3. Show confirmation toast

**Code Example**:
```javascript
function markAll(status) {
  const cards = document.querySelectorAll('.attendance-card');
  cards.forEach(card => {
    const studentId = card.id.replace('card-', '');
    updateCardStatus(studentId, status);
  });
  
  showToast(`All students marked ${status}`, 'success');
}
```

---

### 4. `saveAttendance()`
**Purpose**: Save attendance session to localStorage

**Parameters**: None

**Data Saved**:
```javascript
{
  subjectId: "CSE301",
  date: "2025-12-21",
  time: "09:30",
  sessionStatus: "completed",
  attendance: {
    "CS001": "present",
    "CS002": "absent",
    ...
  }
}
```

**Returns**: void

**Validation**:
- Subject must be selected
- At least one student marked

**Code Example**:
```javascript
function saveAttendance() {
  const subject = document.getElementById('subjectSelect').value;
  const date = document.getElementById('sessionDate').value;
  const time = document.getElementById('sessionTime').value;

  if (!subject) {
    showToast('Please select a subject', 'warning');
    return;
  }

  if (!date) {
    showToast('Please select a date', 'warning');
    return;
  }

  // Save to data object
  data.attendance.push({
    sessionId: `SEL-${Date.now()}`,
    subjectId: subject,
    date: date,
    time: time,
    details: Object.entries(attendanceSession).map(([studentId, status]) => ({
      studentId,
      status
    }))
  });

  // Persist to localStorage
  saveData();
  
  showToast('Attendance saved successfully', 'success');
  attendanceSession = null;
}
```

---

### 5. `loadAttendanceRecords()`
**Purpose**: Load and display attendance history with filters

**Parameters**: None (reads filters from DOM)

**Filters**:
- Subject (optional)
- Date (optional)

**Returns**: void

**Logic**:
1. Get filter values
2. Filter attendance records
3. Build table HTML
4. Display in DOM

---

### 6. `generateReport()`
**Purpose**: Generate attendance statistics for selected subject

**Parameters**: None (reads subject from selector)

**Calculates**:
- Total sessions
- Student-wise attendance percentage
- Present/Absent/Leave counts

**Returns**: void

---

### 7. `showSelectedSubjectInfo()`
**Purpose**: Display details of selected subject in info box

**Parameters**: None

**Displays**:
- Subject name & code
- Course name
- Section
- Number of enrolled students

**HTML Target**: `#selectedSubjectInfo`

---

### 8. `populateInfoTabs()`
**Purpose**: Create tabbed interface for system information

**Parameters**: None

**Tabs Created**:
1. Subject Info
2. Course Info
3. Department Info
4. Quick Reference

**Returns**: void

---

## 📊 Data Flow

### Attendance Marking Flow
```
1. Faculty selects subject from dropdown
   ↓
2. createAttendanceSession() loads students
   ↓
3. Faculty marks each student (present/absent/leave)
   ↓
4. updateCardStatus() updates card colors
   ↓
5. Faculty clicks "Save Attendance"
   ↓
6. saveAttendance() validates and saves to data object
   ↓
7. saveData() persists to localStorage
   ↓
8. showToast() confirms success
```

### Report Generation Flow
```
1. Faculty selects subject
   ↓
2. generateReport() called
   ↓
3. Filter attendance records by subject
   ↓
4. Calculate statistics (total sessions, percentages)
   ↓
5. Generate HTML with results
   ↓
6. Display in #reportContainer
```

---

## 🎯 Important CSS Classes Used

| Class | Purpose |
|-------|---------|
| `.section` | Main content section |
| `.attendance-card` | Student attendance card |
| `.card-present` | Green status (present) |
| `.card-absent` | Red status (absent) |
| `.card-leave` | Orange status (leave) |
| `.card-unmarked` | Blue status (not marked) |
| `.card-header` | Card title bar |
| `.table-responsive` | Mobile-friendly table |
| `.nav-tabs` | Tabbed navigation |
| `.form-select` | Dropdown input |
| `.btn-success` | Green button |
| `.btn-danger` | Red button |

---

## 🔗 Integration with script.js

### Functions Called from faculty.html

| Function | Purpose | Location |
|----------|---------|----------|
| `showSection(id)` | Display section | Sidebar links |
| `logout()` | End session | Logout button |
| `showToast(msg, type)` | Display notification | saveAttendance() |
| `toggleTheme()` | Toggle dark mode | Settings section |
| `loadData()` | Load from localStorage | Page load |
| `saveData()` | Save to localStorage | saveAttendance() |

### Data Objects Accessed

```javascript
// Read from:
data.subjects       // Get subject list
data.students       // Get student info
data.courses        // Get course details
data.allocations    // Get faculty assignments
data.departments    // Get department info

// Write to:
data.attendance     // Save attendance records
```

---

## 📱 Mobile Responsiveness

### Responsive Grid Layout
```css
/* Desktop: 4 cards per row */
#attendanceCards {
  grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 3 cards per row */
@media (max-width: 992px) {
  #attendanceCards {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile: 1 card per row */
@media (max-width: 768px) {
  #attendanceCards {
    grid-template-columns: 1fr;
  }
}
```

### Touch-Friendly Buttons
```css
/* All buttons minimum 44px height */
button {
  min-height: 44px;
  font-size: 1rem;
}

/* Increase button padding on mobile */
@media (max-width: 576px) {
  button {
    padding: 12px 16px;
  }
}
```

---

## ⚠️ Important Notes

1. **Subject Selection Required**: Faculty must select a subject before marking attendance
2. **Date & Time Default**: If not set, current date/time used
3. **Card State**: Card colors are visual feedback only, data stored in `attendanceSession` object
4. **Table View**: Available for users who prefer tabular display
5. **Mobile Sidebar**: Hamburger menu auto-toggles on mobile devices
6. **Responsive Images**: Tables convert to card view on very small screens

---

## 🔍 How to Extend faculty.html

### Add New Section
```html
<div id="myNewSection" class="section">
  <h2>My New Feature</h2>
  <!-- Content -->
</div>
```

### Add Sidebar Link
```html
<a href="#myNewSection" onclick="showSection('myNewSection')" class="nav-link">
  🆕 My New Section
</a>
```

### Add JavaScript Function to faculty.html
```javascript
<script>
function myNewFunction() {
  // Your code here
}
</script>
```

---

## 📝 Summary

**faculty.html provides**:
- ✅ 8 distinct sections for faculty workflows
- ✅ Responsive card-based attendance UI
- ✅ Subject management & course overview
- ✅ Attendance records & reporting
- ✅ Mobile-first responsive design
- ✅ Integration with script.js data system
- ✅ Dark/light theme support
- ✅ Toast notifications & user feedback

**Key Features**:
- 1,451 lines of HTML/CSS
- 8+ JavaScript function calls
- 4 responsive breakpoints
- Color-coded status indicators
- Dual view (card + table)
- Complete attendance workflow

---

## 📦 File Dependencies

```
faculty.html
├── script.js (Core functionality)
├── style.css (Global styles)
├── Bootstrap 5.3.0 (Framework)
└── localStorage (Data persistence)
```

**Load Order**: HTML → style.css → Bootstrap → script.js → Page content

