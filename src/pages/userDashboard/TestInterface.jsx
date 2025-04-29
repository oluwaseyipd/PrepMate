import React from 'react';
import { useState, useEffect } from 'react';
import questionimage from '../../assets/images/questionimage.jpg';
import submitalert from '../../assets/images/are-you-sure.png';
import { Chevron } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {testquestions} from '../../constants/testquestion';

const TestInterface  = () => {
  return (
    <div className='p-5'>

      <div className='flex flex-col md:flex-row gap-10'>

     
        <div className='flex flex-col gap-5 w-full md:w-2/3'>
           {/* Test Information frame */}
        <div className='flex flex-wrap md:flex-nowrap items-center gap-10'>
                      {/* Subject Title */}
          <div className='flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md'>
            <h2 className='text-blue-600 font-bold text-xl md:text-2xl'>Subject</h2>
            <p className='text-black'>Mathematics</p>
          </div>
                    {/* Test Score */}
                    <div className='flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md'>
            <h2 className='text-blue-600 font-bold text-xl md:text-2xl'>Total Score</h2>
            <p className='text-black'>40 Marks</p>
          </div>

          {/* Total Time */}
          <div className='flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md'>
            <h2 className='text-blue-600 font-bold text-xl md:text-2xl'>Total TIme</h2>
            <p className='text-black'>30 Minutes</p>
          </div>

                      {/* Remaining Time */}
            <div className='flex flex-col gap-1 bg-white p-2 md:p-5 rounded-lg shadow-md'>
            <h2 className='text-blue-600 font-bold text-xl md:text-2xl'>Time Remaining</h2>
            <p className='text-black font-bold text-3xl'>30:00</p>
            </div>

          </div>


          {/* Question and Option frame */}
          <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
          <div className='flex justify-center items-center gap-2 bg-white p-5 rounded-lg'>
            <h2 className='text-blue-600 font-bold text-xl md:text-3xl'>Question: </h2>
            <p className='text-blue-600 font-bold text-xl md:text-3xl'>1</p>
          </div>
            {/* Question */}
          <div className='flex flex-col gap-3 mb-5'>
            <p className='text-black mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolore consequatur iste porro. Facilis iusto accusamus perferendis vel minima esse.</p>
            <img src={questionimage} className='w-auto md:w-1/2 justify-center mx-auto' alt="" />
          </div>
          {/* Options */}
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
              <input type="radio" name="option" id="option1" />
              <span className='text-black text-lg'>A. </span>
              <label htmlFor="option1" className='text-black'>Option 1</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input type="radio" name="option" id="option2" />
              <span className='text-black text-lg'>B. </span>
              <label htmlFor="option2" className='text-black'>Option 2</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input type="radio" name="option" id="option3" />
              <span className='text-black text-lg'>C. </span>
              <label htmlFor="option3" className='text-black'>Option 3</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input type="radio" name="option" id="option4" />
              <span className='text-black text-lg'>D. </span>
              <label htmlFor="option4" className='text-black'>Option 4</label>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className='flex items-center justify-center md:justify-end gap-10 mt-5'>
            <button className='flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded transition duration-300'>
            <ChevronLeft className='text-white' size={20} />
                Previous
            </button>
            <button className='flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded transition duration-300'>
                Next
                <ChevronRight className='text-white' size={20} />
            </button>
          </div>
          </div>
          </div>


        <div className='flex flex-col gap-5 w-full md:w-1/3'>
            {/* Question Tracking frame */}
            <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
            <h2 className='text-blue-600 font-bold text-2xl'>Total Question</h2>
            <div className='flex flex-wrap md:grid md:grid-cols-6 gap-5'>
              <span className='h-8 w-8 md:h-12 md:w-12  flex justify-center items-center bg-blue-600 border-2 border-blue-600 text-white text-lg cursor-pointer p-2'>1</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>2</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>3</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>4</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>5</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>6</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>7</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>8</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>9</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>10</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>11</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>12</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>13</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>14</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>15</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>16</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>17</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>18</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>19</span>
              <span className='h-8 w-8 md:h-12 md:w-12 flex justify-center items-center bg-transparent border-2 border-blue-300 text-blue-400 text-lg cursor-pointer p-2'>20</span>
            </div>

            <button className='mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded transition duration-300'>
                Finished
            </button>
            </div>
        </div>

      </div>
      
      {/* Submit Message */}
      {/* <div className='flex flex-col justify-center items-center h-[300px] w-[600px] gap-2 bg-white p-5 rounded-lg shadow-md'>
       <img src={submitalert} className='w-40 mx-auto' alt="" />
        <p className='text-black'>Are you sure you want to submit the test?</p>
        <div className='flex items-center justify-end gap-10 my-5'>
          <button className='flex justify-center items-center bg-white hover:bg-blue-700 text-blue-600 hover:text-white border border-blue-600 font-bold py-2 px-4 cursor-pointer rounded-full transition duration-300'>
              Cancel
          </button>
          <button className='flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-full transition duration-300'>
              Submit
          </button>
        </div>
      </div> */}


        {/* Cancel Message */}
        {/* <div className='flex flex-col justify-center items-center h-[300px] w-[600px] gap-2 bg-white p-5 rounded-lg shadow-md'>
       <img src={submitalert} className='w-40 mx-auto' alt="" />
        <p className='text-black text-center px-5'>If you leave this page, your work will not be saved or submited. Are you sure you want to leave?</p>
        <div className='flex items-center justify-end gap-10 my-5'>
          <button className='flex justify-center items-center bg-white hover:bg-red-600 text-red-600 hover:text-white border border-red-600 font-bold py-2 px-4 cursor-pointer rounded-full transition duration-300'>
              Contimue
          </button>
          <button className='flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-full transition duration-300'>
              Leave
          </button>
        </div>

      </div> */}
      </div>

  )
}

export default TestInterface 
