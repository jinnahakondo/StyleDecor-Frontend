import { format } from 'date-fns';
import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const Review = ({ review }) => {
    // console.log(review);
    return (
        <div className='bg-base-100 shadow-sm rounded-2xl w-full p-5'>
            <div className='flex  items-start gap-4'>
                {/* image  */}
                <img src={review?.userImage} className='h-12 w-12 lg:h-20 lg:w-20 rounded-full  bg-base-200' />
                {/* ratings */}
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1 mt-3 text-[#08AF55]'>
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                        <p className='text-accent text-xs lg:text-base mt-3'>{review?.rating}</p>
                    </div>
                    <p className='text-accent font-medium'>
                        {review?.comment}
                    </p>

                    <p className=' font-bold text-sm lg:text-lg'>{review?.userName}</p>
                    <span className='text-xs lg:text-base'> {format(new Date(review?.date), "dd MMM yyyy")}</span>
                </div>
            </div>
        </div>
    );
};

export default Review;