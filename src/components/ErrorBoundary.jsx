import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center p-4 text-center">
          <div className="rounded-lg bg-red-600 bg-opacity-10 p-6 border border-red-600">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Something went wrong
            </h2>
            <p className="text-white mb-4">
              We apologize for the inconvenience. Please try refreshing the
              page.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={this.resetError}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
};

export default ErrorBoundary;
