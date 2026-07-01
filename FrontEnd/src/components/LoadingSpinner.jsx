import '../styles/LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      {message && <p className="spinner-text">{message}</p>}
    </div>
  );
}
