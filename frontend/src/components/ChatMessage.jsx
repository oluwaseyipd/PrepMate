import React from 'react';
import { FaRobot, FaUser } from "react-icons/fa6";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";
  
  return (
    <div className={`message flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      {isBot ? (
        <div className="flex gap-3 max-w-[80%]">
          <div className="shrink-0">
            <FaRobot size={18} className='text-white bg-blue-600 w-10 h-10 p-2.5 rounded-full' />
          </div>
          <div className="bg-blue-100 text-sm text-black px-4 py-3 rounded-xl whitespace-pre-line break-words">
            {chat.text}
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse gap-3 max-w-[80%]">
          <div className="shrink-0">
            <FaUser size={18} className='text-white bg-green-600 w-10 h-10 p-2.5 rounded-full' />
          </div>
          <div className="bg-blue-600 text-sm text-white px-4 py-3 rounded-xl whitespace-pre-line break-words">
            {chat.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;