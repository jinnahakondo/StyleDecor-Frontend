import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            retryCount: 0
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });

        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Here you could send error to logging service
        // logErrorToService(error, errorInfo);
    }

    handleRetry = () => {
        this.setState(prevState => ({
            hasError: false,
            error: null,
            errorInfo: null,
            retryCount: prevState.retryCount + 1
        }));
    };

    render() {
        if (this.state.hasError) {
            const { fallback: Fallback } = this.props;

            // If custom fallback provided, use it
            if (Fallback) {
                return <Fallback error={this.state.error} retry={this.handleRetry} />;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                    <div className="max-w-md w-full">
                        <div className="card-modern p-8 text-center">
                            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-error" />
                            </div>

                            <h1 className="text-2xl font-bold text-base-content mb-4">
                                Oops! Something went wrong
                            </h1>

                            <p className="text-base-content/70 mb-6">
                                We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
                            </p>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mb-6 text-left">
                                    <summary className="cursor-pointer text-sm text-error mb-2">
                                        Error Details (Development)
                                    </summary>
                                    <pre className="text-xs bg-base-200 p-3 rounded overflow-auto max-h-32">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={this.handleRetry}
                                    className="btn btn-primary btn-modern"
                                    disabled={this.state.retryCount >= 3}
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    {this.state.retryCount >= 3 ? 'Max retries reached' : 'Try Again'}
                                </button>

                                <Link to="/" className="btn btn-outline btn-modern">
                                    <Home className="w-4 h-4" />
                                    Go Home
                                </Link>
                            </div>

                            {this.state.retryCount > 0 && (
                                <p className="text-xs text-base-content/50 mt-4">
                                    Retry attempts: {this.state.retryCount}/3
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook version for functional components
export const useErrorHandler = () => {
    const handleError = (error, errorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);

        // You could dispatch to a global error state here
        // or send to logging service
    };

    return handleError;
};

// Higher-order component for wrapping components
export const withErrorBoundary = (Component, fallback) => {
    return function WrappedComponent(props) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
};

export default ErrorBoundary;