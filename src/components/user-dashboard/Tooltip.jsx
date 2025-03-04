import React from "react";

const Tooltip = ({ text }) => {
  return (
    <div className="absolute left-20 bg-blue-900 text-white p-2 rounded-md shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  );
};

export default Tooltip;
