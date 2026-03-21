import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

const Select = ({ label, options = [], error, className, id, ...props }) => {
  return (
    <div className="w-full space-y-2 text-left">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-light-500">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            "w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-md outline-none appearance-none transition-all",
            "focus:border-primary-500 text-light-100",
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-dark-800">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-light-500">
          <ChevronDown size={18} />
        </div>
      </div>
      {error && <p className="text-[10px] text-error mt-1 font-bold italic">{error}</p>}
    </div>
  );
};

export default Select;
