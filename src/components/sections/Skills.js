'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSettings , FiCode, FiLayout, FiServer, FiDatabase, FiTool, FiLayers, FiCloud } from 'react-icons/fi';

const skills = [
  {
    category: 'Languages & Databases',
    icon: <FiCode className="w-6 h-6" />,
    skills: ['C#', 'JavaScript', 'TypeScript', 'MS SQL Server', 'PostgreSQL', 'Azure Cosmos DB'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    category: 'Frameworks & Libraries',
    icon: <FiServer className="w-6 h-6" />,
    skills: [
      'ASP.NET Core MVC',
      'ASP.NET Core Web API',
      'WPF',
      'Xamarin.Forms',
      'Vue.js',
      'Angular'
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    category: 'Architecture & Patterns',
    icon: <FiLayers className="w-6 h-6" />,
    skills: [
      'Layered Architecture',
      'Clean Architecture',
      'Microservice Architecture',
      'Repository',
      'Saga',
      'Adapter',
    ],
    color: 'from-pink-500 to-pink-600',
  },
  {
    category: 'Cloud Services',
    icon: <FiCloud className="w-6 h-6" />,
    skills: [
      'Azure Table Storage',
      'Azure File Share',
      'Azure Functions',
      'Azure Container Registry',
      'Azure App Service',
      'Azure Key Vault',
      'Azure OneLake'
    ],
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    category: 'DevOps & Tools',
    icon: <FiTool className="w-6 h-6" />,
    skills: [
      'Azure DevOps',
      'MQTT Broker',
      'Azure Data Studio',
      'Syncfusion',
      'Docker',
      'Jira',
      'Upsource',
    ],
    color: 'from-green-500 to-green-600',
  }
];


export default function Skills() {

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
        
      </div>
    </section>
  );
} 