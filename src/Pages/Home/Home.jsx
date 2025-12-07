import React from 'react';
import useAuth from '../../Hooks/useAuth';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';

const Home = () => {
    const { user } = useAuth()
    console.log(user);
    return (
        <div className='px-6 '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 margin'>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </div>
        </div>
    );
};

export default Home;