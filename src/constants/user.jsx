import { title } from "framer-motion/client";
import { LayoutDashboard, BookOpen, Bookmark, Clock, CheckCircle, FileText, BarChart } from "lucide-react";
import user1 from "../assets/images/user1.jpeg";




// Sidebar Navigation
export   const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/overview' },
  { name: 'Analytics', icon: BarChart, path: '/dashboard/analytics' },
  { name: 'Courses', icon: BookOpen, path: '/dashboard/courses' },
  { name: 'Resources', icon: Bookmark, path: '/dashboard/resources' },
];



// Overview

export const data = [
  { name: 'Jan', Study: 60, Exam: 20 },
  { name: 'Feb', Study: 40, Exam: 30 },
  { name: 'Mar', Study: 50, Exam: 10 },
  { name: 'Apr', Study: 70, Exam: 20 },
  { name: 'May', Study: 40, Exam: 20 },
  { name: 'Jun', Study: 50, Exam: 30 },
  { name: 'Jul', Study: 60, Exam: 20 },
  { name: 'Aug', Study: 50, Exam: 20 },
  { name: 'Sep', Study: 55, Exam: 25 },
  { name: 'Oct', Study: 45, Exam: 15 },
  { name: 'Nov', Study: 65, Exam: 25 },
  { name: 'Dec', Study: 50, Exam: 20 },
];




// Account Settings

// Profile Settings Navigation
export const profileSettingsNav = [
  { name: 'My Details', path: 'details' },
  { name: 'Password', path: 'password' },
  { name: 'Notification', path: 'notification' },
];


// Profile Setting Notifications
export const notifications =[
  {
    id:1,
    image: user1,
    title: 'New Course Added',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec feugiat mi.', 
    time: '2 hours ago', 
    status: 'unread'
  },
  {
    id:3,
    image: user1,
    title: 'New Course Added',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec feugiat mi.', 
    time: '2 hours ago', 
    status: 'unread'
  },
  {
    id:2,
    image: user1,
    title: 'New Course Added',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nesciunt error quae, neque eaque molestiae sequi et voluptates nam atque qui culpa deleniti fugit ab delectus minima quia praesentium est necessitatibus. Reprehenderit velit perspiciatis architecto a voluptatem cum, quas quidem facere quisquam alias repudiandae sit recusandae, placeat ullam expedita debitis!', 
    time: '2 hours ago', 
    status: 'unread'
  },
]



