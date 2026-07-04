'use client';

import { motion } from 'framer-motion';
import { DIFFICULTY_SETTINGS } from '@/lib/game2/wordFormation';

interface GameStatsProps {
  score: number;
  time: number;
  round: number;
  difficulty: keyof typeof DIFFICULTY_SETTINGS;
  foundWords: number;
  totalPossible: number;
  status: 'playing' | 'won' | 'lost';
  onNewGame: () => void;
}

export default function GameStats({
  score,
  time,
  round,
  difficulty,
  foundWords,
  totalPossible,
  status,
  onNewGame,
}: GameStatsProps) {
  // Format time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const difficultyColors = {
    easy: 'text-green-500',
    intermediate: 'text-yellow-500',
    advanced: 'text-red-500',
  };

  const progress = totalPossible > 0 ? (foundWords / totalPossible) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="grid grid-cols-4 gap-4">
        {/* Score */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {score}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
        </div>

        {/* Time */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {timeString}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
        </div>

        {/* Round */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            #{round}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Round</div>
        </div>

        {/* Difficulty */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Progress</span>
          <span>{foundWords} / {Math.min(20, totalPossible)} words</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, progress)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Game status */}
      {status !== 'playing' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <div className={`text-lg font-bold ${status === 'won' ? 'text-green-500' : 'text-red-500'}`}>
            {status === 'won' ? '🎉 Round Complete!' : '😢 Time\'s Up!'}
          </div>
          <button
            onClick={onNewGame}
            className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Next Round
          </button>
        </motion.div>
      )}
    </div>
  );
}