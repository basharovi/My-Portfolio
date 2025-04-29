'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { title: 'Home', path: '/', isSection: true, sectionId: 'hero' },
  { title: 'Experience', path: '/experience', isSection: true, sectionId: 'experience' },
  { title: 'Skills', path: '/skills', isSection: true, sectionId: 'skills' },
  // { title: 'Portfolio', path: '/portfolio', isSection: true, sectionId: 'portfolio' },
  { title: 'Education', path: '/education', isSection: true, sectionId: 'education' },
  // { title: 'Gallery', path: '/gallery', isSection: true, sectionId: 'gallery' },
  { title: 'Blog', path: '/blog', isSection: false, isExternal: false },
  { title: 'Contact', path: '/contact', isSection: true, sectionId: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const pathname = usePathname();

  // Mount effect to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Always use system theme
    setTheme('system');
    localStorage.removeItem('theme');
    
  }, [setTheme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navLinks.forEach((link) => {
      if (link.isSection && link.sectionId) {
        const element = document.getElementById(link.sectionId);
        if (element) observer.observe(element);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        if (link.isSection && link.sectionId) {
          const element = document.getElementById(link.sectionId);
          if (element) observer.unobserve(element);
        }
      });
    };
  }, [pathname]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (pathname !== '/') {
      // If not on home page, navigate to home page first
      window.location.href = `/#${sectionId}`;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-2 shadow-lg' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.span 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isSection ? (
                <motion.a
                  key={link.title}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleSectionClick(e, link.sectionId)}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-sm transition-colors ${
                    activeSection === link.sectionId
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}>
                    {link.title}
                  </span>
                  {activeSection === link.sectionId && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="underline"
                      transition={{ 
                        type: "spring", 
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                        duration: 0.2
                      }}
                    />
                  )}
                </motion.a>
              ) : link.isExternal ? (
                <motion.a
                  key={link.title}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.title}
                </motion.a>
              ) : (
                <Link
                  key={link.title}
                  href={link.path}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.title}
                </Link>
              )
            ))}
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - Removed, using system theme only */}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  link.isSection ? (
                    <motion.a
                      key={link.title}
                      href={`#${link.sectionId}`}
                      onClick={(e) => handleSectionClick(e, link.sectionId)}
                      className={`text-sm transition-colors py-2 ${
                        activeSection === link.sectionId
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.title}
                    </motion.a>
                  ) : link.isExternal ? (
                    <motion.a
                      key={link.title}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.title}
                    </motion.a>
                  ) : (
                    <Link
                      key={link.title}
                      href={link.path}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    >
                      {link.title}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 