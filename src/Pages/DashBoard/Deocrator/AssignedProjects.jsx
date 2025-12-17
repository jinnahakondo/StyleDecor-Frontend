import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const AssignedProjects = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data = [], isLoading } = useQuery({
        queryKey: ['assigned-project'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-bookings/${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    console.log(data);
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Booking Date </th>
                            <th>Booking Time </th>
                            <th>Price </th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(a => <tr key={a._id}>
                                <td>{a?.title}</td>
                                <td>{a?.customerName}</td>
                                <td>{a?.customerAddress}</td>
                                <td>{a?.bookingDate}</td>
                                <td>{a?.bookingTime}</td>
                                <td className='flex items-center gap-1'><FaBangladeshiTakaSign /> {a?.totalPrice}</td>
                                <td >{a?.status}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedProjects;