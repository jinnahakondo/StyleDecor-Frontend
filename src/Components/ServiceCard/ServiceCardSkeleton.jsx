import React from 'react';

const ServiceCardSkeleton = () => {
  return (
    <div className='h-full px-4'>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col animate-pulse">
        {/* Image Skeleton */}
        <figure className='rounded-lg bg-gray-200 h-52 w-full'></figure>

        {/* Content Skeleton */}
        <div className="p-5 space-y-3 mt-auto">
          <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
