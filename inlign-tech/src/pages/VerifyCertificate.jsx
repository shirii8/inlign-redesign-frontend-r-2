import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BadgeCheck, XCircle, Loader, Shield, Search, Sparkles, Award, Calendar, User, Hash } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';
import './VerifyCertificate.css';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | valid | invalid
  const [result, setResult] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Enhanced verification logic with realistic delay
  const handleVerify = (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    
    setStatus('loading');
    setResult(null);
    
    // Simulate API call with realistic timing
    setTimeout(() => {
      const validCertificates = [
        'INL2025CERT',
        'INL2025CYBER',
        'INL2025DATA',
        'INL2025FULL'
      ];
      
      if (validCertificates.includes(certificateId.trim().toUpperCase())) {
        setStatus('valid');
        setResult({
          name: 'Alex Rodriguez',
          program: certificateId.includes('CYBER') ? 'Cybersecurity Internship' :
                   certificateId.includes('DATA') ? 'Data Science Internship' :
                   certificateId.includes('FULL') ? 'Full-Stack Development Internship' :
                   'Advanced Programming Internship',
          date: 'June 2025',
          id: certificateId.trim().toUpperCase(),
          issueDate: '2025-06-15',
          validUntil: '2030-06-15',
          grade: 'A+',
          institution: 'Inlighn Tech'
        });
      } else {
        setStatus('invalid');
        setResult(null);
      }
    }, 2000);
  };

  const resetForm = () => {
    setStatus('idle');
    setResult(null);
    setCertificateId('');
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
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  // Floating elements animation
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="verify-certificate-page" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="verify-background">
        <motion.div 
          className="floating-shield"
          variants={floatingVariants}
          animate="animate"
        >
          <Shield size={100} />
        </motion.div>
        <motion.div 
          className="floating-badge"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        >
          <Award size={80} />
        </motion.div>
        <motion.div 
          className="floating-sparkle"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        >
          <Sparkles size={60} />
        </motion.div>
      </div>

      <div className="verify-container">
        <motion.div 
          className="verify-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced Header */}
          <motion.div className="verify-header" variants={itemVariants}>
            <motion.div 
              className="header-icon"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BadgeCheck size={64} />
            </motion.div>
            
            <h1>Certificate Verification</h1>
            <p>Enter your certificate ID to instantly verify its authenticity and view detailed information.</p>
            <motion.div 
              className="trust-indicators"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>🔒 Secure</span>
              <span>⚡ Instant</span>
              <span>✓ Trusted</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div className="verify-form-container" variants={itemVariants}>
            <form className="verify-form" onSubmit={handleVerify}>
              <motion.div 
                className={`input-container ${inputFocused ? 'focused' : ''}`}
                whileFocus={{ scale: 1.02 }}
              >
                <Search className="input-icon" size={20} />
                <input
                  type="text"
                  placeholder="Enter Certificate ID (e.g., INL2025CERT)"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  required
                  disabled={status === 'loading'}
                />
                <motion.div 
                  className="input-border"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: inputFocused ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                className={`verify-button ${status}`}
                whileHover={status !== 'loading' ? { scale: 1.05, y: -2 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.95 } : {}}
                disabled={status === 'loading' || !certificateId.trim()}
                layout
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="button-content"
                    >
                      <Loader className="spinner" size={20} />
                      <span>Verifying...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="button-content"
                    >
                      <Search size={20} />
                      <span>Verify Certificate</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Sample IDs for testing */}
            <motion.div 
              className="sample-ids"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>Try these sample IDs:</p>
              <div className="sample-badges">
                {['INL2025CERT', 'INL2025CYBER', 'INL2025DATA'].map((id, index) => (
                  <motion.button
                    key={id}
                    className="sample-badge"
                    onClick={() => setCertificateId(id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {id}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Results */}
          <AnimatePresence mode="wait">
            {status === 'valid' && result && (
              <motion.div
                className="certificate-result certificate-valid"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
              >
                <motion.div 
                  className="result-header"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <BadgeCheck size={64} className="success-icon" />
                  <motion.div 
                    className="checkmark-burst"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Certificate Verified ✨
                </motion.h2>

                <motion.div 
                  className="certificate-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, staggerChildren: 0.1 }}
                >
                  <motion.div className="detail-item" variants={itemVariants}>
                    <User className="detail-icon" />
                    <div>
                      <label>Certificate Holder</label>
                      <span>{result.name}</span>
                    </div>
                  </motion.div>

                  <motion.div className="detail-item" variants={itemVariants}>
                    <Award className="detail-icon" />
                    <div>
                      <label>Program</label>
                      <span>{result.program}</span>
                    </div>
                  </motion.div>

                  <motion.div className="detail-item" variants={itemVariants}>
                    <Calendar className="detail-icon" />
                    <div>
                      <label>Completion Date</label>
                      <span>{result.date}</span>
                    </div>
                  </motion.div>

                  <motion.div className="detail-item" variants={itemVariants}>
                    <Hash className="detail-icon" />
                    <div>
                      <label>Certificate ID</label>
                      <span>{result.id}</span>
                    </div>
                  </motion.div>

                  <motion.div className="detail-item" variants={itemVariants}>
                    <BadgeCheck className="detail-icon" />
                    <div>
                      <label>Grade</label>
                      <span>{result.grade}</span>
                    </div>
                  </motion.div>

                  <motion.div className="detail-item" variants={itemVariants}>
                    <Shield className="detail-icon" />
                    <div>
                      <label>Issued By</label>
                      <span>{result.institution}</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.button
                  className="new-search-button"
                  onClick={resetForm}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verify Another Certificate
                </motion.button>
              </motion.div>
            )}

            {status === 'invalid' && (
              <motion.div
                className="certificate-result certificate-invalid"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="result-header"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <XCircle size={64} className="error-icon" />
                  <motion.div 
                    className="error-pulse"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0] }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Certificate Not Found
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  The certificate ID you entered could not be found in our system. 
                  Please double-check the ID and try again.
                </motion.p>

                <motion.div 
                  className="error-suggestions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4>Suggestions:</h4>
                  <ul>
                    <li>Check for typos in the certificate ID</li>
                    <li>Ensure you're using the correct format</li>
                    <li>Contact support if you believe this is an error</li>
                  </ul>
                </motion.div>

                <motion.button
                  className="try-again-button"
                  onClick={resetForm}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
