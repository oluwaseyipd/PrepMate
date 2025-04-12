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

// Overview Statistics
export const overview = [
  { name: 'Week 1', score: 72 },
  { name: 'Week 2', score: 30 },
  { name: 'Week 3', score: 65 },
  { name: 'Week 4', score: 90 },
];

// Over view Recent Tests
export const recentTest = [
  {
    title: "Introduction to Biology",
    date: "2025-04-09",
    duration: "30 mins",
    score: "85%",
    status: "Completed",
  },
  {
    title: "Basic Algebra",
    date: "2025-04-08",
    duration: "45 mins",
    score: "-",
    status: "Pending",
  },
  {
    title: "History of Nigeria",
    date: "2025-04-06",
    duration: "25 mins",
    score: "92%",
    status: "Completed",
  },
  {
    title: "History of Nigeria",
    date: "2025-04-06",
    duration: "25 mins",
    score: "92%",
    status: "Completed",
  },
  {
    title: "Basic Algebra",
    date: "2025-04-08",
    duration: "45 mins",
    score: "-",
    status: "Pending",
  },
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
