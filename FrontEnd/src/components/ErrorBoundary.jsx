import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: 'var(--primary-color, #ff6b6b)' }}>Something went wrong.</h2>
          <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '20px' }}>We encountered an unexpected error.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '10px 20px', 
              background: 'var(--primary-color, #ff6b6b)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px' 
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
