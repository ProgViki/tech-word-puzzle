import { TECH_WORDS_UNIQUE } from '../game1/wordList';

export interface WordFormationState {
  letters: string[];           // Available letters
  foundWords: string[];        // Words discovered
  currentWord: string;         // Current input
  score: number;
  time: number;               // In seconds
  round: number;
  difficulty: 'easy' | 'intermediate' | 'advanced';
  status: 'playing' | 'won' | 'lost';
  allPossibleWords: string[];  // All valid words
}

export const DIFFICULTY_SETTINGS = {
  easy: {
    letterCount: 6,
    minWordLength: 3,
    maxAttempts: 20,          // Found words needed to win
  },
  intermediate: {
    letterCount: 8,
    minWordLength: 4,
    maxAttempts: 25,
  },
  advanced: {
    letterCount: 10,
    minWordLength: 5,
    maxAttempts: 30,
  }
};

// Generate random letters for the game
export function generateLetters(count: number): string[] {
  // Ensure we include vowels for better word formation
  const vowels = 'AEIOU';
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
  
  // At least 30% vowels
  const vowelCount = Math.max(2, Math.floor(count * 0.3));
  const consonantCount = count - vowelCount;
  
  let letters: string[] = [];
  
  // Add vowels
  for (let i = 0; i < vowelCount; i++) {
    letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
  }
  
  // Add consonants
  for (let i = 0; i < consonantCount; i++) {
    letters.push(consonants[Math.floor(Math.random() * consonants.length)]);
  }
  
  // Shuffle
  return shuffleArray(letters);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// FIXED: Check if a word can be formed from the given letters
export function canFormWord(word: string, letters: string[]): boolean {
  // Create a mutable copy of the letters array
  const letterCount = [...letters];
  const wordChars = word.toUpperCase().split('');
  
  for (const char of wordChars) {
    const index = letterCount.indexOf(char);
    if (index === -1) return false;
    // Remove the used letter
    letterCount.splice(index, 1);
  }
  
  return true;
}

// FIXED: Get all possible words from the tech dictionary
export function getAllPossibleWords(letters: string[], difficulty: keyof typeof DIFFICULTY_SETTINGS): string[] {
  const minLength = DIFFICULTY_SETTINGS[difficulty].minWordLength;
  const maxLength = letters.length;
  
  return TECH_WORDS_UNIQUE.filter(word => {
    // Check length constraints
    if (word.length < minLength || word.length > maxLength) return false;
    // Check if word can be formed
    return canFormWord(word, letters);
  });
}

// Calculate score based on word length
export function calculateScore(word: string, timeBonus: number): number {
  const baseScore = word.length * 10;
  const bonus = Math.max(0, timeBonus);
  return baseScore + Math.floor(bonus * 0.5);
}

// Check if player has won
export function hasWon(foundWords: string[], allPossible: string[]): boolean {
  // Win by finding at least 70% of possible words
  if (allPossible.length === 0) return false;
  const foundPercentage = foundWords.length / allPossible.length;
  return foundPercentage >= 0.7 && foundWords.length >= 5;
}

// FIXED: Get a new round with better word selection
export function createNewRound(difficulty: keyof typeof DIFFICULTY_SETTINGS): WordFormationState {
  const { letterCount, minWordLength } = DIFFICULTY_SETTINGS[difficulty];
  let attempts = 0;
  const maxAttempts = 50; // Prevent infinite loops
  
  let letters: string[] = [];
  let allPossibleWords: string[] = [];
  
  // Generate letters until we have enough possible words
  while (attempts < maxAttempts) {
    letters = generateLetters(letterCount);
    allPossibleWords = getAllPossibleWords(letters, difficulty);
    
    // We want at least 10 possible words for a good game
    if (allPossibleWords.length >= 10 && allPossibleWords.length <= 50) {
      break;
    }
    attempts++;
  }
  
  // If we couldn't find good letters, use a fallback
  if (allPossibleWords.length < 10) {
    // Use a predefined set of good letters
    const fallbackLetters = getFallbackLetters(difficulty);
    letters = fallbackLetters;
    allPossibleWords = getAllPossibleWords(letters, difficulty);
  }
  
  return {
    letters,
    foundWords: [],
    currentWord: '',
    score: 0,
    time: 0,
    round: 1,
    difficulty,
    status: 'playing',
    allPossibleWords,
  };
}

// Fallback letter sets for each difficulty
function getFallbackLetters(difficulty: keyof typeof DIFFICULTY_SETTINGS): string[] {
  const fallbacks: Record<keyof typeof DIFFICULTY_SETTINGS, string[]> = {
    easy: ['T', 'E', 'A', 'C', 'H', 'R'],
    intermediate: ['P', 'R', 'O', 'G', 'R', 'A', 'M', 'S'],
    advanced: ['T', 'E', 'C', 'H', 'N', 'O', 'L', 'O', 'G', 'Y'],
  };
  return [...fallbacks[difficulty]];
}

// Get word definitions for tech terms
export function getWordDefinition(word: string): string {
  const definitions: Record<string, string> = {
    'PYTHON': 'A high-level programming language',
    'REACT': 'A JavaScript library for building UIs',
    'DOCKER': 'Containerization platform',
    'KUBE': 'Short for Kubernetes',
    'NESTJS': 'Node.js framework for server-side apps',
    'GITHUB': 'Version control hosting platform',
    'REDUX': 'State management library',
    'MONGODB': 'NoSQL document database',
    'POSTGRES': 'Object-relational database',
    'WEBPACK': 'JavaScript module bundler',
    'PROGRAM': 'A set of instructions for a computer',
    'SOFTWARE': 'Programs and data for computers',
    'HARDWARE': 'Physical components of a computer',
    'NETWORK': 'Connected computers sharing resources',
    'DATABASE': 'Organized collection of data',
    'SERVER': 'Computer providing services',
    'CLIENT': 'Computer requesting services',
    'COMPILE': 'Convert code to machine language',
    'DEBUG': 'Find and fix errors in code',
    'DEPLOY': 'Make software available',
    'COMMIT': 'Save changes to repository',
    'BRANCH': 'Parallel version of code',
    'MERGE': 'Combine code branches',
    'PULL': 'Get changes from remote',
    'PUSH': 'Send changes to remote',
    'CLOUD': 'Remote computing resources',
    'CACHE': 'Temporary data storage',
    'ENCRYPT': 'Convert data to secure format',
    'TOKEN': 'Authentication credential',
    'API': 'Application Programming Interface',
    'JSON': 'JavaScript Object Notation',
    'XML': 'Extensible Markup Language',
    'HTML': 'HyperText Markup Language',
    'CSS': 'Cascading Style Sheets',
    'JAVA': 'Object-oriented programming language',
    'LINUX': 'Open-source operating system',
    'WINDOWS': 'Microsoft operating system',
    'MAC': 'Apple operating system',
    'ANDROID': 'Mobile operating system',
    'IOS': 'Apple mobile operating system',
    'SWIFT': 'Apple programming language',
    'KOTLIN': 'Modern programming language',
    'RUST': 'Systems programming language',
    'GOLANG': 'Google programming language',
    'SCALA': 'JVM programming language',
    'ELIXIR': 'Functional programming language',
    'CLOJURE': 'Lisp dialect on JVM',
    'HASKELL': 'Purely functional language',
    'ERLANG': 'Concurrent programming language',
    'RUBY': 'Dynamic programming language',
    'PHP': 'Server-side scripting language',
    'PERL': 'General-purpose programming language',
    'LUA': 'Embeddable scripting language',
    'DJANGO': 'Python web framework',
    'FLASK': 'Python micro-framework',
    'SPRING': 'Java application framework',
    'RAILS': 'Ruby web framework',
    'VUE': 'JavaScript UI framework',
    'ANGULAR': 'JavaScript platform for web apps',
    'SVELTE': 'JavaScript UI framework',
    'JEST': 'JavaScript testing framework',
    'MOCHA': 'JavaScript test framework',
    'CHAI': 'JavaScript assertion library',
    'AXIOS': 'Promise-based HTTP client',
  };
  
  return definitions[word.toUpperCase()] || 'A tech term';
}

// Enhanced tech word list with better word formation support
export const FORMATION_WORDS: string[] = [
  // 3-letter tech words
  'API', 'CSS', 'DNS', 'FTP', 'GUI', 'IDE', 'JVM', 'LAN', 'OS', 'PDF', 
  'PNG', 'RAM', 'ROM', 'SEO', 'SQL', 'SSH', 'SSL', 'SVG', 'TCP', 'UDP',
  'UI', 'UX', 'VPN', 'WAN', 'WEB', 'XML', 'YAML', 'AI', 'BIOS', 'CDN',
  'CPU', 'CSV', 'DOM', 'GIT', 'HTTP', 'JAR', 'JPG', 'MAC', 'PHP',
  
  // 4-letter tech words
  'ADMIN', 'AGILE', 'ALGOR', 'APACHE', 'ARRAY', 'AUTH', 'BASH', 'BIOS',
  'BOOT', 'BUG', 'BUILD', 'CACHE', 'CHART', 'CIPHER', 'CLOUD', 'CODE',
  'COMMIT', 'COMPILE', 'CONFIG', 'COOKIE', 'CPU', 'DEBUG', 'DEPLOY',
  'DESIGN', 'DEVOPS', 'DOCKER', 'DOMAIN', 'DRIVER', 'ENCRYPT', 'ERROR',
  'EVENT', 'FIX', 'FLOW', 'FORK', 'GRAPH', 'HASH', 'HOST', 'INDEX',
  'INPUT', 'JAVA', 'KERNEL', 'KEY', 'LOG', 'LOOP', 'MAIN', 'MERGE',
  'METHOD', 'MODEL', 'MODULE', 'NETWORK', 'NODE', 'OBJECT', 'OPEN',
  'OUTPUT', 'PATCH', 'PATH', 'PORT', 'PULL', 'PUSH', 'PYTHON', 'QUERY',
  'QUEUE', 'REACT', 'REDIS', 'REDUX', 'REGEX', 'REPO', 'RUST', 'SCALA',
  'SCRIPT', 'SCRUM', 'SERVER', 'SHELL', 'SOCKET', 'SPARK', 'SPRING',
  'STACK', 'STORE', 'STREAM', 'SWIFT', 'SWITCH', 'SYSTEM', 'TABLE',
  'TASK', 'TEST', 'THREAD', 'TOKEN', 'TOOL', 'TYPE', 'UPDATE', 'USER',
  'VALUE', 'VIEW', 'VUE', 'WINDOW', 'WIRE', 'WORK', 'ZIP',
  
  // 5-letter tech words
  'ADMIN', 'AGILE', 'API', 'APP', 'ARRAY', 'AUDIO', 'BACKUP', 'BINARY',
  'BROWSER', 'BUFFER', 'CALLBACK', 'CHART', 'CLOUD', 'CLUSTER', 'CODE',
  'COMMAND', 'COMMIT', 'COMPILE', 'CONFIG', 'COOKIE', 'CPU', 'CYCLE',
  'DATA', 'DEBUG', 'DEPLOY', 'DESIGN', 'DEVOPS', 'DOCKER', 'DOMAIN',
  'DRIVER', 'EMAIL', 'ENCRYPT', 'ERROR', 'EVENT', 'FIX', 'FLOW',
  'FRAME', 'FUNCTION', 'GATEWAY', 'GRAPH', 'HASH', 'HOST', 'INDEX',
  'INPUT', 'JAVA', 'KERNEL', 'KEY', 'LOG', 'LOOP', 'MAIN', 'MERGE',
  'METHOD', 'MODEL', 'MODULE', 'NETWORK', 'NODE', 'OBJECT', 'OPEN',
  'OUTPUT', 'PATCH', 'PATH', 'PORT', 'PULL', 'PUSH', 'PYTHON',
  
  // 6-letter tech words (from original list)
  'PYTHON', 'REACT', 'ANGULAR', 'NESTJS', 'RUST', 'GOLANG', 'SWIFT', 
  'KOTLIN', 'JAVA', 'PHP', 'RUBY', 'SCALA', 'PERL', 'LUA', 'DART', 
  'ELIXIR', 'CLOJURE', 'HASKELL', 'ERLANG', 'GROOVY', 'OCAML', 'RACKET',
  'DJANGO', 'FLASK', 'SPRING', 'HIBERN', 'RAILS', 'VUE', 'SVELTE',
  'WEBPACK', 'BABEL', 'JEST', 'MOCHA', 'CHAI', 'AXIOS', 'REDUX',
  'DOCKER', 'KUBE', 'GITHUB', 'GITLAB', 'JENKINS', 'ANSIBLE', 'PUPPET',
  'CHEF', 'SALT', 'TERRA', 'AWS', 'AZURE', 'GOOGLE', 'CLOUD',
  'KAFKA', 'SPARK', 'HADOOP', 'MONGODB', 'ELASTIC', 'CASSAND',
  'API', 'CACHE', 'CLUSTER', 'DATABASE', 'ENCRYPT', 'FIREWALL', 
  'GATEWAY', 'HASHING', 'INDEX', 'JSON', 'LINUX', 'MICROS', 'NETWORK',
  'PROTOCOL', 'ROUTING', 'SOCKET', 'TOKEN', 'WEBHOOK', 'WEBSOCK',
  'MONGODB', 'POSTGRES', 'MYSQL', 'REDIS', 'ELASTIC', 'CASSAND', 'ORACLE',
  'SQLITE', 'DYNAMODB', 'FIREBASE', 'REALMDB',
  'APPLE', 'MICROSO', 'NETFLIX', 'SPOTIFY', 'UBER', 'LYFT', 'SLACK',
  'DISCORD', 'TWITTER', 'ADOBE', 'SALES', 'ORACLE', 'SAP',
  'GOOGLE', 'AMAZON', 'FACEBOOK', 'TIKTOK', 'INSTAGRAM',
  'AUTH', 'TOKEN', 'CIPHER', 'DECRYPT', 'FIREWALL', 'HONEYPO',
  'SSL', 'TLS', 'VPN', 'CERT', 'PATCH', 'ENCRYPT',
  'DEBUG', 'DEPLOY', 'BUILD', 'TEST', 'COMMIT', 'PUSH', 'PULL',
  'BRANCH', 'MERGE', 'REBASE', 'STASH', 'PATCH', 'FIX',
  'REFACTOR', 'DEPEND', 'PIPELINE', 'MONITOR',
  'HACK', 'SCRUM', 'AGILE', 'KANBAN', 'TDD', 'MVP', 'SPIKE',
  'PAIR', 'MOB', 'RETRO', 'STANDUP', 'THROTTLE',
  'CPU', 'GPU', 'RAM', 'SSD', 'HDD', 'MONITOR', 'KEYBOARD',
  'MOUSE', 'ROUTER', 'MODEM', 'SWITCH', 'HUB', 'CABLE',
  'ALGORITHM', 'BINARY', 'COMPILE', 'DEBUG', 'ENCRYPT', 'FUNCTION',
  'GITHUB', 'HARDWARE', 'INTERNET', 'JAVASCRIPT', 'KERNEL', 'LINUX',
  'MACHINE', 'NETWORK', 'OPENSOURCE', 'PROGRAM', 'QUANTUM', 'ROBOTICS',
  'SOFTWARE', 'TERMINAL', 'UNIX', 'VIRTUAL', 'WEBSITE', 'XML',
  'YAML', 'ZERO', 'ANDROID', 'BLOCKCHAIN', 'CYBER', 'DIGITAL'
];

// Filter to only include words of valid lengths
export const VALID_FORMATION_WORDS = FORMATION_WORDS
  .filter(word => word.length >= 3 && word.length <= 10)
  .filter(word => /^[A-Z]+$/.test(word));

// Deduplicate and sort
export const FORMATION_DICT = Array.from(new Set(VALID_FORMATION_WORDS)).sort();