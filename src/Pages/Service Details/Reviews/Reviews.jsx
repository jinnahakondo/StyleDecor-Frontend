import React from 'react';
import Review from './Review';

const Reviews = ({ reviews }) => {
    // console.log(reviews);
    return (
        <div className='space-y-8'>
            {
                reviews?.map(review => <Review review={review} />)
            }

        </div>
    );
};

export default Reviews;