import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const RevenueStat = () => {
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
  
  // Revenue data
  const yearlyData = [
    { month: 'Jan', income: 42000, expense: 25000 },
    { month: 'Feb', income: 54000, expense: 20000 },
    { month: 'Mar', income: 40000, expense: 18000 },
    { month: 'Apr', income: 48000, expense: 42000 },
    { month: 'May', income: 35000, expense: 30000 },
    { month: 'Jun', income: 42000, expense: 25000 },
    { month: 'Jul', income: 48000, expense: 30000 },
    { month: 'Aug', income: 43000, expense: 25000 },
    { month: 'Sep', income: 54000, expense: 22000 },
    { month: 'Oct', income: 40000, expense: 20000 },
    { month: 'Nov', income: 48000, expense: 42000 },
    { month: 'Dec', income: 35000, expense: 30000 }
  ];
  
  const quarterlyData = [
    { month: 'Q1', income: 45000, expense: 21000 },
    { month: 'Q2', income: 53000, expense: 32000 },
    { month: 'Q3', income: 48000, expense: 26000 },
    { month: 'Q4', income: 58000, expense: 31000 }
  ];
  
  const monthlyData = [
    { month: 'Week 1', income: 12000, expense: 6000 },
    { month: 'Week 2', income: 10000, expense: 8000 },
    { month: 'Week 3', income: 14000, expense: 7000 },
    { month: 'Week 4', income: 11000, expense: 5000 }
  ];
  
  const weeklyData = [
    { month: 'Mon', income: 2800, expense: 1200 },
    { month: 'Tue', income: 3200, expense: 1500 },
    { month: 'Wed', income: 3500, expense: 1800 },
    { month: 'Thu', income: 3000, expense: 1400 },
    { month: 'Fri', income: 3800, expense: 1600 },
    { month: 'Sat', income: 2500, expense: 800 },
    { month: 'Sun', income: 1500, expense: 400 }
  ];
  
  // Select data based on timeFrame
  const getChartData = () => {
    switch(timeFrame) {
      case 'Quarterly': return quarterlyData;
      case 'Monthly': return monthlyData;
      case 'Weekly': return weeklyData;
      default: return yearlyData;
    }
  };
  
  // Format currency values
  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <div className='bg-white shadow-sm rounded-lg p-4 border mt-10'>
      <div className='flex flex-col md:flex-row gap-3 justify-between md:items-center mb-5'>
        <h3 className="text-lg text-black font-semibold">
          Revenue Generate</h3>
        
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-600 mr-4">Income</span>
            <div className="w-3 h-3 rounded-full bg-blue-200 mx-2"></div>
            <span className="text-gray-600">Expense</span>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              className="px-4 py-1 text-black border border-gray-300 cursor-pointer rounded-md flex items-center bg-white"
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
                  {['Yearly', 'Quarterly', 'Monthly', 'Weekly'].map((option) => (
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
          <BarChart
            data={getChartData()}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e0e0e0" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value/1000}k`}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            />
            <Tooltip 
              formatter={(value) => [`${formatCurrency(value)}`, undefined]}
              labelFormatter={(label) => label}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Bar 
              dataKey="income" 
              fill="#3b82f6" 
              radius={[0, 0, 0, 0]} 
              maxBarSize={50}
            />
            <Bar 
              dataKey="expense" 
              fill="#bfdbfe" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueStat;