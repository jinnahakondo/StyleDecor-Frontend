import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const PendingDecoratorPayments = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-payments', 'admin'],
        queryFn: async () => {
            const res = await axiosSecure.get("/total-earnings/admin")
            return res.data
        }
    })

    // accept payment
    const handelAccept = async (paymentInfo) => {
        if (paymentInfo.paymentStatus === 'paid') {
            return
        }
        const updateInfo = {
            paymentStatus: "paid",
            paidAt: new Date(),
        }
        const res = await axiosSecure.patch(`/total-earnings/admin/update/${paymentInfo.bookingId}`, updateInfo)
        if (res.data.modifiedCount) {
            toast.success('payment approved')
            refetch()
        }
    }

    //reject payment
    const handelCancel = async (paymentInfo) => {
        if (paymentInfo.paymentStatus === 'rejected') {
            return
        }
        const updateInfo = {
            paymentStatus: "rejected",
            rejectedAt: new Date(),
        }
        const res = await axiosSecure.patch(`/total-earnings/admin/update/${paymentInfo.bookingId}`, updateInfo)
        if (res.data.modifiedCount) {
            toast.success('payment rejected')
            refetch()
        }
    }

    return (
        <div>
            <div className="mt-4 px-4">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Pending Payment
                        </h2>
                        <p className="text-sm text-gray-500">
                            View all pending payments
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50 text-gray-600 text-sm">
                                <tr>
                                    <th>BookingId</th>
                                    <th>DecoratorEmail</th>
                                    <th>Decorator earning</th>
                                    <th>Comission</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-400">
                                            No payment found to approve
                                        </td>
                                    </tr>
                                )}
                                {
                                    isLoading ?
                                        <tr><td>  <Loader /></td></tr>
                                        :
                                        data.map(payment => (
                                            <tr
                                                key={payment._id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="font-medium text-gray-800">
                                                    {payment?.bookingId}
                                                </td>

                                                <td className="font-semibold text-gray-700">
                                                    {payment?.decoratorEmail}
                                                </td>
                                                <td className="font-semibold text-gray-700">
                                                    ৳ {payment?.decoratorEarning}
                                                </td>
                                                <td className="font-semibold text-gray-700">
                                                    ৳ {payment?.adminEarning}
                                                </td>

                                                <td className="text-gray-500">
                                                    {format(new Date(payment?.createdAt), 'dd MMM yyyy')}
                                                </td>

                                                <td>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${payment?.paymentStatus === 'paid'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'}
                                        `}>
                                                        {payment?.paymentStatus}
                                                    </span>
                                                </td>

                                                <td className="text-center flex items-center gap-5">

                                                    <button
                                                        disabled={payment?.paymentStatus === 'rejected'}
                                                        onClick={() => handelCancel(payment)}
                                                        className={`btn btn-sm btn-error ${payment?.paymentStatus === 'paid' && 'hidden'}`}>Reject</button>
                                                    <button
                                                        disabled={payment?.paymentStatus === 'paid'}
                                                        onClick={() => handelAccept(payment)}
                                                        className={`btn btn-sm btn-success ${payment?.paymentStatus === 'rejected' && 'hidden'}`}>
                                                        Accept
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PendingDecoratorPayments;