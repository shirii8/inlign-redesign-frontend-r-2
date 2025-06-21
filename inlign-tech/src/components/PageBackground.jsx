import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './PageBackground.css';

const PageBackground = ({ variant = 'default' }) => {
  const bgRef = useRef();

  useEffect(() => {
    // Floating orbs animation
    gsap.to('.bg-orb', {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    // Data stream animation
    gsap.to('.data-stream', {
      x: '100vw',
      duration: 8,
      repeat: -1,
      ease: 'none',
      stagger: 2
    });

    // Circuit pulse
    gsap.to('.circuit-node', {
      scale: [1, 1.5, 1],
      opacity: [0.6, 1, 0.6],
      duration: 2,
      repeat: -1,
      stagger: 0.3
    });
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'about':
        return {
          primary: '#08252b',
          secondary: '#0a2c35',
          accent: '#f4a60e'
        };
      case 'programs':
        return {
          primary: '#0a2c35',
          secondary: '#08252b', 
          accent: '#22736a'
        };
      default:
        return {
          primary: '#08252b',
          secondary: '#0a2c35',
          accent: '#f4a60e'
        };
    }
  };

  const colors = getVariantStyles();

  return (
    <div ref={bgRef} className={`page-background ${variant}`}>
      {/* Gradient Base */}
      <div 
        className="gradient-base"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`
        }}
      ></div>

      {/* Floating Orbs */}
      <div className="floating-orbs">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-orb"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? colors.accent : colors.secondary}40, transparent)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Tech Grid */}
      <div className="tech-grid">
        <svg className="grid-svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="techGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={`${colors.accent}30`} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
        </svg>
      </div>

      {/* Data Streams */}
      <div className="data-streams">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="data-stream"
            style={{
              top: `${20 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, ${colors.accent}60, transparent)`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Circuit Network */}
      <svg className="circuit-network" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0"/>
            <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        <path 
          d="M100,200 Q600,100 1100,300" 
          stroke="url(#circuitGrad)" 
          strokeWidth="1" 
          fill="none"
          className="circuit-path"
        />
        <path 
          d="M50,400 Q500,300 1000,500" 
          stroke="url(#circuitGrad)" 
          strokeWidth="1" 
          fill="none"
          className="circuit-path"
        />
        
        <circle cx="300" cy="150" r="3" fill={colors.accent} className="circuit-node" />
        <circle cx="700" cy="250" r="3" fill={colors.accent} className="circuit-node" />
        <circle cx="500" cy="350" r="3" fill={colors.accent} className="circuit-node" />
      </svg>

      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        <motion.div 
          className="shape hexagon"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ borderColor: `${colors.accent}60` }}
        />
        <motion.div 
          className="shape triangle"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ borderBottomColor: `${colors.accent}40` }}
        />
      </div>
    </div>
  );
};

export default PageBackground;
