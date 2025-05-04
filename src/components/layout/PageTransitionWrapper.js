'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Reset loading state on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // Faster transition for better UX
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return (
    <div className="relative">
      {/* Professional transition overlay */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Simple, elegant loader */}
            <div className="relative">
              {/* Brand element */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-full" />
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Bashar Ovi</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
              </motion.div>
              
              {/* Loading bar */}
              <motion.div
                className="mt-8 w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: loading ? 0.6 : 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 