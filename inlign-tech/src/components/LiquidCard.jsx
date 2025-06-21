import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './LiquidCard.css';

const LiquidCard = ({ children, className = '' }) => {
  const cardRef = useRef();
  const liquidBgRef = useRef();
  const rippleRef = useRef();

  useEffect(() => {
    const card = cardRef.current;
    const liquidBg = liquidBgRef.current;
    const ripple = rippleRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Liquid background follows mouse
      gsap.to(liquidBg, {
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(244, 166, 14, 0.2), transparent)`,
        duration: 0.3
      });

      // Ripple effect
      gsap.set(ripple, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        scale: 0,
        opacity: 0.6
      });

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(liquidBg, {
        background: 'transparent',
        duration: 0.5
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`liquid-card ${className}`}>
      <div ref={liquidBgRef} className="liquid-background"></div>
      <div ref={rippleRef} className="liquid-ripple-effect"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default LiquidCard;
