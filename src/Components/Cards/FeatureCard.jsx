import React from 'react';

const FeatureCard = ({ card, style = "items-center", align = 'text-center' }) => {
    return (
        <div className={`group flex flex-col ${style} ${align} gap-3 p-6 rounded-xl bg-base-100 shadow-sm hover:shadow-md transition-all duration-300`}>

            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                {card.icon}
            </div>

            {/* Title */}
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                {card.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {card.description}
            </p>
            {/* Meta */}
            {
                card.count &&
                <p className="mt-4 text-xs text-gray-400">
                    {card.count}+ services
                </p>
            }
        </div>
    );
};

export default FeatureCard;
