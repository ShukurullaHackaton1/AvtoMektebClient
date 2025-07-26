// src/components/ErrorBoundary.jsx
import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Error logging service ga yuborish mumkin
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FiAlertTriangle className="text-red-600" size={40} />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Kutilmagan xatolik yuz berdi
              </h1>
              <p className="text-gray-600">
                Sahifa to'g'ri ishlamayapti. Iltimos, sahifani yangilang yoki
                keyinroq urinib ko'ring.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <FiRefreshCw size={18} />
                <span>Sahifani yangilash</span>
              </button>

              <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Orqaga qaytish
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left bg-gray-100 rounded-lg p-4 text-sm">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Xatolik tafsilotlari (Development)
                </summary>
                <pre className="text-red-600 text-xs whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
