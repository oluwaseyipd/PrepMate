import React, { createContext, useContext, useState } from "react";

const TestHistoryContext = createContext();

export const TestHistoryProvider = ({ children }) => {
  const [completedTests, setCompletedTests] = useState(() => {
    const stored = localStorage.getItem("completedTests");
    return stored ? JSON.parse(stored) : [];
  });

  const addCompletedTest = (test) => {
    const updated = [...completedTests, test];
    setCompletedTests(updated);
    localStorage.setItem("completedTests", JSON.stringify(updated));
  };

  return (
    <TestHistoryContext.Provider value={{ completedTests, addCompletedTest }}>
      {children}
    </TestHistoryContext.Provider>
  );
};

export const useTestHistory = () => useContext(TestHistoryContext);
