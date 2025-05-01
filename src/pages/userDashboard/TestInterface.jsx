import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testquestions } from "../../constants/testquestion";
import { useModal } from "../../context/ModalContext";
import { useTestResult } from "../../context/TestResultContext";

const TestInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { setShowSubmitAlert, setShowCancelAlert } = useModal();
  const { setTestResult } = useTestResult();

  const currentQuestion = testquestions[currentQuestionIndex];
  const [startTime] = useState(Date.now());

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleTestSubmit = () => {
    const totalQuestions = testquestions.length;
    let numCorrect = 0;

    testquestions.forEach((q) => {
      if (answers[q.id] === q.answer) numCorrect += 1;
    });

    const score = Math.round((numCorrect / totalQuestions) * 100);
    const timeTakenMs = Date.now() - startTime;
    const timeTaken = Math.round(timeTakenMs / 60000) + " mins";

    const result = {
      testTitle: "General Knowledge",
      date: new Date().toLocaleDateString(),
      duration: timeTaken,
      totalQuestions,
      score,
      correct: numCorrect,
      incorrect: totalQuestions - numCorrect,
      userAnswers: answers,
    };

    setTestResult(result);
    // Navigate to summary page (if routing is set up)
  };

  return (
    <div className="p-5 relative">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Panel */}
        <div className="flex flex-col gap-5 w-full md:w-2/3">
          {/* Test Info Boxes */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-10">
            {[
              { title: "Subject", value: "Mathematics" },
              { title: "Total Score", value: "40 Marks" },
              { title: "Total Time", value: "30 Minutes" },
              { title: "Time Remaining", value: "30:00", large: true },
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
                  }`}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {/* Question Box */}
          <div className="flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md">
            {/* Question Header */}
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-blue-600 font-bold text-xl md:text-3xl">
                Question:
              </h2>
              <p className="text-blue-600 font-bold text-xl md:text-3xl">
                {currentQuestion.id}
              </p>
            </div>

            {/* Question Text & Image */}
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

            {/* Options */}
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

            {/* Navigation */}
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
                setShowSubmitAlert(true);
                handleTestSubmit(); // You can delay this until "Yes" on confirmation if needed
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
