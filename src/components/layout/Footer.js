'use client';

import Link from 'next/link';
import { 
  FiGithub, FiLinkedin, 
  FiMail, FiPhone, FiMapPin, 
  FiFacebook, FiHeart, FiCode
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/basharovi', 
      icon: <FiGithub size={18} aria-hidden="true" /> 
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/basharovi.cse', 
      icon: <FiFacebook size={18} aria-hidden="true" /> 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/basharovi', 
      icon: <FiLinkedin size={18} aria-hidden="true" /> 
    }
  ];

  const contactInfo = [
    { 
      title: 'Email',
      value: 'bashar.ovi@outlook.com',
      icon: <FiMail aria-hidden="true" className="mr-2 flex-shrink-0" />,
      href: 'mailto:bashar.ovi@outlook.com'
    },
    { 
      title: 'Phone',
      value: '+88 01750 844104',
      icon: <FiPhone aria-hidden="true" className="mr-2 flex-shrink-0" />,
      href: 'tel:+8801750844104'
    },
    { 
      title: 'Address',
      value: 'Dhaka, Bangladesh',
      icon: <FiMapPin aria-hidden="true" className="mr-2 flex-shrink-0" />,
      href: 'https://www.google.com/maps/place/Dhaka,+Bangladesh'
    },
  ];

  return (
    <footer className="relative" aria-label="Site footer">
      {/* Top curved divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
        <svg className="relative block h-12 w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-100 dark:fill-gray-900"></path>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="bg-gray-100 dark:bg-gray-900 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Footer grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
              {/* About & branding section */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                    <FiCode size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bashar Ovi</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Passionate Muslim software engineer with expertise in C# and .NET ecosystem. 
                  Committed to creating exceptional digital experiences that make a difference.
                </p>
                
                {/* Social media links */}
                <div className="flex space-x-3">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label={`Visit my ${link.name} profile`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick links column */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-4">Navigation</h3>
                <nav aria-label="Footer navigation">
                  <ul className="space-y-3">
                    {['Home', 'About', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
                      <li key={item}>
                        <a 
                          href={`#${item.toLowerCase()}`}
                          className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                    <li>
                      <Link 
                        href="/blog"
                        className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Contact info column */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-4">Contact</h3>
                <ul className="space-y-3">
                  {contactInfo.map((item) => (
                    <li key={item.title}>
                      <a 
                        href={item.href}
                        className="flex items-center text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        target={item.title === 'Address' ? '_blank' : undefined}
                        rel={item.title === 'Address' ? 'noopener noreferrer' : undefined}
                        aria-label={`${item.title}: ${item.value}`}
                      >
                        {item.icon}
                        <span>{item.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Bottom footer with copyright */}
            <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
              <p>&copy; {currentYear} Bashar Ovi. All rights reserved.</p>
              <p className="flex items-center mt-4 md:mt-0">
                Crafted with <FiHeart className="mx-1 text-red-500" /> in Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 