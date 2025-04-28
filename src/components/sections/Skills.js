'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiLayout, FiServer, FiDatabase, FiTool } from 'react-icons/fi';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: <FiLayout size={24} />,
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React.js', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'TypeScript', level: 75 },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: <FiServer size={24} />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'Python', level: 70 },
        { name: 'Django', level: 65 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'GraphQL', level: 70 },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      icon: <FiDatabase size={24} />,
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MySQL', level: 70 },
        { name: 'Firebase', level: 85 },
        { name: 'Redis', level: 60 },
        { name: 'Supabase', level: 65 },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & Others',
      icon: <FiTool size={24} />,
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'CI/CD', level: 75 },
        { name: 'Figma', level: 80 },
        { name: 'Responsive Design', level: 90 },
      ],
    },
  ];

  const activeSkills = skillCategories.find(cat => cat.id === activeTab)?.skills || [];

  const progressVariants = {
    hidden: { width: 0 },
    visible: level => ({
      width: `${level}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels across different domains.
            </p>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === category.id
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + skillCategories.indexOf(category) * 0.1 }}
            >
              <span className="text-current">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  variants={progressVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={skill.level}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 