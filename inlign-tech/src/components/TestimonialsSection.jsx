
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Star, Quote } from 'lucide-react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const sectionRef = useRef();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analytics Intern",
      image: "/images/testimonial-1.jpg", // Placeholder for image
      rating: 5,
      text: "During my Data Analytics internship at INLIGHN TECH, I learned SQL, Power BI, Tableau, and Data Cleaning. The program focused on real-world business intelligence projects, which helped me understand data-driven decision-making."
    },
    {
      name: "Michael Chen",
      role: "Data Science Intern",
      image: "/images/testimonial-2.jpg", // Placeholder for image
      rating: 5,
      text: "I completed my Data Science internship at INLIGHN TECH, where I gained hands-on experience in Machine Learning, Data Visualization, and AI Models. Working on real-world datasets helped me apply my knowledge in a practical way."
    },
    {
      name: "Emily Rodriguez",
      role: "Full-Stack Development Intern",
      image: "/images/testimonial-3.jpg", // Placeholder for image
      rating: 5,
      text: "At INLIGHN TECH, I completed my Full-Stack Development internship, where I worked on React, Node.js, MongoDB, and API development. I built web applications from scratch, which helped me understand both frontend and backend development."
    }
  ];

  useEffect(() => {
    gsap.fromTo(
      ".testimonial-card",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, []);

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>What Our Interns Say</h2>
          <p>Real experiences from real students who transformed their careers with us</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="testimonial-quote">
                <Quote className="quote-icon" />
              </div>
              
            <div className="testimonial-rating">
  {[...Array(testimonial.rating)].map((_, i) => (
    <Star key={i} className="star-filled" fill="currentColor" />
  ))}
</div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <div className="author-image">
                 <img loading="lazy" decoding="async" class="no-lazyload " src="https://www.inlighntech.com/wp-content/uploads/2025/03/1736172583974.jpeg" width="400" height="400" alt="1736172583974" title="1736172583974"/>
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
