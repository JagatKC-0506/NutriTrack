/**
 * AUTH FOOTER COMPONENT
 * =====================
 * Reusable footer section for auth pages
 * Shows link to switch between login and signup
 */

import { Link } from 'react-router-dom';

export default function AuthFooter({ text, linkText, linkPath }) {
  return (
    <div className="auth-footer">
      <span>{text} </span>
      <Link to={linkPath} className="auth-link">{linkText}</Link>
    </div>
  );
}
