import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const TodaysSchedule = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data = [], isLoading } = useQuery({
        queryKey: ['todays-schedule'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-bookings/today/${user?.email}`)
            return res.data
        },
        enabled: !!user
    })
    // console.log(data);
    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Today’s Schedule
                </h2>
                <span className="text-sm text-gray-500">
                    {data.length} task{data.length !== 1 && 's'}
                </span>
            </div>

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
                                    No schedule for today 🎉
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

                                <td className="font-medium">{a?.bookingTime}</td>

                                <td className="flex items-center gap-1 font-medium">
                                    <FaBangladeshiTakaSign className="text-sm" />
                                    {a?.totalPrice}
                                </td>

                                <td className="max-w-[140px]">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span
                                            className={`w-2 h-2 rounded-full ${a.status === 'Completed'
                                                ? 'bg-success'
                                                : 'bg-info'
                                                }`}
                                        ></span>
                                        <span
                                            className={`font-medium ${a.status === 'Completed'
                                                ? 'text-success'
                                                : 'text-info'
                                                }`}
                                        >
                                            {a.status.replaceAll('-', ' ')}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default TodaysSchedule;