import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='w-full px-5 lg:max-w-7xl lg:mx-auto '>
            {children}
        </div>
    );
};

export default Container;