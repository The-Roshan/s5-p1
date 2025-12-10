// Sample Data with 10-day attendance history
let data = {
  users: [
    { id: 1, username: 'admin', password: 'admin', role: 'admin', email: 'admin@college.edu' },
    { id: 2, username: 'faculty1', password: 'faculty', role: 'faculty', email: 'fac1@college.edu' },
    { id: 4, username: 'faculty2', password: 'faculty', role: 'faculty', email: 'fac2@college.edu' },
    { id: 5, username: 'faculty3', password: 'faculty', role: 'faculty', email: 'fac3@college.edu' },
    { id: 3, username: 'student1', password: 'student', role: 'student', email: 'stu1@college.edu' },
  ],
  students: [
    { id: 1, userId: 3, rollNo: 'CS001', name: 'John Doe', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'john@college.edu' },
    { id: 2, userId: null, rollNo: 'CS002', name: 'Jane Smith', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'jane@college.edu' },
    { id: 3, userId: null, rollNo: 'CS003', name: 'Alice Johnson', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'alice@college.edu' },
    { id: 4, userId: null, rollNo: 'CS004', name: 'Bob Brown', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'bob@college.edu' },
    { id: 5, userId: null, rollNo: 'CS005', name: 'Carol Davis', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'carol@college.edu' },
    { id: 6, userId: null, rollNo: 'CS006', name: 'David Wilson', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'david@college.edu' },
    { id: 7, userId: null, rollNo: 'CS007', name: 'Emma White', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'emma@college.edu' },
    { id: 8, userId: null, rollNo: 'CS008', name: 'Frank Miller', deptId: 1, courseId: 1, semester: 1, section: 'A', email: 'frank@college.edu' },
  ],
  faculty: [
    { id: 1, userId: 2, name: 'Dr. Jane Smith', deptId: 1, contact: '098-765-4321', email: 'fac1@college.edu', designation: 'Assistant Professor', qualification: 'M.Tech, PhD' },
    { id: 2, userId: 4, name: 'Prof. Robert Johnson', deptId: 1, contact: '087-654-3210', email: 'fac2@college.edu', designation: 'Associate Professor', qualification: 'M.Tech, PhD' },
    { id: 3, userId: 5, name: 'Ms. Sarah Williams', deptId: 1, contact: '076-543-2109', email: 'fac3@college.edu', designation: 'Lecturer', qualification: 'M.Tech' },
  ],
  departments: [
    { id: 1, name: 'Computer Science', description: 'CS Dept' },
    { id: 2, name: 'Mechanical Engineering', description: 'ME Dept' },
  ],
  courses: [
    { id: 1, name: 'B.Tech CS', deptId: 1 },
    { id: 2, name: 'B.Tech ME', deptId: 2 },
  ],
  subjects: [
    { id: 1, code: 'CS101', name: 'Programming Fundamentals', courseId: 1, semester: 1 },
    { id: 2, code: 'CS102', name: 'Data Structures', courseId: 1, semester: 1 },
    { id: 3, code: 'CS103', name: 'Discrete Mathematics', courseId: 1, semester: 1 },
    { id: 4, code: 'CS104', name: 'Digital Logic Design', courseId: 1, semester: 1 },
  ],
  allocations: [
    { id: 1, facultyId: 1, subjectId: 1, semester: 1, section: 'A', academicYear: '2025' },
    { id: 2, facultyId: 2, subjectId: 2, semester: 1, section: 'A', academicYear: '2025' },
    { id: 3, facultyId: 3, subjectId: 3, semester: 1, section: 'A', academicYear: '2025' },
    { id: 4, facultyId: 1, subjectId: 4, semester: 1, section: 'A', academicYear: '2025' },
  ],
  attendanceSessions: [],
  attendanceDetails: [],
};

// Generate 10-day attendance history
(function generateAttendanceHistory() {
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Create sessions for each day (2 periods)
    for (let period = 1; period <= 2; period++) {
      const sessionId = i * 2 + period;
      data.attendanceSessions.push({
        id: sessionId,
        allocationId: 1,
        date: dateStr,
        period: period,
      });
      
      // Add attendance details for each student
      data.students.forEach(student => {
        // Random attendance: 70% present, 20% absent, 10% late
        const rand = Math.random();
        let status = 'Present';
        if (rand > 0.9) status = 'Absent';
        else if (rand > 0.7) status = 'Late';
        
        data.attendanceDetails.push({
          id: sessionId * 100 + student.id,
          sessionId: sessionId,
          studentId: student.id,
          status: status,
          remark: status === 'Absent' ? 'Sick leave' : '',
        });
      });
    }
  }
})();

// Data Persistence
function loadData() {
  const saved = localStorage.getItem('attendanceData');
  if (saved) data = { ...data, ...JSON.parse(saved) };
}
function saveData() {
  localStorage.setItem('attendanceData', JSON.stringify(data));
}
loadData();

// Auth & Navigation
function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}
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
function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Sidebar Builder
function buildSidebar(role) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  let menu = '<h6 class="sidebar-heading">Menu</h6><ul class="nav flex-column">';
  if (role === 'admin') {
    menu += `
      <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('adminDash')">Dashboard</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('tenDayAnalytics')">📊 10-Day Analytics</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('depts')">Departments</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('courses')">Courses</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('subjects')">Subjects</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('students')">Students</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('faculty')">Faculty</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('allocations')">Allocations</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('reports')">Reports</a></li>
    `;
  } else if (role === 'faculty') {
    menu += `
      <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('facultyDash')">Dashboard</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('takeAttendance')">Take Attendance</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('viewAttendance')">View/Edit</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('facultyReports')">Reports</a></li>
    `;
  } else if (role === 'student') {
    menu += `
      <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('studentDash')">Dashboard</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('tenDayStats')">📊 10-Day Stats</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('studentAttendance')">Attendance</a></li>
      <li><a class="nav-link" href="#" onclick="showSection('profile')">Profile</a></li>
    `;
  }
  menu += '</ul>';
  sidebar.innerHTML = menu;
}

// Section Manager (for SPA-like navigation)
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
  if (typeof loadSectionContent === 'function') loadSectionContent(sectionId); // Call if defined in page
  // Populate global info tabs and course/subject references when sections change
  try { if (typeof populateInfoTabs === 'function') populateInfoTabs(); } catch(e) {}
}

// Populate system-wide information panels (Subjects, Courses, Departments, Sections)
function populateInfoTabs() {
  // Subjects table
  const subjBody = document.getElementById('allSubjectsBody');
  if (subjBody) {
    subjBody.innerHTML = data.subjects.map(s => {
      const course = data.courses.find(c => c.id === s.courseId);
      return `<tr><td>${s.code}</td><td>${s.name}</td><td>${course?.name || '-'}</td><td>${s.semester}</td></tr>`;
    }).join('');
  }

  // Courses table
  const coursesBody = document.getElementById('allCoursesBody');
  if (coursesBody) {
    coursesBody.innerHTML = data.courses.map(c => {
      const dept = data.departments.find(d => d.id === c.deptId);
      // approximate semesters
      const totalSem = 8;
      return `<tr><td>CRS${c.id.toString().padStart(3,'0')}</td><td>${c.name}</td><td>${dept?.name || '-'}</td><td>${totalSem}</td></tr>`;
    }).join('');
  }

  // Departments table
  const deptBody = document.getElementById('allDepartmentsBody');
  if (deptBody) {
    deptBody.innerHTML = data.departments.map(d => {
      const courses = data.courses.filter(c => c.deptId === d.id).map(c => c.name).join(', ') || '-';
      return `<tr><td>${d.name}</td><td>${d.description || '-'}</td><td>${courses}</td></tr>`;
    }).join('');
  }

  // Sections container (unique from allocations)
  const sectionsContainer = document.getElementById('allSectionsContainer');
  if (sectionsContainer) {
    const sections = [...new Set(data.allocations.map(a => `${a.section} (Sem ${a.semester}) - ${data.courses.find(c=>c.id===data.subjects.find(s=>s.id===a.subjectId)?.courseId)?.name || ''}`))];
    sectionsContainer.innerHTML = sections.map(s => `<span class="badge badge-section" style="margin:4px; padding:8px 10px;">${s}</span>`).join('');
  }

  // Course overview cards
  const courseOverview = document.getElementById('courseOverviewContainer');
  if (courseOverview) {
    courseOverview.innerHTML = data.courses.map(c => {
      const subjects = data.subjects.filter(s => s.courseId === c.id);
      const students = data.students.filter(st => st.courseId === c.id);
      const allocations = data.allocations.filter(a => data.subjects.some(s => s.id === a.subjectId && s.courseId === c.id));
      const sections = [...new Set(allocations.map(a => a.section))];
      return `
        <div class="metric-card" style="padding:15px;">
          <div style="font-weight:700; color:#333;">${c.name}</div>
          <div style="color:#666; font-size:13px; margin-top:6px;">Subjects: ${subjects.length} &nbsp; • &nbsp; Students: ${students.length}</div>
          <div style="margin-top:10px;">Sections: ${sections.join(', ') || '-'}</div>
        </div>
      `;
    }).join('');
  }

  // Also populate any global dropdowns of subjects (for admin pages)
  const globalSubjectSelects = document.querySelectorAll('#subjectSelect, #viewSubSelect, #reportSub');
  if (globalSubjectSelects && globalSubjectSelects.length) {
    globalSubjectSelects.forEach(sel => {
      if (!sel) return;
      // Only populate when options are empty (avoid overwriting faculty-specific allocations)
      if (sel.options.length <= 1) {
        sel.innerHTML = '<option value="">All Subjects</option>' + data.subjects.map(s => `<option value="${s.id}">${s.code} - ${s.name}</option>`).join('');
      }
    });
  }
}

// Show selected subject details in Take Attendance panel (expects allocation id)
function showSelectedSubjectInfo() {
  const sel = document.getElementById('subjectSelect');
  if (!sel) return;
  const allocId = parseInt(sel.value);
  const infoPanel = document.getElementById('selectedSubjectInfo');
  if (!allocId) { if (infoPanel) infoPanel.style.display = 'none'; return; }
  const alloc = data.allocations.find(a => a.id === allocId);
  if (!alloc) { if (infoPanel) infoPanel.style.display = 'none'; return; }
  const sub = data.subjects.find(s => s.id === alloc.subjectId) || {};
  const course = data.courses.find(c => c.id === sub.courseId) || {};
  document.getElementById('displaySubCode').textContent = sub.code || '-';
  document.getElementById('displaySubName').textContent = sub.name || '-';
  document.getElementById('displayCourse').textContent = course.name || '-';
  document.getElementById('displaySection').textContent = alloc.section || '-';
  document.getElementById('displaySemester').textContent = alloc.semester || '-';
  document.getElementById('displayYear').textContent = alloc.academicYear || '2025';
  // Calculate total students for this allocation
  const total = data.students.filter(s => s.semester === alloc.semester && s.section === alloc.section && s.courseId === course.id).length;
  const totalDisplay = document.getElementById('totalStudentsDisplay');
  if (totalDisplay) totalDisplay.textContent = total;
  if (infoPanel) infoPanel.style.display = 'block';
}

// Refresh card status visuals by re-invoking updateCardStatus for each card index
function refreshCardStatus() {
  const selects = document.querySelectorAll('.statusSelect');
  selects.forEach((s, i) => {
    try { if (typeof updateCardStatus === 'function') updateCardStatus(i); } catch(e) {}
  });
}

// Expose helper functions globally for faculty page to call
window.populateInfoTabs = populateInfoTabs;
window.showSelectedSubjectInfo = showSelectedSubjectInfo;
window.refreshCardStatus = refreshCardStatus;

// Global init (for shared pages)
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

// --- API Helpers & UI utilities (Offline Mode - No Backend) ---
const API_BASE = 'api/';  // (Legacy - not used in offline mode)

// Login via pure JS (no backend)
async function loginUser(username, password, role) {
  showLoading(true);
  // Simulate network delay
  await new Promise(r => setTimeout(r, 300));
  showLoading(false);
  return null;  // Handled in login.html directly
}

// Toast helper
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

// Loading spinner
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

// Theme toggle (persisted)
let theme = localStorage.getItem('theme') || 'light';
function applyTheme() {
  document.body.classList.toggle('dark-theme', theme === 'dark');
}
function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme();
}
applyTheme();

// Load confetti library once
(function loadConfetti(){
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
  s.async = true;
  document.head.appendChild(s);
})();

function celebrate() {
  try { if (window.confetti) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } }); } catch(e) {}
}

// Expose to global scope
window.loginUser = loginUser;
window.showToast = showToast;
window.showLoading = showLoading;
window.toggleTheme = toggleTheme;
window.celebrate = celebrate;
