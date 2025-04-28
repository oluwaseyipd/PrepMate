import { LayoutDashboard, BookOpen, Bookmark, Clock, CheckCircle, FileText, BarChart } from "lucide-react";


// Sidebar Navigation
export   const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Manage Courses', icon: BarChart, path: '/admin/managecourses' },
  { name: 'Manage Tests', icon: BookOpen, path: '/admin/managetests' },
  { name: 'Resources Library', icon: Bookmark, path: '/admin/resources' },
  { name: 'Students', icon: BookOpen, path: '/admin/manageusers' },
  { name: 'Reports / Analytics', icon: Bookmark, path: '/admin/analytics' },
];

// Overview Statistics
export const overview = [
  { name: 'Week 1', score: 72 },
  { name: 'Week 2', score: 30 },
  { name: 'Week 3', score: 65 },
  { name: 'Week 4', score: 90 },
];

// Recent Activities
export   const activities = [
  { id: 1, action: "Logged in", timestamp: new Date() - 5000 },
  { id: 2, action: "Took a test", timestamp: new Date() - 60000 },
  { id: 3, action: "Downloaded a resource", timestamp: new Date() - 3600000 },
  { id: 4, action: "Logged out", timestamp: new Date() - 86400000 },
  { id: 5, action: "Changed settings", timestamp: new Date() - 2592000000 },
  { id: 6, action: "Took a test", timestamp: new Date() - 60000 },
];