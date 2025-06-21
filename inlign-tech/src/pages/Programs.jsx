import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield, Code, BarChart3, Clock, Users, Award,
  ArrowRight, CheckCircle, Zap, Sparkles
} from 'lucide-react';
import './Programs.css';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const programs = [
  {
    id: 1,
    icon: <Shield size={32} />,
    title: "Offensive Cybersecurity",
    subtitle: "Internship Program",
    description: "Master ethical hacking and cybersecurity",
    duration: "16 Weeks",
    level: "Intermediate to Advanced",
    students: "25+",
    learningOutcomes: [
      "Network Security Fundamentals",
      "Ethical Hacking with Kali Linux",
      "Penetration Testing Methodologies",
      "Vulnerability Assessment"
    ],
    technologies: ["Kali Linux", "Metasploit", "Nmap", "Wireshark"],
    outcomes: ["Industry Certification", "Portfolio Projects", "Job Placement"],
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b, #ff4757)"
  },
  {
    id: 2,
    icon: <Code size={32} />,
    title: "Full-Stack Development",
    subtitle: "Internship Program",
    description: "Build dynamic web applications",
    duration: "20 Weeks",
    level: "Beginner to Advanced",
    students: "50+",
    learningOutcomes: [
      "HTML5, CSS3 & JavaScript",
      "React.js & Component Architecture",
      "Node.js & Express.js",
      "MongoDB & Database Design"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Git"],
    outcomes: ["Live Projects", "GitHub Portfolio", "Mentorship"],
    color: "#4ecdc4",
    gradient: "linear-gradient(135deg, #4ecdc4, #2ed573)"
  },
  {
    id: 3,
    icon: <BarChart3 size={32} />,
    title: "Data Science",
    subtitle: "Internship Program",
    description: "Master data science fundamentals",
    duration: "18 Weeks",
    level: "Intermediate",
    students: "30+",
    learningOutcomes: [
      "Python Programming",
      "Data Analysis with Pandas",
      "Data Visualization",
      "Machine Learning Algorithms"
    ],
    technologies: ["Python", "Jupyter", "Pandas", "Scikit-learn"],
    outcomes: ["ML Models", "Data Projects", "Certification"],
    color: "#45b7d1",
    gradient: "linear-gradient(135deg, #45b7d1, #3742fa)"
  }
];

// --- Animated Text ---
const AnimatedText = ({ text, className }) => (
  <span className={className}>
    {text.split('').map((char, i) =>
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.03 * i, type: "spring", stiffness: 500, damping: 20 }}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    )}
  </span>
);

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.18 * i,
      type: "spring",
      stiffness: 120,
      damping: 18
    }
  }),
  hover: {
    scale: 1.045,
    y: -18,
    boxShadow: "0 30px 70px rgba(0,0,0,0.13)",
    transition: { type: "spring", stiffness: 300 }
  }
};

const Programs = () => {
  const sectionRef = useRef();
  const particlesRef = useRef([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false, hover: false });

  // Animated cursor
  useEffect(() => {
    const moveCursor = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
        active: true,
        hover: e.target.closest('.program-card') || e.target.closest('button')
      });
    };
    const leavePage = () => setCursor(c => ({ ...c, active: false }));
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', leavePage);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', leavePage);
    };
  }, []);

  // Animated particles and card entrance
  useEffect(() => {
    // Animate particles with more visible, layered motion
    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;
      gsap.to(particle, {
        y: () => gsap.utils.random(-60, 60),
        x: () => gsap.utils.random(-60, 60),
        scale: () => gsap.utils.random(0.8, 1.5),
        opacity: () => gsap.utils.random(0.13, 0.25),
        duration: () => gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // Card entrance with more pop and rotation
    gsap.utils.toArray(".program-card").forEach((card, i) => {
      gsap.fromTo(card,
        {
          y: 120,
          opacity: 0,
          scale: 0.9,
          rotation: gsap.utils.random(-7, 7)
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: i * 0.18,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reset"
          }
        }
      );
    });

    // 3D tilt effect for cards
    gsap.utils.toArray(".program-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 14,
          rotationX: y * -14,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)"
        });
      });
    });
  }, []);

  return (
    <div className="programs-page">
      {/* Animated Cursor */}
      <AnimatePresence>
        <motion.div
          className="animated-cursor"
          style={{
            left: cursor.x,
            top: cursor.y,
            background: cursor.hover
              ? "radial-gradient(circle, #44beb1 70%, #fff 10%, transparent 100%)"
              : "radial-gradient(circle, #f4a60e 60%, transparent 100%)"
          }}
          animate={{
            scale: cursor.active ? (cursor.hover ? 2.2 : 1.2) : 0,
            opacity: cursor.active ? 0.20 : 0
          }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        />
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(18)].map((_, i) => {
          const color = programs.length > 0
            ? programs[i % programs.length].color
            : '#45b7d1';
          return (
            <div
              key={i}
              ref={el => particlesRef.current[i] = el}
              className="particle"
              style={{
                background: `radial-gradient(circle, ${color}cc, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 28 + 12}px`,
                height: `${Math.random() * 28 + 12}px`,
                filter: "blur(2.5px)"
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="programs-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-content"
          >
            <h1 className="hero-title">
              <AnimatedText text="Transform " />
              <span className="highlight">
                <AnimatedText text="Your " />
              </span>
              <br />
              <AnimatedText text="Career" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Industry-leading internship programs designed to make you job-ready
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 18, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowRight size={28} className="arrow-icon" />
        </motion.div>
      </section>

      {/* Programs Section */}
      <section className="programs-section" ref={sectionRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2>
              <AnimatedText text="Our " />
              <span className="highlight">
                <AnimatedText text="Programs" />
              </span>
            </h2>
            <p>Choose from our comprehensive internship programs</p>
          </motion.div>
          <motion.div
            className="programs-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                className="program-card"
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                style={{
                  '--program-color': program.color,
                  '--program-gradient': program.gradient
                }}
              >
                {/* Animated Icon */}
                <motion.div
                  className="program-icon-container"
                  whileHover={{
                    rotate: [0, 18, -18, 0],
                    scale: [1, 1.22, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {program.icon}
                </motion.div>
                {/* Badges */}
                <div className="program-badges">
                  <motion.span
                    className="level-badge"
                    whileHover={{
                      scale: 1.08,
                      y: [0, -8, 0],
                      background: program.gradient
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {program.level}
                  </motion.span>
                  <motion.span
                    className="duration-badge"
                    whileHover={{
                      scale: 1.08,
                      y: [0, -8, 0],
                      background: program.gradient
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.2
                    }}
                  >
                    {program.duration}
                  </motion.span>
                </div>
                {/* Title section */}
                <div className="program-title-section">
                  <motion.h3
                    animate={{
                      textShadow: [
                        "0 0 0px var(--program-color)",
                        "0 0 12px var(--program-color)",
                        "0 0 22px var(--program-color)",
                        "0 0 0px var(--program-color)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    {program.title}
                  </motion.h3>
                  <h4>{program.subtitle}</h4>
                  <p className="program-description">{program.description}</p>
                </div>
                {/* Meta info */}
                <div className="program-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{program.students} Students</span>
                  </div>
                  <div className="meta-item">
                    <Award size={16} />
                    <span>{program.level}</span>
                  </div>
                </div>
                {/* Learning outcomes */}
                <div className="program-section">
                  <h5 className="section-title">
                    <Zap size={18} className="mr-2" />
                    What You'll Learn
                  </h5>
                  <motion.ul
                    className="learning-list"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.13 }
                      }
                    }}
                  >
                    {program.learningOutcomes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.09 * i + 0.22 }}
                        whileHover={{
                          x: 16,
                          color: "var(--program-color)",
                          scale: 1.08
                        }}
                      >
                        <CheckCircle size={16} className="check-icon" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                {/* Technologies */}
                <div className="program-section">
                  <h5 className="section-title">Tools & Technologies</h5>
                  <motion.div
                    className="tech-tags"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.09 }
                      }
                    }}
                  >
                    {program.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="tech-tag"
                        whileHover={{
                          scale: 1.13,
                          y: -6,
                          backgroundColor: "var(--program-color)",
                          color: "#fff"
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 0px var(--program-color)",
                            "0 0 12px var(--program-color)",
                            "0 0 0px var(--program-color)"
                          ]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: i * 0.13
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
                {/* Outcomes */}
                <div className="program-section">
                  <h5 className="section-title">Program Outcomes</h5>
                  <motion.div
                    className="outcomes-list"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.11 }
                      }
                    }}
                  >
                    {program.outcomes.map((outcome, i) => (
                      <motion.div
                        key={i}
                        className="outcome-item"
                        whileHover={{ scale: 1.13, background: program.gradient }}
                        animate={{
                          boxShadow: [
                            "0 0 0px var(--program-color)",
                            "0 0 18px var(--program-color)",
                            "0 0 0px var(--program-color)"
                          ]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: i * 0.17
                        }}
                      >
                        <Sparkles size={14} className="mr-2" />
                        <span>{outcome}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                {/* CTA Button */}
                <motion.button
                  className="program-cta"
                  whileHover={{
                    scale: 1.08,
                    background: program.gradient,
                    boxShadow: `0 14px 40px ${program.color}70`
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: program.gradient,
                    boxShadow: `0 7px 24px ${program.color}30`
                  }}
                  animate={{
                    background: [
                      program.gradient,
                      `linear-gradient(135deg, ${program.color}, #ffffff)`,
                      program.gradient
                    ]
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity
                  }}
                >
                  <span>Enroll Now</span>
                  <motion.div
                    className="arrow-container"
                    whileHover={{ x: 10 }}
                    animate={{
                      x: [0, 12, 0]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <ArrowRight size={22} />
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
