'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Toast type definition
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Toast position type
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';

// Toast props interface
export interface ToastProps {
  id?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  position?: ToastPosition;
}

// Toast item interface for the container
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
}

// Toast event interface
export interface ToastEvent extends CustomEvent {
  detail: {
    message: string;
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
  };
}

// Toast styles mapping
const toastStyles: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    border: 'border-emerald-500',
    icon: '✅',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    border: 'border-red-500',
    icon: '❌',
    text: 'text-red-700 dark:text-red-300',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-500',
    icon: 'ℹ️',
    text: 'text-blue-700 dark:text-blue-300',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-500',
    icon: '⚠️',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
};

// Position classes mapping
const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
};

// Framer Motion variants with proper typing
const toastVariants: Variants = {
  initial: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// Toast Component
export default function Toast({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right',
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const style = toastStyles[type];

  // Auto-close after duration
  useEffect(() => {
    const startTime = Date.now();
    const interval = 50;
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining <= 0) {
        clearInterval(timer);
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <motion.div
      key={id}
      className={`fixed ${positionClasses[position]} z-50 w-96 max-w-[calc(100vw-2rem)] pointer-events-auto`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div 
        className={`
          relative overflow-hidden rounded-xl shadow-2xl
          border-l-4 ${style.border}
          ${style.bg} backdrop-blur-sm
          transition-all duration-200
          hover:shadow-xl
        `}
        role="alert"
      >
        <div className="flex items-center gap-3 p-4">
          {/* Icon */}
          <div className="flex-shrink-0 text-2xl">
            {style.icon}
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className={`font-medium ${style.text} break-words`}>
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}