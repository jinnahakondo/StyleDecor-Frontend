import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MyBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["my-bookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`);
            return res.data;
        }
    });

    const handelPay = async (service) => {
        const res = await axiosSecure.post('/create-checkout-session', service);
        window.location.assign(res.data);
    };

    const handelCancel = async (id) => {
        Swal.fire({
            text: "Cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/bookings/delete/${id}`);
                refetch();
                Swal.fire("Canceled!", "Booking has been canceled.", "success");
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className=" px-4">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    My Bookings
                </h2>
                <p className="text-sm text-gray-500">
                    Manage and track your booked services
                </p>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-bordered mb-6">
                <a className="tab tab-active">Booked</a>
                <a className="tab">Completed</a>
            </div>

            {/* Empty State */}
            {bookings.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                    No bookings found
                </div>
            )}

            {/* Booking Cards */}
            <div className="space-y-5">
                {bookings.map(booking => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">

                            {/* Left */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {booking.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {booking.customerName} • {booking.customerEmail}
                                </p>
                                <p className="text-sm text-gray-500 wrap-break-word">
                                    {booking.customerAddress}, {booking.district}
                                </p>


                                <div className="flex gap-6 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Date:</span> {booking.bookingDate}
                                    </p>
                                    <p>
                                        <span className="font-medium">Time:</span> {booking.bookingTime}
                                    </p>
                                </div>

                                <Link
                                    to={`/track-service/${booking.trackingId}`}
                                    className="inline-block text-sm text-primary hover:underline"
                                >
                                    Track Service #{booking.trackingId}
                                </Link>
                            </div>

                            {/* Right */}
                            <div className="flex flex-col items-end justify-between gap-4">

                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="text-xl font-semibold flex items-center gap-1">
                                        <FaBangladeshiTakaSign />
                                        {booking.totalPrice}
                                    </p>
                                </div>

                                {booking.paymentStatus === 'paid' ? (
                                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                        Paid
                                    </span>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handelPay(booking)}
                                            className="btn btn-sm btn-outline btn-primary rounded-full px-5"
                                        >
                                            Pay
                                        </button>
                                        <button
                                            onClick={() => handelCancel(booking._id)}
                                            className="btn btn-sm btn-outline btn-error rounded-full px-5"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
