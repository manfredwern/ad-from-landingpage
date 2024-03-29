import React, { InputHTMLAttributes } from 'react';

type InputType = 'text' | 'email';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  type: InputType;
  label?: string;
  errorMessage?: string | null;
}

export const Input: React.FC<Input> = ({ type = 'text', label, errorMessage, ...props }) => {
  return (
    <div className="mb-4">
      <label>
        {label && <p className="mb-2 block text-sm font-bold text-gray-700">{label}</p>}
        <input type={type} className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" {...props} />
      </label>
      {errorMessage?.length && <span className="text-xs italic text-red-500">{errorMessage}</span>}
    </div>
  );
};
