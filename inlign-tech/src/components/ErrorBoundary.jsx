import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service if needed
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: "5rem", textAlign: "center", color: "#f4a60e", background: "#08252b" }}>
          <h1>Something went wrong.</h1>
          <p>We're working to fix the issue. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
