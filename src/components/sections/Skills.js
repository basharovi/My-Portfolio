'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSettings, FiCode, FiLayout, FiServer, FiDatabase, FiTool, FiLayers, FiCloud } from 'react-icons/fi';

// Using Iconify for better quality, professionally designed icons
// Iconify provides SVG icons from multiple icon sets through a unified API
const techLogos = {
  'C#': 'https://api.iconify.design/vscode-icons:file-type-csharp2.svg?color=%23512BD4&width=60&height=60',
  'JavaScript': 'https://api.iconify.design/logos:javascript.svg?width=60&height=60',
  'TypeScript': 'https://api.iconify.design/logos:typescript-icon.svg?width=60&height=60',
  'MS SQL Server': 'https://api.iconify.design/logos:microsoft-sql-server.svg?width=60&height=60',
  'PostgreSQL': 'https://api.iconify.design/logos:postgresql.svg?width=60&height=60',
  'Azure Cosmos DB': 'https://api.iconify.design/logos:azure.svg?width=60&height=60',
  'ASP.NET Core MVC': 'https://api.iconify.design/vscode-icons:file-type-asp.svg?width=60&height=60',
  'ASP.NET Core Web API': 'https://api.iconify.design/logos:dotnet.svg?width=60&height=60',
  'WPF': 'https://api.iconify.design/simple-icons:dotnet.svg?color=%23512BD4&width=60&height=60',
  'Xamarin.Forms': 'https://api.iconify.design/simple-icons:xamarin.svg?color=%233498DB&width=60&height=60',
  'Vue.js': 'https://api.iconify.design/logos:vue.svg?width=60&height=60',
  'Angular': 'https://api.iconify.design/logos:angular-icon.svg?width=60&height=60',
  'Azure': 'https://api.iconify.design/logos:azure-icon.svg?width=60&height=60',
  'Docker': 'https://api.iconify.design/logos:docker-icon.svg?width=60&height=60',
  'Layered Architecture': 'https://api.iconify.design/carbon:layers.svg?color=%23E91E63&width=60&height=60',
  'Clean Architecture': 'https://api.iconify.design/carbon:clean.svg?color=%23E91E63&width=60&height=60',
  'Microservice Architecture': 'https://api.iconify.design/carbon:microservices-1.svg?color=%23E91E63&width=60&height=60',
  'Repository': 'https://api.iconify.design/carbon:data-base.svg?color=%23E91E63&width=60&height=60',
  'Saga': 'https://api.iconify.design/carbon:workflow.svg?color=%23E91E63&width=60&height=60',
  'Adapter': 'https://api.iconify.design/carbon:connector.svg?color=%23E91E63&width=60&height=60',
  'Azure Table Storage': 'https://api.iconify.design/carbon:data-table.svg?color=%230078D4&width=60&height=60',
  'Azure File Share': 'https://api.iconify.design/carbon:document-share.svg?color=%230078D4&width=60&height=60',
  'Azure Functions': 'https://api.iconify.design/logos:azure-functions.svg?width=60&height=60',
  'Azure Container Registry': 'https://api.iconify.design/logos:azure-container-registry.svg?width=60&height=60',
  'Azure App Service': 'https://api.iconify.design/logos:azure-app-service.svg?width=60&height=60',
  'Azure Key Vault': 'https://api.iconify.design/carbon:security.svg?color=%230078D4&width=60&height=60',
  'Azure OneLake': 'https://api.iconify.design/carbon:data-lake.svg?color=%230078D4&width=60&height=60',
  'Azure DevOps': 'https://api.iconify.design/vscode-icons:file-type-azure-devops.svg?width=60&height=60',
  'MQTT Broker': 'https://api.iconify.design/carbon:ibm-watson-iot-connect.svg?color=%2332CD32&width=60&height=60',
  'Azure Data Studio': 'https://api.iconify.design/vscode-icons:file-type-azure.svg?width=60&height=60',
  'Syncfusion': 'https://api.iconify.design/carbon:chart-line-data.svg?color=%2332CD32&width=60&height=60',
  'Jira': 'https://api.iconify.design/logos:jira.svg?width=60&height=60',
  'Upsource': 'https://api.iconify.design/carbon:code-review.svg?color=%2332CD32&width=60&height=60',
};

const skills = [
  {
    category: 'Languages & Databases',
    icon: <FiCode className="w-6 h-6" />,
    skills: ['C#', 'JavaScript', 'TypeScript', 'MS SQL Server', 'PostgreSQL', 'Azure Cosmos DB'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/5 dark:bg-blue-500/10',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-500 dark:text-blue-400',
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
    bgColor: 'bg-purple-500/5 dark:bg-purple-500/10',
    borderColor: 'border-purple-200 dark:border-purple-800',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-500 dark:text-purple-400',
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
    bgColor: 'bg-pink-500/5 dark:bg-pink-500/10',
    borderColor: 'border-pink-200 dark:border-pink-800',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-500 dark:text-pink-400',
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
    bgColor: 'bg-cyan-500/5 dark:bg-cyan-500/10',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
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
    bgColor: 'bg-green-500/5 dark:bg-green-500/10',
    borderColor: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-500 dark:text-green-400',
  }
];

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Set a random category as active on first load
  useEffect(() => {
    if (inView && !activeCategory) {
      const randomIndex = Math.floor(Math.random() * skills.length);
      setActiveCategory(skills[randomIndex].category);
    }
  }, [inView, activeCategory]);

  // Function to handle skill hover with some animation
  const handleSkillHover = (skill) => {
    // This would be used for future enhanced animations
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
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

        {/* Category Navigation - Clean, professional tabs */}
        <div className="flex justify-center mb-12 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center">
            {skills.map((skill) => (
              <button
                key={skill.category}
                onClick={() => setActiveCategory(skill.category)}
                className={`px-5 py-3 font-medium text-sm transition-all duration-200 border-b-2 mx-1 
                  ${activeCategory === skill.category
                    ? `border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400`
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <div className="flex items-center">
                  <span className={`mr-2 ${activeCategory === skill.category ? skill.iconColor : ''}`}>
                    {React.cloneElement(skill.icon, { className: "w-4 h-4" })}
                  </span>
                  <span>{skill.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Display - Professional Card View */}
        <div ref={ref} className="mt-8">
          {skills.map((category) => (
            activeCategory === category.category && (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-md overflow-hidden"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${category.color}`} />
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Side - Category Description */}
                    <div className="md:col-span-1 mb-6 md:mb-0 flex flex-col h-full">
                      <h3 className={`text-xl font-bold flex items-center`}>
                        <span className={`p-2 rounded-lg ${category.iconBg} ${category.iconColor} mr-3`}>
                          {React.cloneElement(category.icon, { className: "w-5 h-5" })}
                        </span>
                        {category.category}
                      </h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-400 flex-grow">
                        {getSkillDescription(category.category)}
                      </p>
                      <div className="mt-6">
                        <div className={`w-20 h-1 bg-gradient-to-r ${category.color} rounded-full mb-2`} />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {category.skills.length} skills
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Skills Grid */}
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`p-4 rounded-lg border ${category.borderColor} ${category.bgColor} hover:shadow-md transition-all duration-200`}
                          >
                            <p className="font-medium text-gray-800 dark:text-gray-200">{skill}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to get descriptions for skill categories
function getSkillDescription(category) {
  switch (category) {
    case 'Languages & Databases':
      return 'Programming languages and database technologies I use to build robust and scalable applications.';
    case 'Frameworks & Libraries':
      return 'Frameworks and libraries I leverage to create efficient, maintainable, and feature-rich software.';
    case 'Architecture & Patterns':
      return 'Software architecture approaches and design patterns I implement for clean, maintainable code.';
    case 'Cloud Services':
      return 'Cloud-based services and technologies I use to build scalable and reliable applications.';
    case 'DevOps & Tools':
      return 'Tools and technologies I employ for continuous integration, deployment, and efficient development workflows.';
    default:
      return 'Technologies and tools I use to create amazing digital experiences.';
  }
} 