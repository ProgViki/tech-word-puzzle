'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { MAX_ATTEMPTS } from '@/lib/game/wordEngine';
import { motion, AnimatePresence } from 'framer-motion';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const { stats } = useGameStore();
  const [showDetails, setShowDetails] = useState(false);
  
  if (!isOpen) return null;
  
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;
  
  const maxGuessCount = Math.max(...stats.guessDistribution, 1);
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Statistics
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.gamesPlayed}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Played</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {winRate}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.maxStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Max Streak</div>
            </div>
          </div>
          
          {/* Guess Distribution */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Guess Distribution
            </h3>
            <div className="space-y-1.5">
              {stats.guessDistribution.map((count, index) => {
                if (index === 0) return null; // Skip index 0
                const percentage = maxGuessCount > 0 
                  ? (count / maxGuessCount) * 100 
                  : 0;
                const isMax = count === maxGuessCount && count > 0;
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-4">
                      {index}
                    </span>
                    <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div
                        className={`h-full ${isMax ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                        style={{ width: `${Math.max(percentage, 1)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-8">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}