'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  // Only when mounted on client, enable theme detection
  useEffect(() => {
    setMounted(true);
    
    // Apply initial theme CSS variables based on system preferences
    const applySystemTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    };
    
    // Apply system theme immediately
    applySystemTheme();
    
    // Listen for changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applySystemTheme);
    
    return () => {
      mediaQuery.removeEventListener('change', applySystemTheme);
    };
  }, []);

  if (!mounted) {
    // Use client-side only features to avoid hydration mismatch
    return <>{children}</>;
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      enableColorScheme
      forcedTheme="system"  // Force system theme always
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
} 