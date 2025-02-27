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
    role: "Traveler",
    text: "I think this is the best camping service I have ever tried and I recommend it to you.",
    avatar: user1, // Replace with image path
  },
  {
    name: "James Wilson",
    role: "Climber",
    text: "Campty helps me a lot in finding interesting camping destinations.",
    avatar: user2, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Adventurer",
    text: "Fun, from the city of wates not too far. Beautiful views, pretty and cool.",
    avatar: user3, // Replace with image path
  },
  {
    name: "James Wilson",
    role: "Climber",
    text: "Campty helps me a lot in finding interesting camping destinations.",
    avatar: user4, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Adventurer",
    text: "Fun, from the city of wates not too far. Beautiful views, pretty and cool.",
    avatar: user5, // Replace with image path
  },
  {
    name: "Jhon Tosan",
    role: "Adventurer",
    text: "Fun, from the city of wates not too far. Beautiful views, pretty and cool.",
    avatar: user6, // Replace with image path
  },
];

export const faqs = [
  {
    question: "What is Campty?",
    answer:
      "Campty is a camping service that helps you find and book the best camping spots.",
  },
  {
    question: "How to book tickets?",
    answer:
      "You can book tickets directly through our website by selecting a destination and following the booking steps.",
  },
  {
    question: "What kind of service will I get?",
    answer:
      "We offer complete camping solutions, including guides, safety measures, and convenient booking.",
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
  {
    name: "Harshita Patel",
    role: "Co-Founder & CEO",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis nobis dolorum, ad aspernatur quisquam nam.",
  },
  {
    name: "Alexa Kimberly",
    role: "Lead Designer",
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
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

export const socialLinks = [
  { href: "#", icon: xtwitter, alt: "x-twitter" },
  { href: "#", icon: instagram, alt: "instagram" },
  { href: "#", icon: linkedin, alt: "linkedin" },
];
