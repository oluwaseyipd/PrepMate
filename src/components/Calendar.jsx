import { useState } from 'react';

const Calendar = () => {
 const today = new Date();
const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth()));
const [selectedDate, setSelectedDate] = useState(today);

  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = 
        selectedDate && 
        day === selectedDate.getDate() && 
        currentMonth.getMonth() === selectedDate.getMonth() && 
        currentMonth.getFullYear() === selectedDate.getFullYear();
      
      days.push(
        <div 
          key={day} 
          onClick={() => handleDateClick(day)}
          className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer mx-auto
            ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header with month and navigation */}
      <div className="flex items-center justify-between mb-4 bg-blue-50 p-1 rounded-full">
        <button 
          onClick={handlePrevMonth}
          className="p-1 rounded-full bg-white cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="font-semibold text-lg text-black">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        
        <button 
          onClick={handleNextMonth}
          className="p-1 rounded-full bg-white cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-2 border border-gray-400 rounded-sm">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-black font-medium text-sm py-3">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-2 text-gray-600">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;