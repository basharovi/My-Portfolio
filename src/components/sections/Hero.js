'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiFacebook, FiMail, FiDownload } from 'react-icons/fi';
import Image from 'next/image';

const roles = [
  'Muslim Software Engineer',
  'C# Lover | .NET Enthusiast',
  'Problem Solver | Lifelong Learner',
];

// Floating shapes for background animation
const FloatingShape = ({ className, delay, duration, left, top, size }) => (
  <motion.div
    className={`absolute rounded-full opacity-70 ${className}`}
    style={{ 
      left: `${left}%`, 
      top: `${top}%`, 
      width: size, 
      height: size 
    }}
    animate={{
      y: [0, 30, 0],
      x: [0, 15, 0],
      rotate: [0, 360],
      opacity: [0.7, 0.4, 0.7]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    // Set loaded after initial animation completes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearInterval(roleInterval);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
        
        {/* Animated floating elements */}
        <FloatingShape className="bg-blue-500/20" delay={0} duration={7} left={80} top={20} size="120px" />
        <FloatingShape className="bg-purple-500/20" delay={1.5} duration={8} left={20} top={70} size="150px" />
        <FloatingShape className="bg-cyan-500/20" delay={3} duration={9} left={70} top={70} size="100px" />
        <FloatingShape className="bg-indigo-500/20" delay={2} duration={10} left={10} top={20} size="80px" />
        
        {/* Animated gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div className="text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Assalamu Alaikum, I&apos;m <span className="relative inline-block">
                <span className="text-gray-900 dark:text-white">Bashar Ovi</span>
                {isLoaded && (
                  <motion.span 
                    className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                )}
              </span>
            </motion.h1>
            
            <div className="h-16 overflow-hidden mb-2">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-300"
                >
                  {roles[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-400 mb-6 max-w-2xl mx-auto lg:mx-0"
            >
              From a spark of curiosity to crafting powerful applications — my journey as a Software Engineer is fueled by passion, patience, and the joy of building meaningful software.
            </motion.p>
            
            {/* Download Resume Button */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.a 
                href="/docs/BasharOvi_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiDownload className="mr-2 group-hover:animate-bounce" />
                <span>View Resume</span>
                <motion.span 
                  className="absolute inset-0 rounded-lg bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    opacity: 0.2,
                    transition: { duration: 0.4 }
                  }}
                />
              </motion.a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: <FiGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />, url: "https://github.com/basharovi", color: "hover:bg-gray-800 hover:text-white" },
                { icon: <FiLinkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />, url: "https://linkedin.com/in/basharovi", color: "hover:bg-blue-500 hover:text-white" },
                { icon: <FiFacebook className="w-6 h-6 text-gray-700 dark:text-gray-300" />, url: "https://facebook.com/basharovi.cse", color: "hover:bg-blue-600 hover:text-white" },
                { icon: <FiMail className="w-6 h-6 text-gray-700 dark:text-gray-300" />, url: "mailto:bashar.ovi@outlook.com", color: "hover:bg-red-500 hover:text-white" },
              ].map((social, index) => (
                <motion.a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + (index * 0.1) } 
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image with effects */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div 
              className="relative w-full max-w-sm mx-auto lg:mx-0"
              animate={isLoaded ? { 
                y: [0, -10, 0],
                transition: { 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }
              } : {}}
            >
              {/* Animated gradient backgrounds */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Profile image with animated border */}
              <motion.div 
                className="relative aspect-square rounded-full overflow-hidden"
                initial={{ borderWidth: 0 }}
                animate={{ borderWidth: 4 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ 
                  borderColor: "rgba(255,255,255,0.2)",
                  borderStyle: "solid" 
                }}
              >
                <Image
                  src="/images/basharovi.jpg"
                  alt="Bashar Ovi"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Shimmering overlay effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    left: ['-100%', '100%', '100%'],
                    top: ['-100%', '100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                />
              </motion.div>
              
              {/* Animated dots around the profile image */}
              {isLoaded && Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ 
                      left: 'calc(50% + 0px)', 
                      top: 'calc(50% + 0px)' 
                    }}
                    animate={{ 
                      left: `calc(50% + ${x}px)`, 
                      top: `calc(50% + ${y}px)`,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      delay: 1 + (i * 0.15),
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll Down</span>
          <motion.div 
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 