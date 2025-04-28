'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [typedParagraphs, setTypedParagraphs] = useState([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const paragraphs = [
    "Assalamu Alaikum, I'm Muhammad Mominur Bashar Ovi — a passionate Muslim Software Engineer who believes that great code is an art form. My journey into the world of software began almost 5 years ago, fueled by a love for solving problems and a deep curiosity about how things work behind the scenes.",
    "Specializing in C# and the .NET ecosystem, I have built everything from simple systems to complex, scalable microservice architectures. Every line of code I write reflects a commitment to clarity, maintainability, and performance — principles I value deeply.",
    "What sets me apart is not just technical skill, but the mindset of a lifelong learner. I embrace challenges with patience, quickly adapt to new technologies, and stay up-to-date with the latest innovations to keep pushing my limits.",
    "Working with international clients has sharpened my communication and teamwork skills, making collaboration across cultures a natural part of my workflow. For me, building software isn't just about delivering a solution — it's about crafting something that truly makes a difference.",
    "When I'm not immersed in coding, you'll find me exploring new design ideas, contributing to open-source communities, or simply recharging outdoors — keeping a healthy balance between work and life.",
    "Every project I take on is more than just work — it's a new adventure. And this journey? It's only just beginning."
  ];

  useEffect(() => {
    if (!inView || currentParagraphIndex >= paragraphs.length) return;

    let timeout;
    let charIndex = 0;
    const currentParagraph = paragraphs[currentParagraphIndex];
    
    const typeNextChar = () => {
      if (charIndex <= currentParagraph.length) {
        setCurrentText(currentParagraph.substring(0, charIndex));
        charIndex++;
        timeout = setTimeout(typeNextChar, 30); // Adjust typing speed here
      } else {
        // Current paragraph is complete
        // Add it to the list of completed paragraphs
        setTypedParagraphs(prev => [...prev, currentParagraph]);
        setCurrentText('');
        
        // Move to next paragraph after a delay
        if (currentParagraphIndex < paragraphs.length - 1) {
          timeout = setTimeout(() => {
            setCurrentParagraphIndex(prev => prev + 1);
          }, 500);
        } else {
          setIsTypingComplete(true);
        }
      }
    };

    typeNextChar();

    return () => clearTimeout(timeout);
  }, [inView, currentParagraphIndex]);

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
            <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate software engineer with a keen eye for design and a commitment to creating
              exceptional digital experiences that make a difference.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Display completed paragraphs */}
              {typedParagraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-800 dark:text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              
              {/* Currently typing paragraph */}
              {!isTypingComplete && (
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                  {currentText}
                  <span className="animate-pulse ml-0.5 inline-block h-5 w-0.5 bg-blue-500 dark:bg-blue-400"></span>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 