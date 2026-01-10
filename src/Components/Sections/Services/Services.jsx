import React from 'react';
import ServiceCard from '../../ServiceCard/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loader/Loader';
import { Link } from 'react-router';
import ServiceCardSkeleton from '../../ServiceCard/ServiceCardSkeleton';
import SectionTitle from '../../SectionTitle';

const Services = () => {

    const axiosSecure = useAxiosSecure();

    const { data: services, isLoading } = useQuery({
        queryKey: ['home-services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/services/home');
            return res.data;
        }
    })

    if (isLoading) {
        return <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {
                    [...Array(8)].map((_, i) => <ServiceCardSkeleton key={i} />)
                }
            </div>
        </>
    }

    return (
        <div>
            <SectionTitle> Our Services</SectionTitle>
            <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service} badge={"Trending"} />)
                }
            </div>
            <div className='grid place-items-center'>
                <Link to='/services' className='btn btn-primary mt-10 '>See All Decorations</Link>
            </div>
        </div>
    );
};

export default Services;