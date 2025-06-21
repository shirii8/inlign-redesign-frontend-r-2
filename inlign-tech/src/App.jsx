import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import VerifyCertificate from './pages/VerifyCertificate';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import PageBackground from './components/PageBackground';
import './index.css';

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const getBackgroundVariant = () => {
    const path = location.pathname;
    if (path.includes('about')) return 'about';
    if (path.includes('programs')) return 'programs';
    return 'default';
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      <PageBackground variant={getBackgroundVariant()} />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
  <ErrorBoundary>
    <Home />
  </ErrorBoundary>
} />

          <Route path="/about" element={<ErrorBoundary>
    <About />
  </ErrorBoundary>} />
          <Route path="/programs" element={<ErrorBoundary>
    <Programs />
  </ErrorBoundary>} />
          <Route path="/verify-certificate" element={<ErrorBoundary>
    <VerifyCertificate />
  </ErrorBoundary>} />
          <Route path="/contact" element={<ErrorBoundary>
    <Contact />
  </ErrorBoundary>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
