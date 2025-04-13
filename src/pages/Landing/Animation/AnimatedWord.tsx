import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['Sort', 'Filter', 'Discover'];

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
  exit: (i: number) => ({
    y: -20,
    opacity: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
};

export const AnimatedWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3000); // Increased time to allow for letter animations
    return () => clearInterval(interval);
  }, []);

  return (
    <span className='inline-block text-blue-400'>
      <AnimatePresence mode='wait'>
        <motion.span key={words[index]} className='inline-flex'>
          {words[index].split('').map((letter, letterIndex) => (
            <motion.span
              key={`${letter}-${letterIndex}`}
              variants={letterVariants}
              custom={letterIndex}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='inline-block'
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
