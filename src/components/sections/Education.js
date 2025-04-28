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
      degree: 'Bachelor of Science (B.Sc) in Computer Science & Engineering',
      institution: 'Dhaka International University',
      location: 'Dhaka, Bangladesh',
      period: '2017 - 2021',
      description: 'Focused on software engineering and computer science core subjects. Participated in multiple coding competitions online and offline.',
      activities: [
        'Former Vice President of DIU Computer Programming Club.',
        'Volunteer of DIu English Language Club',
        'Organizer of DIU IT Carnival 2020.',
      ],
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Gobindagonj S.S College',
      location: 'Gobindagonj, Gaibandha',
      period: '2014 - 2016',
      description: '',
      activities: [
      ],
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Gobindagonj Govt. High School',
      location: 'Gobindagonj, Gaibandha',
      period: '2009 - 2014',
      description: '',
      activities: [
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education Background</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My academic journey that have built my foundation in technology and programming.
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
                  
                  {/* Activities */}
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <FiAward className="mr-2 text-blue-600 dark:text-blue-400" />
                      Activities
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      {item.activities.map((activity, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{activity}</span>
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