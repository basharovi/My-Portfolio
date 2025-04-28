'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiLayout, FiServer, FiDatabase, FiTool, FiLayers, FiSmartphone, FiGlobe } from 'react-icons/fi';

const skills = [
  {
    category: 'Frontend Development',
    icon: <FiCode className="w-6 h-6" />,
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Sass'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    category: 'Backend Development',
    icon: <FiServer className="w-6 h-6" />,
    skills: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    category: 'Database',
    icon: <FiDatabase className="w-6 h-6" />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
    color: 'from-green-500 to-green-600',
  },
  {
    category: 'UI/UX Design',
    icon: <FiLayers className="w-6 h-6" />,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'],
    color: 'from-pink-500 to-pink-600',
  },
  {
    category: 'Mobile Development',
    icon: <FiSmartphone className="w-6 h-6" />,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    category: 'DevOps & Cloud',
    icon: <FiGlobe className="w-6 h-6" />,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
    color: 'from-red-500 to-red-600',
  },
];

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
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to create amazing digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white mr-4`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skill.category}
                  </h3>
                </div>

                {/* Skills List */}
                <ul className="space-y-3">
                  {skill.skills.map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} mr-3`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Always learning and exploring new technologies to stay at the forefront of web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 