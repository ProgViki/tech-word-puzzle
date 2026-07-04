import { TECH_WORDS_UNIQUE } from "../game1/wordList";

// Additional tech words specifically for word formation game
export const FORMATION_WORDS: string[] = [
  // Short tech words (3-4 letters)
  'API', 'CSS', 'DNS', 'FTP', 'HTML', 'HTTP', 'JSON', 'PHP', 'RAM', 'ROM',
  'SEO', 'URL', 'XML', 'AI', 'BIOS', 'CDN', 'CPU', 'CRUD', 'CSV', 'DOM',
  'GIT', 'GUI', 'IDE', 'IP', 'JVM', 'LAN', 'MAC', 'OS', 'PDF', 'PNG',
  'REST', 'RSS', 'SDK', 'SQL', 'SSH', 'SSL', 'SVG', 'TCP', 'TLS', 'UDP',
  'UI', 'UX', 'VPN', 'WAN', 'WEB', 'WIFI', 'WWW', 'YAML',
  
  // 4-6 letter tech words
  'ADMIN', 'AGILE', 'ALGOR', 'ANDROID', 'ANGULAR', 'APACHE', 'API', 'APP',
  'ARCHIVE', 'ARRAY', 'ASSET', 'AUTH', 'BACKUP', 'BASH', 'BINARY', 'BLOCK',
  'BOOT', 'BRANCH', 'BROWSER', 'BUFFER', 'BUG', 'BUILD', 'CACHE', 'CALLBACK',
  'CHART', 'CIPHER', 'CLOUD', 'CLUSTER', 'CODE', 'COMMAND', 'COMMIT', 'COMPILE',
  'CONFIG', 'COOKIE', 'CPU', 'CRASH', 'DATABASE', 'DEBUG', 'DEPLOY', 'DESIGN',
  'DEVOPS', 'DOCKER', 'DOMAIN', 'DRIVER', 'EMBED', 'ENCRYPT', 'ERROR', 'EVENT',
  'EXCEL', 'EXEC', 'FACTORY', 'FIREWALL', 'FIX', 'FLASK', 'FLOW', 'FORCE',
  'FRAME', 'FUNCTION', 'GATEWAY', 'GENERATOR', 'GITHUB', 'GITLAB', 'GLOBAL',
  'GRAPH', 'GUARD', 'HANDLE', 'HASH', 'HEADER', 'HOST', 'INDEX', 'INPUT',
  'INSTALL', 'INTEL', 'INTERNET', 'JAVA', 'JAVASCRIPT', 'JENKINS', 'KERNEL',
  'KEY', 'KUBE', 'LANGUAGE', 'LIBRARY', 'LINUX', 'LOG', 'LOOP', 'MACHINE',
  'MAIN', 'MANAGER', 'MEMORY', 'MERGE', 'METHOD', 'MICROS', 'MIDDLEWARE',
  'MODEL', 'MODULE', 'MONITOR', 'MYSQL', 'NETWORK', 'NODE', 'OBJECT',
  'OFFICE', 'OPEN', 'OPTIMIZE', 'ORACLE', 'OUTPUT', 'PACKAGE', 'PATCH',
  'PATH', 'PIPELINE', 'PLATFORM', 'PLUGIN', 'PORT', 'POSTGRES', 'POWER',
  'PRINT', 'PROCESS', 'PROGRAM', 'PROJECT', 'PROTOCOL', 'PROXY', 'PUBLIC',
  'PULL', 'PUSH', 'PYTHON', 'QUERY', 'QUEUE', 'RABBIT', 'RAILS', 'REACT',
  'REDIS', 'REDUX', 'REFACTOR', 'REGEX', 'RELEASE', 'REPO', 'REQUEST',
  'RESPONSE', 'RESTORE', 'RETAIN', 'RETRY', 'ROBOT', 'ROUTER', 'RUBY',
  'SCALA', 'SCHEMA', 'SCRIPT', 'SCRUM', 'SECURE', 'SERVER', 'SERVICE',
  'SESSION', 'SHELL', 'SLACK', 'SOCKET', 'SOFTWARE', 'SPARK', 'SPRING',
  'SQL', 'STACK', 'STATUS', 'STORE', 'STREAM', 'SWIFT', 'SWITCH', 'SYSTEM',
  'TABLE', 'TASK', 'TERMINAL', 'TEST', 'THREAD', 'TIMEOUT', 'TOKEN',
  'TOOL', 'TRIGGER', 'TUNNEL', 'TYPE', 'UBUNTU', 'UPDATE', 'URL',
  'USER', 'UTILITY', 'VALIDATE', 'VALUE', 'VERSION', 'VIEW', 'VIRTUAL',
  'VISUAL', 'VUE', 'WEB', 'WEBHOOK', 'WEBSITE', 'WINDOW', 'WIRE', 'WORK',
  'XML', 'ZIP'
].filter(word => word.length >= 3 && word.length <= 10);

// Expanded tech dictionary for formation game
export const FORMATION_DICT = Array.from(new Set([...FORMATION_WORDS, ...TECH_WORDS_UNIQUE])).sort();