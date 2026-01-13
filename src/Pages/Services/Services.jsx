import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import useAxios from '../../Hooks/useAxios';
import ServiceCardSkeleton from '../../Components/ServiceCard/ServiceCardSkeleton';

const Services = () => {
    const instance = useAxios()

    const [searchText, setSearchText] = useState('')

    const { data: services = [], isLoading, } = useQuery({
        queryKey: ['services', searchText],
        queryFn: async () => {
            let serviceApi;
            if (searchText) {
                serviceApi = `/services?searchText=${searchText}`;
            } else {
                serviceApi = '/services';
            }

            const res = await instance.get(serviceApi)
            return res.data;
        }
    })

    return (
        <div className='my-20'>
            <div className='w-full lg:px-5 mx-auto mb-20 lg:max-w-lg'>
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
            {isLoading ?
                <>
                    <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {
                            [...Array(8)].map((_, i) => <ServiceCardSkeleton key={i} />)
                        }
                    </div>
                </>
                :
                <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {services.map(service => <ServiceCard key={service._id} service={service} />)}
                </div>
            }
        </div>
    );
};

export default Services;