import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FluidLoader.css';

const FluidLoader = ({ isVisible, onComplete, duration = 3 }) => {
  const containerRef = useRef();
  const liquidRef = useRef();
  const wavesRef = useRef([]);

  useEffect(() => {
    if (!isVisible) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Liquid fill animation
    tl.to(liquidRef.current, {
      height: '100%',
      duration: duration * 0.7,
      ease: "power2.inOut"
    });

    // Wave animations
    wavesRef.current.forEach((wave, index) => {
      if (wave) {
        tl.to(wave, {
          y: -50,
          opacity: [0.3, 0.8, 0.3],
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, index * 0.2);
      }
    });

    // Fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: duration * 0.2
    });

    return () => tl.kill();
  }, [isVisible, onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fluid-loader">
      <div className="loader-container">
        <div className="liquid-container">
          <div ref={liquidRef} className="liquid-fill-loader">
            <div className="liquid-surface">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  ref={el => wavesRef.current[i] = el}
                  className="surface-wave"
                  style={{
                    left: `${i * 20}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <div className="bubbles">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bubble"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="loader-text">
          <span>INLIGN</span>
          <span className="accent">TECH</span>
        </div>
        <div className="progress-indicator">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default FluidLoader;
