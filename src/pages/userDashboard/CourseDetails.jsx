import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import courseImage from "../../assets/images/courses/calculus.jpg";
import avater from "../../assets/images/courseAuthor/avater.png";
import { courses } from '../../constants/courses';
import { MarsStroke, Share2, Star } from 'lucide-react';


export class CourseDetails extends Component {
  render() {
    return (
        <div className="p-4">
      <h1 className="text-3xl text-black font-bold mb-4">Course Details</h1>
      <div className="bg-trnasparent flex flex-col md:flex-row my-2 gap-4"> 
       
        <div className='flex flex-col w-full md:w-2/3 bg-white p-5 rounded-lg shadow-md'>
       
            <div className='flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center'>
                <div className='flex flex-col justify-start gap-2'>
                    <h2 className='text-2xl md:text-3xl text-black'>Calculus and Probability</h2>
                    <p className='text-black text-lg'>Prof. Adenuga Philip</p>
                </div>

                <div className='flex items-center gap-4 mt-3 md:mt-0'>
                <span className='py-1 px-4 bg-blue-200 text-blue-500 rounded-full text-sm '>Mathematics</span>
                <Share2 className='text-gray-700 cursor-pointer' size={25} />
                <Link> 
                  <button className="mt-2 px-6 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300">
                                Add Course
                  </button>
                  </Link>
                </div>
                
            </div>
            <div className='h-[250px] md:h-[500px] flex justify-start overflow-hidden rounded-sm items-center gap-3 mt-3'>
                 <img src={courseImage} className='mt-4 w-full object-cover' alt="" />
            </div>

            <div className='flex flex-col justify-start gap-3 mt-4 pb-6 border-b-1 border-gray-300'>
                <h2 className='text-black text-xl font-bold'>About the Course</h2>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore voluptatum veniam laborum vero, recusandae iure debitis delectus nisi dignissimos laboriosam, dolore ad. Inventore a illum officiis itaque, tenetur numquam accusamus facilis quidem optio, iste minima voluptate quam dicta quis? Perspiciatis, facere ratione soluta alias veniam saepe voluptates accusantium eius.</p>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore voluptatum veniam laborum vero, recusandae iure debitis delectus nisi dignissimos laboriosam, dolore ad. Inventore a illum officiis itaque, tenetur numquam accusamus facilis quidem optio, iste minima voluptate quam dicta quis? Perspiciatis, facere ratione soluta alias veniam saepe voluptates accusantium eius.</p>

            </div>

            <div className='flex flex-col justify-start gap-3 mt-5 pb-6 border-b-1 border-gray-300'>
                <h2 className='text-black text-xl font-bold'>Course Content</h2>
                <div className='flex justify-start gap-5'>
                <ul>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                </ul>

                <ul className='ml-5'>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                    <li className='flex gap-3 py-2'>
                        <MarsStroke className='text-blue-500' size={20} />
                        <p className='text-gray-600'>Introduction to Calculus</p>
                    </li>
                </ul>

                </div>          
            </div>

            <div className='flex flex-col justify-start gap-3 mt-5 pb-6'>
                <h2 className='text-black text-xl font-bold'>Author</h2>
                <div className='flex justify-start items-center gap-2'>
                    <img src={avater} className='w-10 h-10 rounded-full' alt="" />
                    <div>
                        <h2 className='text-black font-medium'>Charles Clear</h2>
                        <p className='text-gray-500 text-sm'>Mathematics Teacher</p>
                        <div className='flex items-center gap-1'>
                            <Star className='text-yellow-500' size={15} />
                            <span className='text-sm text-black'>4.5</span>
                            <span className='text-sm text-black'>(75)</span>
                        </div>
                    </div>
                </div>

            </div>
           
        </div>

        <div className='flex flex-col w-full md:w-1/3 bg-transparent '>
            <div className='flex flex-col justify-start gap-3 p-5 bg-white rounded-lg shadow-md'>
                <h2 className='text-black text-xl font-bold'>Course Details</h2>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Total Questions:</p>
                    <span className='text-gray-600'>50</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Duration:</p>
                    <span className='text-gray-600'>25 mins</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Rating:</p>
                    <span className='text-gray-600'>4.5 (75)</span>
                </div>

            </div>
            <div className='flex flex-col justify-start gap-3 mt-5 p-5 bg-white rounded-lg shadow-md'>
                <h2 className='text-black text-xl font-bold'>Course Details</h2>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Total Questions:</p>
                    <span className='text-gray-600'>50</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Duration:</p>
                    <span className='text-gray-600'>25 mins</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <p className='text-gray-500 text-sm'>Rating:</p>
                    <span className='text-gray-600'>4.5 (75)</span>
                </div>

            </div>
        </div>
        
      </div> 
      
      
      </div>
    )
  }
}

export default CourseDetails