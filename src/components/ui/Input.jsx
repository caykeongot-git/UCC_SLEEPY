import React from 'react';
import { cn } from '../../utils/cn';

const Input = ({ label, error, className, id, ...props }) => {
  return (
    <div className="w-full space-y-2 text-left">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-xs font-bold uppercase tracking-wider text-light-500"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-md outline-none transition-all",
          "focus:border-primary-500 text-light-100 placeholder:text-light-500",
          error && "border-error focus:border-error",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-error mt-1 font-bold italic uppercase tracking-widest">{error}</p>
      )}
    </div>
  );
};

export default Input;
