/**
 * ERROR MESSAGE COMPONENT
 * =======================
 * Reusable component for displaying error messages
 * Shows error only if message exists
 */

export default function ErrorMessage({ message }) {
  // Only render if there's an error message
  if (!message) return null;
  
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
