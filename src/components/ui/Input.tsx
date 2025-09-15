import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-0 py-4 text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
