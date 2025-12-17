import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const skeletonLoader = () => {
    return (
        <div>
            <Skeleton /> // Simple, single-line loading skeleton
            <Skeleton count={5} /> // Five-line loading skeleton
        </div>
    );
};

export default skeletonLoader;