import { Home, LayoutDashboard, BookOpen, Settings, MessageSquare, Clock, CheckCircle, FileText } from "lucide-react";



// Sidebar Navigation
export const navItems = [
    { name: "Overview", icon: <LayoutDashboard />, link: "/dashboard" },
    { name: "My Tests", icon: <BookOpen />, link: "/dashboard/tests" },
    { name: "Performance", icon: <Home />, link: "/dashboard/performance" },
    { name: "Messages", icon: <MessageSquare />, link: "/dashboard/messages" },
    { name: "Settings", icon: <Settings />, link: "/dashboard/settings" },
  ];

  // Quick Stats
 export  const stats = [
    { icon: <Clock className="w-10 h-10 text-blue-600" />, label: "Total Tests Taken", value: 5 },
    { icon: <CheckCircle className="w-10 h-10 text-green-600" />, label: "Passed Tests", value: 3 },
    { icon: <FileText className="w-10 h-10 text-yellow-600" />, label: "Pending Tests", value: 2 },
  ];

  export const recentTests = [
    {
      subject: "Mathematics Practice Test",
      date: "Jan 12, 2025",
      duration: "30 mins",
      score: "85%",
    },
    {
      subject: "English Language Quiz",
      date: "Jan 12, 2025",
      duration: "20 mins",
      score: "45%",
    },
    {
      subject: "General Knowledge Test",
      date: "Jan 12, 2025",
      duration: "15 mins",
      score: "92%",
    },
  ];