import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/errorPage.json'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='grid place-items-center h-screen'>
            <div className='grid place-items-center'>
                <Lottie animationData={error} />
                <Link to={-1} className='btn btn-outline'>Go Back</Link>
            </div>
        </div>
    );
};

export default ErrorPage;