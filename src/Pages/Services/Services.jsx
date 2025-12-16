import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import Container from '../../Components/Container/Container';
import useAxios from '../../Hooks/useAxios';

const Services = () => {
    const instance = useAxios()
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await instance.get('/services')
            return res.data;
        }
    })
    console.log(services);

    return (
        <div className='my-20'>
            <Container>
               
                {isLoading ? "loading..." :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                        {services.map(service => <ServiceCard key={service._id} service={service} />)}
                    </div>
                }
            </Container>
        </div>
    );
};

export default Services;