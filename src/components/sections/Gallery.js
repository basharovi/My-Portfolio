'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiX, FiImage } from 'react-icons/fi';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sample gallery items
  const galleryItems = [
    {
      id: 1,
      title: 'Project Showcase',
      category: 'Design',
      placeholder: 'bg-blue-200',
    },
    {
      id: 2,
      title: 'Workspace',
      category: 'Lifestyle',
      placeholder: 'bg-purple-200',
    },
    {
      id: 3,
      title: 'Team Meeting',
      category: 'Work',
      placeholder: 'bg-green-200',
    },
    {
      id: 4,
      title: 'Design Process',
      category: 'Design',
      placeholder: 'bg-yellow-200',
    },
    {
      id: 5,
      title: 'Conference Talk',
      category: 'Events',
      placeholder: 'bg-red-200',
    },
    {
      id: 6,
      title: 'Mobile App Design',
      category: 'Design',
      placeholder: 'bg-indigo-200',
    },
    {
      id: 7,
      title: 'Coding Session',
      category: 'Work',
      placeholder: 'bg-pink-200',
    },
    {
      id: 8,
      title: 'Design Workshop',
      category: 'Events',
      placeholder: 'bg-teal-200',
    },
  ];

  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of photos showcasing my work, events, and creative process.
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
              onClick={() => openLightbox(item)}
            >
              {/* Placeholder for actual images */}
              <div className={`w-full h-full ${item.placeholder} dark:bg-opacity-40 dark:bg-gray-700 flex items-center justify-center`}>
                <FiImage size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white">
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm opacity-80">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button 
                className="absolute top-6 right-6 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <FiX size={24} />
              </button>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Placeholder for actual image in lightbox */}
                <div className={`w-full aspect-video md:aspect-[16/9] ${selectedImage.placeholder} rounded-lg flex flex-col items-center justify-center`}>
                  <FiImage size={48} className="text-gray-500 mb-4" />
                  <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                  <p className="text-white opacity-80">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 