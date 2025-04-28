'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: 'Home', path: '/', isSection: true, sectionId: 'hero' },
  { title: 'Experience', path: '/experience', isSection: true, sectionId: 'experience' },
  { title: 'Skills', path: '/skills', isSection: true, sectionId: 'skills' },
  { title: 'Portfolio', path: '/portfolio', isSection: true, sectionId: 'portfolio' },
  { title: 'Education', path: '/education', isSection: true, sectionId: 'education' },
  { title: 'Gallery', path: '/gallery', isSection: true, sectionId: 'gallery' },
  { title: 'Contact', path: '/contact', isSection: true, sectionId: 'contact' },
  { title: 'Blog', path: '/blog', isSection: false, isExternal: true }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  // Mount effect to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
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
      rootMargin: '0px',
      threshold: 0.5,
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
  }, []);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 shadow-md' : 'bg-transparent py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Go to homepage">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.isSection ? (
                <a
                  key={link.title}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleSectionClick(e, link.sectionId)}
                  className={`text-sm transition-colors ${
                    activeSection === link.sectionId
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-current={activeSection === link.sectionId ? 'page' : undefined}
                >
                  {link.title}
                </a>
              ) : link.isExternal ? (
                <a
                  key={link.title}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.title}
                </a>
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

          {/* Right Menu (Theme Toggle and Mobile Menu) */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu} 
              className="ml-2 p-2 md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX aria-hidden="true" size={20} /> : <FiMenu aria-hidden="true" size={20} />}
            </button>
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
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.isSection ? (
                  <a
                    key={link.title}
                    href={`#${link.sectionId}`}
                    onClick={(e) => handleSectionClick(e, link.sectionId)}
                    className={`text-sm transition-colors py-2 ${
                      activeSection === link.sectionId
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    aria-current={activeSection === link.sectionId ? 'page' : undefined}
                  >
                    {link.title}
                  </a>
                ) : link.isExternal ? (
                  <a
                    key={link.title}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    key={link.title}
                    href={link.path}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 