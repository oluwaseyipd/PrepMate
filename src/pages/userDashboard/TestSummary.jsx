import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testquestions } from "../../constants/testquestion";

const TestSummary = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [explanations, setExplanations] = useState({});
  const navigate = useNavigate();

  const toggleExplanation = (id) => {
    setExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const correctAnswers = testquestions.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length;
  const incorrectAnswers = testquestions.length - correctAnswers;
  const score = Math.round((correctAnswers / testquestions.length) * 100);

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold">Test Summary</h1>
      <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mt-4">
        <div>
          <h2 className="text-black text-xl font-semibold">Test Title</h2>
          <p className="text-gray-600">Date: 2023-10-01</p>
          <p className="text-gray-600">Duration: 60 minutes</p>
          <p className="text-gray-600">Total Questions: {testquestions.length}</p>
          <p className="text-gray-600">Score: {score}%</p>
          <p className="text-gray-600">Correct Answers: {correctAnswers}</p>
          <p className="text-gray-600">Incorrect Answers: {incorrectAnswers}</p>
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
              const isCorrect = q.userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`${
                    isCorrect ? "bg-green-50" : "bg-red-50"
                  } shadow-lg p-4 rounded-lg mb-4`}
                >
                  <h3 className="text-black text-lg font-medium">
                    Question {index + 1}:{" "}
                    <span className="">{q.question}</span>
                  </h3>
                  <p className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    Your Answer: {q.userAnswer}
                  </p>
                  <p className="text-gray-600">Correct Answer: {q.correctAnswer}</p>

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
