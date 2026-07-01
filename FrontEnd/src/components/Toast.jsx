import '../styles/Toast.css';

export default function Toast({ message, type, onClose }) {
  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
}
