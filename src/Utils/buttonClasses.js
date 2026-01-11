// Utility function to convert DaisyUI button classes to standard Tailwind classes
export const getButtonClasses = (daisyUIClasses = '') => {
    const classes = daisyUIClasses.split(' ');
    const mappedClasses = [];

    classes.forEach(cls => {
        switch (cls) {
            case 'btn':
                mappedClasses.push('inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2');
                break;
            case 'btn-primary':
                mappedClasses.push('bg-primary text-primary-content hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-secondary':
                mappedClasses.push('bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-accent':
                mappedClasses.push('bg-accent text-accent-content hover:bg-accent/90 focus:ring-accent/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-success':
                mappedClasses.push('bg-success text-success-content hover:bg-success/90 focus:ring-success/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-error':
                mappedClasses.push('bg-error text-error-content hover:bg-error/90 focus:ring-error/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-warning':
                mappedClasses.push('bg-warning text-warning-content hover:bg-warning/90 focus:ring-warning/50 shadow-sm hover:shadow-md');
                break;
            case 'btn-outline':
                mappedClasses.push('border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-content focus:ring-primary/50');
                break;
            case 'btn-ghost':
                mappedClasses.push('bg-transparent text-base-content hover:bg-base-200 focus:ring-base-content/20');
                break;
            case 'btn-circle':
                mappedClasses.push('rounded-full w-12 h-12 p-0');
                break;
            case 'btn-sm':
                mappedClasses.push('px-3 py-1.5 text-sm');
                break;
            case 'btn-lg':
                mappedClasses.push('px-8 py-3 text-lg');
                break;
            case 'btn-xl':
                mappedClasses.push('px-10 py-4 text-xl');
                break;
            case 'btn-xs':
                mappedClasses.push('px-2 py-1 text-xs');
                break;
            case 'btn-block':
                mappedClasses.push('w-full');
                break;
            case 'btn-modern':
                mappedClasses.push('active:scale-95');
                break;
            default:
                // Keep non-button classes as they are
                if (!cls.startsWith('btn-')) {
                    mappedClasses.push(cls);
                }
                break;
        }
    });

    return mappedClasses.join(' ');
};

// Helper function for common button combinations
export const buttonVariants = {
    primary: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-primary text-primary-content hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md active:scale-95',
    secondary: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm hover:shadow-md active:scale-95',
    outline: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-content focus:ring-primary/50 active:scale-95',
    ghost: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-transparent text-base-content hover:bg-base-200 focus:ring-base-content/20 active:scale-95',
    success: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-success text-success-content hover:bg-success/90 focus:ring-success/50 shadow-sm hover:shadow-md active:scale-95',
    error: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-error text-error-content hover:bg-error/90 focus:ring-error/50 shadow-sm hover:shadow-md active:scale-95',
    warning: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-warning text-warning-content hover:bg-warning/90 focus:ring-warning/50 shadow-sm hover:shadow-md active:scale-95',
};