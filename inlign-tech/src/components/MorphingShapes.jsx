import React from 'react';
import { motion } from 'framer-motion';
import './MorphingShapes.css';

const MorphingShapes = () => {
  const shapes = [
    {
      id: 1,
      initial: "M12,2 L22,22 L2,22 Z",
      morph: "M12,2 C18,2 22,6 22,12 C22,18 18,22 12,22 C6,22 2,18 2,12 C2,6 6,2 12,2 Z"
    },
    {
      id: 2,
      initial: "M2,2 L22,2 L22,22 L2,22 Z",
      morph: "M2,12 C2,6 6,2 12,2 C18,2 22,6 22,12 C22,18 18,22 12,22 C6,22 2,18 2,12 Z"
    }
  ];

  return (
    <div className="morphing-shapes-container">
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className="morphing-shape-wrapper"
          style={{
            position: 'absolute',
            left: `${20 + index * 60}%`,
            top: `${30 + index * 20}%`,
          }}
          animate={{
            rotate: 360,
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24">
            <motion.path
              d={shape.initial}
              fill="rgba(244, 166, 14, 0.6)"
              stroke="#f4a60e"
              strokeWidth="2"
              animate={{
                d: [shape.initial, shape.morph, shape.initial],
                fill: [
                  "rgba(244, 166, 14, 0.6)",
                  "rgba(34, 115, 106, 0.6)",
                  "rgba(244, 166, 14, 0.6)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default MorphingShapes;
