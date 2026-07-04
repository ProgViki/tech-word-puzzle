'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import LetterPool from '@/components/game2/LetterPool';
import InputArea from '@/components/game2/InputArea';
import FoundWords from '@/components/game2/FoundWords';
import GameStats from '@/components/game2/GameStats';
import  ToastContainer, { toast } from '@/components/ui/ToastContainer';
import {
  WordFormationState,
  DIFFICULTY_SETTINGS,
  createNewRound,
  canFormWord,
  calculateScore,
  hasWon,
//   getAllPossibleWords,
  FORMATION_DICT,
} from '@/lib/game2/wordFormation';

export default function FormationGame() {
  const [game, setGame] = useState<WordFormationState | null>(null);
  const [usedLetters, setUsedLetters] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTY_SETTINGS>('easy');

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = useCallback(() => {
    try {
      setIsLoading(true);
      const newGame = createNewRound(difficulty);
      setGame(newGame);
      setUsedLetters(new Set());
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
        
        // Auto-lose after 3 minutes
        if (newTime >= 180) {
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

  // Handle adding a letter
  const handleAddLetter = (letter: string) => {
    if (!game || game.status !== 'playing') return;
    
    const availableIndices = game.letters
      .map((l, i) => ({ letter: l, index: i }))
      .filter(({ letter: l, index: i }) => !usedLetters.has(i) && l === letter);
    
    if (availableIndices.length === 0) {
      toast.error(`No more "${letter}" available!`, {
        duration: 2000,
      });
      return;
    }

    const index = availableIndices[0].index;
    setUsedLetters(prev => new Set(prev).add(index));
    setGame(prev => prev ? { ...prev, currentWord: prev.currentWord + letter } : null);
  };

  // Handle removing a letter
  const handleRemoveLetter = () => {
    if (!game || game.status !== 'playing' || game.currentWord.length === 0) return;
    
    const usedArray = Array.from(usedLetters);
    const lastUsedIndex = usedArray[usedArray.length - 1];
    
    setUsedLetters(prev => {
      const newSet = new Set(prev);
      newSet.delete(lastUsedIndex);
      return newSet;
    });
    
    setGame(prev => prev ? { ...prev, currentWord: prev.currentWord.slice(0, -1) } : null);
  };

  // Handle submitting a word
  const handleSubmitWord = () => {
    if (!game || game.status !== 'playing' || game.currentWord.length === 0) {
      toast.warning("Please enter a word first!", {
        duration: 2000,
      });
      return;
    }

    const word = game.currentWord.toUpperCase();
    const minLength = DIFFICULTY_SETTINGS[game.difficulty].minWordLength;
    
    // Check minimum length
    if (word.length < minLength) {
      toast.warning(`Words must be at least ${minLength} letters!`, {
        duration: 2500,
      });
      return;
    }
    
    // Check if word has been found already
    if (game.foundWords.includes(word)) {
      toast.error(`"${word}" already found!`, {
        duration: 2500,
      });
      return;
    }

    // Check if word exists in dictionary
    if (!FORMATION_DICT.includes(word)) {
      toast.error(`"${word}" is not a valid tech term!`, {
        duration: 3000,
      });
      return;
    }

    // Check if word can be formed from letters
    if (!canFormWord(word, game.letters)) {
      toast.error(`Cannot form "${word}" from available letters!`, {
        duration: 3000,
      });
      return;
    }

    // Calculate score (time bonus)
    const timeBonus = Math.max(0, 60 - game.time);
    const score = calculateScore(word, timeBonus);

    // Update game state
    setGame(prev => {
      if (!prev) return prev;
      const newFoundWords = [...prev.foundWords, word];
      const newScore = prev.score + score;
      const won = hasWon(newFoundWords, prev.allPossibleWords);
      
      if (won) {
        toast.success(`🎉 Round Complete! You found all words!`, {
          duration: 5000,
        });
      }
      
      return {
        ...prev,
        foundWords: newFoundWords,
        currentWord: '',
        score: newScore,
        status: won ? 'won' : prev.status,
      };
    });

    // Clear used letters
    setUsedLetters(new Set());

    // Show success
    toast.success(`Found "${word}"! +${score} points 🎯`, {
      duration: 3000,
    });
  };

  // Handle clearing the current word
  const handleClear = () => {
    setGame(prev => prev ? { ...prev, currentWord: '' } : null);
    setUsedLetters(new Set());
  };

  // Handle clicking a letter in the pool
  const handleLetterClick = (index: number) => {
    if (!game || game.status !== 'playing') return;
    if (usedLetters.has(index)) return;
    
    const letter = game.letters[index];
    setUsedLetters(prev => new Set(prev).add(index));
    setGame(prev => prev ? { ...prev, currentWord: prev.currentWord + letter } : null);
  };

  // Calculate progress
  const totalWords = game?.allPossibleWords.length || 0;
  const foundCount = game?.foundWords.length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <div className="text-xl text-gray-500">Generating your puzzle...</div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😅</div>
          <div className="text-xl text-gray-500">Something went wrong. Please try again!</div>
          <button
            onClick={startNewGame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Word Formation
            </h1>
            <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
              Tech Edition
            </span>
          </div>

          <div className="flex gap-2">
            {(['easy', 'intermediate', 'advanced'] as const).map(level => (
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
            foundWords={foundCount}
            totalPossible={totalWords}
            status={game.status}
            onNewGame={startNewGame}
          />
        </motion.div>

        {/* Letter Pool */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <LetterPool
            letters={game.letters}
            usedLetters={usedLetters}
            onLetterClick={handleLetterClick}
          />
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <InputArea
            currentWord={game.currentWord}
            onAddLetter={handleAddLetter}
            onRemoveLetter={handleRemoveLetter}
            onSubmitWord={handleSubmitWord}
            onClear={handleClear}
          />
        </motion.div>

        {/* Found Words */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FoundWords
            foundWords={game.foundWords}
            allPossibleWords={game.allPossibleWords}
            onWordClick={(word) => {
              toast.info(`${word} - ${word.length} letters`, {
                duration: 2000,
              });
            }}
          />
        </motion.div>

        {/* Hint button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => {
              const available = game.allPossibleWords.filter(w => !game.foundWords.includes(w));
              if (available.length > 0) {
                const hint = available[0];
                const hintWord = hint.slice(0, 3) + '...';
                toast.info(`💡 Hint: ${hintWord} (${hint.length} letters)`, {
                  duration: 4000,
                });
              } else {
                toast.warning("No more hints available! You found all words!", {
                  duration: 3000,
                });
              }
            }}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            💡 Need a hint?
          </button>
        </motion.div>
      </div>
    </main>
  );
}