'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiSearch, FiArrowRight } from 'react-icons/fi';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ui', name: 'UI/UX Design' },
  ];

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: '/images/projects/ecommerce.jpg',
      description: 'A modern e-commerce platform built with Next.js, Tailwind CSS, and integrated with Stripe for payments.',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 2,
      title: 'Travel Companion App',
      category: 'mobile',
      image: '/images/projects/travel.jpg',
      description: 'A mobile application that helps travelers plan their trips, find accommodations, and discover local attractions.',
      technologies: ['React Native', 'Firebase', 'Google Maps API', 'Expo'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 3,
      title: 'Dashboard UI Design',
      category: 'ui',
      image: '/images/projects/dashboard.jpg',
      description: 'A comprehensive dashboard UI design for an analytics platform, with dark mode support and responsive layouts.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Illustrator'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 4,
      title: 'Blog Platform',
      category: 'web',
      image: '/images/projects/blog.jpg',
      description: 'A fully-featured blog platform with a custom CMS, user authentication, and content management.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS S3'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      category: 'mobile',
      image: '/images/projects/fitness.jpg',
      description: 'A mobile app that helps users track their workouts, set goals, and monitor their progress over time.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Health Kit'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      category: 'ui',
      image: '/images/projects/portfolio.jpg',
      description: 'A minimalist portfolio website design for creative professionals, with smooth animations and transitions.',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'GSAP'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Portfolio</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing my recent projects and creative work across various domains.
            </p>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + categories.indexOf(category) * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden group">
                <div className="bg-gray-300 dark:bg-gray-700 w-full h-full flex items-center justify-center">
                  {/* Placeholder if no image is available */}
                  <FiSearch size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="View live site"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="View source code"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/portfolio/${project.id}`}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1"
                >
                  View Details <FiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 