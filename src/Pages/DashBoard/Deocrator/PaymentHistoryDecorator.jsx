import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import Loader from '../../../Components/Loader/Loader';
import { IoEyeOutline } from 'react-icons/io5';

const PaymentHistoryDecorator = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: earnignHistory = [], isLoading } = useQuery({
        queryKey: ['payment-history', "decorator"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-earnings/decorator/${user?.email}`)
            return res.data
        },
        enabled: !!user
    })

    return (
        <div className="mt-4 px-4">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Payment History
                    </h2>
                    <p className="text-sm text-gray-500">
                        View all your earning history
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th>Service Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>

                            </tr>
                        </thead>

                        <tbody>
                            {earnignHistory.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400">
                                        No payment history found
                                    </td>
                                </tr>
                            )}
                            {
                                isLoading ?
                                    <tr><td><Loader /></td></tr>
                                    :
                                    earnignHistory.map(history => (
                                        <tr
                                            key={history._id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="font-medium text-gray-800">
                                                {history?.bookingId || history?.serviceName}
                                            </td>

                                            <td className="font-semibold text-gray-700">
                                                ৳ {history?.decoratorEarning}
                                            </td>

                                            <td className="text-gray-500">
                                                {format(new Date(history?.paidAt), 'dd MMM yyyy')}
                                            </td>

                                            <td>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${history?.paymentStatus === 'paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'}
                                        `}>
                                                    {history?.paymentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    );
};

export default PaymentHistoryDecorator;