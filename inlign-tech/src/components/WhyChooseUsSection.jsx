// components/WhyChooseUsSection.js
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Lightbulb, Target, Clock, Badge } from 'lucide-react';
import './WhyChooseUsSection.css';

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const features = [
    {
      icon: <Award />,
      title: "Industry-Certified Programs",
      description: "Get certified with programs recognized by top tech companies"
    },
    {
      icon: <Users />,
      title: "Expert Mentorship",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: <Lightbulb />,
      title: "Hands-On Projects",
      description: "Build real-world projects that showcase your abilities"
    },
    {
      icon: <Target />,
      title: "Career-Focused",
      description: "Programs designed to make you job-ready from day one"
    },
    {
      icon: <Clock />,
      title: "Flexible Learning",
      description: "Study at your own pace with our online platform"
    },
    {
      icon: <Badge />,
      title: "Lifetime Access",
      description: "Get lifetime access to course materials and updates"
    }
  ];

  return (
    <section className="why-choose-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="header-text"
          >
            {Array.from("Why Choose INLIGN TECH?").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: i * 0.03,
                    type: "spring",
                    stiffness: 300
                  }
                } : {}}
                whileHover={{
                  color: '#a3e6c3',
                  y: -3,
                  transition: { duration: 0.2 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            We're committed to providing the best learning experience
          </motion.p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card tilt"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  delay: index * 0.13,
                  type: "spring",
                  stiffness: 120
                }
              } : {}}
              whileHover={{
                rotate: 0,
                scale: 1.045,
                y: -10,
                boxShadow: "0 12px 40px 0 rgba(244,166,14,0.25), 0 1.5px 12px 0 #0a3940",
                transition: { type: "spring", stiffness: 300, damping: 18 }
              }}
              whileTap={{
                scale: 0.97
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 15, scale: 1.16 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3
                whileHover={{
                  color: '#ffd166',
                  x: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0.8 }}
                whileHover={{
                  opacity: 1,
                  color: '#ffffff',
                  transition: { duration: 0.3 }
                }}
              >
                {feature.description}
              </motion.p>
              <span className="card-glass" />
              <span className="card-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
