import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ShowDecorators from '../../../Components/Modals/ShowDecorators';

const ManageDecorators = () => {
    const { user } = useAuth();
    const [booking, setBooking] = useState(null);
    const showDecoratorRef = useRef(null);
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // decorators
    const { data: decorators = [], isLoading, refetch } = useQuery({
        queryKey: ['decorators', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/decorators?email=${user?.email}`);
            return res.data;
        }
    });

    // bookings
    const {
        data: bookings = [],
        isLoading: bookingLoading,
        refetch: bookingsRefetch
    } = useQuery({
        queryKey: ['bookings', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
    });

    // approve / reject / set user
    const handelDecorator = async (decorator, action) => {
        if (action === 'reject') {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to reject this application?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, reject'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.delete(`/asign/decorator/${decorator?.email}`);
                    refetch();
                    Swal.fire('Rejected!', '', 'success');
                }
            });
            return;
        }

        if (action === 'approve') {
            await axiosSecure.patch(`/decorators/${decorator?.email}`, {
                status: 'approved'
            });
            await axiosSecure.patch(`/users/${decorator?.email}`, {
                role: 'decorator'
            });
            refetch();
            toast.success('Decorator approved');
        }

        if (action === 'user') {
            Swal.fire({
                title: 'Change role?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.patch(`/decorators/${decorator?.email}`, {
                        status: ''
                    });
                    await axiosSecure.patch(`/users/${decorator?.email}`, {
                        role: 'user'
                    });
                    refetch();
                    Swal.fire('Role updated', '', 'success');
                }
            });
        }
    };

    // find decorators for booking
    const { data: showDecorators = [], refetch: decoratorsRefetch } = useQuery({
        queryKey: ['findDecorators', booking?._id],
        queryFn: async () => {
            const { category, district } = booking;
            const res = await axiosSecure.get(
                `/decorators?category=${category}&district=${district}&email=${user?.email}`
            );
            return res.data;
        },
        enabled: !!booking
    });

    const handelFindDecorator = (booking) => {
        setBooking(booking);
        showDecoratorRef.current.showModal();
    };

    if (isLoading || loading || bookingLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-4 lg:p-6">

            {/* Tabs */}
            <div className="tabs tabs-lifted mb-6">
                <input
                    type="radio"
                    name="manage_tabs"
                    className="tab"
                    aria-label="Applications"
                    defaultChecked
                />

                {/* Applications */}
                <div className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Decorator Applications
                        <span className="text-sm text-gray-500 ml-2">
                            ({decorators.length})
                        </span>
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th>Decorator</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {decorators.map((decorator) => (
                                    <tr key={decorator._id} className="hover">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={decorator?.photo}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {decorator?.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {decorator?.district}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{decorator?.category}</td>

                                        <td>
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${decorator?.status === 'approved'
                                                        ? 'bg-success'
                                                        : 'bg-error'
                                                        }`}
                                                />
                                                <span
                                                    className={`font-medium ${decorator?.status === 'approved'
                                                        ? 'text-success'
                                                        : 'text-error'
                                                        }`}
                                                >
                                                    {decorator?.status || 'pending'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="text-right">
                                            <select
                                                className="select select-sm select-bordered"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handelDecorator(
                                                        decorator,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>
                                                    Action
                                                </option>
                                                <option value="approve">Approve</option>
                                                <option value="reject">Reject</option>
                                                {decorator?.status === 'approved' && (
                                                    <option value="user">
                                                        Set as User
                                                    </option>
                                                )}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Assign Task */}
                <input
                    type="radio"
                    name="manage_tabs"
                    className="tab"
                    aria-label="Assign Task"
                />

                <div className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Bookings
                        <span className="text-sm text-gray-500 ml-2">
                            ({bookings.length})
                        </span>
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th>Service</th>
                                    <th>Customer</th>
                                    <th>Category</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th className="text-right">Assign</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.map((b) => (
                                    <tr key={b._id} className="hover">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={b?.image}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                                <p className="font-medium">
                                                    {b?.title}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="text-sm">
                                            <p>{b?.customerName}</p>
                                            <p className="text-gray-500">
                                                {b?.district}
                                            </p>
                                            <p className="text-xs">
                                                {b?.bookingDate} • {b?.bookingTime}
                                            </p>
                                        </td>

                                        <td>{b?.category}</td>

                                        <td
                                            className={
                                                b?.paymentStatus === 'paid'
                                                    ? 'text-success'
                                                    : 'text-error'
                                            }
                                        >
                                            {b?.paymentStatus}
                                        </td>

                                        <td className="text-info">
                                            {b?.status}
                                        </td>

                                        <td className="text-right">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                disabled={b?.status !== 'pending'}
                                                onClick={() =>
                                                    handelFindDecorator(b)
                                                }
                                            >
                                                Find Decorator
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ShowDecorators
                showDecoratorRef={showDecoratorRef}
                showDecorators={showDecorators}
                decoratorsRefetch={decoratorsRefetch}
                booking={booking}
                bookingsRefetch={bookingsRefetch}
                booingLoding={bookingLoading}
            />
        </div>
    );
};

export default ManageDecorators;
