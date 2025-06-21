import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedBackground.css';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const AnimatedBackground = () => {
  const containerRef = useRef();
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // High-contrast orb animations
      gsap.to(orb1Ref.current, {
        motionPath: {
          path: "#main-curve",
          align: "#main-curve",
          autoRotate: false,
        },
        duration: 12,
        repeat: -1,
        ease: "none"
      });

      gsap.to(orb2Ref.current, {
        motionPath: {
          path: "#secondary-curve", 
          align: "#secondary-curve",
          autoRotate: false,
        },
        duration: 15,
        repeat: -1,
        ease: "none",
        delay: 4
      });

      gsap.to(orb3Ref.current, {
        motionPath: {
          path: "#tertiary-curve",
          align: "#tertiary-curve", 
          autoRotate: false,
        },
        duration: 18,
        repeat: -1,
        ease: "none",
        delay: 8
      });

      // Parallax background layers
      gsap.to('.ultra-layer-1', {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.ultra-layer-2', {
        yPercent: -25,
        ease: "none", 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="ultra-modern-background">
      {/* High-Contrast Base */}
      <div className="ultra-gradient-base" />
      
      {/* Ultra Layer 1 - Dramatic Curves */}
      <svg className="ultra-layer ultra-layer-1" viewBox="0 0 1600 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ultraGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4a60e" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#22736a" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0a2c35" stopOpacity="0.8"/>
          </linearGradient>
          <filter id="ultraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <path 
          d="M0,200 Q200,50 400,200 Q600,350 800,200 Q1000,50 1200,200 Q1400,350 1600,200 L1600,800 L0,800 Z"
          fill="url(#ultraGradient1)"
          filter="url(#ultraGlow)"
          className="ultra-curve-shape"
        />
      </svg>

      {/* Ultra Layer 2 - Contrasting Waves */}
      <svg className="ultra-layer ultra-layer-2" viewBox="0 0 1600 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ultraGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22736a" stopOpacity="0.7"/>
            <stop offset="50%" stopColor="#f4a60e" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#08252b" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        <path 
          d="M0,400 Q300,250 600,400 Q900,550 1200,400 Q1350,325 1600,400 L1600,800 L0,800 Z"
          fill="url(#ultraGradient2)" 
          className="ultra-wave-shape"
        />
      </svg>

      {/* High-Visibility Curved Paths */}
      <svg className="ultra-paths-network" viewBox="0 0 1600 800">
        <defs>
          <linearGradient id="ultraPathGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(244, 166, 14, 0)"/>
            <stop offset="50%" stopColor="rgba(244, 166, 14, 1)"/>
            <stop offset="100%" stopColor="rgba(244, 166, 14, 0)"/>
          </linearGradient>
          <linearGradient id="ultraPathGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 115, 106, 0)"/>
            <stop offset="50%" stopColor="rgba(34, 115, 106, 0.9)"/>
            <stop offset="100%" stopColor="rgba(34, 115, 106, 0)"/>
          </linearGradient>
          <linearGradient id="ultraPathGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)"/>
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)"/>
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"/>
          </linearGradient>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        
        {/* Main High-Contrast Curve */}
        <path 
          id="main-curve"
          d="M100,300 Q300,150 500,300 Q700,450 900,300 Q1100,150 1300,300 Q1450,375 1500,300"
          stroke="url(#ultraPathGrad1)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="12,12"
          filter="url(#pathGlow)"
          className="ultra-main-path"
        />
        
        {/* Secondary Contrasting Curve */}
        <path 
          id="secondary-curve"
          d="M50,500 Q250,350 450,500 Q650,650 850,500 Q1050,350 1250,500 Q1400,575 1550,500"
          stroke="url(#ultraPathGrad2)"
          strokeWidth="3"
          fill="none" 
          strokeDasharray="8,8"
          filter="url(#pathGlow)"
          className="ultra-secondary-path"
        />
        
        {/* Tertiary Bright Curve */}
        <path 
          id="tertiary-curve"
          d="M150,200 Q350,100 550,200 Q750,300 950,200 Q1150,100 1350,200 Q1475,250 1450,200"
          stroke="url(#ultraPathGrad3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6,6"
          filter="url(#pathGlow)"
          className="ultra-tertiary-path"
        />
        
        {/* High-Contrast Animated Orbs */}
        <circle ref={orb1Ref} r="12" fill="#f4a60e" className="ultra-orb primary-orb" />
        <circle ref={orb2Ref} r="10" fill="#22736a" className="ultra-orb secondary-orb" />
        <circle ref={orb3Ref} r="8" fill="#ffffff" className="ultra-orb tertiary-orb" />
      </svg>

      {/* Floating High-Contrast Elements */}
      <div className="ultra-floating-elements">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="ultra-float-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${gsap.utils.random(8, 20)}px`,
              height: `${gsap.utils.random(8, 20)}px`,
              background: i % 3 === 0 ? '#f4a60e' : i % 3 === 1 ? '#22736a' : '#ffffff',
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Ultra-Visible Grid Pattern */}
      <div className="ultra-grid-system">
        <svg className="ultra-grid-svg" viewBox="0 0 1600 800">
          <defs>
            <pattern id="ultraGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(244, 166, 14, 0.25)" strokeWidth="1"/>
              <circle cx="0" cy="0" r="3" fill="rgba(244, 166, 14, 0.6)"/>
              <circle cx="100" cy="100" r="3" fill="rgba(34, 115, 106, 0.6)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ultraGrid)" />
        </svg>
      </div>

      {/* Dramatic Light Beams */}
      <div className="ultra-light-beams">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="light-beam"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${i * 0.3}s`,
              background: `linear-gradient(
                to bottom,
                ${i % 2 === 0 ? 'rgba(244, 166, 14, 0.3)' : 'rgba(34, 115, 106, 0.3)'} 0%,
                transparent 100%
              )`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
