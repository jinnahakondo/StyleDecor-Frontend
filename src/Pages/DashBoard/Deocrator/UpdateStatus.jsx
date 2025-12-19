import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const UpdateStatus = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    //get assigned project
    const { data = [], isLoading } = useQuery({
        queryKey: ['update-assigned-project', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-bookings/${user?.email}`)
            return res.data;
        },
        enabled: !!user
    })


    //update project status
    const { mutate, isPending } = useMutation({
        mutationFn: async (bookingStatus) => {
            const { status, booking } = bookingStatus;

            try {

                const assignedBookingRes = axiosSecure.patch(`/assigned-bookings/${booking?._id}?email=${user?.email}`, { status })

                const bookingRes = axiosSecure.patch(`/bookings/update-status/${booking?.serviceId}`, { status })

                const trackingRes = axiosSecure.patch(`/trackings/${booking?.trackingId}`, { status })

                await Promise.all([assignedBookingRes, bookingRes, trackingRes])

                return status
            } catch (error) {
                console.log(error);
                throw error
            }

        },
        onSuccess: (status) => {
            toast.success(`project status has been changed to ${status}`)
            queryClient.invalidateQueries({ queryKey: ['update-assigned-project', user?.email] })
        },
        onError: () => {
            toast.error('faild to update status')
        }
    })

    // handel change status 
    const handelChangeStatus = async (status, booking) => {
        if (status && booking) {

            if (booking.status === 'Completed') {
                return toast.error('status already completed')
            }
            if (status === booking.status) {
                return toast.error('status already updated')
            }
            if (status === 'Completed') {
                const decoratorPaymentinfo = {
                    paymentType: "earning",
                    decoratorEmail: booking?.decoratorEmail,
                    decoratorEarning: Number(booking?.totalPrice) * 0.8,
                    adminEarning: Number(booking?.totalPrice) * 0.2,
                    currency: 'bdt',
                    serviceName: booking?.title,
                    bookingId: booking?._id,
                    paymentStatus: 'pending',
                    createdAt: new Date()
                }
                const res = await axiosSecure.post('/total-earnings', decoratorPaymentinfo)
                if (res.data.insertedId) {
                    toast.success('data added')
                }
            }

            mutate({ status, booking })
        }
    }

    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-4 lg:p-6">
            <h2 className="text-xl font-semibold mb-4 text-base-content">
                Assigned Projects
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="8" className="text-center py-10">
                                    <span className="loading loading-spinner loading-md"></span>
                                </td>
                            </tr>
                        )}

                        {data.map(a => (
                            <tr key={a._id} className="hover">
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

                                <td className="text-right">
                                    <select
                                        disabled={isPending}
                                        className="select w-fit select-sm select-bordered"
                                        onChange={(e) =>
                                            handelChangeStatus(e.target.value, a)
                                        }
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Update
                                        </option>
                                        <option value="Planning-Phase">
                                            Planning Phase
                                        </option>
                                        <option value="Materials-Prepared">
                                            Materials Prepared
                                        </option>
                                        <option value="On-the-Way-to-Venue">
                                            On the Way
                                        </option>
                                        <option value="Setup-in-Progress">
                                            Setup in Progress
                                        </option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default UpdateStatus;