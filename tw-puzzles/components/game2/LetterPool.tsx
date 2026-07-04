'use client';

import { motion } from 'framer-motion';

interface LetterPoolProps {
  letters: string[];
  usedLetters: Set<number>;
  onLetterClick: (index: number) => void;
}

export default function LetterPool({ letters, usedLetters, onLetterClick }: LetterPoolProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
      {letters.map((letter, index) => {
        const isUsed = usedLetters.has(index);
        
        return (
          <motion.button
            key={index}
            whileHover={{ scale: isUsed ? 1 : 1.05 }}
            whileTap={{ scale: isUsed ? 1 : 0.95 }}
            onClick={() => !isUsed && onLetterClick(index)}
            disabled={isUsed}
            className={`
              w-14 h-14 text-2xl font-bold rounded-lg
              transition-all duration-200
              ${isUsed 
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600'
              }
              border-2 ${isUsed ? 'border-gray-300 dark:border-gray-600' : 'border-blue-200 dark:border-gray-600'}
              uppercase
            `}
          >
            {letter}
          </motion.button>
        );
      })}
    </div>
  );
}