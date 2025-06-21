import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Globe, 
  Clock, 
  CheckCircle, 
  User, 
  MessageSquare,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | success | error
  const [focusedField, setFocusedField] = useState('');
  
  const sectionRef = useRef();
  const formRef = useRef();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const inquiryTypes = [
    'General Inquiry',
    'Program Information',
    'Technical Support',
    'Partnership',
    'Career Opportunities'
  ];

  useEffect(() => {
    // Advanced GSAP animations
    const tl = gsap.timeline();
    
    // Floating particles animation
    gsap.set(".floating-element", { 
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      scale: () => gsap.utils.random(0.8, 1.2),
      opacity: 0.6
    });

    gsap.to(".floating-element", {
      x: () => `+=${gsap.utils.random(-100, 100)}`,
      y: () => `+=${gsap.utils.random(-100, 100)}`,
      duration: () => gsap.utils.random(6, 12),
      ease: "none",
      repeat: -1,
      yoyo: true
    });

    // 3D form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { 
          opacity: 0, 
          rotationY: -15,
          scale: 0.9
        },
        { 
          opacity: 1, 
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%"
          }
        }
      );
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <div className="contact-page-enhanced" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="contact-background">
        <motion.div 
          className="floating-element floating-mail"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Mail size={60} />
        </motion.div>
        
        <motion.div 
          className="floating-element floating-phone"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Phone size={50} />
        </motion.div>
        
        <motion.div 
          className="floating-element floating-sparkle"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        >
          <Sparkles size={40} />
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="contact-hero-enhanced"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="contact-header-enhanced" variants={itemVariants}>
            <motion.div 
              className="header-icon-enhanced"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 20px 40px rgba(68, 190, 177, 0.4)"
              }}
              transition={{ duration: 0.6 }}
            >
              <MessageCircle size={48} />
            </motion.div>
            
            <h1>Let's Start a <span className="highlight-text">Conversation</span></h1>
            <p>Ready to transform your career with cutting-edge tech skills? We're here to guide you every step of the way.</p>
            
            <motion.div 
              className="quick-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="stat-item">
                <Clock size={20} />
                <span>24h Response</span>
              </div>
              <div className="stat-item">
                <CheckCircle size={20} />
                <span>1000+ Students</span>
              </div>
              <div className="stat-item">
                <Globe size={20} />
                <span>Global Reach</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="contact-content-enhanced">
        <div className="container">
          <div className="contact-grid-enhanced">
            
            {/* Contact Information */}
            <motion.div 
              className="contact-info-enhanced"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="info-header">
                <h2>Get In Touch</h2>
                <p>Choose your preferred way to connect with us</p>
              </div>

              <div className="contact-methods">
                <motion.div 
                  className="contact-method"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(68, 190, 177, 0.3)"
                  }}
                >
                  <div className="method-icon">
                    <Mail size={24} />
                  </div>
                  <div className="method-content">
                    <h3>Email Us</h3>
                    <p>info@inlighntech.com</p>
                    <span className="method-badge">Most Popular</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(244, 166, 14, 0.3)"
                  }}
                >
                  <div className="method-icon">
                    <Phone size={24} />
                  </div>
                  <div className="method-content">
                    <h3>Call Us</h3>
                    <p>+91 98765 43210</p>
                    <span className="method-badge">Instant Support</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(255, 71, 87, 0.3)"
                  }}
                >
                  <div className="method-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="method-content">
                    <h3>Visit Us</h3>
                    <p>Bangalore, Karnataka, India</p>
                    <span className="method-badge">In Person</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(76, 201, 240, 0.3)"
                  }}
                >
                  <div className="method-icon">
                    <MessageSquare size={24} />
                  </div>
                  <div className="method-content">
                    <h3>Live Chat</h3>
                    <p>Available 9 AM - 6 PM</p>
                    <span className="method-badge">Real-time</span>
                  </div>
                </motion.div>
              </div>

              {/* Office Hours */}
              <motion.div 
                className="office-hours"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3><Clock size={20} /> Office Hours</h3>
                <div className="hours-grid">
                  <div className="hour-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div 
              className="contact-form-section"
              ref={formRef}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form className="contact-form-enhanced" onSubmit={handleSubmit}>
                {/* Inquiry Type Selector */}
                <motion.div 
                  className="form-group inquiry-type"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label>What can we help you with?</label>
                  <div className="inquiry-buttons">
                    {inquiryTypes.map((type, index) => (
                      <motion.button
                        key={type}
                        type="button"
                        className={`inquiry-btn ${formData.inquiryType === type ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, inquiryType: type})}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Name & Email Row */}
                <div className="form-row">
                  <motion.div 
                    className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="input-container">
                      <User className="input-icon" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        required
                      />
                      <motion.div 
                        className="input-border"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="input-container">
                      <Mail className="input-icon" size={18} />
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        required
                      />
                      <motion.div 
                        className="input-border"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div 
                  className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="input-container">
                    <Zap className="input-icon" size={18} />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                    <motion.div 
                      className="input-border"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'subject' ? 1 : 0 }}
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div 
                  className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="input-container textarea-container">
                    <MessageSquare className="input-icon" size={18} />
                    <textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      required
                    ></textarea>
                    <motion.div 
                      className="input-border"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                      <motion.div
                        key="success"
                        className="success-message"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <CheckCircle size={24} />
                        <span>Message sent successfully! We'll get back to you soon.</span>
                      </motion.div>
                    ) : (
                      <motion.button 
                        key="submit"
                        type="submit"
                        className={`submit-btn-enhanced ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { 
                          scale: 1.05, 
                          boxShadow: "0 15px 35px rgba(68, 190, 177, 0.4)"
                        } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <motion.div
                          className="btn-icon"
                          animate={isSubmitting ? { rotate: 360 } : { x: 0 }}
                          transition={isSubmitting ? { 
                            duration: 1, 
                            repeat: Infinity, 
                            ease: "linear" 
                          } : { duration: 0.3 }}
                        >
                          {isSubmitting ? <Sparkles size={20} /> : <ArrowRight size={20} />}
                        </motion.div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
