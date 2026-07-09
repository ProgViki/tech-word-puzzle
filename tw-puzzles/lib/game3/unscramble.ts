import { UnscrambleWord, getRoundWords, createScrambledWords } from './wordList';

export interface UnscrambleGameState {
  words: UnscrambleWord[];
  currentIndex: number;
  foundWords: string[];
  score: number;
  time: number;
  round: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'playing' | 'won' | 'lost';
  totalWords: number;
  hintsUsed: number;
  currentInput: string;
}

export const DIFFICULTY_SETTINGS = {
  easy: {
    wordCount: 12,
    timeLimit: 180, // 3 minutes
    pointsPerWord: 10,
  },
  medium: {
    wordCount: 10,
    timeLimit: 150, // 2.5 minutes
    pointsPerWord: 20,
  },
  hard: {
    wordCount: 8,
    timeLimit: 120, // 2 minutes
    pointsPerWord: 30,
  },
};

export function createNewRound(difficulty: 'easy' | 'medium' | 'hard'): UnscrambleGameState {
  const { wordCount } = DIFFICULTY_SETTINGS[difficulty];
  const rawWords = getRoundWords(difficulty, wordCount);
  const words = createScrambledWords(rawWords);
  
  return {
    words,
    currentIndex: 0,
    foundWords: [],
    score: 0,
    time: 0,
    round: 1,
    difficulty,
    status: 'playing',
    totalWords: words.length,
    hintsUsed: 0,
    currentInput: '',
  };
}

export function checkAnswer(game: UnscrambleGameState, input: string): boolean {
  const currentWord = game.words[game.currentIndex];
  if (!currentWord) return false;
  
  const normalizedInput = input.toUpperCase().trim();
  const normalizedWord = currentWord.word.toUpperCase();
  
  return normalizedInput === normalizedWord;
}

export function getHint(word: string): string {
  // Return first 3 letters as hint
  return word.slice(0, Math.min(3, word.length));
}

export function calculateScore(word: string, timeBonus: number, difficulty: 'easy' | 'medium' | 'hard'): number {
  const basePoints = DIFFICULTY_SETTINGS[difficulty].pointsPerWord;
  const wordBonus = word.length * 2;
  const bonus = Math.floor(timeBonus * 0.5);
  
  return basePoints + wordBonus + bonus;
}

export function isGameWon(game: UnscrambleGameState): boolean {
  return game.foundWords.length >= game.words.length;
}

export function isGameLost(game: UnscrambleGameState): boolean {
  const { timeLimit } = DIFFICULTY_SETTINGS[game.difficulty];
  return game.time >= timeLimit;
}

export function getProgress(game: UnscrambleGameState): number {
  if (game.words.length === 0) return 0;
  return (game.foundWords.length / game.words.length) * 100;
}