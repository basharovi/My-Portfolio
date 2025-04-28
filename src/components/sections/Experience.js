'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiExternalLink } from 'react-icons/fi';

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Cantaloupe Inc.',
      website: 'https://www.cantaloupe.com',
      period: '2025 - Present',
      description: [
      ],
    },
    {
      title: 'Software Engineer Level 2',
      company: 'Vivasoft Ltd.',
      website: 'https://www.vivasoftltd.com',
      period: '2023 - 2024',
      description: [
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Medianfon Tech',
      website: 'https://mediafon.tech/',
      period: '2022 - 2023',
      description: [
      ],
    },
    {
      title: 'Software Engineer',
      company: 'S3 Innovate Pte Ltd.',
      website: 'https://www.s3innovate.com',
      period: '2021 - 2022',
      description: [
      ],
    },
    {
      title: 'Jr. Software Engineer',
      company: 'Perky Rabbit LTD',
      website: 'https://www.perkyrabbit.com',
      period: '2020 - 2021',
      description: [
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey and career highlights that have shaped my expertise in web development.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 h-full bg-blue-200 dark:bg-blue-900/30"></div>

          {/* Experience Items */}
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 ${
                index % 2 === 0 
                  ? 'md:pr-8 md:ml-auto md:mr-0 md:text-right md:w-1/2 md:pl-16' 
                  : 'md:pl-8 md:mr-auto md:ml-0 md:w-1/2 md:pr-16'
              } pl-10 md:pl-0`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-0 bg-blue-600 p-2 rounded-full z-10 text-white
                ${index % 2 === 0 
                  ? 'left-0 md:left-auto md:right-[-8px]' 
                  : 'left-0 md:left-[-8px]'
                }`}
              >
                <FiBriefcase />
              </div>

              {/* Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                <div className="mb-4">
                  <a 
                    href={experience.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    {experience.company}
                    <FiExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-500">{experience.period}</span>
                </div>
                {experience.description.length > 0 && (
                  <ul className={`text-gray-600 dark:text-gray-400 space-y-2 list-disc ${index % 2 === 0 ? 'md:list-inside' : 'ml-6'}`}>
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 