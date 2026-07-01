/**
 * ONBOARDING BUTTON COMPONENT
 * ===========================
 * Reusable button for onboarding navigation
 * Supports primary and secondary variants
 */

export default function OnboardingButton({ 
  onClick, 
  children, 
  variant = 'primary',
  disabled = false 
}) {
  return (
    <button
      className={`onboarding-btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
