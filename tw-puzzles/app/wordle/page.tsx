'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Grid from '@/components/game1/Grid';
import Keyboard from '@/components/game1/Keyboard';
import GameStatus from '@/components/game1/GameStatus';
import StatsModal from '@/components/game1/StatsModal';
import { ToastContainer } from '@/components/ui/Toast';
import { useGameStore } from '@/lib/store/gameStore';

export default function WordleGame() {
  const [showStats, setShowStats] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { gameStatus, resetGame } = useGameStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
            Tech Wordle
          </h1>
          <button
            onClick={() => setShowStats(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            📊
          </button>
        </motion.div>
        
        {/* Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid />
          <Keyboard />
        </motion.div>
        
        <GameStatus />
        <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
        
        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          6 letters • 6 attempts • Daily tech term
        </p>
      </div>
    </main>
  );
}