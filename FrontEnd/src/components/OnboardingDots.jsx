/**
 * ONBOARDING DOTS COMPONENT
 * =========================
 * Pagination dots for onboarding navigation
 * Shows current position and allows clicking to navigate
 */

export default function OnboardingDots({ totalSlides, currentSlide, onDotClick }) {
  return (
    <div className="onboarding-dots">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          className={`dot ${currentSlide === index ? 'active' : ''}`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          type="button"
        />
      ))}
    </div>
  );
}
