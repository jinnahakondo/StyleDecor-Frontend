import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import Container from '../../Components/Container/Container';
import useAxios from '../../Hooks/useAxios';

const Services = () => {
    const instance = useAxios()

    const [searchText, setSearchText] = useState("")

    const { data: services = [], isLoading, } = useQuery({
        queryKey: ['services', searchText],
        queryFn: async () => {
            const res = await instance.get(`/services?searchText=${searchText}`)
            return res.data;
        }
    })


    return (
        <div className='my-20'>
            <Container>
                <div className='w-full px-5 mx-auto mb-20 lg:max-w-lg'>
                    <div className="join  w-full ">
                        <div className='w-full' >
                            <label className="input validator join-item outline-0 focus:border border-gray-400 w-full ">
                                <svg className="h-[1em] opacity-50 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    onChange={(e) => {
                                        setSearchText(e.target.value)
                                    }}
                                    type="text" placeholder="Serarch Services" name='search' required className='w-full' />
                            </label>
                            {/* <div className="validator-hint hidden">Enter valid email address</div> */}
                        </div>
                        <button type='submit' className="btn btn-primary join-item">Search</button>
                    </div>
                </div>
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