import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Award, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef();
  const roadmapRef = useRef();

  useEffect(() => {
    // Hero section animations
    gsap.fromTo(".about-hero-title", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".about-hero-subtitle", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );

    // Roadmap timeline animation
    ScrollTrigger.create({
      trigger: roadmapRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(".roadmap-step", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });
  }, []);

  const values = [
    {
      icon: <Target />,
      title: "Industry-Focused",
      description: "Bridging the gap between academic learning and industry needs",
      color: "#f4a60e"
    },
    {
      icon: <Users />,
      title: "Student-Centric",
      description: "Meaningful and immersive learning experiences for all students",
      color: "#22736a"
    },
    {
      icon: <Award />,
      title: "Excellence",
      description: "Committed to delivering high-quality education and training",
      color: "#f4a60e"
    },
    {
      icon: <Lightbulb />,
      title: "Innovation",
      description: "Embracing cutting-edge technologies and methodologies",
      color: "#22736a"
    }
  ];

  const roadmapSteps = [
    {
      step: "01",
      title: "Assessment & Onboarding",
      description: "Initial skill assessment and program customization",
      duration: "Week 1",
      features: ["Skill Assessment", "Goal Setting", "Mentor Assignment"]
    },
    {
      step: "02", 
      title: "Foundation Building",
      description: "Core concepts and fundamental skills development",
      duration: "Weeks 2-4",
      features: ["Core Theory", "Basic Projects", "Peer Learning"]
    },
    {
      step: "03",
      title: "Hands-On Projects",
      description: "Real-world project implementation and practical experience",
      duration: "Weeks 5-10",
      features: ["Live Projects", "Industry Mentorship", "Portfolio Building"]
    },
    {
      step: "04",
      title: "Industry Integration",
      description: "Advanced topics and industry-standard practices",
      duration: "Weeks 11-16",
      features: ["Advanced Concepts", "Industry Tools", "Professional Skills"]
    },
    {
      step: "05",
      title: "Certification & Placement",
      description: "Final assessment, certification, and career support",
      duration: "Weeks 17-20",
      features: ["Final Assessment", "Certification", "Placement Support"]
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="about-hero-title">
              About <span className="text-accent">INLIGHN TECH</span>
            </h1>
            <p className="about-hero-subtitle">
              Transforming careers through immersive technology education and 
              bridging the gap between academic learning and industry needs.
            </p>
            
            <div className="about-description">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                At INLIGHN TECH, we believe that the future of education lies in bridging 
                the gap between academic learning and industry needs. Founded with a passion 
                for providing meaningful and immersive learning experiences, we offer internship 
                programs that equip students and young professionals with practical skills in 
                Cyber Security, Full Stack Development, Data Science, and Data Analysis.
              </motion.p>
            </div>

            {/* Stats */}
            <div className="about-stats">
              {[
                { number: "1000+", label: "Interns Enrolled" },
                { number: "500+", label: "Projects Completed" },
                { number: "100%", label: "Satisfaction Rate" },
                { number: "50+", label: "Top Instructors" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="about-stat-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ borderTopColor: value.color }}
              >
                <div className="value-icon" style={{ color: value.color }}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="roadmap-section" ref={roadmapRef}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Learning Roadmap</h2>
            <p>Your journey from beginner to industry-ready professional</p>
          </motion.div>

          <div className="roadmap-timeline">
            {roadmapSteps.map((step, index) => (
              <div key={index} className="roadmap-step" style={{ transform: 'translateY(50px)', opacity: 0 }}>
                <div className="step-connector"></div>
                <div className="step-content">
                  <div className="step-number">{step.step}</div>
                  <div className="step-info">
                    <div className="step-header">
                      <h3>{step.title}</h3>
                      <span className="step-duration">{step.duration}</span>
                    </div>
                    <p>{step.description}</p>
                    <ul className="step-features">
                      {step.features.map((feature, i) => (
                        <li key={i}>
                          <CheckCircle size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose INLIGHN TECH?</h2>
            <p>The best beneficial side of INLIGHN TECH</p>
          </motion.div>

          <div className="features-grid">
            {[
              {
                title: "🎯 Industry-Relevant Curriculum",
                description: "Our programs are designed with input from industry experts to ensure relevance"
              },
              {
                title: "👥 Expert Mentorship", 
                description: "Learn from experienced professionals who guide you through every step"
              },
              {
                title: "🚀 Real Projects",
                description: "Work on actual industry projects that add value to your portfolio"
              },
              {
                title: "📱 Flexible Learning",
                description: "Online programs designed to fit your schedule and learning pace"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ArrowRight className="feature-arrow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
