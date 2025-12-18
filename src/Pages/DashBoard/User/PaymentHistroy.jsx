import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";
import RecieptModal from './RecieptModal';
import Loader from '../../../Components/Loader/Loader';

const PaymentHistroy = () => {
    const [paymentInfo, setPaymentInfo] = useState({})
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const showReciept = useRef(null)

    const { data: paymentHistory = [], isLoading } = useQuery({
        queryKey: ["payment-history", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user.email}`);
            return res.data;
        }
    })

    if (loading) {
        return <div className="grid place-items-center h-screen"><Loader /></div>
    }

    return (
        <div className="mt-4 px-4">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Payment History
                    </h2>
                    <p className="text-sm text-gray-500">
                        View all your completed transactions
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th>Service</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Transaction</th>
                                <th>Status</th>
                                <th className="text-center">View</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paymentHistory.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400">
                                        No payment history found
                                    </td>
                                </tr>
                            )}
                            {
                                isLoading ?
                                    <Loader />
                                    :
                                        paymentHistory.map(history => (
                                            <tr
                                                key={history._id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="font-medium text-gray-800">
                                                    {history?.serviceName}
                                                </td>

                                                <td className="font-semibold text-gray-700">
                                                    ৳ {history?.amount}
                                                </td>

                                                <td className="text-gray-500">
                                                    {format(new Date(history?.paidAt), 'dd MMM yyyy')}
                                                </td>

                                                <td className="text-xs text-gray-500">
                                                    {history?.transectionId}
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

                                                <td className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setPaymentInfo(history)
                                                            showReciept.current.showModal()
                                                        }}
                                                        className="p-2 rounded-full hover:bg-gray-100 transition"
                                                    >
                                                        <IoEyeOutline className="text-xl text-gray-600" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                            

                        </tbody>
                    </table>
                </div>
            </div>

            <RecieptModal
                showReciept={showReciept}
                paymentInfo={paymentInfo}
            />
        </div>
    );
};

export default PaymentHistroy;
