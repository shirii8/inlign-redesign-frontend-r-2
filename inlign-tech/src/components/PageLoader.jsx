import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import './PageLoader.css';

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef();
  const progressRef = useRef();
  const logoRef = useRef();
  const glassRef = useRef();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingMessages = [
    'Initializing systems...',
    'Loading cutting-edge technology...',
    'Preparing immersive experience...',
    'Optimizing performance...',
    'Almost ready...'
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, progressRef.current], { 
      opacity: 0, 
      y: 30 
    });

    // Logo entrance with liquid effect
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Progress animation with text updates
    tl.to({}, {
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
        
        // Update loading text based on progress
        if (prog < 20) setLoadingText(loadingMessages[0]);
        else if (prog < 40) setLoadingText(loadingMessages[1]);
        else if (prog < 60) setLoadingText(loadingMessages[2]);
        else if (prog < 80) setLoadingText(loadingMessages[3]);
        else setLoadingText(loadingMessages[4]);
      }
    }, "-=0.3");

    // Glass morphing effect
    tl.to(glassRef.current, {
      scale: 1.1,
      rotation: 360,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.5");

    // Exit animation
    tl.to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        ref={loaderRef}
        className="page-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
      >
        {/* Liquid background */}
        <div className="liquid-background">
          <div className="liquid-wave wave-1"></div>
          <div className="liquid-wave wave-2"></div>
          <div className="liquid-wave wave-3"></div>
        </div>

        {/* Glass morphism container */}
        <motion.div 
          ref={glassRef}
          className="glass-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Logo section */}
          <motion.div 
            ref={logoRef}
            className="loader-logo-section"
          >
            <div className="logo-container">
              <motion.img
                src="https://www.inlighntech.com/wp-content/uploads/2025/04/inlighn-tech-logo.png"
                alt="INLIGHN TECH"
                className="logo-image"
                animate={{
                  rotateY: [0, 360],
                  filter: [
                    'drop-shadow(0 0 10px rgba(244, 166, 14, 0.5))',
                    'drop-shadow(0 0 20px rgba(244, 166, 14, 0.8))',
                    'drop-shadow(0 0 10px rgba(244, 166, 14, 0.5))'
                  ]
                }}
                transition={{
                  rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                  filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <div className="logo-glow"></div>
            </div>
            
            <motion.div 
              className="brand-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="logo-text">INLIGHN</span>
              <span className="logo-accent">TECH</span>
            </motion.div>
          </motion.div>

          {/* Progress section */}
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-track">
                <motion.div 
                  className="progress-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="progress-glow" style={{ left: `${progress}%` }}></div>
              </div>
              <motion.span 
                className="progress-percentage"
                key={progress}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {progress}%
              </motion.span>
            </div>
            
            <motion.p 
              className="loading-text"
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.p>
          </div>

          {/* Liquid particles */}
          <div className="liquid-particles">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="liquid-particle"
                animate={{
                  y: [-30, -60, -30],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${5 + (i * 6)}%`,
                  background: i % 3 === 0 ? '#f4a60e' : i % 3 === 1 ? '#22736a' : '#0a3940'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tech grid background */}
        <div className="tech-grid">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="grid-dot"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
