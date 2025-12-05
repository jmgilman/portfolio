declare global {
  interface Window {
    __toggleTheme?: () => void;
    __setTheme?: (theme: string) => void;
    __headerCleanup?: () => void;
    __readingProgressCleanup?: () => void;
    __searchCleanup?: () => void;
    __tocCleanup?: () => void;
    __heroTypewriterCleanup?: () => void;
  }

  // PagefindUI is loaded dynamically
  const PagefindUI: unknown;
}

export {};
