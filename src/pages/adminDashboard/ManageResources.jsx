import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, PictureInPicture } from "lucide-react";

const CreateTest = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Test Details" },
    { id: 2, label: "About Test" },
    { id: 3, label: "Create Quiz" },
    { id: 4, label: "Publish Test" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Resources</h1>
        <div className="flex items-center justify-between gap-4 mt-5 md:mt-0">
          <Link
            to="#"
            className="bg-blue-200 text-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
          >
            Save as Draft
          </Link>
          <Link
            to="#"
            className="bg-blue-300 cursor-default text-white px-4 py-2 rounded-full transition duration-300"
          >
            Publish Test
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between md:justify-center gap-2 mb-10 overflow-x-auto">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center ${
              currentStep === step.id || currentStep > step.id
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <div
              className={`flex items-center justify-center rounded-full border-2 ${
                currentStep > step.id
                  ? "bg-blue-600 text-white"
                  : currentStep === step.id
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-400 text-gray-400"
              } w-8 h-8`}
            >
              {step.id}
            </div>
            <div className="hidden md:flex flex-col items-center mx-2">
              <p
                className={`text-sm ${
                  currentStep === step.id
                    ? "text-blue-600"
                    : currentStep > step.id
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            </div>
            {index !== steps.length - 1 && (
              <ArrowRight className="w-5 h-5" />
            )}
          </div>
        ))}
      </div>

      {/* Frames */}
      <div className="mt-6 bg-white rounded-xl flex flex-col shadow-sm p-5">
        {currentStep === 1 && (
          <div>
            <h3 className="text-lg text-black mb-5">Test Details</h3>
            {/* Test Details Form */}
            {/* Your existing form code for Test Details here */}
            <div className="flex gap-5 justify-end">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-lg text-black mb-5">About Test</h3>
            {/* About Test Form */}
            {/* Your existing form code for About Test here */}
            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBack}
                className="bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-lg text-black mb-5">Create Quiz</h3>
            {/* Create Quiz Form */}
            {/* Your existing form code for Create Quiz here */}
            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBack}
                className="bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-lg text-black mb-5">Publish Test</h3>
            {/* Publish Test final summary form */}
            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBack}
                className="bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTest;
