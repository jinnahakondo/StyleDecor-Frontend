import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Services from '../../Components/Sections/Services/Services';
import TopDecorators from '../../Components/Sections/Services/Top Decorators/TopDecorators';


const Home = () => {
    const { user } = useAuth()
    console.log(user);
    return (
        <div className='margin space-y-20'>
            <Services />
            <TopDecorators />
        </div>
    );
};

export default Home;