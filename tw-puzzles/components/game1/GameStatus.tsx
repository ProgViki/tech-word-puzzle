'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameStatus() {
  const { gameStatus, targetWord, resetGame } = useGameStore();
  
  if (gameStatus === 'playing') return null;
  
  const isWon = gameStatus === 'won';
  const emoji = isWon ? '🎉' : '😢';
  const title = isWon ? 'You got it!' : 'Better luck next time!';
  const message = isWon 
    ? `The tech term was "${targetWord}"` 
    : `The word was "${targetWord}"`;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        onClick={resetGame}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <button
              onClick={resetGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}