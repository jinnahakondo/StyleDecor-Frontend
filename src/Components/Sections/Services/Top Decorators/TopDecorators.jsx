import React from 'react';
import Decorator from './Decorator';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'
import { Autoplay, } from 'swiper/modules';

const TopDecorators = () => {

    const axiosSecure = useAxiosSecure();

    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ["home-decorators"],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators');
            return res.data;
        }
    })
    if (isLoading) Loader
    console.log(decorators);
    return (
        <div className='my-10'>
            <h2 className='heading-one mb-10'>Top Decorators</h2>
            <div className='mx-auto'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2, },
                        1024: { slidesPerView: 3, },
                        1280: { slidesPerView: 4, },
                    }}
                >
                    {
                        decorators?.map(decorator => <SwiperSlide key={decorator._id} className='grid place-items-center'>
                            <Decorator decorator={decorator} />
                        </SwiperSlide>)
                    }
                </Swiper>


            </div>
        </div>
    );
};

export default TopDecorators;