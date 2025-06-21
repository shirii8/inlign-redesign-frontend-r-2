// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Verify Certificate', path: '/verify-certificate' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const rotatingText = "• INLIGN TECH • INLIGN TECH • ";

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="nav-logo-halo"
          >
            <div className="rotating-circle-text">
              {Array.from(rotatingText).map((char, i) => (
                <span
                  key={i}
                  style={{
                    transform: `rotate(${i * (360 / rotatingText.length)}deg) translate(0, -52px)`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            <img
              src="https://www.inlighntech.com/wp-content/uploads/2025/04/inlighn-tech-logo.png"
              alt="INLIGN TECH"
              className="nav-logo-img"
            />
          </motion.div>

          <span className="nav-logo-text">
            INLIGN <span className="accent">TECH</span>
          </span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={item.path} 
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
