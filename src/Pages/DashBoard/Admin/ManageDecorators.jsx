import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ShowDecorators from '../../../Components/Modals/ShowDecorators';

const ManageDecorators = () => {
    const [showDecorators, setShowDecorators] = useState();
    const showDecoratorRef = useRef(null)
    const { loading } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: decorators = [], isLoading, refetch } = useQuery({
        queryKey: ['decorators', "admin-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators')
            return res.data;
        }
    })

    //get booking info
    const { data: bookings = [], isLoading: booingLoding } = useQuery({
        queryKey: ['bookings', 'admindashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data
        }
    })

    console.log(bookings);

    // manage decorators applications
    const handelDecorator = async (decorator, status) => {
        if (status === 'reject') {
            Swal.fire({
                title: "Are you sure?",
                text: "do you want to reject this application?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.delete(`/decorators/${decorator?.email}`)
                    refetch()
                    Swal.fire({
                        title: "Rejected!",
                        text: "user application has been rejected.",
                        icon: "success"
                    });
                }
            });
            return;
        }
        if (status === 'approve') {
            const status = 'approved'
            const role = "decorator";
            await axiosSecure.patch(`/decorators/${decorator?.email}`, { status })
            await axiosSecure.patch(`/users/${decorator?.email}`, { role })
            refetch()
            toast.success("user updated as decorator")

        }

    }

    //handelFindDecorator for asign
    const handelFindDecorator = async (booking) => {
        const { category, district } = booking;
        const res = await axiosSecure.get(`/decorators?category=${category}&district=${district}`,)
        setShowDecorators(res.data);
        showDecoratorRef.current.showModal()
    }
    console.log(showDecorators);
    if (isLoading || loading) {
        return <Loader />
    }

    return (
        <div className='tabs tabs-border ' >

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Applications" defaultChecked />
            <div className="tab-content  border-t-gray-400 mt-3 rounded-none p-10">
                <div className="overflow-x-auto">
                    <h2 className='heading-one'> manage decorators {decorators.length}</h2>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>category</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                decorators.map(decorator => <tr key={decorator._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={decorator?.photo}
                                                        alt="decorator photo" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{decorator?.name}</div>
                                                <div className="text-sm opacity-50">{decorator?.district}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {decorator?.category}
                                    </td>
                                    <td>{decorator?.status === 'approved' ?
                                        <p className='text-success'>{decorator?.status}</p>
                                        :
                                        <p className='text-error'>{decorator?.status}</p>
                                    }</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                    <td>
                                        <select onChange={(e) => handelDecorator(decorator, e.target.value)} className='dropdown btn rounded-none border-primary bg-purple-100 outline-0'>
                                            <option value="" selected>Select to </option>
                                            <option value="approve">Approve</option>
                                            <option value="reject">Regect</option>
                                        </select>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Assign Task" />
            <div className="tab-content  border-t-gray-400 mt-3 rounded-none p-10">
                <h2 className='heading-one'>{bookings.length} Bookings </h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Service Info</th>
                                <th>Customer Info</th>
                                <th>Category</th>
                                <th>Payment status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map(booking => <tr key={booking._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={booking?.image}
                                                        alt="decorator photo" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking?.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <h4 > <span className='font-bold'>{booking?.customerName}</span></h4>
                                            <p>Email: {booking?.customerEmail} </p>
                                            <p>Address: {booking?.customerAddress} </p>
                                            <p>Booking Date: {booking?.bookingDate} {booking?.bookingTime}</p>
                                        </div>
                                    </td>
                                    <td>{booking?.category}</td>
                                    <td>{booking?.paymentStatus === 'paid' ?
                                        <p className='text-success'>{booking?.paymentStatus}</p>
                                        :
                                        <p className='text-error'>{booking?.paymentStatus}</p>
                                    }</td>

                                    <td>
                                        <button className='btn btn-primary'
                                            onClick={() => handelFindDecorator(booking)}
                                        >Find Decorator</button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {/* modal  */}
            <ShowDecorators showDecoratorRef={showDecoratorRef} showDecorators={showDecorators} />

        </div>
    );
};

export default ManageDecorators;