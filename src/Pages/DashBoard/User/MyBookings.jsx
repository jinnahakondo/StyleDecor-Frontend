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
        queryKey: ["my-bookings", 'booked', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`);
            return res.data;
        }
    })
    // pay for service 
    const handelPay = async (service) => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', service);
            const url = res.data;
            window.location.assign(url)
        } catch (error) {
            console.log(error);
        }
    }

    // cancel booking 
    const handelCancel = async (id) => {
        Swal.fire({
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/bookings/delete/${id}`)
                    refetch()
                    Swal.fire({
                        title: "Canceled!",
                        text: "Your booking has been cancled.",
                        icon: "success"
                    });
                    console.log(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        });

    }

    if (isLoading) return <Loader />
    return (
        <div>
            {/* <h2 className='heading-one mb-10'>My Bookings</h2> */}
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Booked" defaultChecked />
                <div className="tab-content  border-t-gray-400 mt-3 rounded-none  p-10">
                    <div className="overflow-x-auto">
                        <table className="table ">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Booking Info</th>
                                    <th>Tracking No. </th>
                                    <th>Total Price</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    bookings.map(booking => <tr key={booking._id}>
                                        <td>
                                            <p className='font-semibold'>{booking.title}</p>
                                        </td>

                                        <td>
                                            <p>{booking?.customerName}</p>
                                            <p>{booking?.customerEmail}</p>
                                            <p>{booking?.district}</p>
                                            <p>{booking?.customerAddress}</p>
                                            <div className='flex gap-5 items-center '>
                                                <p>bookingDate:</p>
                                                <p className='font-semibold  '> {booking.bookingDate}</p>
                                            </div>
                                            <div className='flex gap-5 items-center '>
                                                <p>bookingTime:</p>
                                                <p className='font-semibold  '> {booking.bookingTime}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p><Link to={`/track-service/${booking?.trackingId}`} className='text-primary cursor-pointer'>{booking?.trackingId}</Link></p>
                                        </td>
                                        <td>
                                            <p className='font-semibold flex items-center gap-1'>                              <span><FaBangladeshiTakaSign /></span>
                                                {booking.totalPrice}</p>

                                        </td>
                                        <td>
                                            <div className='flex flex-col gap-4'>
                                                {
                                                    booking.paymentStatus === 'paid' ?
                                                        <button className='btn btn-primary btn-outline disabled:text-primary disabled:' disabled>Paid</button> :
                                                        <>
                                                            <button
                                                                onClick={() => handelPay(booking)}
                                                                className='btn btn-outline btn-primary'>
                                                                <span className='hidden xl:block'>Pay Now </span> <span className='xl:hidden'>Pay</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handelCancel(booking._id)}
                                                                className='btn btn-outline btn-error'>
                                                                <span className='hidden xl:block'>Cancel Booking </span> <span className='xl:hidden'>Cancel</span>
                                                            </button>
                                                        </>

                                                }


                                            </div>
                                        </td>
                                    </tr>)
                                }


                            </tbody>

                        </table>
                    </div>

                </div>
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Completed" />
                <div className="tab-content  border-t-gray-400 mt-3 rounded-none p-10">
                    Completed
                </div>
            </div>
        </div>
    );
};

export default MyBookings;