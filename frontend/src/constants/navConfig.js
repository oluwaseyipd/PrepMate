import {
  FaTable,
  FaChartLine,
  FaBookOpen,
  FaFolderOpen,
  FaHourglassHalf,
  FaBookmark,
  FaUsers,
  FaGear,
  FaShield,
  FaUsersGear
} from 'react-icons/fa6';
import { ROLES } from './roles';

export const NAV_CONFIG = {
  // Admin Sidebar Navigation 
  [ROLES.ADMIN]: [
    { name: 'Dashboard', icon: FaTable, path: '/admin/dashboard' },
    { name: 'Manage Courses', icon: FaChartLine, path: '/admin/managecourses' },
    { name: 'Manage Tests', icon: FaBookOpen, path: '/admin/managetests' },
    { name: 'Resources Library', icon: FaBookmark, path: '/admin/resources' },
    { name: 'Students', icon: FaBookOpen, path: '/admin/manageusers' },
    { name: 'Reports / Analytics', icon: FaBookmark, path: '/admin/analytics' },
  ],

  // User Sidebar Navigation
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


  //  ‑ High‑level, platform‑wide controls that go beyond Admin scope
  [ROLES.SUPERADMIN]: [
    { name: 'Dashboard', icon: FaTable, path: '/superadmin/dashboard' },
    { name: 'Platform Analytics', icon: FaChartLine, path: '/superadmin/analytics' },
    { name: 'Admin Management', icon: FaUsersGear, path: '/superadmin/admins' },
    { name: 'User Management', icon: FaUsers, path: '/superadmin/users' },
    { name: 'Course Catalogue', icon: FaBookOpen, path: '/superadmin/courses' },
    { name: 'Test Library', icon: FaBookOpen, path: '/superadmin/tests' },
    { name: 'Resources Library', icon: FaBookmark, path: '/superadmin/resources' },
    { name: 'System Settings', icon: FaGear, path: '/superadmin/settings' },
    { name: 'Audit Logs', icon: FaShield, path: '/superadmin/audit-logs' },
  ],
};