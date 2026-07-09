'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UnscrambleWord } from '@/lib/game3/wordList';
import ScrambledWord from './ScrambledWord';

interface WordListProps {
  words: UnscrambleWord[];
  foundWords: string[];
  onHint: (index: number) => void;
}

export default function WordList({ words, foundWords, onHint }: WordListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Words to Unscramble ({foundWords.length}/{words.length})
        </h3>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
            {foundWords.length > 0 && `${foundWords.length} found`}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {words.map((word, index) => {
            const isFound = foundWords.includes(word.word.toUpperCase());
            return (
              <ScrambledWord
                key={`${word.word}-${index}`}
                word={word.scrambled}
                index={index}
                isFound={isFound}
                hint={word.hint}
                onRevealHint={() => onHint(index)}
              />
            );
          })}
        </AnimatePresence>

        {words.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-500 py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p>No words loaded. Try restarting!</p>
          </div>
        )}
      </div>
    </div>
  );
}