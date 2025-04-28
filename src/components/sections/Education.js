'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBookOpen, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

export default function Education() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const educationItems = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'University of Technology',
      location: 'San Francisco, CA',
      period: '2013 - 2015',
      description: 'Specialized in Human-Computer Interaction and Web Technologies. Graduated with honors and recognition for innovative thesis work.',
      achievements: [
        'GPA: 3.9/4.0',
        'Best Thesis Award',
        'Published 2 research papers',
      ],
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      location: 'Chicago, IL',
      period: '2009 - 2013',
      description: 'Focused on software engineering and web development. Participated in multiple hackathons and coding competitions.',
      achievements: [
        'Dean\'s List: 6 semesters',
        'President of CS Student Association',
        'Winner of University Coding Challenge',
      ],
    },
    {
      degree: 'Web Development Certification',
      institution: 'Tech Academy',
      location: 'Online',
      period: '2012',
      description: 'Intensive course covering advanced web development techniques, responsive design, and modern JavaScript frameworks.',
      achievements: [
        'Completed with Distinction',
        'Built 5 production-level projects',
        'Mentored junior students',
      ],
    },
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My academic journey and professional certifications that have built my foundation in technology and design.
            </p>
          </motion.div>
        </div>

        {/* Education List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                    <FiBookOpen size={28} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.degree}</h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiMapPin className="mr-2" />
                      <span>{item.institution}, {item.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiCalendar className="mr-2" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <FiAward className="mr-2 text-blue-600 dark:text-blue-400" />
                      Achievements
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 