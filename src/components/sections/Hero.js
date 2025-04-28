'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="hero" className="relative py-20 md:py-32 overflow-hidden" aria-label="Hero section">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Creative Developer
              </span>
              <br /> Crafting Digital Experiences
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              I design and build exceptional digital experiences that are 
              modern, responsive, and delightful. Let's create something amazing together.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                aria-label="Get in touch"
              >
                Get in Touch <FiArrowRight aria-hidden="true" />
              </Link>
              
              <a 
                href="/docs/BasharOvi-Resume.pdf" 
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                download
                aria-label="Download CV"
              >
                Download CV <FiDownload aria-hidden="true" />
              </a>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-md" aria-hidden="true"></div>
              <div className="absolute inset-6 bg-gray-100 dark:bg-gray-800 rounded-full" aria-hidden="true"></div>
              <div className="absolute inset-8 overflow-hidden rounded-full">
                {/* Actual profile image */}
                <Image
                  src="/images/basharovi.jpg"
                  alt="Bashar Ovi"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 