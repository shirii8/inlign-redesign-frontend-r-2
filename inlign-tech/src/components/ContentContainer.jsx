import React from 'react';
import { motion } from 'framer-motion';
import './ContentContainer.css';

const ContentContainer = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: "content-container",
    hero: "content-container hero-variant",
    section: "content-container section-variant",
    card: "content-container card-variant"
  };

  return (
    <motion.div 
      className={`${variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default ContentContainer;
