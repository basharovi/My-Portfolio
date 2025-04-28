'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 