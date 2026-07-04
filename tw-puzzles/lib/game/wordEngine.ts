export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  attemptsRemaining: number;
  maxAttempts: number;
  wordLength: number;
}

export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH = 6;

export function validateGuess(guess: string, target: string): LetterResult[] {
  const result: LetterResult[] = [];
  const targetLetters = target.split('');
  const guessLetters = guess.split('');
  
  // First pass: mark correct positions
  const targetCopy = [...targetLetters];
  const guessCopy = [...guessLetters];
  
  // Mark correct positions
  guessCopy.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      result[index] = { letter, status: 'correct' };
      targetCopy[index] = '#';
      guessCopy[index] = '#';
    }
  });
  
  // Second pass: mark present letters
  guessCopy.forEach((letter, index) => {
    if (letter === '#') return;
    
    const targetIndex = targetCopy.indexOf(letter);
    if (targetIndex !== -1) {
      result[index] = { letter, status: 'present' };
      targetCopy[targetIndex] = '#';
    } else {
      result[index] = { letter, status: 'absent' };
    }
  });
  
  return result;
}

export function isGameWon(guess: string, target: string): boolean {
  return guess === target;
}

export function isGameLost(attempts: number, maxAttempts: number): boolean {
  return attempts >= maxAttempts;
}

export function createInitialGameState(targetWord: string): GameState {
  return {
    targetWord,
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    attemptsRemaining: MAX_ATTEMPTS,
    maxAttempts: MAX_ATTEMPTS,
    wordLength: WORD_LENGTH,
  };
}