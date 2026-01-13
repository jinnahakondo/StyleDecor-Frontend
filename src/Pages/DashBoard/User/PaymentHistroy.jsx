import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";
import RecieptModal from './RecieptModal';
import Loader from '../../../Components/Loader/Loader';
import { FaBangladeshiTakaSign } from "react-icons/fa6";


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
            <div className="bg-base-100 lg:rounded-2xl lg:shadow-sm lg:border border-base-300 text-base-content">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold ">
                        Payment History
                    </h2>
                    <p className="text-sm ">
                        View all your completed transactions
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="shadow bg-base-200">
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
                                    <td colSpan="6" className="text-center py-10 ">
                                        No payment history found
                                    </td>
                                </tr>
                            )}
                            {
                                isLoading ?
                                    <tr className='grid place-items-center'><td><Loader /></td></tr>
                                    :
                                    paymentHistory.map(history => (
                                        <tr
                                            key={history._id}
                                            className="hover:bg-base-200 transition"
                                        >
                                            <td className="font-medium ">
                                                {history?.serviceName}
                                            </td>

                                            <td className="font-semibold  flex items-center gap-1">
                                                <FaBangladeshiTakaSign /> {history?.amount}
                                            </td>

                                            <td className="">
                                                {format(new Date(history?.paidAt), 'dd MMM yyyy')}
                                            </td>

                                            <td className="text-xs ">
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
                                                    className="p-2 rounded-full hover:bg-base-200 transition"
                                                >
                                                    <IoEyeOutline className="text-xl " />
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
