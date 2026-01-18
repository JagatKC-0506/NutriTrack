/**
 * ONBOARDING SLIDE COMPONENT
 * ==========================
 * Reusable slide component for onboarding pages
 * Displays illustration image, title, description
 * with beautiful animations matching pastel theme
 */

export default function OnboardingSlide({ image, title, description, isActive }) {
  return (
    <div className={`onboarding-slide ${isActive ? 'active' : ''}`}>
      <div className="slide-icon-container">
        <div className="icon-glow"></div>
        <div className="slide-image-wrapper">
          <img 
            src={image} 
            alt={title}
            className="slide-illustration"
          />
        </div>
      </div>
      <h2 className="slide-title">{title}</h2>
      <p className="slide-description">{description}</p>
    </div>
  );
}
