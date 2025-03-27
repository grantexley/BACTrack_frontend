import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI can be shown
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Optional: Log error to server or console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h2>Something went wrong 😓</h2>
          <p>Try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
