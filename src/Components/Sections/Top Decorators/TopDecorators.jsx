import React from 'react';
import Decorator from './Decorator';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'
import { Autoplay, } from 'swiper/modules';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Loader } from 'lucide-react';

const TopDecorators = () => {

    const axiosSecure = useAxiosSecure();

    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ["home-decorators"],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators/home');
            return res.data;
        }
    })
    if (isLoading) Loader

    return (
        <div className='my-10 '>
            <h2 className='heading-one mb-10 text-center'>Top Decorators</h2>
            <div className='mx-auto'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}

                    breakpoints={{
                        320: { slidesPerView: "auto" },
                        640: { slidesPerView: 3 },
                        1200: { slidesPerView: 4, },
                    }}
                >
                    {
                        decorators?.map(decorator => <SwiperSlide key={decorator._id} >
                            <div className='grid place-items-center w-full'>
                                <Decorator decorator={decorator} />
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>


            </div>
        </div>
    );
};

export default TopDecorators;