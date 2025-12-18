import React from 'react';
import { ClipLoader } from "react-spinners";

const fullPageLoader = () => {
    return (
        <div className='grid place-items-center h-screen'>
            <ClipLoader />
        </div>
    );
};

export default fullPageLoader;