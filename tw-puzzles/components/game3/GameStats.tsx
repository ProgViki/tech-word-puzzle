'use client';

import { motion } from 'framer-motion';
import { DIFFICULTY_SETTINGS } from '@/lib/game3/unscramble';

interface GameStatsProps {
  score: number;
  time: number;
  round: number;
  difficulty: 'easy' | 'medium' | 'hard';
  foundWords: number;
  totalWords: number;
  status: 'playing' | 'won' | 'lost';
  onNewGame: () => void;
}

export default function GameStats({
  score,
  time,
  round,
  difficulty,
  foundWords,
  totalWords,
  status,
  onNewGame,
}: GameStatsProps) {
  // Format time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate remaining time
  const timeLimit = DIFFICULTY_SETTINGS[difficulty].timeLimit;
  const remaining = Math.max(0, timeLimit - time);
  const remainingMinutes = Math.floor(remaining / 60);
  const remainingSeconds = remaining % 60;
  const remainingString = `${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;

  const difficultyColors = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500',
  };

  const progress = totalWords > 0 ? (foundWords / totalWords) * 100 : 0;
  const timeProgress = (time / timeLimit) * 100;

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

        {/* Remaining Time */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {remainingString}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
        </div>

        {/* Difficulty */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-2">
        {/* Word progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{foundWords} / {totalWords} words</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Time progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Time</span>
            <span>{Math.round(timeProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                timeProgress > 80 ? 'bg-red-500' :
                timeProgress > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, timeProgress)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
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
            {status === 'won' ? '🎉 All Words Found!' : '😢 Time\'s Up!'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {status === 'won' 
              ? `You unscrambled ${foundWords} words in ${timeString}!` 
              : `You found ${foundWords} out of ${totalWords} words`}
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