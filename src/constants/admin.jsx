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
