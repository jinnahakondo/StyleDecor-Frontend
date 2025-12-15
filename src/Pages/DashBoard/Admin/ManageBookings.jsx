import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure()


    //get booking info
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['all-bookings', 'admindashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data
        }
    })

    console.log(bookings);

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Customer Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? 'loaidng...'
                            :
                            bookings.map(booking => <tr key={booking._id}>
                                <td>{booking?.title}</td>
                                <td>{booking?.customerName}</td>
                                <td>{booking?.category}</td>
                                <td className='flex gap-1 items-center'>
                                    <span><FaBangladeshiTakaSign /></span>
                                    {booking?.price}</td>
                                <td>{booking?.paymentStatus === 'paid' ?
                                    <span className='text-success'>{booking?.paymentStatus}</span>
                                    :
                                    <span className='text-error'>{booking?.paymentStatus}</span>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;