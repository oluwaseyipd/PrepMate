import {
  LayoutDashboard,
  BarChart,
  BookOpen,
  Bookmark,
  Users,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import {
  FaTable,
  FaChartLine,
  FaBookOpen,
  FaFolderOpen,
  FaHourglassHalf,
  FaBookmark,
} from 'react-icons/fa6';
import { ROLES } from './roles';

export const NAV_CONFIG = {
  // Admin Sidebar Navigation (unchanged from original)
  [ROLES.ADMIN]: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Manage Courses', icon: BarChart, path: '/admin/managecourses' },
    { name: 'Manage Tests', icon: BookOpen, path: '/admin/managetests' },
    { name: 'Resources Library', icon: Bookmark, path: '/admin/resources' },
    { name: 'Students', icon: BookOpen, path: '/admin/manageusers' },
    { name: 'Reports / Analytics', icon: Bookmark, path: '/admin/analytics' },
  ],

  // User Sidebar Navigation (unchanged – nested Courses)
  [ROLES.USER]: [
    { name: 'Overview', icon: FaTable, path: '/dashboard/overview' },
    { name: 'Analytics', icon: FaChartLine, path: '/dashboard/analytics' },
    {
      name: 'Courses',
      icon: FaBookOpen,
      path: '/dashboard/courses',
      children: [
        { name: 'All Courses', icon: FaBookOpen, path: '/dashboard/allcourses' },
        { name: 'My Courses', icon: FaBookmark, path: '/dashboard/mycourses' },
      ],
    },
    { name: 'Resources', icon: FaFolderOpen, path: '/dashboard/resources' },
    { name: 'Take a test', icon: FaHourglassHalf, path: '/dashboard/takeatest' },
  ],

  // *** Super‑Admin Sidebar Navigation (deduced) ***
  //  ‑ High‑level, platform‑wide controls that go beyond Admin scope
  [ROLES.SUPERADMIN]: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/superadmin/dashboard' },
    { name: 'Platform Analytics', icon: BarChart, path: '/superadmin/analytics' },
    { name: 'Admin Management', icon: Users, path: '/superadmin/admins' },
    { name: 'User Management', icon: Users, path: '/superadmin/users' },
    { name: 'Course Catalogue', icon: BookOpen, path: '/superadmin/courses' },
    { name: 'Test Library', icon: BookOpen, path: '/superadmin/tests' },
    { name: 'Resources Library', icon: Bookmark, path: '/superadmin/resources' },
    { name: 'System Settings', icon: Settings, path: '/superadmin/settings' },
    { name: 'Audit Logs', icon: ShieldCheck, path: '/superadmin/audit-logs' },
  ],
};