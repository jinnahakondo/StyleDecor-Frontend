import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Services from '../../Components/Sections/Services/Services';
import TopDecorators from '../../Components/Sections/Top Decorators/TopDecorators';
import Coverage from '../../Components/Sections/Service Coverage/Coverage';
import Hero from '../../Components/Sections/Hero/Hero';



const Home = () => {
    const { user } = useAuth()
    console.log(user);
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