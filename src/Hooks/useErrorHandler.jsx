import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useErrorHandler = () => {
    const handleError = useCallback((error, context = '') => {
        console.error(`Error ${context}:`, error);

        // Extract meaningful error message
        let message = 'An unexpected error occurred';

        if (error?.response?.data?.message) {
            message = error.response.data.message;
        } else if (error?.message) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }

        // Handle specific error types
        if (error?.response?.status) {
            switch (error.response.status) {
                case 400:
                    message = 'Invalid request. Please check your input.';
                    break;
                case 401:
                    message = 'You are not authorized. Please log in again.';
                    // Could trigger logout here
                    break;
                case 403:
                    message = 'You do not have permission to perform this action.';
                    break;
                case 404:
                    message = 'The requested resource was not found.';
                    break;
                case 409:
                    message = 'This action conflicts with existing data.';
                    break;
                case 422:
                    message = 'Please check your input and try again.';
                    break;
                case 429:
                    message = 'Too many requests. Please wait a moment and try again.';
                    break;
                case 500:
                    message = 'Server error. Please try again later.';
                    break;
                case 503:
                    message = 'Service temporarily unavailable. Please try again later.';
                    break;
                default:
                    message = `Error ${error.response.status}: ${message}`;
            }
        }

        // Handle network errors
        if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network Error')) {
            message = 'Network error. Please check your internet connection.';
        }

        // Handle timeout errors
        if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
            message = 'Request timed out. Please try again.';
        }

        // Show error toast
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Return processed error for further handling if needed
        return {
            originalError: error,
            message,
            status: error?.response?.status,
            context
        };
    }, []);

    const handleSuccess = useCallback((message, options = {}) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    }, []);

    const handleWarning = useCallback((message, options = {}) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    }, []);

    const handleInfo = useCallback((message, options = {}) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    }, []);

    return {
        handleError,
        handleSuccess,
        handleWarning,
        handleInfo
    };
};

export default useErrorHandler;