import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {className = '', ...props },
  ref
) {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`w-full px-4 py-2 rounded border border-gray-300 focus:border-primary-red focus:ring-1 focus:ring-primary-red focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;