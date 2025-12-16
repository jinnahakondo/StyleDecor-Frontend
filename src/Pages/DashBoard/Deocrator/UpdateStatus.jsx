import React, { useState } from 'react';
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
        queryKey: ['update-assigned-project'],
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

            await axiosSecure.patch(`/assigned-bookings/${booking?._id}`, { status })
            await axiosSecure.patch(`/bookings/update-status/${booking?.serviceId}`, { status })
            await axiosSecure.patch(`/trackings/${booking?.serviceId}`, { status })
            return status
        },
        onSuccess: (status) => {
            toast.success(`project status has been changed to ${status}`)
            queryClient.invalidateQueries({ queryKey: ['update-assigned-project'] })
        },
        onError: (error) => {
            console.log(error.code);
        }
    })

    // handel change status 
    const handelChangeStatus = (status, booking) => {
        if (status && booking) {
            mutate({ status, booking })
        }
    }

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Booking Date </th>
                            <th>Booking Time </th>
                            <th>Price </th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(a => <tr key={a._id}>
                                <td>{a?.title}</td>
                                <td>{a?.customerName}</td>
                                <td>{a?.customerAddress}</td>
                                <td>{a?.bookingDate}</td>
                                <td>{a?.bookingTime}</td>
                                <td className='flex items-center gap-1'><FaBangladeshiTakaSign /> {a?.price}</td>
                                <td >{a?.status}</td>
                                <td>
                                    <select className='select lg:w-fit' onChange={(e) => handelChangeStatus(e.target.value, a)}>
                                        <option value="">update status</option>
                                        <option value="Planning-Phase">Planning Phase</option>
                                        <option value="Materials-Prepared">Materials Prepared</option>
                                        <option value="On-the-Way-to-Venue">On the Way to Venue</option>
                                        <option value="Setup-in-Progress">Setup in Progress</option>
                                        <option value="Completed">Completed </option>
                                    </select>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UpdateStatus;