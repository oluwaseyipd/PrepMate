import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testquestions } from "../../constants/testquestion";
import { useTestResult } from "../../context/TestResultContext";
import { ArrowDown } from "lucide-react";
import jsPDF from "jspdf";

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // PDF Setup
    const margin = 20;
    const lineHeight = 10;
    let yPosition = margin;
    
    // Add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`${testResult.testTitle} Test Summary`, margin, yPosition);
    yPosition += lineHeight * 2;
    
    // Add test info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${testResult.date}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Duration: ${testResult.duration}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Total Questions: ${testResult.totalQuestions}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Score: ${testResult.score}%`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Correct Answers: ${testResult.correct}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Incorrect Answers: ${testResult.incorrect}`, margin, yPosition);
    yPosition += lineHeight * 2;

    
    // Process each question
    testquestions.forEach((q, index) => {
      const userAnswer = testResult.userAnswers[q.id];
      const isCorrect = userAnswer === q.answer;
      
      // Add question with number
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${q.question}`, margin, yPosition);
      yPosition += lineHeight;
      
      // Add options
      doc.setFont("helvetica", "normal");
      
      // Handle options with the specific format: {option: "A", answer: "Paris"}
      if (q.options) {
        q.options.forEach((option, optIndex) => {
          // Check if option is an object with the expected structure
          if (typeof option === 'object' && option !== null && option.option && option.answer) {
            // Format as "A. Paris"
            doc.text(`${option.option}. ${option.answer}`, margin + 5, yPosition);
          } else {
            // Fallback for any other format
            let optionText = option;
            if (typeof option === 'object' && option !== null) {
              optionText = JSON.stringify(option);
            }
            doc.text(`${String.fromCharCode(97 + optIndex)}. ${optionText}`, margin + 5, yPosition);
          }
          yPosition += lineHeight;
        });
      }
      
      // Add correct answer
      doc.setFont("helvetica", "bold");
      doc.text(`Correct answer: ${q.answer}`, margin + 10, yPosition);
      
      // Add user's answer and status
      yPosition += lineHeight;
      const answerText = `Your answer: ${userAnswer || "No answer"} (${isCorrect ? "Correct" : "Incorrect"})`;
      doc.setTextColor(isCorrect ? 0 : 255, isCorrect ? 128 : 0, 0);
      doc.text(answerText, margin + 10, yPosition);
      doc.setTextColor(0, 0, 0); // Reset text color
      
      yPosition += lineHeight * 2;
      
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = margin;
      }
    });
    
    // Save the PDF
    doc.save(`${testResult.testTitle}_Summary.pdf`);
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
            <button
              className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 transition duration-300"
              onClick={downloadPDF}
            >
              <ArrowDown className="mr-2 text-white" size={18}/>
              Download Summary
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