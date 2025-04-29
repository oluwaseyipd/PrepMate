import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testquestions } from "../../constants/testquestion";
import { useModal } from "../../context/ModalContext";

const TestInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { showSubmitAlert, setShowSubmitAlert } = useModal();
  const { showCancelAlert, setShowCancelAlert } = useModal();

  const currentQuestion = testquestions[currentQuestionIndex];

  return (
    <div className="p-5 relative">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-5 w-full md:w-2/3">
          {/* Test Information frame */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-10">
            {/* Subject Title */}
            <div className="flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md">
              <h2 className="text-blue-600 font-bold text-xl md:text-2xl">
                Subject
              </h2>
              <p className="text-black">Mathematics</p>
            </div>
            {/* Test Score */}
            <div className="flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md">
              <h2 className="text-blue-600 font-bold text-xl md:text-2xl">
                Total Score
              </h2>
              <p className="text-black">40 Marks</p>
            </div>

            {/* Total Time */}
            <div className="flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md">
              <h2 className="text-blue-600 font-bold text-xl md:text-2xl">
                Total TIme
              </h2>
              <p className="text-black">30 Minutes</p>
            </div>

            {/* Remaining Time */}
            <div className="flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md">
              <h2 className="text-blue-600 font-bold text-xl md:text-2xl">
                Time Remaining
              </h2>
              <p className="text-black font-bold text-3xl">30:00</p>
            </div>
          </div>

          {/* Question and Option frame */}
          <div className="flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-center items-center gap-2 bg-white p-5 rounded-lg">
              <h2 className="text-blue-600 font-bold text-xl md:text-3xl">
                Question:
              </h2>
              <p className="text-blue-600 font-bold text-xl md:text-3xl">
                {currentQuestion.id}
              </p>
            </div>
            {/* Question */}
            <div className="flex flex-col gap-3 mb-5">
              {/* Question text */}
              <p className="text-black mb-3 select-none">
                {currentQuestion.question}
              </p>

              {/* Optional image */}
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
                    name={`question-${currentQuestion.id}`} // unique per question
                    id={`option-${currentQuestion.id}-${i}`}
                    className="cursor-pointer scale-125" // larger radio
                    checked={answers[currentQuestion.id] === opt.option}
                    onChange={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: opt.option,
                      }))
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

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center md:justify-end gap-10 mt-5">
              {/* Previous Button */}
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={currentQuestionIndex === 0}
                className={`flex justify-center items-center font-bold py-2 px-4 rounded transition duration-300 
      ${
        currentQuestionIndex === 0
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
      }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(prev + 1, testquestions.length - 1)
                  )
                }
                disabled={currentQuestionIndex === testquestions.length - 1}
                className={`flex justify-center items-center font-bold py-2 px-4 rounded transition duration-300 
      ${
        currentQuestionIndex === testquestions.length - 1
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
      }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full md:w-1/3">
          {/* Question Tracking frame */}
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
              onClick={() => setShowSubmitAlert(true)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded transition duration-300"
            >
              Finished
            </button>
          </div>
        </div>
      </div>

      {/* Submit Message */}
      {/* {showSubmitAlert && (
  <div className="fixed relative inset-0 z-50 h-screen flex justify-center items-center bg-blue-200 bg-opacity-30 backdrop-blur-sm transition-all ease-out scale-95 duration-300">
    <div className="flex flex-col justify-center items-center w-[300px] md:w-[600px] bg-white p-5 rounded-xl shadow-lg scale-100 opacity-100 animate-fade-in">
      <img src={submitalert} className="w-40 mx-auto" alt="" />
      <p className="text-black mt-4 text-center">
        Are you sure you want to submit the test?
      </p>
      <div className="flex justify-end gap-10 my-5">
        <button
          onClick={() => setShowSubmitAlert(false)}
          className="bg-white cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-full"
        >
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-full">
          Submit
        </button>
      </div>
    </div>
  </div>
)} */}

      {/* Cancel Message */}
      {/* {showCancelAlert && (
  <div className="fixed inset-0 z-50 h-screen flex justify-center items-center bg-blue-200 bg-opacity-30 backdrop-blur-sm transition-all ease-out scale-95 duration-300">
    <div className="flex flex-col justify-center items-center w-[300px]  md:w-[600px] bg-white p-5 rounded-xl shadow-lg scale-100 opacity-100 animate-fade-in">
      <img src={submitalert} className="w-40 mx-auto" alt="" />
      <p className="text-black text-center mt-4">
        If you leave this page, your work will not be saved or submitted. Are you sure?
      </p>
      <div className="flex items-center justify-end gap-10 my-5">
        <button className="bg-white hover:bg-red-600 text-red-600 hover:text-white border border-red-600 font-bold py-2 px-4 cursor-pointer rounded-full">
          Continue
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-full">
          Leave
        </button>
      </div>
    </div>
  </div>
)} */}
    </div>
  );
};

export default TestInterface;
