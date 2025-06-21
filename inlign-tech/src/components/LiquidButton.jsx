import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import './LiquidButton.css';

const LiquidButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}) => {
  const buttonRef = useRef();
  const liquidRef = useRef();
  const rippleRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    const liquid = liquidRef.current;
    const ripple = rippleRef.current;
    
    if (!button || !liquid || !ripple) return;

    const handleMouseEnter = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Liquid fill animation
      gsap.to(liquid, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      // Ripple effect
      gsap.set(ripple, {
        x: x,
        y: y,
        scale: 0,
        opacity: 1
      });

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(liquid, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    };

    const handleClick = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Explosive liquid effect
      gsap.set(ripple, {
        x: x,
        y: y,
        scale: 0,
        opacity: 0.8
      });

      gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      if (onClick) onClick(e);
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [onClick]);

  return (
    <button 
      ref={buttonRef}
      className={`liquid-button ${variant} ${size} ${className}`}
    >
      <span className="button-text">{children}</span>
      <div ref={liquidRef} className="liquid-fill"></div>
      <div ref={rippleRef} className="liquid-ripple"></div>
      <div className="liquid-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </button>
  );
});

export default LiquidButton;
