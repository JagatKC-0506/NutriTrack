/**
 * AUTH HEADER COMPONENT
 * =====================
 * Reusable header section for auth pages
 * Shows heart icon, title, and subtitle
 */

export default function AuthHeader({ title, subtitle }) {
  return (
    <>
      {/* Heart Icon Section */}
      <div className="icon-container">
        <div className="heart-icon">♥</div>
      </div>

      {/* Title and Subtitle */}
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>
    </>
  );
}
