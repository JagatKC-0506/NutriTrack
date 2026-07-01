/**
 * USER TYPE SELECTOR COMPONENT
 * ============================
 * Reusable component for selecting user type
 * Used in Signup page to choose between Pregnant Mom and New Parent
 */

export default function UserTypeSelector({ userType, onUserTypeChange }) {
  return (
    <div className="form-group">
      <label className="form-label">I am a...</label>
      <div className="user-type-selector">
        
        {/* PREGNANT MOM BUTTON */}
        <button
          type="button"
          className={`user-type-btn ${userType === 'pregnant' ? 'active' : ''}`}
          onClick={() => onUserTypeChange('pregnant')}
        >
          <span className="icon">♥</span>
          <span>Pregnant Mom</span>
        </button>
        
        {/* NEW PARENT BUTTON */}
        <button
          type="button"
          className={`user-type-btn ${userType === 'newParent' ? 'active' : ''}`}
          onClick={() => onUserTypeChange('newParent')}
        >
          <span className="icon">📅</span>
          <span>New Parent</span>
        </button>
      </div>
    </div>
  );
}
