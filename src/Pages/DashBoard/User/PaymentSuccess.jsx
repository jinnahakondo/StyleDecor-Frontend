import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure = useAxiosSecure()
    const sessionId = searchParams.get("session_id")
    const [trackingId, setTrackingId] = useState('')
    const [transectionId, setTransectionId] = useState('')

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch('/payment-success', { sessionId })
                .then(res => {
                    setTrackingId(res.data.trackingId)
                    setTransectionId(res.data.transectionId)
                })
                .catch((error) => console.log(error.message))
        }
    }, [axiosSecure, sessionId])
    return (
        <div className='max-w-xl mx-auto'>
            <div className='grid place-items-center h-[70vh]'>
                <div className='shadow-sm p-5'>
                    <div className='grid place-items-center'>
                        <FaCheckCircle className='text-6xl text-success' />
                        <h2 className='heading-one mt-5'> Payment sucessfull</h2>
                        <p className='text-accent mt-5 text-center'>Thank you for your payment. Your order is being processed.</p>
                        <p className='text-accent mt-5 text-center'>Transection ID: {transectionId}</p>
                        <p className='mt-5 text-center'>
                            Tracking ID: <Link to={`/track-service/${trackingId}`} className='  text-blue-500'> {trackingId}</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;