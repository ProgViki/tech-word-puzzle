'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Grid from '@/components/game1/Grid';
import Keyboard from '@/components/game1/Keyboard';
import GameStatus from '@/components/game1/GameStatus';
import StatsModal from '@/components/game1/StatsModal';
import { useGameStore } from '@/lib/store/gameStore';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [showStats, setShowStats] = useState(false);
  const { gameStatus, resetGame } = useGameStore();
  
  // Share functionality
  const shareResult = () => {
    const { guesses, targetWord, stats } = useGameStore.getState();
    const attempts = guesses.length;
    const result = gameStatus === 'won' ? '✅' : '❌';
    
    const gridEmojis = guesses.map(guess => {
      // Convert guess to emojis
      // This is simplified - you'd want proper emoji mapping
      return '🟩🟨⬛'; // Placeholder
    }).join('\n');
    
    const shareText = `
Tech Word Puzzle ${result}
${attempts}/${6} attempts
${gridEmojis}
#TechWordPuzzle
    `.trim();
    
    if (navigator.share) {
      navigator.share({
        title: 'Tech Word Puzzle',
        text: shareText,
      }).catch(() => {
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    });
  };
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            TechWord
          </h1>
          <div className="flex gap-3">
            <button
              onClick={shareResult}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
              aria-label="Share result"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              onClick={() => setShowStats(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
              aria-label="View statistics"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid />
          <Keyboard />
        </motion.div>
        
        {/* Game Over Modal */}
        <GameStatus />
        
        {/* Stats Modal */}
        <StatsModal 
          isOpen={showStats} 
          onClose={() => setShowStats(false)} 
        />
        
        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          Guess the 6-letter tech term • New word daily
        </p>
      </div>
    </main>
  );
}