# 🎨 style.css - Complete Documentation

## Overview
`style.css` is the **global stylesheet** providing baseline styling, responsive design, dark theme support, and animations for the entire attendance system.

**File Size**: ~60 lines (lightweight, Bootstrap-dependent)  
**Framework**: Bootstrap 5.3.0 (primary)  
**Custom Styles**: ~40 CSS rules  
**Theme Support**: Light & Dark mode

---

## 📋 CSS Classes Reference

### Body & Layout

#### `.sidebar`
**Purpose**: Left navigation panel styling  
**Properties**:
- `overflow-y: auto` - Vertical scrolling enabled
- `border-right: 1px solid #dee2e6` - Right border separator
- Transition enabled for smooth slide animations

**Responsive Behavior**:
- Desktop (>768px): Fixed position, width 250px
- Mobile (<768px): Full-width, slides in from left

**Markup**:
```html
<div class="sidebar" id="sidebar">
  <!-- Navigation menu -->
</div>
```

---

#### `.main-content`
**Purpose**: Main content area below navbar  
**Properties**:
- `margin-left: 250px` - Offset for fixed sidebar
- `min-height: 100vh` - Full viewport height

**Responsive**: Margin removed on mobile

**Markup**:
```html
<main class="main-content">
  <!-- Page sections -->
</main>
```

---

### Tables & Data Display

#### `.table`
**Purpose**: Table styling with custom header  
**Properties**:
```css
.table th {
  background-color: #e9ecef;  /* Light gray background */
  font-weight: bold;          /* Bold text */
}
```

**Bootstrap Override**: Uses Bootstrap default + custom header style

**Example**:
```html
<table class="table table-hover table-striped">
  <thead>
    <tr>
      <th>Roll No</th>
      <th>Name</th>
      <th>Status</th>
    </tr>
  </thead>
</table>
```

---

#### `.table-responsive`
**Purpose**: Make tables scrollable on small screens  
**Properties**:
- `overflow-x: auto` - Horizontal scrolling

**Usage**:
```html
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

---

### Alerts & Status

#### `.alert-low`
**Purpose**: Warning alert for low attendance  
**Properties**:
```css
.alert-low {
  background-color: #fff3cd;   /* Light yellow */
  border-color: #ffeaa7;       /* Yellow border */
  color: #856404;              /* Dark text */
}
```

**Used For**: Attendance warnings below 75%

**Example**:
```html
<div class="alert alert-low">
  ⚠️ Your attendance is below 75%
</div>
```

---

#### `.badge-low`
**Purpose**: Animated badge for low attendance indicator  
**Properties**:
```css
.badge-low {
  background-color: #dc3545;   /* Red */
  color: #fff;                 /* White text */
  animation: pulse 2s infinite; /* Pulsing effect */
}
```

**Animation**: Scales between 1x and 1.05x every 2 seconds

**Example**:
```html
<span class="badge badge-low">⚠️ Low Attendance</span>
```

---

### Cards & Components

#### `.card`
**Purpose**: Card container styling  
**Properties**:
```css
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
```

**Uses**: Subtle shadow for depth

**Example**:
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
</div>
```

---

### Navigation & Buttons

#### `.btn`
**Purpose**: Button spacing consistency  
**Properties**:
- `margin: 0.25rem` - Small margin around buttons

**Example**:
```html
<button class="btn btn-primary">Click Me</button>
<button class="btn btn-success">Submit</button>
```

---

#### `.nav-link`
**Purpose**: Navigation link styling  
**Properties**:
```css
.nav-link:hover {
  background-color: #e9ecef;  /* Gray background on hover */
  border-radius: 0.25rem;     /* Subtle rounding */
}
```

**Example**:
```html
<a class="nav-link" href="#dash">Dashboard</a>
```

---

### Progress Indicators

#### `.progress`
**Purpose**: Progress bar baseline styling  
**Properties**:
- `background-color: #e9ecef` - Light gray track

**Example**:
```html
<div class="progress">
  <div class="progress-bar" style="width: 75%">75%</div>
</div>
```

---

## 🎨 Theme Support

### Light Theme (Default)
```css
body {
  background-color: #f8f9fa;  /* Very light gray */
  color: #333;                /* Dark text */
}
```

---

### Dark Theme (`.dark-theme` class)
**Applied When**: `document.body.classList.add('dark-theme')`

**Properties**:
```css
.dark-theme {
  background-color: #0f1720;  /* Very dark blue */
  color: #e6eef8;             /* Light text */
}

.dark-theme .card,
.dark-theme .table,
.dark-theme .sidebar {
  background-color: #111827;  /* Slightly lighter dark */
  color: #e6eef8;
}

.dark-theme .navbar,
.dark-theme footer {
  background-color: #0b1220 !important;  /* Even darker */
}
```

**Toggle Function** (in script.js):
```javascript
function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.body.classList.toggle('dark-theme', theme === 'dark');
}
```

**Visual Effect**: All page elements adjust colors for readability

---

## ✨ Animations

### Fade In Animation
**Purpose**: Section transition effect  
**Definition**:
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);  /* Slide up 10px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  animation: fadeIn 0.45s ease-in;  /* Applied to all sections */
}
```

**Used For**: Section visibility changes

**Duration**: 0.45 seconds

**Example HTML**:
```html
<div id="facultyDash" class="section">
  <!-- Content slides in smoothly -->
</div>
```

---

### Pulse Animation
**Purpose**: Attention-grabbing for low attendance warning  
**Definition**:
```css
@keyframes pulse {
  0%   { transform: scale(1);    }  /* Normal size */
  50%  { transform: scale(1.05); }  /* 5% bigger */
  100% { transform: scale(1);    }  /* Back to normal */
}

.badge-low {
  animation: pulse 2s infinite;  /* Repeat forever */
}
```

**Duration**: 2 seconds per cycle

**Example**:
```html
<span class="badge badge-low">⚠️ Low Attendance</span>
<!-- Pulses every 2 seconds -->
```

---

## 📱 Responsive Design

### Media Query: Tablet & Below (max-width: 768px)

```css
@media (max-width: 768px) {
  /* Sidebar becomes overlay */
  .sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 1050;
    transform: translateX(-110%);  /* Hidden by default */
    transition: transform 0.28s ease-in-out;
  }

  /* Show sidebar when .show class added */
  .sidebar.show {
    transform: translateX(0);
  }

  /* Remove left margin from main content */
  .main-content {
    margin-left: 0;
  }
}
```

**Behavior**:
- Sidebar slides in from left when menu button clicked
- Main content takes full width
- No overlap with content

**Toggle Code** (in HTML):
```html
<button onclick="document.getElementById('sidebar').classList.toggle('show')">
  ☰ Menu
</button>
```

---

## 🔧 Utility Classes

### Spinner Container
**Purpose**: Loading indicator overlay  
**Definition**:
```css
#globalSpinner {
  display: none;  /* Hidden by default */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3000;
}
```

**Used In**: `showLoading()` function (script.js)

**Show/Hide**:
```javascript
document.getElementById('globalSpinner').style.display = 'block';   // Show
document.getElementById('globalSpinner').style.display = 'none';    // Hide
```

---

## 🌐 Bootstrap Integration

### Bootstrap Classes Used
- `.btn`, `.btn-primary`, `.btn-success`, `.btn-danger` - Buttons
- `.alert`, `.alert-info`, `.alert-warning`, `.alert-danger` - Alerts
- `.table`, `.table-hover`, `.table-striped` - Tables
- `.card`, `.card-header`, `.card-body` - Cards
- `.progress`, `.progress-bar` - Progress bars
- `.nav`, `.nav-link`, `.navbar` - Navigation
- `.d-flex`, `.d-none`, `.d-md-none` - Display utilities
- `.me-3`, `.mb-2` - Margin utilities
- `.text-center`, `.text-success` - Text utilities

**CDN Link**:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

---

## 🎯 CSS Specificity & Overrides

### Dark Theme Override
```css
.dark-theme .navbar,
.dark-theme footer {
  background-color: #0b1220 !important;  /* !important forces override */
}
```

**Why !important?**: Ensures dark theme applies even with Bootstrap default colors

---

## 📊 Color Palette

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #f8f9fa | #0f1720 |
| Cards | #ffffff | #111827 |
| Text | #333333 | #e6eef8 |
| Borders | #dee2e6 | #1e3a4c |
| Table Headers | #e9ecef | #111827 |
| Alerts | #fff3cd | #2a1f0f |
| Badges (Low) | #dc3545 | #dc3545 |

---

## 🔄 Transition Effects

### Sidebar Transition
```css
.sidebar {
  transition: transform 0.28s ease-in-out;  /* Smooth slide effect */
}
```

**Duration**: 0.28 seconds
**Easing**: ease-in-out (smooth acceleration & deceleration)

### Section Fade In
```css
.section {
  animation: fadeIn 0.45s ease-in;  /* Smooth appearance */
}
```

---

## ⚠️ Important Notes

1. **Bootstrap Dependency**: style.css relies on Bootstrap 5.3.0
2. **Mobile First**: Desktop styles are overridden by media queries
3. **Z-index Management**: Sidebar uses z-index 1050, spinner uses 3000
4. **Dark Theme**: Manual toggle (no system preference detection)
5. **No Preprocessor**: Pure CSS (no SASS/LESS)

---

## 🔍 How to Use Custom CSS

### Add Custom Style to Element
```html
<div class="alert alert-low">
  Low attendance warning
</div>
```

### Combine Bootstrap + Custom Classes
```html
<button class="btn btn-primary btn-lg">
  Large Primary Button
</button>
```

### Apply Dark Theme
```javascript
// Toggle theme
toggleTheme();

// Or manually apply
document.body.classList.add('dark-theme');
document.body.classList.remove('dark-theme');
```

---

## 📝 Summary

**style.css provides**:
- ✅ Responsive sidebar with mobile slide-in
- ✅ Light & dark theme support
- ✅ Smooth animations (fade-in, pulse)
- ✅ Bootstrap integration & overrides
- ✅ Utility classes for common patterns
- ✅ Mobile-first responsive design

**Key Classes**: 20+  
**Animations**: 2 (fadeIn, pulse)  
**Media Queries**: 1 major breakpoint (768px)  
**Lines of Code**: ~60

---

## 🎨 CSS Architecture

```
style.css
├── Global Styles (body, sidebar, main-content)
├── Component Styles (table, card, btn, nav)
├── Alert & Status (alert-low, badge-low)
├── Animations (fadeIn, pulse)
├── Theme Support (dark-theme)
├── Responsive Design (@media 768px)
└── Utilities (progress, transition, z-index)
```

**Load Order**: Bootstrap CSS → style.css → Page-specific CSS (in HTML headers)
