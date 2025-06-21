// components/Footer.js
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.footer 
      className="footer"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Section */}
          <motion.div className="footer-section brand-section" variants={itemVariants}>
            <motion.h3
              whileHover={{
                textShadow: "0 0 8px rgba(244, 166, 14, 0.5)"
              }}
            >
              INLIGN <span className="accent">TECH</span>
            </motion.h3>
            <motion.p
              whileHover={{
                color: '#e0e0e0'
              }}
            >
              Transforming careers through immersive technology education
            </motion.p>
            
            <div className="social-links">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a 
                  key={index}
                  href={href}
                  whileHover={{ 
                    scale: 1.2,
                    color: '#fff',
                    y: -2
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Programs Section */}
          <motion.div className="footer-section" variants={itemVariants}>
            <motion.h4 
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              Programs
            </motion.h4>
            <ul>
              {['Cyber Security', 'Full Stack Development', 'Data Science', 'Data Analysis'].map((item, i) => (
                <motion.li 
                  key={i}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <a href="#">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Section */}
          <motion.div className="footer-section" variants={itemVariants}>
            <motion.h4 
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              Company
            </motion.h4>
            <ul>
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item, i) => (
                <motion.li 
                  key={i}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <a href="#">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div className="footer-section" variants={itemVariants}>
            <motion.h4 
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              Contact Info
            </motion.h4>
            <div className="contact-info">
              {[
                { icon: Mail, text: 'info@inlighntech.com' },
                { icon: Phone, text: '+91 XXXXX XXXXX' },
                { icon: MapPin, text: 'Your City, India' }
              ].map(({ icon: Icon, text }, i) => (
                <motion.div 
                  key={i}
                  className="contact-item"
                  whileHover={{
                    x: 5,
                    color: '#f4a60e',
                    transition: { duration: 0.2 }
                  }}
                >
                  <Icon size={16} />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          <p>&copy; {new Date().getFullYear()} INLIGN TECH. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
