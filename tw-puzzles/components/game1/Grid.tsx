'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { MAX_ATTEMPTS, WORD_LENGTH } from '@/lib/game1/wordEngine';
import Tile from './Tile';

export default function Grid() {
  const { guesses, currentGuess, getGuessResults, gameStatus } = useGameStore();
  const results = getGuessResults();
  
  // Create grid rows
  const rows = [];
  const totalRows = MAX_ATTEMPTS;
  
  for (let row = 0; row < totalRows; row++) {
    const guess = row < guesses.length ? guesses[row] : '';
    const result = row < results.length ? results[row] : [];
    const isCurrentRow = row === guesses.length;
    const currentGuessChars = isCurrentRow ? currentGuess.split('') : [];
    
    const tiles = [];
    for (let col = 0; col < WORD_LENGTH; col++) {
      let letter = '';
      let status: any = 'empty';
      let isRevealing = false;
      
      if (row < guesses.length) {
        // Submitted guess
        letter = guess[col] || '';
        status = result[col]?.status || 'empty';
        isRevealing = gameStatus === 'won' || gameStatus === 'lost';
      } else if (isCurrentRow) {
        // Current guess in progress
        letter = currentGuessChars[col] || '';
        status = 'empty';
      }
      
      tiles.push(
        <Tile
          key={`${row}-${col}`}
          letter={letter}
          status={status}
          index={col}
          isRevealing={isRevealing}
        />
      );
    }
    
    rows.push(
      <div key={row} className="flex gap-1.5 justify-center">
        {tiles}
      </div>
    );
  }
  
  return (
    <div className="grid gap-1.5 max-w-sm mx-auto">
      {rows}
    </div>
  );
}