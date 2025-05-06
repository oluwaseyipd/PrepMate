import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";

const TakeTest = () => {
  const { setShowStartTestPrompt } = useModal();

  return (
    <div className="p-5 relative">
      {/* Take test button */}
      <div className="flex justify-between items-center">
        <button
         onClick={() => setShowStartTestPrompt(true)}
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded mt-4 transition duration-300">
          Take a test
        </button>
      </div>
    </div>
  );
};

export default TakeTest;
