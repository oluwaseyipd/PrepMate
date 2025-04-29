import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import courseImage from "../../assets/images/courses/calculus.jpg";
import {
  PlusCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookIcon,
  Clock,
  Star,
  Search,
  PictureInPicture,
  MarsStroke,
} from "lucide-react";
import { bg } from "date-fns/locale";

const CreateTest = () => {

    // Progress Bar
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

    //   REcieving file
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
        setSelectedImage(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file (PNG, JPEG) under 5MB.");
      }
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
        setSelectedImage(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file (PNG, JPEG) under 5MB.");
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleClick = () => {
      inputRef.current.click();
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

      {/* Process Progress */}

      <div className="flex items-center justify-between gap-2 mb-10 overflow-x-auto transition-all duration-500">
      {steps.map((step, index) => (
          <div
          key={step.id}
          className={`flex items-center justify-center gap-3 w-[300px] h-15  ${
            currentStep === step.id || currentStep > step.id
              ? "bg-blue-600"
              : "bg-white"
          }`}
        >
              <div
              className={`flex items-center justify-center rounded-full border-2 ${
                currentStep > step.id
                  ? "bg-transparent text-white"
                  : currentStep === step.id
                  ? "border-white text-white"
                  : "border-black text-black"
              } w-8 h-8`}
            >
              {step.id}
            </div>
             <div className="hidden md:flex flex-col items-center mx-2">
             <p
  className={`text-lg ${
    currentStep === step.id
      ? "text-white"        // Current active step text = white
      : currentStep > step.id
      ? "text-white"        // Completed step text = white (fixed)
      : "text-black"        // Upcoming steps text = black
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

      {/* Course Detail Frame */}
      <div className="mt-6 bg-white rounded-xl flex flex-col shadow-sm transition-all duration-500">
        {/* Frame 1 */}
        {currentStep === 1 && (
        <div>
          <h3 className="text-lg text-black p-5">Test Details </h3>
          <hr className="border-b-1 border-gray-300" />
          <div className="flex flex-col md:flex-row gap-5 p-5">
          <div className="flex flex-col">
      <div className="flex items-center mb-5">
        <h3 className="text-black text-xl">Thumbnail Image</h3>
        <p className="text-gray-600 ml-2">(Required)</p>
      </div>

      <div
        className="w-[330px] md:w-[400px] h-[200px] bg-blue-50 hover:bg-blue-100 cursor-pointer border border-blue-300 rounded-xl p-7 flex flex-col justify-center items-center"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <PictureInPicture size={50} className="text-black" />
            <p className="text-black text-lg font-semibold">
              Drag or <span className="text-blue-600 underline">Browse</span>
            </p>
            <p className="text-black text-sm font-light">
              PNG, JPEG (max 5mb size)
            </p>
          </>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          ref={inputRef}
          className="hidden"
        />
      </div>
    </div>

            {/* Form */}
            <div className="w-full">
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Test Title
                </label>
                <input
                  type="text"
                  placeholder="Text title"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
                <div className="flex flex-col gap-3 w-1/2">
                  <label htmlFor="" className="text-black text-xl">
                    Subjet or Course{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Text title"
                    className="text-gray-700 py-1 px-3 border border-gray-400   rounded-sm w-full h-10"
                  />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                  <label htmlFor="" className="text-black text-xl">
                    Category{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Text title"
                    className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
                <div className="flex flex-col gap-3 w-1/2">
                  <label htmlFor="" className="text-black text-xl">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Text title"
                    className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                  />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                  <label htmlFor="" className="text-black text-xl">
                    Total Question
                  </label>
                  <input
                    type="text"
                    placeholder="Text title"
                    className="text-gray-700 py-1 px-3 border border-gray-400   rounded-sm w-full h-10"
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
            </div>
          </div>
        </div>
           )}

        {/* Frame 2 */}
        {currentStep === 2 && (
        <div>
          <h3 className="text-lg text-black p-5">About Test </h3>
          <hr className="border-b-1 border-gray-300" />
          <div className="flex flex-col gap-5 mb-5 w-full">
            <div className="flex flex-col gap-3 mb-5 p-5">
              <label htmlFor="" className="text-black text-xl">
                Test Description
              </label>
              <textarea
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full"
                name=""
                id=""
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="w-full md:w-2/3 px-5 mb-5">
            <label htmlFor="" className="text-black text-xl">
              Subject Content
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 ">
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
              <input
                type="text"
                placeholder="Text title"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
            </div>
          </div>
          <div className="flex gap-5 justify-end p-5">
              <button
                onClick={handleBack}
                className="bg-transparent cursor-pointer text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
        </div>
         )}

        {/* Frame 3 */}
        {currentStep === 3 && (
        <div>
          <h3 className="text-lg text-black p-5">Test Questions </h3>
          <hr className="border-b-1 border-gray-300" />
          <div className="flex flex-col p-5 ">
            {/* Question */}
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="" className="text-black text-xl">
                Question
              </label>
              <input
                type="text"
                placeholder="Type Question"
                className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
              />
            </div>

{/* Question image */}
<div className="flex flex-col gap-3 mb-5">
  <label htmlFor="questionImage" className="text-black text-xl">
    Upload Question Image <span className="text-blue-400 text-sm ml-2">(Optional)</span>
  </label>
  <input
    type="file"
    id="questionImage"
    name="questionImage"
    accept="image/*"
    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
               file:rounded-sm file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-600 file:text-white cursor-pointer
               hover:file:bg-blue-500 border border-gray-400 rounded-sm"
  />
</div>



            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 ">
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Option A
                </label>
                <input
                  type="text"
                  placeholder="Option A"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Option B
                </label>
                <input
                  type="text"
                  placeholder="Option B"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Option C
                </label>
                <input
                  type="text"
                  placeholder="Option C"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Option D
                </label>
                <input
                  type="text"
                  placeholder="Option D"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>
            </div>

            {/* Correct Answer */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Correct Answer
                </label>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full h-10"
                />
              </div>
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="" className="text-black text-xl">
                  Explanation
                </label>
                <textarea
                  type="text"
                  placeholder="Text title"
                  className="text-gray-700 py-1 px-3 border border-gray-400  rounded-sm w-full"
                  name=""
                  id=""
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-5 justify-start p-5">
              <button
               
                className=" bg-transparent text-blue-600 border cursor-pointer border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                <span>Clear</span>
              </button>
              <button
                
                className=" bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-blue-600 transition duration-300"
              >
                <span>Add Question</span>
              </button>
            </div>

            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBack}
                className="bg-transparent text-blue-600 border cursor-pointer border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-blue-600 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
         )}

        {/* Frame 4 */}
        {currentStep === 4 && (
        <div>
          <h3 className="text-lg text-black p-5">Course Overview </h3>
          <hr className="border-b-1 border-gray-300" />
          <div className="p-5">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h1 className="text-black text-xl mb-3">Course Title</h1>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2 justify-center items-center">
                    <BookIcon className="text-blue-500" size={15} />
                    <span className="text-sm text-gray-600">
                      Total Question
                    </span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <Clock className="text-blue-500" size={15} />
                    <span className="text-sm text-gray-600">Duration</span>
                  </div>
                </div>
              </div>

              <span className="py-1 px-4 rounded-full text-sm bg-blue-100 text-blue-600">
                Category
              </span>
            </div>
            <div className="h-[250px] md:h-[500px] mt-4">
              <img
                src={courseImage}
                className="w-full h-full object-cover rounded-sm"
                alt=""
              />
            </div>

            <div className="mt-5">
              <h3 className="text-black text-xl mb-3">About the Course</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptatibus, quisquam, voluptatibus, quisquam,
                voluptatibus, quisquam, voluptatibus, quisquam, voluptatibus,
                quisquam, voluptatibus, quisquam, voluptatibus, quisquam,
                voluptatibus, quisquam, voluptatibus, quisquam, voluptatibus.
              </p>
            </div>

            <div className="mt-5 w-full md:w-1/2">
              <h3 className="text-black text-xl mb-3">Course Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 1</p>
                </div>
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 2</p>
                </div>
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 3</p>
                </div>
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 4</p>
                </div>
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 5</p>
                </div>
                <div className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">Content 6</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBack}
                className="bg-transparent text-blue-600 border cursor-pointer border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                Back
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-green-600 transition duration-300"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
         )}
      </div>
    </div>
  );
};

export default CreateTest;
