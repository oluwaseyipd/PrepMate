import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testquestions } from "../../constants/testquestion";
import { useTestResult } from "../../context/TestResultContext";

const TestSummary = () => {
  const { testResult } = useTestResult();
  const [showDetails, setShowDetails] = useState(false);
  const [explanations, setExplanations] = useState({});
  const navigate = useNavigate();

  const toggleExplanation = (id) => {
    setExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!testResult) {
    return (
      <p className="text-black text-2xl flex justify-center items-center">
        No result found.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold">Test Summary</h1>
      <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mt-4">
        <div>
          <h2 className="text-black text-xl font-semibold">
            {testResult.testTitle}
          </h2>
          <p className="text-gray-600">Date: {testResult.date}</p>
          <p className="text-gray-600">Duration: {testResult.duration}</p>
          <p className="text-gray-600">
            Total Questions: {testResult.totalQuestions}
          </p>
          <p className="text-gray-600">Score: {testResult.score}%</p>
          <p className="text-gray-600">Correct Answers: {testResult.correct}</p>
          <p className="text-gray-600">
            Incorrect Answers: {testResult.incorrect}
          </p>
          <div className="flex items-center gap-10 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 transition duration-300"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Detailed Results" : "View Detailed Results"}
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4 transition duration-300"
              onClick={() => navigate("/dashboard/testinterface")}
            >
              Retake Test
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="flex flex-col mt-4">
            {testquestions.map((q, index) => {
              const userAnswer = testResult.userAnswers[q.id];
              const isCorrect = userAnswer === q.answer;

              return (
                <div
                  key={q.id}
                  className={`${
                    isCorrect ? "bg-green-50" : "bg-red-50"
                  } shadow-lg p-4 rounded-lg mb-4`}
                >
                  <h3 className="text-black text-lg font-medium">
                    Question {index + 1}: {q.question}
                  </h3>

                  <p className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    Your Answer: {userAnswer || "No answer selected"}
                  </p>
                  <p className="text-gray-600">Correct Answer: {q.answer}</p>

                  <span
                    className="text-blue-500 underline cursor-pointer mr-4"
                    onClick={() => toggleExplanation(q.id)}
                  >
                    {explanations[q.id] ? "Close Explanation" : "Show Explanation"}
                  </span>

                  {explanations[q.id] && (
                    <p className="bg-white text-gray-700 rounded-lg p-2 mt-2">
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSummary;
