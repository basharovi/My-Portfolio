'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent"
      />
    </div>
  );
} 