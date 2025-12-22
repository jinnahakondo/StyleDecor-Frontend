import React from 'react';
import Review from './Review';

const Reviews = ({ reviews }) => {
    // console.log(reviews);
    return (
        <div className='my-8 space-y-5'>
            {
                reviews?.map(review => <Review review={review} />)
            }

        </div>
    );
};

export default Reviews;