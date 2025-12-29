# 📄 script.js - Complete Documentation

## Overview
`script.js` is the **core JavaScript file** containing all data management, authentication, and utility functions for the attendance system. It uses **localStorage** for persistent data storage and works entirely client-side.

**File Size**: ~357 lines  
**Dependencies**: None (vanilla JavaScript)  
**Data Persistence**: localStorage with key `attendanceData`

---

## 🗂️ Data Structure

### Global Data Object (`data`)
```javascript
let data = {
  users: [],           // Login credentials & user info
  students: [],        // Student records
  faculty: [],         // Faculty profiles
  departments: [],     // Department info
  courses: [],         // Course information
  subjects: [],        // Subject/Course details
  allocations: [],     // Faculty-Subject assignments
  attendanceSessions: [],  // Attendance session records
  attendanceDetails: []    // Individual attendance marks
}
```

### Users Array
```javascript
{ 
  id: 1,
  username: 'admin',
  password: 'admin',
  role: 'admin',        // 'admin', 'faculty', 'student'
  email: 'admin@college.edu'
}
```

### Students Array
```javascript
{
  id: 1,
  userId: 3,            // Links to user.id (if registered user)
  rollNo: 'CS001',
  name: 'John Doe',
  deptId: 1,
  courseId: 1,
  semester: 1,
  section: 'A',
  email: 'john@college.edu'
}
```

### Faculty Array
```javascript
{
  id: 1,
  userId: 2,
  name: 'Dr. Jane Smith',
  deptId: 1,
  contact: '098-765-4321',
  email: 'fac1@college.edu',
  designation: 'Assistant Professor',
  qualification: 'M.Tech, PhD'
}
```

### Subjects Array
```javascript
{
  id: 1,
  code: 'CS101',
  name: 'Programming Fundamentals',
  courseId: 1,
  semester: 1
}
```

### Allocations Array
```javascript
{
  id: 1,
  facultyId: 1,        // Which faculty teaches
  subjectId: 1,        // Which subject
  semester: 1,
  section: 'A',
  academicYear: '2025'
}
```

### Attendance Sessions Array
```javascript
{
  id: 1,
  allocationId: 1,
  date: '2025-12-09',
  period: 1            // Period 1-6
}
```

### Attendance Details Array
```javascript
{
  id: 1,
  sessionId: 1,
  studentId: 1,
  status: 'Present',   // 'Present', 'Absent', 'Late', 'Excused'
  remark: 'Medical'
}
```

---

## 🔑 Core Functions

### Authentication & Session Management

#### `getCurrentUser()`
**Purpose**: Retrieve currently logged-in user from session  
**Returns**: User object or null  
**Code**:
```javascript
function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}
```
**Usage**:
```javascript
const user = getCurrentUser();
if (user && user.role === 'faculty') {
  console.log('Faculty logged in:', user.username);
}
```

---

#### `updateHeader()`
**Purpose**: Update navbar with logged-in user info  
**Parameters**: None  
**Updates**: `#userInfo` element with username and logout button  
**Code**:
```javascript
function updateHeader() {
  const user = getCurrentUser();
  const userInfo = document.getElementById('userInfo');
  if (user && userInfo) {
    userInfo.innerHTML = `
      <span class="navbar-text me-3">Welcome, ${user.username}!</span>
      <button class="btn btn-outline-light btn-sm" onclick="logout()">Logout</button>
    `;
  }
}
```
**Called On**: Page load, after login

---

#### `logout()`
**Purpose**: Clear session and redirect to home  
**Parameters**: None  
**Side Effects**: Clears sessionStorage, redirects to index.html  
**Code**:
```javascript
function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
```

---

### Navigation & UI Management

#### `buildSidebar(role)`
**Purpose**: Generate sidebar menu based on user role  
**Parameters**: 
- `role` (string): 'admin', 'faculty', or 'student'

**Role-based Menus**:
- **Admin**: Dashboard, 10-Day Analytics, Departments, Courses, Subjects, Students, Faculty, Allocations, Reports
- **Faculty**: Dashboard, Take Attendance, View/Edit, Reports
- **Student**: Dashboard, 10-Day Stats, Attendance, Profile

**Code**:
```javascript
function buildSidebar(role) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  let menu = '<h6 class="sidebar-heading">Menu</h6><ul class="nav flex-column">';
  
  if (role === 'admin') {
    menu += `<li class="nav-item"><a class="nav-link" href="#" onclick="showSection('adminDash')">Dashboard</a></li>...`;
  } else if (role === 'faculty') {
    menu += `<li class="nav-item"><a class="nav-link" href="#" onclick="showSection('facultyDash')">Dashboard</a></li>...`;
  } else if (role === 'student') {
    menu += `<li class="nav-item"><a class="nav-link" href="#" onclick="showSection('studentDash')">Dashboard</a></li>...`;
  }
  
  menu += '</ul>';
  sidebar.innerHTML = menu;
}
```
**Usage**:
```javascript
buildSidebar('faculty');  // Build faculty menu
```

---

#### `showSection(sectionId)`
**Purpose**: Hide all sections and show specific one  
**Parameters**:
- `sectionId` (string): ID of section to display

**Implementation**: Uses display:none/block toggle  
**Code**:
```javascript
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
  if (typeof loadSectionContent === 'function') loadSectionContent(sectionId);
}
```
**Usage**:
```javascript
showSection('facultyDash');    // Show faculty dashboard
showSection('takeAttendance'); // Show attendance marking
```

---

### Data Persistence

#### `loadData()`
**Purpose**: Load data from localStorage or use defaults  
**Called On**: Script initialization  
**Merges**: Saved data with default data object  
**Code**:
```javascript
function loadData() {
  const saved = localStorage.getItem('attendanceData');
  if (saved) data = { ...data, ...JSON.parse(saved) };
}
loadData();  // Auto-called on script load
```

---

#### `saveData()`
**Purpose**: Persist all data to localStorage  
**Called After**: Any data modification (attendance, users, etc.)  
**Storage Key**: `attendanceData`  
**Code**:
```javascript
function saveData() {
  localStorage.setItem('attendanceData', JSON.stringify(data));
}
```
**Usage**:
```javascript
data.attendanceDetails.push(newRecord);
saveData();  // Save to localStorage
```

---

### Utility Functions

#### `showToast(msg, type)`
**Purpose**: Display temporary notification message  
**Parameters**:
- `msg` (string): Message text
- `type` (string): 'success', 'error', 'info' (default)

**Features**: Auto-dismisses after 4.5 seconds  
**Code**:
```javascript
function showToast(msg, type = 'info') {
  const colors = { success: 'success', error: 'danger', info: 'primary' };
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${colors[type] || 'primary'} border-0`;
  toast.style.position = 'fixed';
  toast.style.right = '20px';
  toast.style.bottom = '20px';
  toast.style.zIndex = 2000;
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto"></button></div>`;
  document.body.appendChild(toast);
  const bs = new bootstrap.Toast(toast);
  bs.show();
  setTimeout(() => { bs.hide(); toast.remove(); }, 4500);
}
```
**Usage**:
```javascript
showToast('Attendance saved successfully!', 'success');
showToast('Error saving attendance', 'error');
showToast('Please select a subject', 'info');
```

---

#### `showLoading(show)`
**Purpose**: Show/hide loading spinner overlay  
**Parameters**:
- `show` (boolean): true to show, false to hide

**Creates**: Fixed position spinner in center of screen  
**Code**:
```javascript
function showLoading(show) {
  let spinner = document.getElementById('globalSpinner');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.id = 'globalSpinner';
    spinner.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;
    spinner.style.position = 'fixed';
    spinner.style.left = '50%';
    spinner.style.top = '50%';
    spinner.style.transform = 'translate(-50%, -50%)';
    spinner.style.zIndex = 3000;
    spinner.style.display = 'none';
    document.body.appendChild(spinner);
  }
  spinner.style.display = show ? 'block' : 'none';
}
```
**Usage**:
```javascript
showLoading(true);   // Show spinner
// ... do something ...
showLoading(false);  // Hide spinner
```

---

#### `toggleTheme()`
**Purpose**: Switch between light and dark theme  
**Persistence**: Saves to localStorage with key `theme`  
**Updates**: body element class `dark-theme`  
**Code**:
```javascript
let theme = localStorage.getItem('theme') || 'light';

function applyTheme() {
  document.body.classList.toggle('dark-theme', theme === 'dark');
}

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme();
}
applyTheme();  // Apply on load
```
**Usage**:
```javascript
toggleTheme();  // Switch theme, auto-saves
```

---

#### `celebrate()`
**Purpose**: Show confetti animation (success celebration)  
**Dependencies**: Canvas Confetti library (loaded dynamically)  
**Code**:
```javascript
function celebrate() {
  try { 
    if (window.confetti) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } }); 
  } catch(e) {}
}
```
**Usage**:
```javascript
celebrate();  // Show confetti animation on success
```

---

### Attendance Data Generation

#### `generateAttendanceHistory()`
**Purpose**: Create 10-day sample attendance history on initialization  
**Details**:
- Creates 20 sessions (2 periods/day × 10 days)
- Generates 160+ attendance records
- Random status: 70% Present, 20% Absent, 10% Late
- Auto-called on script load

**Code**:
```javascript
(function generateAttendanceHistory() {
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    for (let period = 1; period <= 2; period++) {
      const sessionId = i * 2 + period;
      data.attendanceSessions.push({ id: sessionId, allocationId: 1, date: dateStr, period });
      
      data.students.forEach(student => {
        const rand = Math.random();
        let status = 'Present';
        if (rand > 0.9) status = 'Absent';
        else if (rand > 0.7) status = 'Late';
        
        data.attendanceDetails.push({
          id: sessionId * 100 + student.id,
          sessionId,
          studentId: student.id,
          status,
          remark: status === 'Absent' ? 'Sick leave' : ''
        });
      });
    }
  }
})();
```

---

## 🚀 Initialization Flow

**Script Load Order**:
1. Define `data` object with users, students, faculty, etc.
2. Generate 10-day attendance history
3. Load saved data from localStorage (if exists)
4. Wait for DOM ready
5. Call `updateHeader()` to show user info
6. Call `buildSidebar(role)` to generate navigation
7. Expose functions to global scope

**Code**:
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
    const user = getCurrentUser();
    if (user) buildSidebar(user.role);
  });
} else {
  updateHeader();
  const user = getCurrentUser();
  if (user) buildSidebar(user.role);
}
```

---

## 🌐 Global Scope Exposure

These functions are exposed to `window` for external access:
```javascript
window.loginUser = loginUser;
window.showToast = showToast;
window.showLoading = showLoading;
window.toggleTheme = toggleTheme;
window.celebrate = celebrate;
```

**All functions callable from HTML**:
```html
<button onclick="showToast('Hello!')">Show Message</button>
<button onclick="toggleTheme()">Switch Theme</button>
<button onclick="logout()">Logout</button>
```

---

## 📊 Data Flow Examples

### Example 1: User Login
```javascript
// In login.html
const user = data.users.find(u => u.username === 'faculty1' && u.password === 'faculty');
if (user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'faculty.html';
}
```

### Example 2: Get Faculty's Subjects
```javascript
const userId = 2;  // faculty1's user id
const faculty = data.faculty.find(f => f.userId === userId);
const allocations = data.allocations.filter(a => a.facultyId === faculty.id);
const subjects = allocations.map(a => data.subjects.find(s => s.id === a.subjectId));
```

### Example 3: Get Student's Attendance Percentage
```javascript
const studentId = 1;
const allSessions = data.attendanceSessions.length;
const presentSessions = data.attendanceDetails.filter(
  d => d.studentId === studentId && d.status === 'Present'
).length;
const percentage = (presentSessions / allSessions) * 100;
```

### Example 4: Save New Attendance
```javascript
data.attendanceDetails.push({
  id: Date.now(),
  sessionId: 1,
  studentId: 3,
  status: 'Present',
  remark: ''
});
saveData();  // Persist to localStorage
```

---

## 🔧 Modifying Data

### Add New Subject
```javascript
data.subjects.push({
  id: 5,
  code: 'CS105',
  name: 'Web Development',
  courseId: 1,
  semester: 2
});
saveData();
```

### Add New Faculty
```javascript
const newFaculty = {
  id: 4,
  userId: 6,
  name: 'Dr. John Smith',
  deptId: 1,
  contact: '070-123-4567',
  email: 'john@college.edu',
  designation: 'Assistant Professor',
  qualification: 'M.Tech, PhD'
};
data.faculty.push(newFaculty);
saveData();
```

### Allocate Subject to Faculty
```javascript
data.allocations.push({
  id: 5,
  facultyId: 4,
  subjectId: 5,
  semester: 2,
  section: 'B',
  academicYear: '2025'
});
saveData();
```

---

## ⚠️ Important Notes

1. **No Backend**: All data stored in browser localStorage
2. **Session**: User info stored in sessionStorage (cleared on browser close)
3. **Data Loss**: Clearing browser storage = data loss
4. **No Authentication**: Passwords not encrypted (demo only)
5. **Concurrent Users**: Not supported (single localStorage per browser)

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Data not persisting | Check `saveData()` is called after changes |
| User info not showing | Verify `sessionStorage.currentUser` is set |
| Sidebar not loading | Check user role is correct ('admin', 'faculty', 'student') |
| Functions not found | Verify functions exposed to window object |
| localStorage full | Clear browser cache or delete old localStorage data |

---

## 📝 Summary

`script.js` provides:
- ✅ Complete data management
- ✅ Authentication & session handling
- ✅ Navigation & UI control
- ✅ Persistent storage via localStorage
- ✅ Utility functions (toast, loading, theme)
- ✅ 10-day sample attendance data

**Total Functions**: 15+  
**Data Collections**: 8  
**Lines of Code**: ~357
