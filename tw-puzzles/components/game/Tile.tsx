'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LetterStatus } from '@/lib/game/wordEngine';

interface TileProps {
  letter: string;
  status?: LetterStatus;
  index: number;
  isRevealing?: boolean;
  delay?: number;
}

const statusStyles: Record<LetterStatus, string> = {
  correct: 'bg-emerald-500 text-white border-emerald-500',
  present: 'bg-yellow-500 text-white border-yellow-500',
  absent: 'bg-gray-500 text-white border-gray-500',
  empty: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent',
};

const statusColors: Record<LetterStatus, string> = {
  correct: '#10b981',
  present: '#eab308',
  absent: '#6b7280',
  empty: '#d1d5db',
};

export default function Tile({ 
  letter, 
  status = 'empty', 
  index, 
  isRevealing = false,
  delay = 0 
}: TileProps) {
  const isFilled = letter && letter.length > 0;
  const shouldAnimate = isFilled && status !== 'empty' && isRevealing;

  // Animation variants
  const tileVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0 
    },
    pop: {
      scale: [1, 1.2, 1],
      transition: { 
        duration: 0.15, 
        delay: index * 0.05,
        ease: "easeOut"
      }
    },
    flip: {
      rotateX: [0, 90, 0],
      transition: { 
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeInOut"
      }
    },
    shake: {
      x: [-5, 5, -5, 5, -3, 3, -2, 2, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Determine which animation to play
  const getAnimation = () => {
    if (status === 'correct' || status === 'present' || status === 'absent') {
      return shouldAnimate ? 'flip' : 'pop';
    }
    return 'initial';
  };

  return (
    <motion.div
      className={`
        w-14 h-14 flex items-center justify-center text-2xl font-extrabold uppercase
        rounded-md transition-all duration-200 select-none
        ${statusStyles[status]}
        ${isFilled && status === 'empty' ? 'border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800' : ''}
        ${status === 'empty' && !isFilled ? 'bg-gray-100 dark:bg-gray-800' : ''}
        shadow-sm hover:shadow-md transition-shadow
      `}
      initial="initial"
      animate={getAnimation()}
      variants={tileVariants}
      style={{
        backgroundColor: status === 'empty' && isFilled ? undefined : undefined,
        color: status === 'empty' && isFilled ? 'inherit' : undefined,
        transformStyle: 'preserve-3d',
        perspective: '400px'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={letter || 'empty'}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative"
        >
          {letter}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}