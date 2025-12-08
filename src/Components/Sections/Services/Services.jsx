import React from 'react';
import ServiceCard from '../../ServiceCard/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loader/Loader';

const Services = () => {

    const axiosSecure = useAxiosSecure();

    const { data: services, isLoading } = useQuery({
        queryKey: ['home-services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/services');
            return res.data;
        }
    })

if(isLoading){
    return <Loader/>
}

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 '>
                {
                    services.map(service => <ServiceCard key={service._id} service={service} />)
                }
            </div>
        </div>
    );
};

export default Services;