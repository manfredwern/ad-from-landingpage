import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-700 focus:outline-none disabled:bg-slate-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
