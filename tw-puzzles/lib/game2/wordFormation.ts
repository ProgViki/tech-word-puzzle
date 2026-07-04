import { TECH_WORDS_UNIQUE } from '../game1/wordList';

export interface WordFormationState {
  letters: string[];           // Available letters
  foundWords: string[];        // Words discovered
  currentWord: string;         // Current input
  score: number;
  time: number;               // In seconds
  round: number;
  difficulty: 'easy' | 'intermediate' | 'advanced';
  status: 'playing' | 'won' | 'lost';
  allPossibleWords: string[];  // All valid words
}

export const DIFFICULTY_SETTINGS = {
  easy: {
    letterCount: 6,
    minWordLength: 3,
    maxAttempts: 20,          // Found words needed to win
  },
  intermediate: {
    letterCount: 8,
    minWordLength: 4,
    maxAttempts: 25,
  },
  advanced: {
    letterCount: 10,
    minWordLength: 5,
    maxAttempts: 30,
  }
};

// Generate random letters for the game
export function generateLetters(count: number): string[] {
  // Ensure we include vowels for better word formation
  const vowels = 'AEIOU';
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
  
  // At least 30% vowels
  const vowelCount = Math.max(2, Math.floor(count * 0.3));
  const consonantCount = count - vowelCount;
  
  let letters: string[] = [];
  
  // Add vowels
  for (let i = 0; i < vowelCount; i++) {
    letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
  }
  
  // Add consonants
  for (let i = 0; i < consonantCount; i++) {
    letters.push(consonants[Math.floor(Math.random() * consonants.length)]);
  }
  
  // Shuffle
  return shuffleArray(letters);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Check if a word can be formed from the given letters
export function canFormWord(word: string, letters: string[]): boolean {
  const letterCount = [...letters];
  const wordChars = word.toUpperCase().split('');
  
  for (const char of wordChars) {
    const index = letterCount.indexOf(char);
    if (index === -1) return false;
    letterCount.splice(index, 1);
  }
  
  return true;
}

// Get all possible words from the tech dictionary
export function getAllPossibleWords(letters: string[], difficulty: keyof typeof DIFFICULTY_SETTINGS): string[] {
  const minLength = DIFFICULTY_SETTINGS[difficulty].minWordLength;
  
  return TECH_WORDS_UNIQUE.filter(word => {
    if (word.length < minLength) return false;
    return canFormWord(word, letters);
  });
}

// Calculate score based on word length
export function calculateScore(word: string, timeBonus: number): number {
  const baseScore = word.length * 10;
  const bonus = Math.max(0, timeBonus);
  return baseScore + Math.floor(bonus * 0.5);
}

// Check if player has won
export function hasWon(foundWords: string[], allPossible: string[]): boolean {
  // Win by finding at least 70% of possible words
  const foundPercentage = foundWords.length / allPossible.length;
  return foundPercentage >= 0.7 && foundWords.length >= 5;
}

// Get a new round
export function createNewRound(difficulty: keyof typeof DIFFICULTY_SETTINGS): WordFormationState {
  const { letterCount } = DIFFICULTY_SETTINGS[difficulty];
  const letters = generateLetters(letterCount);
  const allPossibleWords = getAllPossibleWords(letters, difficulty);
  
  // If no words found, regenerate
  if (allPossibleWords.length < 3) {
    return createNewRound(difficulty);
  }
  
  return {
    letters,
    foundWords: [],
    currentWord: '',
    score: 0,
    time: 0,
    round: 1,
    difficulty,
    status: 'playing',
    allPossibleWords,
  };
}