import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimatedText = ({ children, className, animation = 'fadeUp' }) => {
  const textRef = useRef();

  useEffect(() => {
    const element = textRef.current;
    
    // Split text into characters/words
    const text = element.textContent;
    const chars = text.split('');
    
    element.innerHTML = chars.map(char => 
      char === ' ' ? ' ' : `<span class="char">${char}</span>`
    ).join('');

    const charElements = element.querySelectorAll('.char');

    // Animation variants
    const animations = {
      fadeUp: {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 }
      },
      wave: {
        from: { y: 30, opacity: 0 },
        to: { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      },
      glitch: {
        from: { x: -10, opacity: 0, skewX: 10 },
        to: { 
          x: 0, 
          opacity: 1, 
          skewX: 0,
          duration: 0.4, 
          stagger: 0.02,
          ease: "power2.out"
        }
      }
    };

    const selectedAnimation = animations[animation];

    gsap.fromTo(charElements, selectedAnimation.from, {
      ...selectedAnimation.to,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

  }, [animation]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export const GlowText = ({ children, className }) => {
  const textRef = useRef();

  useEffect(() => {
    const element = textRef.current;
    
    gsap.to(element, {
      textShadow: "0 0 20px #f4a60e, 0 0 40px #f4a60e, 0 0 60px #f4a60e",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div ref={textRef} className={`glow-text ${className}`}>
      {children}
    </div>
  );
};
