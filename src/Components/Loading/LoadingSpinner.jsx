import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    text = '',
    fullScreen = false,
    className = ''
}) => {
    const sizeClasses = {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    };

    const spinner = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <Loader2
                className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
            />
            {text && (
                <p className={`text-sm text-base-content/70 animate-pulse`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-base-100/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-200">
                    {spinner}
                </div>
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;