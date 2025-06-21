// components/StatsSection.js
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from './AnimatedSection';
import './StatsSection.css';

const StatsSection = () => {
  const statsData = [
    { number: 1000, suffix: '+', label: 'Students Enrolled' },
    { number: 500, suffix: '+', label: 'Projects Completed' },
    { number: 100, suffix: '%', label: 'Job Placement Rate' },
    { number: 50, suffix: '+', label: 'Industry Partners' }
  ];

  return (
    <AnimatedSection className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">
                {stat.number}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default StatsSection;
