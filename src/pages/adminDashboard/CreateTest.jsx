import React, { useState } from "react";
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

const CreateTest = () => {
  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Resources</h1>
        <div className="flex items-center justify-between gap-4 mt-5 md:mt-0">
          <Link
            to="/admin/createtest"
            className=" bg-blue-200 text-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
          >
            <span>Save as Draft</span>
          </Link>
          <Link
            to="/admin/createtest"
            className=" bg-blue-300 cursor-default text-white px-4 py-2 rounded-full transition duration-300"
          >
            <span>Publish Test</span>
          </Link>
        </div>
      </div>

      {/* Process Progress */}

      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center justify-center gap-3 w-[300px] h-15 bg-white">
          <span className="h-4 w-4 bg-transparent border border-gray-500 rounded-full"></span>
          <p className="text-black text-lg">Test Details</p>
          <ArrowRight size={23} className="text-black"></ArrowRight>
        </div>
        <div className="flex items-center justify-center gap-3 w-[300px] h-15 bg-white">
          <span className="h-4 w-4 bg-transparent border border-gray-500 rounded-full"></span>
          <p className="text-black text-lg">About Test</p>
          <ArrowRight size={23} className="text-black"></ArrowRight>
        </div>
        <div className="flex items-center justify-center gap-3 w-[300px] h-15 bg-white">
          <span className="h-4 w-4 bg-transparent border border-gray-500 rounded-full"></span>
          <p className="text-black text-lg">Create Quiz</p>
          <ArrowRight size={23} className="text-black"></ArrowRight>
        </div>
        <div className="flex items-center justify-center gap-3 w-[300px] h-15 bg-white">
          <span className="h-4 w-4 bg-transparent border border-gray-500 rounded-full"></span>
          <p className="text-black text-lg">Publish Test</p>
          <ArrowRight size={23} className="text-black"></ArrowRight>
        </div>
      </div>

      {/* Course Detail Frame */}
      <div className="mt-6 bg-white rounded-xl flex flex-col shadow-sm">
        {/* Frame 1 */}
        <div>
          <h3 className="text-lg text-black p-5">Test Details </h3>
          <hr className="border-b-1 border-gray-300" />
          <div className="flex flex-col md:flex-row gap-5 p-5">
            <div className="flex flex-col">
              <div className="flex items-center mb-5">
                <h3 className="text-black text-xl">Thumbnail Image</h3>
                <p className="text-gray-600 ml-2">(Required)</p>
              </div>
              <div className="w-[330px] md:w-[400px] h-[200px] bg-blue-50 hover:bg-blue-100 cursor-pointer border border-blue-300 rounded-xl p-7 flex flex-col justify-center items-center">
                <PictureInPicture
                  size={50}
                  className="text-black"
                ></PictureInPicture>
                <p className="text-black text-lg font-semibold">
                  Drag or <span className="text-blue-600">Browse</span>
                </p>
                <p className="text-black text-sm font-light">
                  PNG, JPEG (max 5mb size)
                </p>
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
              <div className="flex gap-5 just-between md:justify-end">
                <Link
                  to="/admin/createtest"
                  className=" bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
                >
                  <span>Cancel</span>
                </Link>
                <Link
                  to="/admin/createtest"
                  className=" bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  <span>Continue</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Frame 2 */}
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
          <div className="flex gap-5 just-between md:justify-end p-5">
            <Link
              to="/admin/createtest"
              className=" bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
            >
              <span>Back</span>
            </Link>
            <Link
              to="/admin/createtest"
              className=" bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <span>Continue</span>
            </Link>
          </div>
        </div>

        {/* Frame 3 */}
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
              <Link
                to="/admin/createtest"
                className=" bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                <span>Clear</span>
              </Link>
              <Link
                to="/admin/createtest"
                className=" bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <span>Add Question</span>
              </Link>
            </div>

            <div className="flex gap-5 md:justify-end p-5">
              <Link
                to="/admin/createtest"
                className=" bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                <span>Back</span>
              </Link>
              <Link
                to="/admin/createtest"
                className=" bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <span>Continue</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Frame 4 */}
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

            <div className="flex gap-5 md:justify-end p-5">
              <Link
                to="/admin/createtest"
                className=" bg-transparent text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:text-white hover:bg-blue-600 transition duration-300"
              >
                <span>Back</span>
              </Link>
              <Link
                to="/admin/createtest"
                className=" bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <span>Publish</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
