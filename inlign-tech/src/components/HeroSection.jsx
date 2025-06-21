import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef();
  const pathRef = useRef();
  const path2Ref = useRef();
  const path3Ref = useRef();
  const isInView = useInView(heroRef, { once: true });
  const [cardHovered, setCardHovered] = useState(null);

  useEffect(() => {
    // Complex path morphing with 4 states
    const paths = [
      { ref: pathRef, id: 1, durations: [4, 5, 4, 6] },
      { ref: path2Ref, id: 2, durations: [5, 6, 5, 7] },
      { ref: path3Ref, id: 3, durations: [6, 7, 6, 8] }
    ];

    paths.forEach((path) => {
      const tl = gsap.timeline({ repeat: -1, delay: path.id * 1.2 });
      
      tl.to(path.ref.current, {
        attr: { d: `M0,${100 + path.id*40} Q150,${30 + path.id*20} 300,${100 + path.id*40} T600,${100 + path.id*40} Q750,${170 + path.id*30} 900,${100 + path.id*40} T1200,${100 + path.id*40} Q1350,${30 + path.id*20} 1500,${100 + path.id*40} L1500,400 L0,400 Z` },
        duration: path.durations[0],
        ease: "sine.inOut"
      })
      .to(path.ref.current, {
        attr: { d: `M0,${180 + path.id*30} Q150,${100 + path.id*30} 300,${180 + path.id*30} T600,${180 + path.id*30} Q750,${50 + path.id*40} 900,${180 + path.id*30} T1200,${180 + path.id*30} Q1350,${100 + path.id*30} 1500,${180 + path.id*30} L1500,400 L0,400 Z` },
        duration: path.durations[1],
        ease: "sine.inOut"
      })
      .to(path.ref.current, {
        attr: { d: `M0,${220 + path.id*20} Q150,${150 + path.id*20} 300,${220 + path.id*20} T600,${220 + path.id*20} Q750,${280 + path.id*10} 900,${220 + path.id*20} T1200,${220 + path.id*20} Q1350,${150 + path.id*20} 1500,${220 + path.id*20} L1500,400 L0,400 Z` },
        duration: path.durations[2],
        ease: "sine.inOut"
      })
      .to(path.ref.current, {
        attr: { d: `M0,${280 + path.id*10} Q150,${200 + path.id*20} 300,${280 + path.id*10} T600,${280 + path.id*10} Q750,${150 + path.id*40} 900,${280 + path.id*10} T1200,${280 + path.id*10} Q1350,${200 + path.id*20} 1500,${280 + path.id*10} L1500,400 L0,400 Z` },
        duration: path.durations[3],
        ease: "sine.inOut"
      });
    });

    // Tech grid with more prominent animation
    const gridItems = document.querySelectorAll('.tech-grid-item');
    gridItems.forEach((item, i) => {
      gsap.to(item, {
        opacity: 0.5 + Math.random() * 0.5,
        scale: 0.8 + Math.random() * 0.4,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: i * 0.1
      });
    });

    return () => {
      gsap.globalTimeline.getChildren().forEach(tl => tl.kill());
    };
  }, []);

  // More dramatic text animations
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      filter: "blur(8px)",
      rotateX: -60
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.9
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      textShadow: "0 0 15px rgba(244, 166, 14, 0.7)",
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  // More dramatic stats card animations
  const statItemVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.7, 
      rotateY: -30,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    },
    animate: (index) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: 2.5 + index * 0.1,
        type: "spring",
        stiffness: 350,
        damping: 12,
        duration: 0.7
      }
    }),
    hover: {
      scale: 1.08,
      rotateY: 8,
      boxShadow: "0 12px 30px rgba(244, 166, 14, 0.4)",
      zIndex: 1,
      y: -10,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="liquid-hero-section" ref={heroRef}>
      {/* Tech Grid Background - more prominent */}
      <div className="tech-grid">
        {Array.from({ length: 120 }).map((_, i) => (
          <div 
            key={i} 
            className="tech-grid-item"
            style={{
              left: `${(i % 12) * 8.3}%`,
              top: `${Math.floor(i / 12) * 8.3}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
      
      {/* Animated Gradient Overlay - more dynamic */}
      <div className="animated-gradient-overlay" />

      {/* Enhanced Curved Paths - more amplitude */}
      <div className="curved-paths-container">
        <svg 
          className="curved-paths" 
          viewBox="0 0 1500 400" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4a60e" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#22736a" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#f4a60e" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22736a" stopOpacity="0.35"/>
              <stop offset="50%" stopColor="#f4a60e" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#22736a" stopOpacity="0.15"/>
            </linearGradient>
            <linearGradient id="pathGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4a60e" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#ffd166" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#f4a60e" stopOpacity="0.1"/>
            </linearGradient>
            <filter id="strong-glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            ref={pathRef}
            d="M0,100 Q150,80 300,100 T600,100 Q750,120 900,100 T1200,100 Q1350,80 1500,100 L1500,400 L0,400 Z" 
            fill="url(#pathGradient1)"
            filter="url(#strong-glow)"
            className="animated-path path-1"
          />
          <path 
            ref={path2Ref}
            d="M0,200 Q150,180 300,200 T600,200 Q750,220 900,200 T1200,200 Q1350,180 1500,200 L1500,400 L0,400 Z" 
            fill="url(#pathGradient2)"
            filter="url(#strong-glow)"
            className="animated-path path-2"
          />
          <path 
            ref={path3Ref}
            d="M0,300 Q150,280 300,300 T600,300 Q750,320 900,300 T1200,300 Q1350,280 1500,300 L1500,400 L0,400 Z" 
            fill="url(#pathGradient3)"
            filter="url(#strong-glow)"
            className="animated-path path-3"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="liquid-hero-content">
        <motion.div 
          className="hero-title-container"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="liquid-hero-title">
            {["Transform", "Your", "Career"].map((word, i) => (
              <motion.span
                key={i}
                className="title-word"
                variants={wordVariants}
                whileHover="hover"
              >
                {word}{i < 2 ? " " : ""}
              </motion.span>
            ))}
          </h1>
          <motion.div 
            className="brand-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: 0.8, 
                duration: 0.7, 
                type: "spring" 
              }
            } : {}}
          >
            <span className="with-text">with</span>
            <motion.span 
              className="liquid-brand"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(244, 166, 14, 0.7)",
                transition: { duration: 0.3 }
              }}
            >
              INLIGN TECH
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.p 
          className="liquid-hero-subtitle"
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            textShadow: "0 0 12px rgba(255,255,255,0.4)"
          } : {}}
          transition={{ 
            delay: 1.5,
            duration: 0.9,
            ease: "easeOut"
          }}
        >
          Industry-leading internship programs designed to make you job-ready
        </motion.p>

        <motion.div 
          className="liquid-cta-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            delay: 2.0,
            ease: "easeOut"
          }}
        >
          <motion.button 
            className="liquid-button primary"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 40px rgba(244, 166, 14, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Journey</span>
            <ArrowRight className="button-icon" />
          </motion.button>
          
          <motion.button 
            className="liquid-button secondary"
            whileHover={{
              scale: 1.08,
              borderColor: '#f4a60e',
              boxShadow: "0 0 30px rgba(34, 115, 106, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Watch Demo</span>
            <Play className="button-icon" />
          </motion.button>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="liquid-stats-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            delay: 2.3,
            ease: "easeOut"
          }}
        >
          {[
            { number: "1000+", label: "Interns Enrolled" },
            { number: "500+", label: "Projects Completed" },
            { number: "100%", label: "Satisfaction Rate" },
            { number: "50+", label: "Top Instructors" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="liquid-stat-item"
              variants={statItemVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              custom={index}
              whileHover="hover"
              onHoverStart={() => setCardHovered(index)}
              onHoverEnd={() => setCardHovered(null)}
            >
              <div className="stat-glow" />
              <motion.h3
                animate={{
                  scale: cardHovered === index ? 1.15 : 1,
                  textShadow: cardHovered === index 
                    ? "0 0 20px rgba(244, 166, 14, 0.6)" 
                    : "none",
                  color: cardHovered === index 
                    ? "#fff" 
                    : "#f4f4f4"
                }}
              >
                {stat.number}
              </motion.h3>
              <motion.p
                animate={{
                  borderBottom: cardHovered === index 
                    ? "3px solid #f4a60e" 
                    : "0px solid transparent",
                  paddingBottom: cardHovered === index 
                    ? "8px" 
                    : "0px"
                }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
