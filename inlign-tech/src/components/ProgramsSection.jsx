import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, Code, BarChart3, Clock, Users, Award, 
  ArrowRight, CheckCircle, Zap, Sparkles, Rocket 
} from 'lucide-react';
import LiquidCard from './LiquidCard';  // Added LiquidCard import
import './ProgramsSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProgramsSection = () => {
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  const programs = [
    {
      icon: <Shield size={28} />,
      level: "Intermediate to Advanced",
      duration: "16 Weeks",
      title: "Offensive Cybersecurity",
      subtitle: "Internship Program",
      description: "Master ethical hacking and cybersecurity with industry tools",
      longDescription: "Gain practical skills in penetration testing, vulnerability assessment, and ethical hacking with industry-standard tools.",
      students: "25+",
      learningOutcomes: [
        "Network Security Fundamentals",
        "Ethical Hacking with Kali Linux", 
        "Penetration Testing Methodologies",
        "Vulnerability Assessment"
      ],
      technologies: ["Kali Linux", "Metasploit", "Nmap", "Wireshark", "Burp Suite"],
      outcomes: ["Industry Certification", "Portfolio Projects", "Job Placement Support"],
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b, #ff4757)"
    },
    {
      icon: <Code size={28} />,
      level: "Beginner to Advanced",
      duration: "20 Weeks", 
      title: "Full-Stack Development",
      subtitle: "Internship Program",
      description: "Build dynamic web applications with modern frameworks",
      longDescription: "Create responsive websites and web applications using cutting-edge technologies.",
      students: "50+",
      learningOutcomes: [
        "HTML5, CSS3 & JavaScript",
        "React.js & Component Architecture", 
        "Node.js & Express.js",
        "MongoDB & Database Design"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Git", "VS Code"],
      outcomes: ["Live Projects", "GitHub Portfolio", "Industry Mentorship"],
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4, #2ed573)"
    },
    {
      icon: <BarChart3 size={28} />,
      level: "Intermediate",
      duration: "18 Weeks",
      title: "Data Science",
      subtitle: "Internship Program", 
      description: "Master data analysis and predictive modeling",
      longDescription: "Learn to collect, analyze, and visualize data to drive business decisions using Python and ML.",
      students: "30+",
      learningOutcomes: [
        "Python Programming",
        "Data Analysis with Pandas",
        "Data Visualization", 
        "Machine Learning Algorithms"
      ],
      technologies: ["Python", "Jupyter", "Pandas", "Scikit-learn", "TensorFlow"],
      outcomes: ["ML Models", "Data Projects", "Certification"],
      color: "#45b7d1",
      gradient: "linear-gradient(135deg, #45b7d1, #3742fa)"
    }
  ];

  // Floating particles animation
  useEffect(() => {
    gsap.utils.toArray(".floating-particle").forEach(particle => {
      gsap.to(particle, {
        y: () => gsap.utils.random(-30, 30),
        x: () => gsap.utils.random(-30, 30),
        duration: () => gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Staggered entry animation
    gsap.from(".program-card", {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      }
    });
  }, []);

  return (
    <section className="programs-section" ref={sectionRef}>
      {/* Animated background particles */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="floating-particle"
            style={{
              background: `radial-gradient(circle, ${programs[i % 3].color}aa, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our <span className="highlight">Programs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transform your career with industry-leading internship programs
          </motion.p>
        </motion.div>

        <div className="programs-grid">
          {programs.map((program, index) => (
            <LiquidCard 
              key={index}
              className="program-card"
              style={{
                '--program-color': program.color,
                '--program-gradient': program.gradient
              }}
            >
              {/* Floating Icon */}
              <motion.div 
                className="program-icon-container"
                whileHover={{ rotate: 15, scale: 1.2 }}
              >
                {program.icon}
              </motion.div>

              {/* Badges */}
              <div className="program-badges">
                <motion.span 
                  className="level-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  {program.level}
                </motion.span>
                <motion.span 
                  className="duration-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  {program.duration}
                </motion.span>
              </div>

              {/* Title section */}
              <div className="program-title-section">
                <h3>{program.title}</h3>
                <h4>{program.subtitle}</h4>
                <p className="program-description">{program.description}</p>
              </div>

              {/* Meta info */}
              <div className="program-meta">
                <div className="meta-item">
                  <Clock size={18} />
                  <span>{program.duration}</span>
                </div>
                <div className="meta-item">
                  <Users size={18} />
                  <span>{program.students} Students</span>
                </div>
                <div className="meta-item">
                  <Award size={18} />
                  <span>{program.level}</span>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="program-section">
                <h5 className="section-title">
                  <Zap size={18} className="mr-2" /> 
                  What You'll Learn
                </h5>
                <ul className="learning-list">
                  {program.learningOutcomes.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i + 0.4 }}
                    >
                      <CheckCircle size={16} className="check-icon" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tools & Technologies */}
              <div className="program-section">
                <h5 className="section-title">Tools & Technologies</h5>
                <div className="technologies-tags">
                  {program.technologies.map((tech, i) => (
                    <motion.span 
                      key={i}
                      className="tech-tag"
                      whileHover={{ scale: 1.1, y: -3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Program Outcomes */}
              <div className="program-section">
                <h5 className="section-title">Program Outcomes</h5>
                <div className="outcomes-list">
                  {program.outcomes.map((outcome, i) => (
                    <motion.div 
                      key={i}
                      className="outcome-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles size={14} className="mr-2" />
                      <span>{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.button 
                className="program-cta"
                whileHover={{ 
                  scale: 1.05,
                  background: program.gradient,
                  boxShadow: `0 10px 30px ${program.color}50`
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: program.gradient,
                  boxShadow: `0 5px 20px ${program.color}30`
                }}
              >
                <span>Enroll Now</span>
                <motion.div
                  className="arrow-container"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </LiquidCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
