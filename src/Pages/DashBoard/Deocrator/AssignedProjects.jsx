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
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-4 lg:p-6">
            <h2 className="text-xl font-semibold mb-4">
                Assigned Projects
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 sticky top-0 z-10">
                        <tr>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="7" className="text-center py-10">
                                    <span className="loading loading-spinner loading-md"></span>
                                </td>
                            </tr>
                        )}

                        {!isLoading && data.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-400">
                                    No assigned projects found
                                </td>
                            </tr>
                        )}

                        {data.map(a => (
                            <tr
                                key={a._id}
                                className={`hover transition ${a.status === 'Completed' ? 'opacity-70' : ''
                                    }`}
                            >
                                <td className="font-medium">{a?.title}</td>

                                <td>{a?.customerName}</td>

                                <td className="max-w-[180px] truncate">
                                    {a?.customerAddress}
                                </td>

                                <td>{a?.bookingDate}</td>

                                <td>{a?.bookingTime}</td>

                                <td className="flex items-center gap-1 font-medium">
                                    <FaBangladeshiTakaSign className="text-sm" />
                                    {a?.totalPrice}
                                </td>

                                <td>
                                    <span
                                        className={`font-medium whitespace-nowrap ${a.status === 'Completed'
                                            ? 'text-success'
                                            : 'text-info'
                                            }`}
                                    >
                                        {a.status.replaceAll('-', ' ')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AssignedProjects;