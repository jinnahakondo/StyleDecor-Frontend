import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const BookDrawer = ({ openBookDrawer, service }) => {
    const navigate = useNavigate(null)
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const timeSlots = [
        "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
        "8:00 PM", "9:00 PM", "10:00 PM"
    ];
    const [address, setAddress] = useState('')
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
    const [selectedDate, setSelectedDate] = useState("");
    const bookServiceInfo = {
        serviceId: service?._id,
        title: service?.title,
        price: service?.price,
        image: service?.image,
        category: service?.category,
        description: service?.description,
        customerName: user?.displayName,
        customerEmail: user?.email,
        customerAddress: address,
        bookingDate: selectedDate,
        bookingTime: selectedTimeSlot,
        paymentStatus: 'pending'
    }
    // console.log(bookServiceInfo);
    const handelBookingService = async () => {

        const res = await axiosSecure.post('/bookings', bookServiceInfo);
        if (res.data.insertedId) {
            toast.success("service booked");
        }
        openBookDrawer.current.checked = false;
        navigate('/dashboard/my-bookings')
    }
    return (
        <div>
            <div className="drawer drawer-end">
                <input id="my-drawer-5" type="checkbox" className="drawer-toggle" ref={openBookDrawer} />
                <div className="drawer-content">
                    {/* Page content here */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <h2 className='heading-one mt-5'>Book Service</h2>
                        {/* <p className='text-accent font-medium mt-2'>Select date & time slot to book a service </p> */}
                        <form className='space-y-5'>
                            {/* customer name  */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '> Name</label>
                                <input type="text"
                                    className='input'
                                    defaultValue={user?.displayName}
                                    readOnly
                                />
                            </div>

                            {/* customer email  */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '> Email</label>
                                <input type="text"
                                    className='input'
                                    defaultValue={user?.email}
                                    readOnly
                                />
                            </div>

                            {/* service title  */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '> Service Title</label>
                                <input type="text"
                                    className='input'
                                    defaultValue={service?.title}
                                    readOnly
                                />
                            </div>

                            {/* service Price */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '> Service Price</label>
                                <input type="text"
                                    className='input'
                                    defaultValue={service?.price}
                                    readOnly
                                />
                            </div>

                            {/* customer address */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '> customer address</label>
                                <textarea onChange={(e) => {
                                    setAddress(e.target.value)
                                }} className='textarea' placeholder='Enter Yor Full address'></textarea>
                            </div>

                            {/* date picker calender  */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-bold '>Select Date</label>
                                <input type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    className='input'
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </form>
                        <div className='mt-10'>
                            <h2 className=' font-bold mb-4'>Select Time Slot</h2>
                            <div className='grid grid-cols-2 gap-5 '>
                                {
                                    timeSlots.map(slot => <button key={slot} className={`btn rounded-full hover:btn-primary ${selectedTimeSlot === slot && 'btn-primary'}`}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                    >
                                        {slot}
                                    </button>)
                                }
                            </div>
                            <div className='mt-7 flex justify-end'>
                                <button className='btn btn-primary'
                                    disabled={!selectedDate || !selectedTimeSlot}
                                    onClick={handelBookingService}
                                >Book Service</button>
                            </div>
                        </div>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookDrawer;