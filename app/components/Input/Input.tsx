import React, { InputHTMLAttributes } from "react";


type InputType = 'text' | 'email';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
     type: InputType;
    label?: string;
    errorMessage?: string;

}

const Input: React.FC<Input> = ({type = 'text', label, errorMessage, ...props}) => {

    return (
        <div className="mb-4">
        {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
        <input
            type={type}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props}
        />
        {errorMessage && <span className="text-red-500 text-xs italic">{errorMessage}</span>}
    </div>
    )
}


export default Input