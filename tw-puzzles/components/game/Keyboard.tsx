'use client';

import { useCallback, useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { LetterResult } from '@/lib/game/wordEngine';
import { motion, AnimatePresence } from 'framer-motion';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

interface KeyStatus {
  [key: string]: 'correct' | 'present' | 'absent' | 'unused';
}

export default function Keyboard() {
  const { addLetter, removeLetter, submitGuess, guesses, getGuessResults, gameStatus } = useGameStore();
  const results = getGuessResults();
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  
  // Calculate key statuses
  const keyStatus: KeyStatus = {};
  
  // Flatten all results and mark keys
  results.forEach((guessResult: LetterResult[]) => {
    guessResult.forEach(({ letter, status }) => {
      const key = letter;
      // Don't downgrade status (correct > present > absent)
      if (!keyStatus[key] || 
          (status === 'correct') || 
          (status === 'present' && keyStatus[key] === 'absent')) {
        keyStatus[key] = status;
      }
    });
  });
  
  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;
    
    // Visual feedback
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });
    setTimeout(() => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 150);
    
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      removeLetter();
    } else {
      addLetter(key);
    }
  }, [addLetter, removeLetter, submitGuess, gameStatus]);
  
  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      if (gameStatus !== 'playing') return;
      
      if (key === 'ENTER') {
        event.preventDefault();
        submitGuess();
        return;
      }
      
      if (key === 'BACKSPACE') {
        event.preventDefault();
        removeLetter();
        return;
      }
      
      if (key.match(/^[A-Z]$/)) {
        event.preventDefault();
        addLetter(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLetter, removeLetter, submitGuess, gameStatus]);
  
  const getKeyClass = (key: string) => {
    const status = keyStatus[key];
    const isPressed = pressedKeys.has(key);
    const baseClass = isPressed ? 'scale-95' : '';
    
    if (status === 'correct') return `bg-emerald-500 text-white hover:bg-emerald-600 ${baseClass}`;
    if (status === 'present') return `bg-yellow-500 text-white hover:bg-yellow-600 ${baseClass}`;
    if (status === 'absent') return `bg-gray-500 text-white hover:bg-gray-600 ${baseClass}`;
    return `bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 ${baseClass}`;
  };
  
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center mb-1.5">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE';
            const width = isSpecialKey ? 'w-16' : 'w-10';
            const isPressed = pressedKeys.has(key);
            
            return (
              <motion.button
                key={key}
                className={`
                  ${width} h-14 rounded-md font-medium text-sm
                  ${getKeyClass(key)}
                  transition-all duration-100
                  active:scale-95 transform
                  touch-manipulation
                  ${!isSpecialKey ? 'uppercase' : ''}
                  shadow-sm hover:shadow-md
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                onClick={() => handleKeyPress(key)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleKeyPress(key);
                }}
                disabled={gameStatus !== 'playing'}
                whileTap={{ scale: 0.95 }}
                animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                {key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? '↵' : key}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}