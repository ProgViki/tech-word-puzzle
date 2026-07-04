import { TECH_WORDS } from './wordList';

export function getDailyWord(): string {
  // Use a deterministic algorithm based on today's date
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Ensure positive number and within range
  hash = Math.abs(hash);
  const index = hash % TECH_WORDS.length;
  
  return TECH_WORDS[index];
}

// For testing, you can use a specific date
export function getWordForDate(date: Date): string {
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return TECH_WORDS[hash % TECH_WORDS.length];
}