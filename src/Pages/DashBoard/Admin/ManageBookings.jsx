import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from '../../../Hooks/useAuth';

const ManageBookings = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['all-bookings', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-4">
            {/* header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-accent">
                    Manage Bookings
                </h2>
                <p className="text-sm text-gray-500">
                    Total bookings: {bookings.length}
                </p>
            </div>

            {/* table */}
            <div className="overflow-x-auto rounded-xl lg:border border-base-content/10 lg:bg-base-100 md:shadow-sm">
                <table className="table table-sm md:table-md">
                    <thead className="bg-base-200 text-accent">
                        <tr>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10">
                                    Loading...
                                </td>
                            </tr>
                        ) : bookings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-400">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            bookings.map(booking => (
                                <tr
                                    key={booking._id}
                                    className="hover:bg-base-200 transition"
                                >
                                    <td className="font-medium">
                                        {booking?.title}
                                    </td>

                                    <td>{booking?.customerName}</td>

                                    <td className="capitalize">
                                        {booking?.category}
                                    </td>

                                    <td className="flex items-center gap-1 font-medium">
                                        <FaBangladeshiTakaSign />
                                        {booking?.price}
                                    </td>

                                    <td>
                                        <span
                                            className={`font-medium ${booking?.paymentStatus === 'paid'
                                                ? 'text-success'
                                                : 'text-error'
                                                }`}
                                        >
                                            {booking?.paymentStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
