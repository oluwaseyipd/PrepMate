import React, { useState, useRef, useEffect } from 'react';
import { yearlyData, monthlyData, weeklyData, dailyData } from "../../constants/analyticsData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';


const StudyStat = () => {
  const [timeFrame, setTimeFrame] = useState('Yearly');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Select data based on timeFrame
  const getChartData = () => {
    switch(timeFrame) {
      case 'Monthly': return monthlyData;
      case 'Weekly': return weeklyData;
      case 'Today': return dailyData;
      default: return yearlyData;
    }
  };

  // Get proper label for Y-axis based on timeFrame
  const getYAxisLabel = () => {
    return timeFrame === 'Today' ? 'Hours' : 'Hours';
  };
  
  return (
    <div className='bg-white shadow-sm rounded-lg p-4 border mt-10'>
      <div className='flex flex-col md:flex-row gap-3 justify-between md:items-center mb-5'>
        <h3 className="text-lg text-black font-semibold">
          Performance Statistics
        </h3>
        
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center mr-6">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className='text-black'>Study</span>
            <div className="w-3 h-3 rounded-full bg-teal-400 mx-2 ml-4"></div>
            <span className='text-black'>Test</span>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              className="px-4 py-1 border text-black cursor-pointer border-gray-300 rounded-md flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{timeFrame}</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul>
                  {['Yearly', 'Monthly', 'Weekly', 'Today'].map((option) => (
                    <li 
                      key={option} 
                      className={`px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-100 ${timeFrame === option ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => {
                        setTimeFrame(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add a fixed height to this container */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getChartData()}
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#63B3ED" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#63B3ED" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorTest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d6d6d6" />
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}Hr`}
              domain={[0, 'auto']}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} // Increments of 10
              label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: -5 }}
            />
            <Tooltip 
              formatter={(value) => [`${value} hours`, undefined]}
              labelFormatter={(label) => `${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="study" 
              stroke="#63B3ED" 
              fillOpacity={1} 
              fill="url(#colorStudy)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="test" 
              stroke="#4FD1C5" 
              fillOpacity={1} 
              fill="url(#colorTest)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StudyStat;