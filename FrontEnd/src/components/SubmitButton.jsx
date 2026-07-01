/**
 * SUBMIT BUTTON COMPONENT
 * =======================
 * Reusable button component for form submission
 * Shows loading state and handles disabled state
 */

export default function SubmitButton({ isLoading, defaultText }) {
  return (
    <button 
      type="submit" 
      className="auth-button"
      disabled={isLoading}
    >
      {isLoading ? `${defaultText.replace('Continue', 'Creating')}...` : defaultText}
    </button>
  );
}
