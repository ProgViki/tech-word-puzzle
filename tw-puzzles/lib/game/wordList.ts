// Complete tech-themed 6-letter word list
export const TECH_WORDS: string[] = [
  // Programming Languages
  'PYTHON', 'REACT', 'ANGULAR', 'NESTJS', 'RUST', 'GOLANG', 'SWIFT', 'KOTLIN',
  'JAVA', 'PHP', 'RUBY', 'SCALA', 'PERL', 'LUA', 'DART', 'ELIXIR',
  'CLOJURE', 'HASKELL', 'ERLANG', 'GROOVY', 'OCAML', 'RACKET',
  
  // Frameworks & Libraries
  'DJANGO', 'FLASK', 'SPRING', 'HIBERN', 'RAILS', 'VUE', 'SVELTE',
  'WEBPACK', 'BABEL', 'JEST', 'MOCHA', 'CHAI', 'AXIOS', 'REDUX',
  'REACT', 'ANGULAR', 'NEXTJS', 'NESTJS', 'EXPO', 'REACTN',
  
  // DevOps & Tools
  'DOCKER', 'KUBE', 'GITHUB', 'GITLAB', 'JENKINS', 'ANSIBLE', 'PUPPET',
  'CHEF', 'SALT', 'TERRA', 'AWS', 'AZURE', 'GOOGLE', 'CLOUD',
  'KAFKA', 'SPARK', 'HADOOP', 'MONGODB', 'ELASTIC', 'CASSAND',
  
  // Concepts & Terms
  'API', 'CACHE', 'CLUSTER', 'DATABASE', 'ENCRYPT', 'FIREWALL', 'GATEWAY',
  'HASHING', 'INDEX', 'JSON', 'KAFKA', 'LINUX', 'MICROS', 'NETWORK',
  'PROTOCOL', 'ROUTING', 'SOCKET', 'TOKEN', 'WEBHOOK', 'WEBSOCK',
  
  // Databases
  'MONGODB', 'POSTGRES', 'MYSQL', 'REDIS', 'ELASTIC', 'CASSAND', 'ORACLE',
  'SQLITE', 'DYNAMODB', 'FIREBASE', 'REALMDB',
  
  // Companies & Products
  'APPLE', 'MICROSO', 'NETFLIX', 'SPOTIFY', 'UBER', 'LYFT', 'SLACK',
  'DISCORD', 'TWITTER', 'ADOBE', 'SALES', 'ORACLE', 'SAP',
  'GOOGLE', 'AMAZON', 'FACEBOOK', 'TIKTOK', 'INSTAGRAM',
  
  // Security
  'AUTH', 'TOKEN', 'CIPHER', 'DECRYPT', 'FIREWALL', 'HONEYPO',
  'SSL', 'TLS', 'VPN', 'CERT', 'PATCH', 'ENCRYPT',
  
  // Development Terms
  'DEBUG', 'DEPLOY', 'BUILD', 'TEST', 'COMMIT', 'PUSH', 'PULL',
  'BRANCH', 'MERGE', 'REBASE', 'STASH', 'PATCH', 'FIX',
  'REFACTOR', 'DEPEND', 'PIPELINE', 'MONITOR',
  
  // Tech Slang
  'HACK', 'SCRUM', 'AGILE', 'KANBAN', 'TDD', 'MVP', 'SPIKE',
  'PAIR', 'MOB', 'RETRO', 'STANDUP', 'THROTTLE',
  
  // Hardware
  'CPU', 'GPU', 'RAM', 'SSD', 'HDD', 'MONITOR', 'KEYBOARD',
  'MOUSE', 'ROUTER', 'MODEM', 'SWITCH', 'HUB', 'CABLE',
  
  // Additional Tech Terms
  'ALGORITHM', 'BINARY', 'COMPILE', 'DEBUG', 'ENCRYPT', 'FUNCTION',
  'GITHUB', 'HARDWARE', 'INTERNET', 'JAVASCRIPT', 'KERNEL', 'LINUX',
  'MACHINE', 'NETWORK', 'OPENSOURCE', 'PROGRAM', 'QUANTUM', 'ROBOTICS',
  'SOFTWARE', 'TERMINAL', 'UNIX', 'VIRTUAL', 'WEBSITE', 'XML',
  'YAML', 'ZERO', 'ANDROID', 'BLOCKCHAIN', 'CYBER', 'DIGITAL'
].filter(word => word.length === 6 && /^[A-Z]+$/.test(word));

// Deduplicate and sort
export const TECH_WORDS_UNIQUE = Array.from(new Set(TECH_WORDS)).sort();

// Word metadata for learning
export interface WordMetadata {
  word: string;
  category: string;
  definition: string;
  example: string;
}

export const TECH_WORDS_METADATA: Record<string, WordMetadata> = {
  'PYTHON': {
    word: 'PYTHON',
    category: 'Programming Language',
    definition: 'A high-level, interpreted programming language known for its readability and versatility.',
    example: 'Used extensively in data science, AI, and web development.'
  },
  'REACT': {
    word: 'REACT',
    category: 'Framework',
    definition: 'A JavaScript library for building user interfaces, maintained by Meta.',
    example: 'Powers many modern web applications with component-based architecture.'
  },
  'DOCKER': {
    word: 'DOCKER',
    category: 'DevOps',
    definition: 'A platform for developing, shipping, and running applications in containers.',
    example: 'Enables consistent environments across development and production.'
  },
  'KUBE': {
    word: 'KUBE',
    category: 'DevOps',
    definition: 'Short for Kubernetes, an open-source container orchestration platform.',
    example: 'Automates deployment, scaling, and management of containerized applications.'
  },
  'NESTJS': {
    word: 'NESTJS',
    category: 'Framework',
    definition: 'A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.',
    example: 'Uses TypeScript and combines OOP, FP, and FRP elements.'
  },
  'GITHUB': {
    word: 'GITHUB',
    category: 'DevOps',
    definition: 'A web-based platform for version control and collaboration using Git.',
    example: 'Hosts millions of open-source projects and enables team collaboration.'
  },
  'REDUX': {
    word: 'REDUX',
    category: 'Library',
    definition: 'A predictable state container for JavaScript applications.',
    example: 'Manages application state in a single store with pure functions.'
  },
  'MONGODB': {
    word: 'MONGODB',
    category: 'Database',
    definition: 'A NoSQL document-oriented database that stores data in JSON-like format.',
    example: 'Ideal for scalable applications with flexible data structures.'
  },
  'POSTGRES': {
    word: 'POSTGRES',
    category: 'Database',
    definition: 'A powerful, open-source object-relational database system.',
    example: 'Known for reliability, feature robustness, and performance.'
  },
  'WEBPACK': {
    word: 'WEBPACK',
    category: 'DevOps',
    definition: 'A module bundler for JavaScript applications.',
    example: 'Bundles assets, modules, and dependencies for the browser.'
  },
  'CLOJURE': {
    word: 'CLOJURE',
    category: 'Programming Language',
    definition: 'A modern, dynamic, and functional dialect of Lisp on the JVM.',
    example: 'Known for immutable data structures and concurrent programming.'
  },
  'ELIXIR': {
    word: 'ELIXIR',
    category: 'Programming Language',
    definition: 'A functional, concurrent language built on the Erlang VM.',
    example: 'Designed for building scalable and maintainable applications.'
  },
  'KAFKA': {
    word: 'KAFKA',
    category: 'Data Streaming',
    definition: 'A distributed event streaming platform for building real-time data pipelines.',
    example: 'Handles trillions of events per day at scale.'
  },
  'SPARK': {
    word: 'SPARK',
    category: 'Data Processing',
    definition: 'An open-source unified analytics engine for large-scale data processing.',
    example: 'Provides high-level APIs in Java, Scala, Python, and R.'
  },
  'ELASTIC': {
    word: 'ELASTIC',
    category: 'Search',
    definition: 'A search engine based on the Lucene library, offering distributed searching.',
    example: 'Powers search functionality in many modern applications.'
  }
};

// Helper functions
export function getWordOfDay(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return TECH_WORDS_UNIQUE[dayOfYear % TECH_WORDS_UNIQUE.length];
}

export function getWordMetadata(word: string): WordMetadata | null {
  return TECH_WORDS_METADATA[word] || null;
}

export function isValidWord(word: string): boolean {
  return TECH_WORDS_UNIQUE.includes(word.toUpperCase());
}

export const CATEGORIES = Array.from(
  new Set(Object.values(TECH_WORDS_METADATA).map(meta => meta.category))
).sort();