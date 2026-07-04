'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputAreaProps {
  currentWord: string;
  onAddLetter: (letter: string) => void;
  onRemoveLetter: () => void;
  onSubmitWord: () => void;
  onClear: () => void;
}

export default function InputArea({
  currentWord,
  onAddLetter,
  onRemoveLetter,
  onSubmitWord,
  onClear,
}: InputAreaProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      if (key === 'ENTER') {
        e.preventDefault();
        onSubmitWord();
        return;
      }
      
      if (key === 'BACKSPACE') {
        e.preventDefault();
        onRemoveLetter();
        return;
      }
      
      if (key.match(/^[A-Z]$/)) {
        e.preventDefault();
        onAddLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAddLetter, onRemoveLetter, onSubmitWord]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Current word display */}
        <div className="flex-1">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={currentWord}
              readOnly
              className="w-full px-4 py-3 text-2xl font-bold text-center uppercase
                bg-gray-50 dark:bg-gray-700 rounded-lg
                border-2 border-gray-200 dark:border-gray-600
                focus:outline-none focus:border-blue-500
                transition-colors duration-200"
              placeholder="Type your word..."
            />
            <AnimatePresence>
              {currentWord && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1"
                >
                  {currentWord.length}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Clear word"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmitWord}
            disabled={!currentWord}
            className={`px-6 py-3 font-semibold rounded-lg transition-all
              ${currentWord 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
          >
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
}