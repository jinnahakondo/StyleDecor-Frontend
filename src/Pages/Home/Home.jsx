import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Services from '../../Components/Sections/Services/Services';
import TopDecorators from '../../Components/Sections/Top Decorators/TopDecorators';
import Coverage from '../../Components/Sections/Service Coverage/Coverage';
import Hero from '../../Components/Sections/Hero/Hero';
import Loader from '../../Components/Loader/Loader';



const Home = () => {
    const { loading } = useAuth()
    if (loading) <Loader />
    return (
        <div className='margin space-y-20'>
            <Hero />
            <Services />
            <TopDecorators />
            <Coverage />
        </div>
    );
};

export default Home;