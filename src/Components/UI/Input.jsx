import React, { forwardRef } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({
    label,
    error,
    helperText,
    type = 'text',
    size = 'md',
    variant = 'default',
    fullWidth = false,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    className = '',
    containerClassName = '',
    labelClassName = '',
    required = false,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseClasses = 'w-full transition-all duration-300 focus:outline-none border rounded-lg';

    const variants = {
        default: 'border-base-300 focus:border-primary bg-base-100 hover:border-base-400',
        ghost: 'border-transparent bg-transparent focus:border-primary focus:bg-base-100',
        filled: 'bg-base-200 border-transparent focus:bg-base-100 focus:border-primary',
    };

    const sizes = {
        xs: 'px-3 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-4 py-3 text-lg',
    };

    const inputClasses = [
        baseClasses,
        variants[variant],
        sizes[size],
        error ? 'border-error focus:border-error' : '',
        leftIcon ? 'pl-10' : '',
        (rightIcon || showPasswordToggle || error) ? 'pr-10' : '',
        fullWidth ? 'w-full' : '',
        className
    ].filter(Boolean).join(' ');

    const containerClasses = [
        'w-full',
        fullWidth ? 'w-full' : '',
        containerClassName
    ].filter(Boolean).join(' ');

    const labelClasses = [
        'block text-sm font-medium mb-2',
        error ? 'text-error' : focused ? 'text-primary' : 'text-base-content/70',
        'transition-colors duration-300',
        labelClassName
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            {label && (
                <label className={labelClasses}>
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
                        {React.cloneElement(leftIcon, { size: 18 })}
                    </div>
                )}

                <input
                    ref={ref}
                    type={inputType}
                    className={inputClasses}
                    onFocus={(e) => {
                        setFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {error && (
                        <AlertCircle className="w-4 h-4 text-error" />
                    )}

                    {showPasswordToggle && type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-base-content/50 hover:text-base-content transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}

                    {rightIcon && !error && !showPasswordToggle && (
                        <div className="text-base-content/50">
                            {React.cloneElement(rightIcon, { size: 18 })}
                        </div>
                    )}
                </div>
            </div>

            {(error || helperText) && (
                <p className={`mt-2 text-sm ${error ? 'text-error' : 'text-base-content/60'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

// Preset input variants
export const PasswordInput = (props) => (
    <Input type="password" showPasswordToggle {...props} />
);

export const EmailInput = (props) => (
    <Input type="email" {...props} />
);

export const SearchInput = (props) => (
    <Input type="search" {...props} />
);

export const NumberInput = (props) => (
    <Input type="number" {...props} />
);

export default Input;