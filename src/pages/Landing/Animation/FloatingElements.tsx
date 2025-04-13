import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Image, FileText, Paperclip } from 'lucide-react';

interface FloatingElementsProps {
  inView: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const FloatingElements: React.FC<FloatingElementsProps> = ({ inView }) => {
  return (
    <motion.div
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='absolute inset-0'
    >
      {/* Avatars */}
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743547434/LearnExperts_jvacc5.png'
        className='absolute top-[14%] left-[10%]'
        alt='Text Learn Experts'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743551406/s3-fields_xdzib7.gif'
        className='absolute w-32 h-32 bottom-[9%] left-[20%]'
        alt='Table Fields'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743551065/s3-tradetable_zrnqc1.png'
        className='absolute w-32 h-32 top-[9%] right-[45%]'
        alt='Trade Unlocked'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743550358/s3-chart_snvq45.png'
        className='absolute w-32 h-32 bottom-[14%] right-[11%]'
        alt='Chart'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743552392/s3-TEXT-Knowledge_uzqknj.png'
        className='absolute bottom-[18%] left-[45%]'
        alt='Text-Resources'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743552393/s3-TEXT-collab_hnhpep.png'
        className='absolute top-[8%] right-[17%]'
        alt='Text-Collab'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743552392/s3-gme_xabvwh.png'
        className='absolute w-16 h-16 bottom-[22%] left-[7%] opacity-50'
        alt='Roaring Kitty'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743553729/s3-bigshort_v2z7zf.png'
        className='absolute w-16 h-16 top-[22%] right-[14%] opacity-50'
        alt='Roaring Kitty'
      />
      <motion.img
        variants={itemVariants}
        src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743554369/s3-pelosi_pbsnlq.png'
        className='absolute w-14 h-14 top-[22%] left-[28%] opacity-50'
        alt='Pelosi'
      />
    </motion.div>
  );
};

export default FloatingElements;
