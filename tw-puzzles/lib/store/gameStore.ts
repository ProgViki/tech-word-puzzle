import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  GameState, 
  LetterResult, 
  MAX_ATTEMPTS,
  createInitialGameState,
  validateGuess,
  isGameWon,
  isGameLost
} from '../game/wordEngine';
import { getDailyWord } from '../game/dailyWord';

interface GameStore extends GameState {
  // Actions
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
  getGuessResults: () => LetterResult[][];
  isCurrentGuessValid: () => boolean;
  
  // Stats
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
    guessDistribution: number[];
  };
  updateStats: (won: boolean, attemptsUsed: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => {
      const dailyWord = getDailyWord();
      
      return {
        ...createInitialGameState(dailyWord),
        
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          currentStreak: 0,
          maxStreak: 0,
          guessDistribution: Array(MAX_ATTEMPTS + 1).fill(0),
        },
        
        addLetter: (letter: string) => {
          const { currentGuess, gameStatus, wordLength } = get();
          if (gameStatus !== 'playing') return;
          if (currentGuess.length >= wordLength) return;
          
          set({ currentGuess: currentGuess + letter.toUpperCase() });
        },
        
        removeLetter: () => {
          const { currentGuess, gameStatus } = get();
          if (gameStatus !== 'playing') return;
          if (currentGuess.length === 0) return;
          
          set({ currentGuess: currentGuess.slice(0, -1) });
        },
        
        submitGuess: () => {
          const { currentGuess, targetWord, guesses, gameStatus, wordLength } = get();
          if (gameStatus !== 'playing') return;
          if (currentGuess.length !== wordLength) return;
          
          // Check if word exists in our dictionary
          // For now, we'll allow any word - you can add validation later
          
          const newGuesses = [...guesses, currentGuess];
          const won = isGameWon(currentGuess, targetWord);
          const lost = isGameLost(newGuesses.length, MAX_ATTEMPTS);
          
          let newStatus: 'playing' | 'won' | 'lost' = 'playing';
          if (won) newStatus = 'won';
          else if (lost) newStatus = 'lost';
          
          set({
            guesses: newGuesses,
            currentGuess: '',
            gameStatus: newStatus,
            attemptsRemaining: MAX_ATTEMPTS - newGuesses.length,
          });
          
          // Update stats if game is over
          if (won || lost) {
            get().updateStats(won, newGuesses.length);
          }
        },
        
        resetGame: () => {
          const dailyWord = getDailyWord();
          set({
            ...createInitialGameState(dailyWord),
            stats: get().stats, // Keep stats
          });
        },
        
        getGuessResults: () => {
          const { guesses, targetWord } = get();
          return guesses.map(guess => validateGuess(guess, targetWord));
        },
        
        isCurrentGuessValid: () => {
          const { currentGuess, wordLength } = get();
          return currentGuess.length === wordLength;
        },
        
        updateStats: (won: boolean, attemptsUsed: number) => {
          const { stats } = get();
          const newStats = { ...stats };
          
          newStats.gamesPlayed += 1;
          
          if (won) {
            newStats.gamesWon += 1;
            newStats.currentStreak += 1;
            newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
            newStats.guessDistribution[attemptsUsed] += 1;
          } else {
            newStats.currentStreak = 0;
          }
          
          set({ stats: newStats });
        },
      };
    },
    {
      name: 'tech-word-game-storage',
    }
  )
);