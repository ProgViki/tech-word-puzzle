'use client';

import { motion } from 'framer-motion';

interface ScrambledWordProps {
  word: string;
  index: number;
  isFound: boolean;
  hint?: string;
  onRevealHint?: () => void;
}

export default function ScrambledWord({
  word,
  index,
  isFound,
  hint,
  onRevealHint,
}: ScrambledWordProps) {
  const letters = word.split('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        p-4 rounded-xl transition-all duration-300
        ${isFound 
          ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg'
        }
        border-2 shadow-sm
      `}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Word letters */}
        <div className="flex gap-1">
          {letters.map((letter, i) => (
            <motion.div
              key={i}
              className={`
                w-10 h-12 flex items-center justify-center text-xl font-bold
                ${isFound ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}
                ${!isFound ? 'hover:scale-105 transition-transform' : ''}
              `}
              whileHover={!isFound ? { scale: 1.1 } : {}}
            >
              {letter}
            </motion.div>
          ))}
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-3">
          {isFound ? (
            <div className="text-emerald-500 text-2xl">✅</div>
          ) : (
            <>
              {hint && (
                <button
                  onClick={onRevealHint}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  title="Show hint"
                >
                  💡
                </button>
              )}
              <div className="text-sm text-gray-400 dark:text-gray-500">
                #{index + 1}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Found word display */}
      {isFound && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-sm text-emerald-600 dark:text-emerald-400"
        >
          ✓ Correct!
        </motion.div>
      )}
    </motion.div>
  );
}