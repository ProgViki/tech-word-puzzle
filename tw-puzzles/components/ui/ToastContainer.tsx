'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast, { ToastType, ToastPosition, ToastItem, ToastEvent } from './Toast';

// Toast manager class
class ToastManager {
  private static instance: ToastManager;
  private listeners: ((toasts: ToastItem[]) => void)[] = [];
  private toasts: ToastItem[] = [];

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(listener: (toasts: ToastItem[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.toasts));
  }

  show(options: Omit<ToastItem, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast: ToastItem = {
      id,
      duration: 3000,
      position: 'top-right',
    //   type: 'info',
      ...options,
    };
    
    this.toasts = [...this.toasts, toast];
    this.notify();

    // Auto-remove after duration
    setTimeout(() => {
      this.remove(id);
    }, (toast.duration || 3000) + 300);

    return id;
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  clear(): void {
    this.toasts = [];
    this.notify();
  }

  success(message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'success', ...options });
  }

  error(message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'error', ...options });
  }

  info(message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'info', ...options });
  }

  warning(message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'warning', ...options });
  }
}

// Export singleton instance
export const toast = ToastManager.getInstance();

// Toast Container Component
export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts);
    return unsubscribe;
  }, []);

  // Group toasts by position
  const groupedToasts = toasts.reduce((acc, toastItem) => {
    const position = toastItem.position || 'top-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(toastItem);
    return acc;
  }, {} as Record<string, ToastItem[]>);

  const handleClose = (id: string) => {
    toast.remove(id);
  };

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div 
          key={position} 
          className={`fixed z-50 space-y-2 pointer-events-none
            ${position === 'top-right' ? 'top-4 right-4' : ''}
            ${position === 'top-left' ? 'top-4 left-4' : ''}
            ${position === 'bottom-right' ? 'bottom-4 right-4' : ''}
            ${position === 'bottom-left' ? 'bottom-4 left-4' : ''}
            ${position === 'top-center' ? 'top-4 left-1/2 -translate-x-1/2' : ''}
          `}
        >
          <AnimatePresence>
            {positionToasts.map((toastItem) => (
              <Toast
                key={toastItem.id}
                id={toastItem.id}
                message={toastItem.message}
                type={toastItem.type}
                duration={toastItem.duration}
                position={toastItem.position}
                onClose={() => handleClose(toastItem.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}

// Custom hook for using toast
export function useToast() {
  return toast;
}

// Helper function to show toast from anywhere
export function showToast(
  message: string, 
  type: ToastType = 'info', 
  duration?: number,
  position?: ToastPosition
): string {
  return toast.show({ message, type, duration, position });
}