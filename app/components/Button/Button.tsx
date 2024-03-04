import React, { ButtonHTMLAttributes } from 'react';

// Define props for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add custom props specific to your app here
}

// Create the Button component
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-slate-400" {...props}>
      {children}
    </button>
  );
};

export default Button;
