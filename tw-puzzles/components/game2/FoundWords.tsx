'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface FoundWordsProps {
  foundWords: string[];
  allPossibleWords: string[];
  onWordClick?: (word: string) => void;
}

export default function FoundWords({ foundWords, allPossibleWords, onWordClick }: FoundWordsProps) {
  const sortedWords = [...foundWords].sort((a, b) => b.length - a.length || a.localeCompare(b));
  
  // Group words by length
  const groupedWords = sortedWords.reduce((acc, word) => {
    const length = word.length;
    if (!acc[length]) acc[length] = [];
    acc[length].push(word);
    return acc;
  }, {} as Record<number, string[]>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Found Words ({foundWords.length}/{Math.min(20, allPossibleWords.length)})
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {foundWords.length > 0 && `Best: ${Math.max(...foundWords.map(w => w.length))} letters`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {Object.entries(groupedWords)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([length, words]) => (
              <div key={length} className="flex flex-wrap gap-1">
                {words.map((word, index) => (
                  <motion.div
                    key={`${word}-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => onWordClick?.(word)}
                    className="group relative"
                  >
                    <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-300 font-mono text-sm">
                      {word}
                      <span className="ml-1 text-xs text-blue-400 dark:text-blue-500">
                        ({length})
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
        </AnimatePresence>
        
        {foundWords.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-sm italic">
            No words found yet. Start typing!
          </p>
        )}
      </div>
    </div>
  );
}