import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Container from '../../../Components/Container/Container';

const DecoratorHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: status = [] } = useQuery({
        queryKey: ['statusOfBookingsBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/assigned-books/status')
            return res.data;
        }
    })

    console.log(status);
    return (
        <div className='w-full mt-10'>
            <Container>
                <div className="stats shadow w-full">
                    {status.map(stats =>

                        <div className="stat grid place-items-center p-10" key={stats._id}>
                            <div className="stat-title text-xl">{stats._id}</div>
                            <div className="stat-value text-primary">{stats.count}</div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default DecoratorHome;