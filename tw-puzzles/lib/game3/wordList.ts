export interface UnscrambleWord {
  scrambled: string;
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
}

// Tech words categorized by difficulty
export const UNSCRAMBLE_WORDS: UnscrambleWord[] = [
  // EASY - 4-5 letters
  { scrambled: 'PYHTON', word: 'PYTHON', category: 'Programming Language', difficulty: 'easy', hint: 'A popular snake-named language' },
  { scrambled: 'TAREC', word: 'REACT', category: 'Framework', difficulty: 'easy', hint: 'A JavaScript library for UIs' },
  { scrambled: 'JAVRA', word: 'JAVA', category: 'Programming Language', difficulty: 'easy', hint: 'A language that runs on JVM' },
  { scrambled: 'UDROKEC', word: 'DOCKER', category: 'DevOps', difficulty: 'easy', hint: 'Containerization platform' },
  { scrambled: 'MIAZLON', word: 'AMAZON', category: 'Company', difficulty: 'easy', hint: 'Cloud computing giant' },
  { scrambled: 'GOOGLEL', word: 'GOOGLE', category: 'Company', difficulty: 'easy', hint: 'The big search engine' },
  { scrambled: 'ILNUX', word: 'LINUX', category: 'Operating System', difficulty: 'easy', hint: 'Open-source OS' },
  { scrambled: 'LQS', word: 'SQL', category: 'Database', difficulty: 'easy', hint: 'Structured Query Language' },
  { scrambled: 'PAI', word: 'API', category: 'Development', difficulty: 'easy', hint: 'Application Programming Interface' },
  { scrambled: 'XLM', word: 'XML', category: 'Markup', difficulty: 'easy', hint: 'eXtensible Markup Language' },
  { scrambled: 'MSQLY', word: 'MYSQL', category: 'Database', difficulty: 'easy', hint: 'Popular open-source database' },
  { scrambled: 'SGSI', word: 'GIT', category: 'Version Control', difficulty: 'easy', hint: 'Version control system' },
  
  // MEDIUM - 6-7 letters
  { scrambled: 'NGLUARA', word: 'ANGULAR', category: 'Framework', difficulty: 'medium', hint: 'Google\'s web framework' },
  { scrambled: 'JNSSET', word: 'NESTJS', category: 'Framework', difficulty: 'medium', hint: 'Progressive Node.js framework' },
  { scrambled: 'TINSWKF', word: 'SWIFT', category: 'Programming Language', difficulty: 'medium', hint: 'Apple\'s programming language' },
  { scrambled: 'OTNKLII', word: 'KOTLIN', category: 'Programming Language', difficulty: 'medium', hint: 'JVM language from JetBrains' },
  { scrambled: 'JYBEU', word: 'RUBY', category: 'Programming Language', difficulty: 'medium', hint: 'Dynamic programming language' },
  { scrambled: 'LAACS', word: 'SCALA', category: 'Programming Language', difficulty: 'medium', hint: 'Functional language on JVM' },
  { scrambled: 'RLEP', word: 'PERL', category: 'Programming Language', difficulty: 'medium', hint: 'Practical Extraction and Reporting Language' },
  { scrambled: 'DSAOS', word: 'SODA', category: 'Cloud', difficulty: 'medium', hint: 'Serverless computing' },
  { scrambled: 'REBRY', word: 'BRYER', category: 'Browser', difficulty: 'medium', hint: 'Surf the web with this' },
  { scrambled: 'CJAKAR', word: 'JACKAR', category: 'Development', difficulty: 'medium', hint: 'Package manager' },
  { scrambled: 'PISELINE', word: 'PIPELINE', category: 'DevOps', difficulty: 'medium', hint: 'CI/CD workflow' },
  { scrambled: 'MCROSI', word: 'MICROS', category: 'Architecture', difficulty: 'medium', hint: 'Service architecture' },
  { scrambled: 'ENCRYPT', word: 'ENCRYPT', category: 'Security', difficulty: 'medium', hint: 'Scramble data for security' },
  { scrambled: 'FIREWAL', word: 'FIREWALL', category: 'Security', difficulty: 'medium', hint: 'Network security system' },
  
  // HARD - 8+ letters
  { scrambled: 'RAVTSUCT', word: 'CONSTRUCT', category: 'Programming', difficulty: 'hard', hint: 'Build something' },
  { scrambled: 'ECNLAHYCO', word: 'COYCHENLA', category: 'Security', difficulty: 'hard', hint: 'Secure cryptocurrency' },
  { scrambled: 'GLOMHAGA', word: 'ALGORITHM', category: 'Programming', difficulty: 'hard', hint: 'Step-by-step procedure' },
  { scrambled: 'PUTORMCIA', word: 'COMPUTER', category: 'Hardware', difficulty: 'hard', hint: 'Computing device' },
  { scrambled: 'SBMELTESY', word: 'SYMBOL', category: 'Programming', difficulty: 'hard', hint: 'Representation of data' },
  { scrambled: 'RTEINNTE', word: 'INTERNET', category: 'Network', difficulty: 'hard', hint: 'Global network' },
  { scrambled: 'WOFRTSEA', word: 'SOFTWARE', category: 'Software', difficulty: 'hard', hint: 'Programs and data' },
  { scrambled: 'DWRAEHR', word: 'HARDWARE', category: 'Hardware', difficulty: 'hard', hint: 'Physical components' },
  { scrambled: 'CKOCBHLAIN', word: 'BLOCKCHAIN', category: 'Technology', difficulty: 'hard', hint: 'Distributed ledger' },
  { scrambled: 'MCNIHAE', word: 'MACHINE', category: 'AI', difficulty: 'hard', hint: 'Learning system' },
  { scrambled: 'NGREIEEN', word: 'ENGINEER', category: 'Role', difficulty: 'hard', hint: 'Tech professional' },
  { scrambled: 'VELPDMEOT', word: 'DEVELOPMENT', category: 'Process', difficulty: 'hard', hint: 'Building software' },
];

// Group words by difficulty
export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): UnscrambleWord[] => {
  return UNSCRAMBLE_WORDS.filter(w => w.difficulty === difficulty);
};

// Get random words for a round
export const getRoundWords = (
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 12
): UnscrambleWord[] => {
  const words = getWordsByDifficulty(difficulty);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Shuffle a word (scramble it)
export const scrambleWord = (word: string): string => {
  const letters = word.split('');
  // Don't allow the same word to be generated
  let scrambled;
  let attempts = 0;
  do {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    scrambled = letters.join('');
    attempts++;
  } while (scrambled === word && attempts < 10);
  
  return scrambled;
};

// Create scrambled version of words
export const createScrambledWords = (words: UnscrambleWord[]): UnscrambleWord[] => {
  return words.map(w => ({
    ...w,
    scrambled: scrambleWord(w.word),
  }));
};