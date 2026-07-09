'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const games = [
    {
      id: 'wordle',
      title: 'Guess the Tech Word',
      description: '6 letters, 6 attempts. Find the daily tech term!',
      icon: '🎯',
      color: 'from-blue-500 to-purple-500',
      path: '/wordle',
    },
    {
      id: 'formation',
      title: 'Word Formation',
      description: 'Find all tech words from the given letters!',
      icon: '🧩',
      color: 'from-green-500 to-emerald-500',
      path: '/formation',
    },
    {
      id: 'unscramble',
      title: 'Tech Unscramble',
      description: 'Unscramble the tech terms as fast as you can!',
      icon: '🔀',
      color: 'from-orange-500 to-red-500',
      path: '/unscramble',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            Tech Word Games
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Choose your puzzle and master tech terminology!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={game.path}>
                <div className={`
                  bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl
                  hover:shadow-2xl transition-all duration-300
                  hover:-translate-y-2 cursor-pointer
                  border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800
                  h-full flex flex-col
                `}>
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-r ${game.color}
                    flex items-center justify-center text-3xl mb-4
                  `}>
                    {game.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {game.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 flex-1">
                    {game.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-500 font-medium">
                    Play Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400 dark:text-gray-500">
            💻 Powered by a curated dictionary of 200+ tech terms
          </p>
        </motion.div>
      </div>
    </main>
  );
}