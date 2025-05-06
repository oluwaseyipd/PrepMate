import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showStartTestPrompt, setShowStartTestPrompt] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);


  return (
    <ModalContext.Provider value={{ 
      showSubmitAlert, 
      setShowSubmitAlert, 
      showCancelAlert, 
      setShowCancelAlert, 
      showStartTestPrompt, 
      setShowStartTestPrompt, 
      selectedCourseId,
      setSelectedCourseId, }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
