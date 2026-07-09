'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WordInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  currentWord?: string;
}

export default function WordInput({
  value,
  onChange,
  onSubmit,
  disabled,
  currentWord,
}: WordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        e.preventDefault();
        onSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSubmit, disabled]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {/* Input field */}
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className={`
                w-full px-4 py-3 text-2xl font-bold uppercase
                bg-gray-50 dark:bg-gray-700 rounded-lg
                border-2 transition-all duration-200
                ${isFocused 
                  ? 'border-blue-500 shadow-outline-blue' 
                  : 'border-gray-200 dark:border-gray-600'
                }
                focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              placeholder="Type the unscrambled word..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            disabled={disabled || !value}
            className={`
              px-8 py-3 font-semibold rounded-lg transition-all
              ${!disabled && value 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Submit
          </motion.button>
        </div>

        {/* Hint or instructions */}
        {currentWord && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>💡 Hint: </span>
            <span className="font-mono">
              {currentWord.slice(0, 3)}... ({currentWord.length} letters)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}