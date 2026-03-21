import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20',
    secondary: 'bg-dark-700 text-light-100 hover:bg-dark-600 border border-dark-600',
    danger: 'bg-error text-white hover:opacity-90 shadow-lg shadow-error/20',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10',
    ghost: 'text-light-300 hover:text-light-100 hover:bg-dark-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm font-medium',
    lg: 'px-8 py-3 text-base font-bold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
