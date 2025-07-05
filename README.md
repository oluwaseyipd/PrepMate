# PrepMate

A web-based platform designed to help students prepare for exams through computer-based tests (CBT). PrepMate allows users to practice with multiple-choice questions, track progress, and access detailed explanations for answers.

## Live Demo
[PrepMate](https://prepmates.vercel.app)


## Features

- **Computer-Based Testing (CBT)**: Practice with multiple-choice questions in a realistic exam environment
- **Progress Tracking**: Monitor your performance and improvement over time
- **Detailed Explanations**: Access comprehensive explanations for all answers
- **User Dashboard**: Personalized dashboard to track your learning journey
- **Performance Analytics**: Detailed insights into your strengths and areas for improvement
- **Test Hosting**: Create and manage custom tests
- **User Account Management**: Secure user registration and authentication

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: [Backend technology - please specify]
- **Database**: [Database technology - please specify]

## Project Structure

```
PrepMate/
├── frontend/          # React frontend application
├── backend/           # Backend API server
├── .gitignore
├── LICENSE
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/oluwaseyipd/PrepMate.git
cd PrepMate
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
# Create .env files in both frontend and backend directories
# Add your environment variables (database URLs, API keys, etc.)
```

## Usage

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:5174`

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
cd backend
npm run start
```

## Testing

Run the test suite:

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/oluwaseyipd/PrepMate/blob/main/LICENSE) file for details.


**PrepMate** - Empowering students to excel in their exams through effective preparation and practice.