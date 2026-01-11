import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';

const ThemeToggle = ({ variant = 'button', className = '' }) => {
    const { theme, toggleTheme, setLightTheme, setDarkTheme } = useTheme();

    if (variant === 'dropdown') {
        return (
            <div className={`dropdown dropdown-end ${className}`}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    {theme === 'light' ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-40 border border-base-200">
                    <li>
                        <button
                            onClick={setLightTheme}
                            className={`flex items-center gap-2 ${theme === 'light' ? 'active' : ''}`}
                        >
                            <Sun className="w-4 h-4" />
                            Light
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={setDarkTheme}
                            className={`flex items-center gap-2 ${theme === 'dark' ? 'active' : ''}`}
                        >
                            <Moon className="w-4 h-4" />
                            Dark
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    if (variant === 'toggle') {
        return (
            <label className={`swap swap-rotate ${className}`}>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="sr-only"
                />
                <Sun className="swap-off w-5 h-5" />
                <Moon className="swap-on w-5 h-5" />
            </label>
        );
    }

    // Default button variant
    return (
        <button
            onClick={toggleTheme}
            className={`btn btn-ghost btn-circle transition-all duration-300 hover:bg-base-200 ${className}`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
            ) : (
                <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
            )}
        </button>
    );
};

export default ThemeToggle;