import React from "react";

const CategoryCard = ({ icon, title, description, count }) => {
    return (
        <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>

            {/* Description */}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>

            {/* Meta */}
            <p className="mt-4 text-xs text-gray-400">
                {count}+ services
            </p>
        </div>
    );
};

export default CategoryCard;
