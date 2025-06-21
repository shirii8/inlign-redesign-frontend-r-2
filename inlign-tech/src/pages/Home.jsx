import React, { useRef, useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TechMarquee from '../components/TechMarquee';  
import ProgramsSection from '../components/ProgramsSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import Footer from '../components/Footer';

// Liquid Components
import LiquidButton from '../components/LiquidButton';
import FluidLoader from '../components/FluidLoader';
import LiquidScrollEffect from '../components/LiquidScrollEffect';
import LiquidCard from '../components/LiquidCard';

const Home = () => {
  const programsRef = useRef();
  const statsRef = useRef();
  const testimonialsRef = useRef();
  const [loading, setLoading] = useState(false);

  // Fix alignment issues with CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .home-page {
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .section-container {
        width: 100%;
        max-width: 1400px;
        padding: 0 2rem;
        margin: 3rem 0;
      }
      
      .liquid-scroll-container {
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  const handleEnrollClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="home-page">
      <FluidLoader isVisible={loading} onComplete={() => setLoading(false)} />
      
      <HeroSection />
      <TechMarquee />
      
      {/* Programs Section with Liquid Effects */}
      <div className="section-container" ref={programsRef}>
        <LiquidScrollEffect>
          <ProgramsSection />
          <div className="cta-container">
            <LiquidButton 
              variant="primary" 
              size="large" 
              onClick={handleEnrollClick}
            >
              Explore Programs
            </LiquidButton>
          </div>
        </LiquidScrollEffect>
      </div>
      
      {/* Stats Section */}
      <div className="section-container" ref={statsRef}>
        <StatsSection />
      </div>
      
      {/* Testimonials with Liquid Cards */}
      <div className="section-container" ref={testimonialsRef}>
        <TestimonialsSection 
          CardComponent={(props) => (
            <LiquidCard className="testimonial-card">
              {props.children}
            </LiquidCard>
          )}
        />
      </div>

      
<section className="trusted-by-section">
  <h3>Accredited & Recognized By</h3>
  <div className="trusted-logos">
    <img
      src="https://www.inlighntech.com/wp-content/uploads/2025/04/iso-1.png"
      alt="ISO Certified"
      className="trusted-logo"
      width={120}
      height={70}
      loading="lazy"
      decoding="async"
    />
    <img
      src="https://www.inlighntech.com/wp-content/uploads/2025/04/startup-india-logo-gradient-circle.png"
      alt="Startup India Recognized"
      className="trusted-logo"
      width={120}
      height={120}
      loading="lazy"
      decoding="async"
    />

    <img
  src="https://www.inlighntech.com/wp-content/uploads/2025/04/startup-india-logo-gradient-circle.png"
  alt="Startup India Recognized"
  className="trusted-logo"
  width={120}
  height={120}
  loading="lazy"
  decoding="async"
/>


    

    
  </div>
</section>

      
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
};

export default Home;
