import React, { createContext, useContext, useState } from 'react';

const TestResultContext = createContext();

export const TestResultProvider = ({ children }) => {
  const [testResult, setTestResult] = useState({
    score: 0,
    correctAnswers: [],
    wrongAnswers: [],
    timeTaken: 0,
    submitted: false,
    testId: null,
  });

  const updateTestResult = (updates) => {
    setTestResult(prev => ({ ...prev, ...updates }));
  };

  const resetTestResult = () => {
    setTestResult({
      score: 0,
      correctAnswers: [],
      wrongAnswers: [],
      timeTaken: 0,
      submitted: false,
      testId: null,
    });
  };

  return (
    <TestResultContext.Provider value={{ testResult, updateTestResult, resetTestResult }}>
      {children}
    </TestResultContext.Provider>
  );
};

export const useTestResult = () => useContext(TestResultContext);
