import React from 'react';
import { motion } from 'framer-motion';
import './TechMarquee.css';

const TechMarquee = ({ 
  text = "INLIGHN TECH • TRANSFORM YOUR CAREER • CYBER SECURITY • FULL STACK • DATA SCIENCE • INNOVATION", 
  direction = "left", 
  speed = 15, // Reduced from 50 to 15 for faster animation
  className = "" 
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={`interactive-marquee ${className}`}>
      <div className="marquee-container">
        <motion.div
          className="marquee-content"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(15)].map((_, i) => (
            <span key={i} className="marquee-text">
              {text} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
