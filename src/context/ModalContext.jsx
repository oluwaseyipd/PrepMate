import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <ModalContext.Provider value={{ showSubmitAlert, setShowSubmitAlert, showCancelAlert, setShowCancelAlert }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
