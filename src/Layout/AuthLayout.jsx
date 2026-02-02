import React from 'react';
import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className='bg-base-100 h-screen grid place-items-center'>
            <Outlet />
        </div>
    );
};

export default AuthLayout;