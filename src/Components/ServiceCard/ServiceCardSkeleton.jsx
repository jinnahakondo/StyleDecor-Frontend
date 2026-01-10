import React from "react";

const ServiceCardSkeleton = ({ badge }) => {
  return (
    <div className="p-2 sm:p-0 h-full">
      <div className="card bg-base-100 shadow h-full relative animate-pulse">

        {/* Badge Skeleton */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <div className="skeleton h-4 w-14 rounded-full"></div>
          </div>
        )}

        {/* Image Skeleton */}
        <figure className="px-3 pt-3">
          <div className="skeleton h-40 w-full rounded-xl"></div>
        </figure>

        {/* Content Skeleton */}
        <div className="card-body p-4 space-y-3">

          {/* Title */}
          <div className="skeleton h-4 w-3/4"></div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-3 w-3 rounded"></div>
            ))}
            <div className="skeleton h-3 w-8 ml-2"></div>
          </div>

          {/* Stock */}
          <div className="skeleton h-3 w-1/3"></div>

          {/* Price */}
          <div className="skeleton h-4 w-20"></div>

          {/* Button */}
          <div className="pt-2">
            <div className="skeleton h-10 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
