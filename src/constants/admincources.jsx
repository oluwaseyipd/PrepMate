import courseImage from "../assets/images/courses/calculus.jpg";
import avater from "../assets/images/courseAuthor/avater.png";

export const courses = [
  {
    id: 1,
    title: "Calculus and Probability",
    category: "Mathematics",
    author: "Dr. Ada Lovelace",
    authorImage: avater,
    totalQuestion: "47",
    rating: "4.0",
    ratingCount: "146",
    duration: "36 mins",
    description: "From basics to advanced topics, this course covers it all in a structured way.",
    image: courseImage,
  },
  {
    id: 2,
    title: "Linear Algebra",
    category: "Cybersecurity",
    author: "Prof. John Doe",
    authorImage: avater,
    totalQuestion: "43",
    rating: "4.9",
    ratingCount: "147",
    duration: "45 mins",
    description: "Learn from experienced instructors and enhance your career opportunities.",
    image: courseImage,
  },
  {
    id: 3,
    title: "Data Structures",
    category: "Biology",
    author: "Ms. Clara Kelvin",
    authorImage: avater,
    totalQuestion: "58",
    rating: "3.9",
    ratingCount: "83",
    duration: "44 mins",
    description: "Master advanced techniques through hands-on projects and in-depth discussions.",
    image: courseImage,
  },
  {
    id: 4,
    title: "Web Development Basics",
    category: "Chemistry",
    author: "Stephen Cred",
    authorImage: avater,
    totalQuestion: "73",
    rating: "5.0",
    ratingCount: "77",
    duration: "43 mins",
    description: "Learn from experienced instructors and enhance your career opportunities.",
    image: courseImage,
  },
  {
    id: 5,
    title: "Advanced Python",
    category: "Engineering",
    author: "Dr. Isaac Newton",
    authorImage: avater,
    totalQuestion: "44",
    rating: "3.8",
    ratingCount: "61",
    duration: "54 mins",
    description: "Explore the foundational principles and practical applications in this comprehensive course.",
    image: courseImage,
  },
  {
    id: 6,
    title: "Machine Learning 101",
    category: "Engineering",
    author: "James Byte",
    authorImage: avater,
    totalQuestion: "59",
    rating: "3.6",
    ratingCount: "132",
    duration: "44 mins",
    description: "Dive into the core concepts and develop the skills needed to solve complex problems.",
    image: courseImage,
  },
  {
    id: 7,
    title: "Database Management",
    category: "Statistics",
    author: "Olivia Fields",
    authorImage: avater,
    totalQuestion: "66",
    rating: "4.4",
    ratingCount: "144",
    duration: "45 mins",
    description: "Learn from experienced instructors and enhance your career opportunities.",
    image: courseImage,
  },
  {
    id: 8,
    title: "Cybersecurity Fundamentals",
    category: "Computer Science",
    author: "Nathan Codewell",
    authorImage: avater,
    totalQuestion: "38",
    rating: "4.8",
    ratingCount: "134",
    duration: "23 mins",
    description: "Learn from experienced instructors and enhance your career opportunities.",
    image: courseImage,
  },
  {
    id: 9,
    title: "Mobile App Development",
    category: "Mathematics",
    author: "Elena Sparks",
    authorImage: avater,
    totalQuestion: "49",
    rating: "3.7",
    ratingCount: "85",
    duration: "29 mins",
    description: "Master advanced techniques through hands-on projects and in-depth discussions.",
    image: courseImage,
  },
];


export const categoryStyles = {
  "Mathematics": {
    bg: "bg-green-100",
    text: "text-green-600"
  },
  "Biology": {
    bg: "bg-purple-100",
    text: "text-purple-600"
  },
  "Chemistry": {
    bg: "bg-pink-100",
    text: "text-pink-600"
  },
  "Physics": {
    bg: "bg-yellow-100",
    text: "text-yellow-600"
  },
  "English": {
    bg: "bg-blue-100",
    text: "text-blue-600"
  },
  "General Knowledge": {
    bg: "bg-red-100",
    text: "text-red-600"
  },
  // fallback
  "default": {
    bg: "bg-gray-100",
    text: "text-gray-600"
  }
};
