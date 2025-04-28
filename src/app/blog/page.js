'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Sample blog posts data - in a real app, this would come from a database or API
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2023',
    excerpt: 'Explore the emerging technologies and practices that are shaping the future of web development, from AI-powered tools to serverless architectures.',
    date: 'June 15, 2023',
    author: 'John Doe',
    category: 'Web Development',
    image: '/images/blog/web-dev-trends.jpg',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Mastering CSS Grid: A Comprehensive Guide',
    excerpt: 'Learn how to create complex layouts with CSS Grid, the powerful layout system that makes designing web pages more intuitive and flexible.',
    date: 'May 22, 2023',
    author: 'Jane Smith',
    category: 'CSS',
    image: '/images/blog/css-grid.jpg',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Performance Optimization Tips for React Applications',
    excerpt: 'Discover practical strategies to improve the performance of your React applications, from code splitting to memoization techniques.',
    date: 'April 10, 2023',
    author: 'John Doe',
    category: 'React',
    image: '/images/blog/react-performance.jpg',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Building Accessible Web Applications: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of web accessibility and how to ensure your applications are usable by people of all abilities.',
    date: 'March 5, 2023',
    author: 'Sarah Johnson',
    category: 'Accessibility',
    image: '/images/blog/accessibility.jpg',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
            />
            <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
        </motion.div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
                  {post.category}
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FiTag className="mr-2" />
                    <span>{post.category}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <motion.a 
                  href={`/blog/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Pagination */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full p-2 shadow-lg">
            <motion.button 
              className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              disabled
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            <motion.button 
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1
            </motion.button>
            <motion.button 
              className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              2
            </motion.button>
            <motion.button 
              className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 