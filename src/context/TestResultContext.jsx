import { createContext, useContext, useState } from "react";

const TestResultContext = createContext();

export const TestResultProvider = ({ children }) => {
  const [testResult, setTestResult] = useState(null);
  

  return (
    <TestResultContext.Provider value={{ testResult, setTestResult }}>
      {children}
    </TestResultContext.Provider>
  );
};

export const useTestResult = () => useContext(TestResultContext);
