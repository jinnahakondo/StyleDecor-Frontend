import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Services from '../../Components/Sections/Services/Services';
import TopDecorators from '../../Components/Sections/Top Decorators/TopDecorators';
import Coverage from '../../Components/Sections/Service Coverage/Coverage';



const Home = () => {
    const { user } = useAuth()
    console.log(user);
    return (
        <div className='margin space-y-20'>
            <Services />
            <TopDecorators />
            <Coverage />
        </div>
    );
};

export default Home;