import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Fix: Proper element checking
      if (target && target.nodeType === 1) {
        const isInteractive = target.matches && (
          target.matches('a, button, .interactive') ||
          target.closest('a, button, .interactive')
        );
        
        if (isInteractive) {
          gsap.to(cursor, {
            scale: 1.8, // Reduced from 3 to 1.8
            opacity: 0.4, // More transparent on interaction
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(cursorDot, {
            scale: 0.3,
            opacity: 0.8,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      
      // Fix: Proper element checking
      if (target && target.nodeType === 1) {
        const isInteractive = target.matches && (
          target.matches('a, button, .interactive') ||
          target.closest('a, button, .interactive')
        );
        
        if (isInteractive) {
          gsap.to(cursor, {
            scale: 1,
            opacity: 0.8, // More prominent when not interacting
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(cursorDot, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="enhanced-cursor" />
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
