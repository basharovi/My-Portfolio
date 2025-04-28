'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiUser, FiAward, FiCode, FiCoffee } from 'react-icons/fi';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { icon: <FiUser />, label: 'Clients', value: '50+' },
    { icon: <FiAward />, label: 'Awards', value: '10+' },
    { icon: <FiCode />, label: 'Projects', value: '100+' },
    { icon: <FiCoffee />, label: 'Coffee Cups', value: '∞' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate web developer with a keen eye for design and a commitment to creating
              exceptional digital experiences that make a difference.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I started my journey as a web developer over 5 years ago. Since then, I've worked on a wide range of projects, 
              from simple landing pages to complex applications. I specialize in creating responsive, user-friendly websites
              and applications that not only look great but also provide exceptional user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              My approach combines creative design with clean, efficient code to deliver solutions that exceed expectations. 
              I'm constantly learning and staying updated with the latest technologies and best practices in the field.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, 
              or enjoying outdoor activities to maintain a healthy work-life balance.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 text-3xl mb-2">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold mb-1">{stat.value}</span>
                <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 