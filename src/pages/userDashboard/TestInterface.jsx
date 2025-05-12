import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { courses } from "../../constants/courses";
import { testquestions } from "../../constants/testquestion";
import { useModal } from "../../context/ModalContext";
import { useTestResult } from "../../context/TestResultContext";

const TestInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get course details from location state
  const courseId = location.state?.courseId;
  const courseTitle = location.state?.courseTitle;
  const courseCategory = location.state?.courseCategory;
  const courseDuration = location.state?.courseDuration;
  
  // Find the course using the courseId for complete details
  const course = courses.find((c) => c.id === courseId);
  
  // Use passed values first, then fallback to found course
  const testTitle = courseTitle || (course?.title || "Untitled Test");
  const testCategory = courseCategory || (course?.category || "N/A");
  const testDuration = courseDuration || (course?.duration || "30 mins");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { setShowSubmitAlert, setShowCancelAlert } = useModal();
  const { updateTestResult } = useTestResult();
  const [startTime] = useState(Date.now());

  const currentQuestion = testquestions[currentQuestionIndex];

  // Extract time in seconds from duration (e.g., "36 mins")
  const testDurationSeconds = parseInt(testDuration) * 60 || 1800;

  const [timeLeft, setTimeLeft] = useState(testDurationSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTestSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleTestSubmit = () => {
    const totalQuestions = testquestions.length;
    let numCorrect = 0;
    const correctAnswers = [];
    const wrongAnswers = [];

    testquestions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        numCorrect += 1;
        correctAnswers.push(q.id);
      } else {
        wrongAnswers.push(q.id);
      }
    });

    const score = Math.round((numCorrect / totalQuestions) * 100);
    const timeTaken = formatTime(testDurationSeconds - timeLeft);

    // Create a full result object with all necessary details
    const result = {
      id: courseId, // Add id for direct course reference
      testId: courseId,
      testTitle: testTitle,
      date: new Date().toLocaleDateString(),
      duration: timeTaken,
      totalQuestions,
      score,
      correct: numCorrect,
      incorrect: totalQuestions - numCorrect,
      userAnswers: answers,
      correctAnswers,
      wrongAnswers,
      timeTaken,
      submitted: true,
      // Include complete course details needed for TakeTest
      course: course ? {
        id: course.id,
        title: course.title,
        author: course.author,
        authorImage: course.authorImage,
        category: course.category,
        duration: course.duration,
        image: course.image,
        totalQuestion: course.totalQuestion,
        rating: course.rating,
        ratingCount: course.ratingCount
      } : null
    };

    updateTestResult(result);
    console.log("Prepared Result:", result);
    return result;
  };

  return (
    <div className="p-5 relative">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Panel */}
        <div className="flex flex-col gap-5 w-full md:w-2/3">
          {/* Test Info and Title */}
          <div className="bg-white p-5 rounded-lg shadow-md mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">{testTitle}</h1>
          </div>
          
          {/* Test Info Boxes */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-10">
            {[
              { title: "Subject", value: testCategory },
              { title: "Total Score", value: `${testquestions.length * 1} Marks` },
              { title: "Total Time", value: testDuration },
              {
                title: "Time Remaining",
                value: formatTime(timeLeft),
                large: true,
              },
            ].map((info, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md"
              >
                <h2 className="text-blue-600 font-bold text-xl md:text-2xl">
                  {info.title}
                </h2>
                <p
                  className={`text-black ${
                    info.large ? "font-bold text-3xl" : ""
                  } ${
                    info.title === "Time Remaining" && timeLeft <= 60
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {/* Question Display */}
          <div className="flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-blue-600 font-bold text-xl md:text-3xl">
                Question:
              </h2>
              <p className="text-blue-600 font-bold text-xl md:text-3xl">
                {currentQuestion.id}
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <p className="text-black mb-3 select-none">
                {currentQuestion.question}
              </p>
              {currentQuestion.questionimage && (
                <img
                  src={currentQuestion.questionimage}
                  className="w-auto md:w-1/2 justify-center mx-auto"
                  alt=""
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt, i) => (
                <div key={opt.option} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    id={`option-${currentQuestion.id}-${i}`}
                    className="cursor-pointer scale-125"
                    checked={answers[currentQuestion.id] === opt.option}
                    onChange={() =>
                      handleAnswerSelect(currentQuestion.id, opt.option)
                    }
                  />
                  <span className="text-black text-lg cursor-pointer select-none">
                    {opt.option}.
                  </span>
                  <label
                    htmlFor={`option-${currentQuestion.id}-${i}`}
                    className="text-black cursor-pointer select-none"
                  >
                    {opt.answer}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center md:justify-end gap-10 mt-5">
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={currentQuestionIndex === 0}
                className={`flex justify-center items-center font-bold py-2 px-4 rounded transition duration-300 ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(prev + 1, testquestions.length - 1)
                  )
                }
                disabled={currentQuestionIndex === testquestions.length - 1}
                className={`flex justify-center items-center font-bold py-2 px-4 rounded transition duration-300 ${
                  currentQuestionIndex === testquestions.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-5 w-full md:w-1/3">
          <div className="flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-blue-600 font-bold text-2xl">Total Question</h2>
            <div className="flex flex-wrap md:grid md:grid-cols-6 gap-5">
              {testquestions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = index === currentQuestionIndex;

                return (
                  <span
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`h-8 w-8 md:h-12 md:w-12 flex justify-center items-center select-none 
                      ${
                        isAnswered
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border-blue-300"
                      } 
                      ${!isAnswered && isCurrent ? "ring-2 ring-blue-400" : ""}
                      border-2 text-lg cursor-pointer p-2`}
                  >
                    {q.id}
                  </span>
                );
              })}
            </div>

            <button
              onClick={() => {
                handleTestSubmit(); // Calculate the result
                setShowSubmitAlert(true); // Show the confirmation modal
              }}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Finish Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;