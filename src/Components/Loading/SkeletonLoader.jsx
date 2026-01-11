import React from 'react';

// Base Skeleton Component
export const Skeleton = ({ className = '', width, height, rounded = true }) => {
    const baseClasses = `bg-base-300 animate-pulse ${rounded ? 'rounded' : ''}`;
    const sizeClasses = width || height ? '' : 'h-4 w-full';

    const style = {};
    if (width) style.width = width;
    if (height) style.height = height;

    return (
        <div
            className={`${baseClasses} ${sizeClasses} ${className}`}
            style={style}
        />
    );
};

// Text Skeleton
export const SkeletonText = ({ lines = 1, className = '' }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    className={`h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    );
};

// Avatar Skeleton
export const SkeletonAvatar = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <Skeleton
            className={`${sizeClasses[size]} rounded-full ${className}`}
        />
    );
};

// Card Skeleton
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`card-modern p-6 ${className}`}>
            <div className="flex items-start gap-4">
                <SkeletonAvatar size="lg" />
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <SkeletonText lines={2} />
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Table Row Skeleton
export const SkeletonTableRow = ({ columns = 4, className = '' }) => {
    return (
        <tr className={className}>
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index} className="p-4">
                    <Skeleton className="h-4" />
                </td>
            ))}
        </tr>
    );
};

// Service Card Skeleton
export const SkeletonServiceCard = ({ className = '' }) => {
    return (
        <div className={`card-modern overflow-hidden ${className}`}>
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <SkeletonText lines={2} />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-20" />
                </div>
            </div>
        </div>
    );
};

// Dashboard Stats Skeleton
export const SkeletonStats = ({ className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="card-modern p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                        <Skeleton className="w-12 h-12 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// List Skeleton
export const SkeletonList = ({ items = 5, className = '' }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-base-100 rounded-lg border border-base-200">
                    <SkeletonAvatar />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    );
};

// Form Skeleton
export const SkeletonForm = ({ fields = 4, className = '' }) => {
    return (
        <div className={`space-y-6 ${className}`}>
            {Array.from({ length: fields }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full" />
                </div>
            ))}
            <div className="flex gap-3 pt-4">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-20" />
            </div>
        </div>
    );
};

export default Skeleton;