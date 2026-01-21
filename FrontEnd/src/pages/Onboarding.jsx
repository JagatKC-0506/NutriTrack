/**
 * ONBOARDING PAGE COMPONENT
 * =========================
 * Three-page onboarding flow with full-screen images
 * Displays before login/signup to introduce app features
 * 
 * FLOW:
 * Onboarding (3 slides) → Login/Welcome page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Onboarding.css';

// Import onboarding images
import onboard1 from '../assets/onboard1.png';
import onboard2 from '../assets/onboard2.png';
import onboard3 from '../assets/onboard3.png';

// Onboarding slide data with images and descriptions
const slides = [
  {
    image: onboard1,
    title: 'Danger Signs Awareness',
    description: 'Learn to recognize important health warning signs for mother and baby'
  },
  {
    image: onboard2,
    title: 'Vaccination Schedule',
    description: 'Stay updated with national immunization program and vaccine timelines'
  },
  {
    image: onboard3,
    title: 'Healthy Family Benefits',
    description: 'Discover the benefits of family health planning for a better future'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      navigate('/welcome');
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="onboarding-container-simple">
      {/* Header with logo and step indicator */}
      <div className="onboarding-header">
        <div className="app-branding">
          <span className="app-name">NutriTrack</span>
        </div>
        <button 
          className="onboarding-next-btn-small"
          onClick={handleNext}
          type="button"
        >
          {isLastSlide ? 'Start' : 'Next →'}
        </button>
      </div>

      {/* Step indicator */}
      <div className="step-indicator">
        <span className="step-text">Step {currentSlide + 1} of {slides.length}</span>
        <div className="step-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`step-dot ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Content title */}
      <div className="slide-info">
        <h2 className="slide-title">{slides[currentSlide].title}</h2>
        <p className="slide-description">{slides[currentSlide].description}</p>
      </div>

      {/* Image */}
      <div className="image-container">
        <img 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title}
          className="onboarding-fullscreen-image"
        />
      </div>

      {/* Bottom tagline */}
      <div className="onboarding-footer">
        <p className="tagline">Your trusted companion for mother & child health</p>
      </div>
    </div>
  );
}
