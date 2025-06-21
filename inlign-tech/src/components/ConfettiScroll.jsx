import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConfettiScroll.css';

gsap.registerPlugin(ScrollTrigger);

const ConfettiScroll = ({ triggerRef, colors = ['#f4a60e', '#22736a', '#ffffff'] }) => {
  const confettiRef = useRef();

  useEffect(() => {
    const createConfetti = () => {
      const container = confettiRef.current;
      const confettiPieces = [];

      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.width = (Math.random() * 10 + 5) + 'px';
        piece.style.height = (Math.random() * 10 + 5) + 'px';
        container.appendChild(piece);
        confettiPieces.push(piece);
      }

      const tl = gsap.timeline({ paused: true });
      
      confettiPieces.forEach((piece, index) => {
        tl.fromTo(piece, 
          { 
            y: -100,
            rotation: 0,
            opacity: 0
          },
          {
            y: window.innerHeight + 100,
            rotation: 720,
            opacity: 1,
            duration: 3 + Math.random() * 2,
            ease: "power2.out"
          }, 
          index * 0.05
        );
      });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 80%",
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      });

      return () => {
        confettiPieces.forEach(piece => piece.remove());
      };
    };

    if (triggerRef.current) {
      return createConfetti();
    }
  }, [triggerRef, colors]);

  return <div ref={confettiRef} className="confetti-container" />;
};

export default ConfettiScroll;
