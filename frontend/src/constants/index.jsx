import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/images/testimonials/user1.jpg";
import user2 from "../assets/images/testimonials/user2.jpg";
import user3 from "../assets/images/testimonials/user3.jpg";
import user4 from "../assets/images/testimonials/user4.jpg";
import user5 from "../assets/images/testimonials/user5.jpg";
import user6 from "../assets/images/testimonials/user6.jpg";

import xtwitter from "../assets/images/icons/x-twitter.png";
import linkedin from "../assets/images/icons/linkedin.png";
import instagram from "../assets/images/icons/instagram.png";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const userTestimony = [
  {
    name: "Theresa Jordan",
    role: "Computer Engineering",
    text: "PrepMate helped me prepare for my first university exams with ease. The timed tests made me feel more confident!",
    avatar: user1, // Replace with image path
  },
  {
    name: "James Wilson",
    role: "Chemistry",
    text: "I love how easy it is to track my progress. I can see where I’m improving and where I need more work!",
    avatar: user2, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Computer Science",
    text: "The explanations after each test really helped me understand why I got a question wrong. Great learning tool!",
    avatar: user3, // Replace with image path
  },
  {
    name: "James Wilson",
    role: "Accountancy",
    text: "The course categories make it easy to focus on the subjects I’m struggling with. It’s a perfect exam prep platform!",
    avatar: user4, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Anatomy",
    text: "As a freshman, I was nervous about my exams. But PrepMate made studying more organized and less stressful!",
    avatar: user5, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Mathematics",
    text: "I love the leaderboard! It adds a little competition and keeps me motivated to study harder.",
    avatar: user6, // Replace with image path
  },
];

export const faqs = [
  {
    question: "What is PrepMate?",
    answer:
      " PrepMate is an online Computer-Based Test (CBT) platform designed to help students practice and prepare for exams with timed tests, performance tracking, and insightful feedback.",
  },
  {
    question: "Are the tests similar to real university exams?",
    answer:
      "Yes, the questions are curated by experienced tutors to reflect the format and difficulty of actual university exams.",
  },
  {
    question: " Is PrepMate free to use?",
    answer:
      "Absolutely. PrepMate is completely free and designed to support your academic journey.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Click on the “Sign Up” button at the top of the page and fill in your basic information to create an account.",
  },
  {
    question: "Can I download my test results?",
    answer:
      "Yes, after each test, you can download a result sheet that includes your answers, the correct options, and explanations.",
  },
];

export const team = [
  {
    name: "Sam Monic",
    role: "Founder",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis nobis dolorum, ad aspernatur quisquam nam.",
  },
  {
    name: "Rams Lesli",
    role: "Sales Executive",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis nobis dolorum, ad aspernatur quisquam nam.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

// Footer Links

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sign In", href: "/signin" },
  { label: "Register", href: "/register" },
];

export const communityLinks = [
  { href: "#", text: "Faqs" },
  { href: "#", text: "Policy" },
  { href: "#", text: "Terms & Conditions" },
];

export const socialLinks = [
  { href: "#", icon: xtwitter, alt: "x-twitter" },
  { href: "#", icon: instagram, alt: "instagram" },
  { href: "#", icon: linkedin, alt: "linkedin" },
];
