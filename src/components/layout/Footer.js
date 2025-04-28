'use client';

import Link from 'next/link';
import { 
  FiGithub, FiLinkedin, 
  FiMail, FiPhone, FiMapPin, 
  FiFacebook
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/basharovi', 
      icon: <FiGithub aria-hidden="true" /> 
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/basharovi.cse', 
      icon: <FiFacebook aria-hidden="true" /> 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/basharovi', 
      icon: <FiLinkedin aria-hidden="true" /> 
    }
  ];

  const contactInfo = [
    { 
      title: 'Email',
      value: 'bashar.ovi@outlook.com',
      icon: <FiMail aria-hidden="true" className="mr-2" />,
      href: 'mailto:your.email@example.com'
    },
    { 
      title: 'Phone',
      value: '+88 01750 844104',
      icon: <FiPhone aria-hidden="true" className="mr-2" />,
      href: 'tel:+1234567890'
    },
    { 
      title: 'Address',
      value: 'Dhaka, Bangladesh',
      icon: <FiMapPin aria-hidden="true" className="mr-2" />,
      href: 'https://www.google.com/maps/place/Dhaka,+Bangladesh'
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8" aria-label="Site footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">About</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
            Passionate muslim software engineer with a keen eye for design and a commitment to creating
            exceptional digital experiences that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Visit my ${link.name} profile`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Links</h2>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#hero" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#experience" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a 
                    href="#portfolio" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Contact Info</h2>
            <ul className="space-y-2">
              {contactInfo.map((item) => (
                <li key={item.title}>
                  <a 
                    href={item.href}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Bashar Ovi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 