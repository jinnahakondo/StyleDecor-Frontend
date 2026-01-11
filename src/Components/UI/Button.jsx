import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    onClick,
    type = 'button',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-primary-content hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md active:scale-95',
        secondary: 'bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm hover:shadow-md active:scale-95',
        accent: 'bg-accent text-accent-content hover:bg-accent/90 focus:ring-accent/50 shadow-sm hover:shadow-md active:scale-95',
        ghost: 'bg-transparent text-base-content hover:bg-base-200 focus:ring-base-content/20 active:scale-95',
        outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-content focus:ring-primary/50 active:scale-95',
        success: 'bg-success text-success-content hover:bg-success/90 focus:ring-success/50 shadow-sm hover:shadow-md active:scale-95',
        warning: 'bg-warning text-warning-content hover:bg-warning/90 focus:ring-warning/50 shadow-sm hover:shadow-md active:scale-95',
        error: 'bg-error text-error-content hover:bg-error/90 focus:ring-error/50 shadow-sm hover:shadow-md active:scale-95',
        gradient: 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-content border-none shadow-lg hover:shadow-xl active:scale-95 focus:ring-primary/50',
    };

    const sizes = {
        xs: 'px-3 py-1.5 text-xs gap-1',
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-2.5 text-base gap-2',
        lg: 'px-8 py-3 text-lg gap-3',
        xl: 'px-10 py-4 text-xl gap-3',
    };

    const classes = [
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        (loading || disabled) ? 'opacity-70 cursor-not-allowed' : '',
        className
    ].filter(Boolean).join(' ');

    const handleClick = (e) => {
        if (loading || disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    const renderIcon = (position) => {
        if (loading && position === 'left') {
            return <Loader2 className="w-4 h-4 animate-spin" />;
        }

        if (icon && iconPosition === position) {
            return React.cloneElement(icon, {
                className: `w-4 h-4 ${icon.props.className || ''}`
            });
        }

        return null;
    };

    return (
        <button
            type={type}
            className={classes}
            onClick={handleClick}
            disabled={loading || disabled}
            {...props}
        >
            {renderIcon('left')}
            <span className={loading ? 'opacity-70' : ''}>
                {children}
            </span>
            {renderIcon('right')}
        </button>
    );
};

// Preset button variants for common use cases
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const GradientButton = (props) => <Button variant="gradient" {...props} />;
export const SuccessButton = (props) => <Button variant="success" {...props} />;
export const ErrorButton = (props) => <Button variant="error" {...props} />;
export const WarningButton = (props) => <Button variant="warning" {...props} />;

export default Button;