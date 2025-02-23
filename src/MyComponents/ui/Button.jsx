import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-white font-bold rounded-xl transition-all hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
