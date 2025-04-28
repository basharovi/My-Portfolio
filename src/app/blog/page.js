'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCalendar, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';

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
  },
  {
    id: 2,
    title: 'Mastering CSS Grid: A Comprehensive Guide',
    excerpt: 'Learn how to create complex layouts with CSS Grid, the powerful layout system that makes designing web pages more intuitive and flexible.',
    date: 'May 22, 2023',
    author: 'Jane Smith',
    category: 'CSS',
    image: '/images/blog/css-grid.jpg',
  },
  {
    id: 3,
    title: 'Performance Optimization Tips for React Applications',
    excerpt: 'Discover practical strategies to improve the performance of your React applications, from code splitting to memoization techniques.',
    date: 'April 10, 2023',
    author: 'John Doe',
    category: 'React',
    image: '/images/blog/react-performance.jpg',
  },
  {
    id: 4,
    title: 'Building Accessible Web Applications: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of web accessibility and how to ensure your applications are usable by people of all abilities.',
    date: 'March 5, 2023',
    author: 'Sarah Johnson',
    category: 'Accessibility',
    image: '/images/blog/accessibility.jpg',
  },
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Post Image */}
              <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {post.category}
                  </div>
                </div>
              </a>
              
              {/* Post Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                <h2 className="text-xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <a 
                  href={`/blog/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read More <FiArrowRight className="ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-2">
            <button 
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 