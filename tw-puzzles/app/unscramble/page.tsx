'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WordList from '@/components/game3/WordList';
import WordInput from '@/components/game3/WordInput';
import GameStats from '@/components/game3/GameStats';
import  ToastContainer, { toast } from '@/components/ui/ToastContainer';
import {
  UnscrambleGameState,
  DIFFICULTY_SETTINGS,
  createNewRound,
  checkAnswer,
  calculateScore,
  isGameWon,
  isGameLost,
  getHint,
} from '@/lib/game3/unscramble';

export default function UnscrambleGame() {
  const [game, setGame] = useState<UnscrambleGameState | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = useCallback(() => {
    try {
      setIsLoading(true);
      const newGame = createNewRound(difficulty);
      setGame(newGame);
      setInput('');
      setIsLoading(false);
      
      toast.info(`New ${difficulty} round started!`, {
        duration: 2000,
      });
    } catch (error) {
      console.error('Error starting game:', error);
      toast.error('Failed to start game. Please try again!', {
        duration: 5000,
      });
      setIsLoading(false);
    }
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (!game || game.status !== 'playing') return;

    const timer = setInterval(() => {
      setGame(prev => {
        if (!prev) return prev;
        const newTime = prev.time + 1;
        
        // Check if time's up
        const { timeLimit } = DIFFICULTY_SETTINGS[prev.difficulty];
        if (newTime >= timeLimit) {
          toast.error("⏰ Time's up! Better luck next round!", {
            duration: 5000,
          });
          return { ...prev, time: newTime, status: 'lost' };
        }
        
        return { ...prev, time: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [game?.status]);

  // Handle word submission
  const handleSubmit = () => {
    if (!game || game.status !== 'playing' || !input) return;

    const isCorrect = checkAnswer(game, input);
    
    if (isCorrect) {
      const currentWord = game.words[game.currentIndex];
      const timeBonus = Math.max(0, 60 - game.time);
      const points = calculateScore(currentWord.word, timeBonus, game.difficulty);
      
      setGame(prev => {
        if (!prev) return prev;
        const newFoundWords = [...prev.foundWords, currentWord.word];
        const newScore = prev.score + points;
        const won = isGameWon({ ...prev, foundWords: newFoundWords });
        
        if (won) {
          toast.success('🎉 Congratulations! You unscrambled all words!', {
            duration: 5000,
          });
        }
        
        return {
          ...prev,
          foundWords: newFoundWords,
          score: newScore,
          currentIndex: prev.currentIndex + 1,
          status: won ? 'won' : prev.status,
        };
      });
      
      toast.success(`✅ Correct! +${points} points!`, {
        duration: 2000,
      });
      setInput('');
    } else {
      toast.error(`❌ "${input}" is not the correct word!`, {
        duration: 3000,
      });
    }
  };

  // Handle hint
  const handleHint = (index: number) => {
    if (!game || game.status !== 'playing') return;
    
    const word = game.words[index];
    if (game.foundWords.includes(word.word)) {
      toast.info('This word has already been found!', {
        duration: 2000,
      });
      return;
    }
    
    const hint = getHint(word.word);
    toast.info(`💡 Hint: The word starts with "${hint}"`, {
      duration: 4000,
    });
    
    setGame(prev => {
      if (!prev) return prev;
      return { ...prev, hintsUsed: prev.hintsUsed + 1 };
    });
  };

  if (isLoading || !game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <div className="text-xl text-gray-500">Loading your puzzle...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Tech Unscramble
            </h1>
          </div>

          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(level => (
              <button
                key={level}
                onClick={() => {
                  setDifficulty(level);
                  startNewGame();
                }}
                className={`px-3 py-1 text-sm rounded-lg transition-all
                  ${difficulty === level
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                {level.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GameStats
            score={game.score}
            time={game.time}
            round={game.round}
            difficulty={game.difficulty}
            foundWords={game.foundWords.length}
            totalWords={game.totalWords}
            status={game.status}
            onNewGame={startNewGame}
          />
        </motion.div>

        {/* Game grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Word List */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <WordList
              words={game.words}
              foundWords={game.foundWords}
              onHint={handleHint}
            />
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <WordInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              disabled={game.status !== 'playing'}
              currentWord={
                game.status === 'playing' && game.currentIndex < game.words.length
                  ? game.words[game.currentIndex]?.word
                  : undefined
              }
            />

            {/* Current word progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {game.status === 'playing' ? (
                  <>
                    <span className="font-semibold">
                      Word {game.currentIndex + 1} of {game.totalWords}
                    </span>
                    <div className="mt-1 text-xs">
                      {game.foundWords.length > 0 && (
                        <span>
                          ✅ Found {game.foundWords.length} words
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="font-semibold">
                      {game.status === 'won' ? '🎉 Round Complete!' : '⏰ Game Over!'}
                    </span>
                    <div className="mt-1 text-xs">
                      Found {game.foundWords.length} of {game.totalWords} words
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {game.foundWords.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Found</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {game.hintsUsed}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Hints</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-500">
                  {game.score}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}