'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiFacebook, FiMail } from 'react-icons/fi';
import Image from 'next/image';

const roles = [
  'Muslim Software Engineer',
  'C# Lover | .NET Enthusiast',
  'Problem Solver | Lifelong Learner',
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Assalamu Alaikum, I&apos;m <span className="text-gray-900 dark:text-white">Bashar Ovi</span>
            </motion.h1>
            
            <div className="h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300"
                >
                  {roles[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto lg:mx-0"
            >
              From a spark of curiosity to crafting powerful applications — my journey as a Software Engineer is fueled by passion, patience, and the joy of building meaningful software.
            </motion.p>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              <motion.a
                href="https://github.com/basharovi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/basharovi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
              <motion.a
                href="https://facebook.com/basharovi.cse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiFacebook className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
              <motion.a
                href="mailto:bashar.ovi@outlook.com"
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Single Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div className="relative aspect-square rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-600/20">
                <Image
                  src="/images/basharovi.jpg"
                  alt="Bashar Ovi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 