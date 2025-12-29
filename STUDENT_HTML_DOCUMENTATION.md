# 👨‍🎓 student.html - Complete Documentation

## Overview
`student.html` is the **student dashboard** providing attendance overview, 10-day history, analytics, and performance tracking.

**File Size**: 809+ lines  
**Sections**: 5 interactive sections  
**CSS Classes**: 80+ custom styles  
**JavaScript Functions**: 5+ integrated functions  
**Responsive**: 4 breakpoints (992px, 768px, 576px, 480px)

---

## 🏗️ HTML Structure

### Navbar & Header
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">📚 Attendance System</a>
    <!-- Mobile menu toggle -->
    <button class="navbar-toggler" onclick="document.getElementById('sidebar').classList.toggle('show')">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- User info (desktop only) -->
    <span id="userInfo" class="d-none d-lg-inline ms-auto">Loading...</span>
  </div>
</nav>
```

---

### Sidebar Navigation
```html
<div class="sidebar" id="sidebar">
  <a href="#studentDash" onclick="showSection('studentDash')" class="nav-link">📊 Dashboard</a>
  <a href="#attendance10Day" onclick="showSection('attendance10Day')" class="nav-link">📅 10-Day History</a>
  <a href="#subjectWise" onclick="showSection('subjectWise')" class="nav-link">📖 Subject-wise</a>
  <a href="#analytics" onclick="showSection('analytics')" class="nav-link">📈 Analytics</a>
  <a href="#settings" onclick="showSection('settings')" class="nav-link">⚙️ Settings</a>
  
  <button onclick="logout()" class="btn btn-danger w-100 mt-5">🚪 Logout</button>
</div>
```

**Navigation Functions**: `showSection()`, `logout()`

---

## 📑 Sections Breakdown

### 1. Dashboard Section (`#studentDash`)
**Purpose**: Student overview & attendance summary

**HTML Structure**:
```html
<div id="studentDash" class="section">
  <h2>Student Dashboard</h2>

  <!-- Student Info Card -->
  <div class="card mb-4">
    <div class="card-header bg-primary text-white">
      <h5>👤 Student Information</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <p><strong>Roll No:</strong> <span id="studentRoll">-</span></p>
          <p><strong>Name:</strong> <span id="studentName">-</span></p>
          <p><strong>Email:</strong> <span id="studentEmail">-</span></p>
        </div>
        <div class="col-md-6">
          <p><strong>Department:</strong> <span id="studentDept">-</span></p>
          <p><strong>Course:</strong> <span id="studentCourse">-</span></p>
          <p><strong>Enrollment:</strong> <span id="studentEnroll">-</span></p>
        </div>
      </div>
    </div>
  </div>

  <!-- Overall Attendance Summary -->
  <div class="row">
    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <h3 style="color: #28a745;" id="totalSessions">0</h3>
          <p>Total Sessions</p>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <h3 style="color: #28a745;" id="presentCount">0</h3>
          <p>✓ Present</p>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <h3 style="color: #dc3545;" id="absentCount">0</h3>
          <p>✗ Absent</p>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <h3 style="color: #ff8800;" id="leaveCount">0</h3>
          <p>🚫 Leave</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Attendance Percentage -->
  <div class="card mt-4">
    <div class="card-header bg-info text-white">
      <h5>📊 Overall Attendance</h5>
    </div>
    <div class="card-body">
      <div class="progress" style="height: 30px;">
        <div id="attendanceBar" class="progress-bar" style="width: 0%; display: flex; align-items: center; justify-content: center; color: white;">
          <span id="attendancePercent">0%</span>
        </div>
      </div>

      <!-- Alert if below 75% -->
      <div id="lowAttendanceAlert" class="alert alert-low mt-3" style="display: none;">
        ⚠️ Your attendance is below 75%. Please consult with faculty.
      </div>
    </div>
  </div>

  <!-- Subjects Overview -->
  <div class="card mt-4">
    <div class="card-header bg-secondary text-white">
      <h5>📚 Enrolled Subjects</h5>
    </div>
    <div class="card-body">
      <div id="subjectsOverview">
        <!-- Subjects listed here -->
      </div>
    </div>
  </div>
</div>
```

**Populated By**:
- Student data from `data.students`
- Attendance records from `data.attendance`
- Course enrollment from `data.courses`

---

### 2. 10-Day History Section (`#attendance10Day`)
**Purpose**: Day-by-day attendance breakdown

**HTML Structure**:
```html
<div id="attendance10Day" class="section">
  <h2>📅 10-Day Attendance History</h2>

  <!-- Student Selector (for admin view) -->
  <div class="mb-3" id="studentSelectorContainer" style="display: none;">
    <label class="form-label"><strong>Select Student:</strong></label>
    <select id="studentSelector" class="form-select" onchange="loadStudentData()">
      <option value="">-- Select a Student --</option>
    </select>
  </div>

  <!-- Calendar/Timeline View -->
  <div id="tenDayTimeline" class="row">
    <!-- 10-day cards inserted here -->
  </div>

  <!-- Legend -->
  <div class="alert alert-info mt-4">
    <h6>Legend:</h6>
    <span style="background: #98ff98; padding: 5px 10px; border-radius: 5px; margin-right: 10px;">✓ Present</span>
    <span style="background: #ff9999; padding: 5px 10px; border-radius: 5px; margin-right: 10px;">✗ Absent</span>
    <span style="background: #ffcc99; padding: 5px 10px; border-radius: 5px; margin-right: 10px;">🚫 Leave</span>
  </div>
</div>
```

**Card Structure** (for each day):
```html
<div class="col-md-6 col-lg-3 mb-3">
  <div class="card day-card" style="background: #98ff98; border-left: 5px solid #00cc44;">
    <div class="card-body text-center">
      <h5 class="card-title">Dec 12, 2025</h5>
      <p class="card-text">
        <strong>Subject:</strong> CSE301 (Data Structures)<br>
        <strong>Status:</strong> ✓ Present
      </p>
    </div>
  </div>
</div>
```

**Color Coding**:
- Green (#98ff98) - Present
- Red (#ff9999) - Absent
- Orange (#ffcc99) - Leave

---

### 3. Subject-wise Section (`#subjectWise`)
**Purpose**: Attendance breakdown by subject

**HTML Structure**:
```html
<div id="subjectWise" class="section">
  <h2>📖 Subject-wise Attendance</h2>

  <!-- Subject Filter -->
  <div class="mb-3">
    <label class="form-label"><strong>Select Subject:</strong></label>
    <select id="subjectFilterSelect" class="form-select" onchange="loadSubjectAttendance()">
      <option value="">-- All Subjects --</option>
      <!-- Dynamically populated -->
    </select>
  </div>

  <!-- Subject Cards -->
  <div id="subjectWiseCards" class="row">
    <!-- Attendance breakdown per subject -->
  </div>

  <!-- Subject Statistics Table -->
  <div class="table-responsive mt-4">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Code</th>
          <th>Total Sessions</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Leave</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody id="subjectStatsTable">
        <!-- Populated dynamically -->
      </tbody>
    </table>
  </div>
</div>
```

---

### 4. Analytics Section (`#analytics`)
**Purpose**: Performance charts & insights

**HTML Structure**:
```html
<div id="analytics" class="section">
  <h2>📈 Analytics</h2>

  <!-- Key Metrics -->
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body text-center">
          <h6>Attendance Trend</h6>
          <p id="attendanceTrend" style="font-size: 2rem; color: #007bff;">
            ↗ Improving
          </p>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body text-center">
          <h6>Status</h6>
          <p id="attendanceStatus" style="font-size: 2rem; color: #28a745;">
            ✓ Good Standing
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Performance Chart (text-based) -->
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h5>📊 Attendance Breakdown</h5>
    </div>
    <div class="card-body">
      <div id="analyticsChart">
        <!-- Text-based chart or canvas -->
      </div>
    </div>
  </div>

  <!-- Weekly Comparison -->
  <div class="card mt-4">
    <div class="card-header bg-primary text-white">
      <h5>📅 Weekly Comparison</h5>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Sessions</th>
            <th>Attended</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody id="weeklyTable">
          <!-- Weekly stats -->
        </tbody>
      </table>
    </div>
  </div>
</div>
```

---

### 5. Settings Section (`#settings`)
**Purpose**: User preferences

**HTML Structure**:
```html
<div id="settings" class="section">
  <h2>⚙️ Settings</h2>

  <!-- Theme Toggle -->
  <div class="card mb-3">
    <div class="card-body">
      <h5>🌙 Theme</h5>
      <button class="btn btn-secondary" onclick="toggleTheme()">
        Toggle Dark/Light Mode
      </button>
    </div>
  </div>

  <!-- Notifications -->
  <div class="card mb-3">
    <div class="card-body">
      <h5>🔔 Notifications</h5>
      <label>
        <input type="checkbox" id="lowAttendanceNotif" checked>
        Alert when attendance drops below 75%
      </label>
    </div>
  </div>

  <!-- About -->
  <div class="card">
    <div class="card-body">
      <h5>ℹ️ About</h5>
      <p>Attendance System v2.0</p>
      <p>Last Updated: Dec 21, 2025</p>
    </div>
  </div>
</div>
```

---

## 🎨 CSS Styling

### Day Card Styles
```css
.day-card {
  border-left: 5px solid;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.day-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

### Status Colors
```css
/* Present - Green */
.card-present {
  background-color: #98ff98;
  border-left-color: #00cc44;
}

/* Absent - Red */
.card-absent {
  background-color: #ff9999;
  border-left-color: #cc0000;
}

/* Leave - Orange */
.card-leave {
  background-color: #ffcc99;
  border-left-color: #ff8800;
}
```

### Responsive Grids
```css
/* Desktop: 4 cards per row */
#tenDayTimeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

/* Tablet: 3 cards */
@media (max-width: 992px) {
  #tenDayTimeline {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile: 2 cards */
@media (max-width: 768px) {
  #tenDayTimeline {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Small mobile: 1 card */
@media (max-width: 576px) {
  #tenDayTimeline {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔧 JavaScript Functions

### 1. `loadStudentData()`
**Purpose**: Load student info and populate dashboard

**Parameters**: None

**Data Loaded**:
```javascript
{
  rollNo: "CS001",
  name: "Aarav Sharma",
  email: "aarav@college.edu",
  department: "Computer Science",
  course: "BCS",
  enrollment: "2023"
}
```

**Updates DOM**:
- `#studentRoll`, `#studentName`, `#studentEmail`
- `#studentDept`, `#studentCourse`, `#studentEnroll`

**Code Example**:
```javascript
function loadStudentData() {
  const user = getCurrentUser();
  const student = data.students.find(s => s.rollNo === user.username);
  
  document.getElementById('studentRoll').textContent = student.rollNo;
  document.getElementById('studentName').textContent = student.name;
  document.getElementById('studentEmail').textContent = student.email;
  document.getElementById('studentDept').textContent = 
    data.departments.find(d => d.id === student.departmentId).name;
  document.getElementById('studentCourse').textContent = 
    data.courses.find(c => c.id === student.courseId).name;
}
```

---

### 2. `loadAttendanceStats()`
**Purpose**: Calculate attendance metrics

**Calculates**:
- Total sessions attended
- Present count
- Absent count
- Leave count
- Overall percentage
- Low attendance alert status

**Updates DOM**:
- `#totalSessions`, `#presentCount`, `#absentCount`, `#leaveCount`
- `#attendanceBar`, `#attendancePercent`
- `#lowAttendanceAlert` (show/hide)

**Logic**:
```javascript
function loadAttendanceStats() {
  const user = getCurrentUser();
  const student = data.students.find(s => s.rollNo === user.username);
  
  // Get all attendance records for this student
  let allRecords = [];
  data.attendance.forEach(session => {
    session.details.forEach(detail => {
      if (detail.studentId === student.id) {
        allRecords.push(detail);
      }
    });
  });

  // Calculate counts
  const present = allRecords.filter(r => r.status === 'present').length;
  const absent = allRecords.filter(r => r.status === 'absent').length;
  const leave = allRecords.filter(r => r.status === 'leave').length;
  const total = allRecords.length;
  const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

  // Update DOM
  document.getElementById('totalSessions').textContent = total;
  document.getElementById('presentCount').textContent = present;
  document.getElementById('absentCount').textContent = absent;
  document.getElementById('leaveCount').textContent = leave;
  
  const bar = document.getElementById('attendanceBar');
  bar.style.width = percentage + '%';
  bar.style.backgroundColor = percentage >= 75 ? '#28a745' : '#dc3545';
  
  document.getElementById('attendancePercent').textContent = percentage + '%';

  // Show alert if below 75%
  if (percentage < 75) {
    document.getElementById('lowAttendanceAlert').style.display = 'block';
  }
}
```

---

### 3. `load10DayHistory()`
**Purpose**: Display last 10 days of attendance

**Parameters**: None

**Logic**:
1. Get last 10 days from today
2. Filter attendance records for each day
3. Generate card HTML for each day
4. Color-code by status

**Code Example**:
```javascript
function load10DayHistory() {
  const user = getCurrentUser();
  const student = data.students.find(s => s.rollNo === user.username);
  
  // Generate last 10 days
  const days = [];
  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }

  // Find attendance for each day
  let html = '';
  days.forEach(date => {
    const dateStr = date.toISOString().split('T')[0];
    
    // Find session for this date
    const session = data.attendance.find(s => s.date === dateStr);
    const detail = session?.details.find(d => d.studentId === student.id);
    
    const status = detail?.status || 'no-class';
    const color = {
      'present': '#98ff98',
      'absent': '#ff9999',
      'leave': '#ffcc99',
      'no-class': '#e9ecef'
    }[status];

    const subject = session ? 
      data.subjects.find(s => s.id === session.subjectId)?.name : 'No class';

    html += `
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card day-card" style="background: ${color};">
          <div class="card-body text-center">
            <h5>${date.toLocaleDateString()}</h5>
            <p><strong>${subject}</strong></p>
            <p>${detail ? ['✓ Present', '✗ Absent', '🚫 Leave'][['present', 'absent', 'leave'].indexOf(status)] : '-'}</p>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('tenDayTimeline').innerHTML = html;
}
```

---

### 4. `loadSubjectAttendance()`
**Purpose**: Show attendance breakdown by subject

**Parameters**: None (reads filter from DOM)

**Returns**: void

**Displays**:
- Subject name & code
- Sessions & attendance stats
- Percentage for each subject

---

### 5. `generateAnalytics()`
**Purpose**: Create performance insights

**Parameters**: None

**Calculates**:
- Attendance trend (improving/declining/stable)
- Status (good/at-risk/critical)
- Weekly breakdown
- Recommendations

---

## 📊 Data Flow

### Dashboard Load Flow
```
1. Page loads
   ↓
2. loadStudentData() displays student info
   ↓
3. loadAttendanceStats() calculates metrics
   ↓
4. load10DayHistory() shows day-by-day view
   ↓
5. Alert shown if <75% attendance
```

### 10-Day History Flow
```
1. calculateLast10Days()
   ↓
2. Filter attendance records per day
   ↓
3. generateCardHTML() for each day
   ↓
4. Apply color coding (green/red/orange)
   ↓
5. Display timeline
```

---

## 📱 Mobile Responsiveness

### Card Grid Breakpoints
```css
/* Desktop: 4 columns */
#tenDayTimeline {
  grid-template-columns: repeat(4, 1fr);  /* 10 days = 2.5 rows */
}

/* Tablet (992px): 3 columns */
@media (max-width: 992px) {
  #tenDayTimeline {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile (768px): 2 columns */
@media (max-width: 768px) {
  #tenDayTimeline {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Small (576px): 1 column */
@media (max-width: 576px) {
  #tenDayTimeline {
    grid-template-columns: 1fr;
  }

  .card {
    font-size: 0.9rem;
  }

  button {
    min-height: 44px;
  }
}
```

---

## 🎯 Important Features

1. **Automatic Low Attendance Alert**: Shows warning if <75%
2. **Color-Coded Status**: Visual quick reference
3. **Multi-Subject Tracking**: View per-subject stats
4. **10-Day Timeline**: Recent history visualization
5. **Analytics Insights**: Trend & status indicators

---

## 🔗 Integration with script.js

### Functions Called
| Function | Purpose |
|----------|---------|
| `getCurrentUser()` | Get current student info |
| `showSection(id)` | Display section |
| `logout()` | End session |
| `toggleTheme()` | Switch dark mode |
| `loadData()` | Load from localStorage |
| `saveData()` | Save to localStorage |

### Data Objects Accessed
```javascript
data.students       // Student info
data.attendance     // Attendance records
data.courses        // Course details
data.departments    // Department info
data.subjects       // Subject info
```

---

## ⚠️ Key Validations

1. **Student Required**: Must have valid student login
2. **Date Range**: Last 10 days calculated from today
3. **Subject Enrollment**: Only show enrolled subjects
4. **Attendance Threshold**: 75% is critical level

---

## 📝 Summary

**student.html provides**:
- ✅ 5 sections for student workflows
- ✅ Comprehensive attendance overview
- ✅ 10-day history visualization
- ✅ Subject-wise breakdown
- ✅ Performance analytics
- ✅ Mobile-responsive design
- ✅ Low attendance alerts
- ✅ Dark/light theme support

**Key Metrics Displayed**:
- Total sessions
- Present/Absent/Leave counts
- Overall percentage
- Weekly trends
- Subject-wise percentages

---

## 📦 File Dependencies

```
student.html
├── script.js (Core functionality)
├── style.css (Global styles)
├── Bootstrap 5.3.0 (Framework)
└── localStorage (Data persistence)
```

