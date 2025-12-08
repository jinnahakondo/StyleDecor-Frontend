import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader/Loader';
import { FaUser } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdSupportAgent } from "react-icons/md";
import Tab from './Tab/Tab';
import { format } from "date-fns";
import BookDrawer from '../../Components/Sections/Services/BookDrawer';
import useAuth from '../../Hooks/useAuth';


const ServiceDetails = () => {
    const { user } = useAuth()
    const openBookDrawer = useRef(null)

    const axiosSecure = useAxiosSecure();

    const { id } = useParams();

    const navigate = useNavigate()

    const { data: service, isLoading } = useQuery({
        queryKey: ['service-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services/${id}`)
            return res.data;
        }
    })

    if (isLoading) <Loader />

    return (
        <div >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 margin'>
                {/* image  */}
                <div className='bg-base-200 rounded-2xl grid place-items-center p-6 h-96'>
                    <img src={service?.image} alt="" />
                </div>
                {/* info */}
                <div>
                    <h2 className='heading-one'>{service?.title}</h2>
                    <div className='mt-4 space-y-2'>
                        <div className='flex items-center gap-4'>
                            <p>Ragings: {service?.rating}</p>
                            <p className='text-accent font-medium'>{service?.reviews?.length} Reviews</p>
                        </div>
                        <p className='heading-one'>${service?.price}</p>
                        <p className='text-accent font-medium'>
                            Created At: {service?.createdAt && format(new Date(service?.createdAt), "dd MMM yyyy")} </p>

                        <button
                            onClick={() => {
                                if (user) {
                                    openBookDrawer.current.checked = true;
                                }
                                else {
                                    return navigate('/auth')
                                }
                            }}
                            className="btn btn-primary mt-2 w-fit">Book Now</button>
                    </div>
                    <div className='divider'></div>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-3'>
                            <VscWorkspaceTrusted className='text-2xl ' /> <span className='text-accent font-medium'>Trusted Workers Team</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaUser className='text-2xl ' /> <span className='text-accent font-medium'>Reliable & Professional Staff</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <MdSupportAgent className='text-2xl' /> <span className='text-accent font-medium'>24/7 Customer Support</span>
                        </div>
                    </div>
                </div>
            </div>
            <Tab service={service} />
            <BookDrawer openBookDrawer={openBookDrawer} service={service} />
        </div>
    );
};

export default ServiceDetails;