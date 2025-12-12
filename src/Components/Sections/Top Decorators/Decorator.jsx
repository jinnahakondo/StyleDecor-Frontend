import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const Decorator = ({ decorator }) => {
    return (
        <div>
            <img src="https://i.ibb.co.com/b5hfsQCf/download.jpg" className='h-80 rounded-2xl' />
            <div className='space-y-1'>
                <h3 className='heading-two mt-5'>{decorator?.name}</h3>
                <p className='text-primary font-bold'>Expert in: {decorator?.category} decoration</p>
                <div className='flex items-center gap-3 '>
                    <div className='flex items-center gap-1 mt-3 text-[#08AF55]'>
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                    </div>
                    <p className='text-accent mt-3'>4.6</p>
                </div>
            </div>
        </div>
    );
};

export default Decorator;