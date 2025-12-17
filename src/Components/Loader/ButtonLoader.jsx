import React from 'react';
import { BeatLoader } from 'react-spinners';

const ButtonLoader = () => {
    return (
        <div className='grid place-items-center'>
            <div> <BeatLoader color='red' /></div>
        </div>
    );
};

export default ButtonLoader;