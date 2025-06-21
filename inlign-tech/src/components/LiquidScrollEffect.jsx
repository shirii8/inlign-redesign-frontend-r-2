import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Add this import
import './LiquidScrollEffect.css';

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

const LiquidScrollEffect = ({ children, triggerElement }) => {
  const containerRef = useRef();
  const liquidRef = useRef();

  useEffect(() => {
    // Ensure GSAP context is properly initialized
    if (!containerRef.current || !liquidRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(liquidRef.current, {
        height: '100%',
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerElement || containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Proper cleanup
  }, [triggerElement]);

  return (
    <div ref={containerRef} className="liquid-scroll-container">
      <div ref={liquidRef} className="liquid-reveal">
        <div className="liquid-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LiquidScrollEffect;
