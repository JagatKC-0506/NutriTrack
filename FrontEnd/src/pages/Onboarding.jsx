/**
 * ONBOARDING PAGE COMPONENT
 * =========================
 * Three-page onboarding flow with smooth animations
 * Displays before login/signup to introduce app features
 * 
 * FEATURES:
 * - 3 animated slides with icons, titles, and descriptions
 * - Swipe/touch support for navigation
 * - Pagination dots
 * - Skip and Continue buttons
 * - Smooth transitions between slides
 * 
 * FLOW:
 * Onboarding (3 slides) → Login/Welcome page
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingSlide from '../components/OnboardingSlide';
import OnboardingDots from '../components/OnboardingDots';
import OnboardingButton from '../components/OnboardingButton';
import '../styles/Onboarding.css';

// Import onboarding images
import pregnantImg from '../assets/pregnant.png';
import nutritionImg from '../assets/nutrition.png';
import loveImg from '../assets/love.png';

// Onboarding slide data
const slides = [
  {
    id: 1,
    image: pregnantImg,
    title: 'Watch your baby grow every day',
    description: 'Track every precious milestone of your pregnancy and baby\'s development with love.'
  },
  {
    id: 2,
    image: nutritionImg,
    title: 'Stay on top of health',
    description: 'Monitor feeding schedules, vaccine reminders, and growth charts all in one place.'
  },
  {
    id: 3,
    image: loveImg,
    title: 'Your trusted companion',
    description: 'Get personalized tips and insights tailored just for you and your little one.'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Minimum swipe distance for navigation
  const minSwipeDistance = 50;

  // Handle slide change with animation
  const changeSlide = useCallback((newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      changeSlide(currentSlide + 1);
    }
  }, [currentSlide, changeSlide]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      changeSlide(currentSlide - 1);
    }
  }, [currentSlide, changeSlide]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      changeSlide(index);
    }
  }, [changeSlide]);

  // Complete onboarding and navigate
  const completeOnboarding = useCallback(() => {
    navigate('/welcome');
  }, [navigate]);

  const skipOnboarding = useCallback(() => {
    navigate('/welcome');
  }, [navigate]);

  // Touch event handlers for swipe navigation
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNextSlide();
    } else if (isRightSwipe) {
      goToPrevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNextSlide();
      if (e.key === 'ArrowLeft') goToPrevSlide();
      if (e.key === 'Enter' && currentSlide === slides.length - 1) completeOnboarding();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, currentSlide, completeOnboarding]);

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div 
      className="onboarding-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background decorations */}
      <div className="onboarding-bg" aria-hidden="true">
        <span className="bg-bubble bubble-1" />
        <span className="bg-bubble bubble-2" />
        <span className="bg-bubble bubble-3" />
        <span className="floating-heart heart-1">✦</span>
        <span className="floating-heart heart-2">✦</span>
        <span className="floating-heart heart-3">✦</span>
        <div className="wave-decoration" />
      </div>

      {/* Skip button - shown on all pages */}
      <button 
        className="skip-btn"
        onClick={skipOnboarding}
        type="button"
      >
        Skip
      </button>

      {/* Slides container */}
      <div className="slides-wrapper">
        <div 
          className="slides-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="slide-container"
            >
              <OnboardingSlide
                image={slide.image}
                title={slide.title}
                description={slide.description}
                isActive={currentSlide === index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="onboarding-nav">
        <OnboardingDots
          totalSlides={slides.length}
          currentSlide={currentSlide}
          onDotClick={goToSlide}
        />

        <div className="nav-buttons">
          {isLastSlide ? (
            <OnboardingButton onClick={completeOnboarding} variant="primary">
              Get Started
            </OnboardingButton>
          ) : (
            <OnboardingButton onClick={goToNextSlide} variant="primary">
              Continue
            </OnboardingButton>
          )}
        </div>
      </div>
    </div>
  );
}
