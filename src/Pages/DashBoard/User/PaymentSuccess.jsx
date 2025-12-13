import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure = useAxiosSecure()
    const sessionId = searchParams.get("session_id")

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch('/payment-success', { sessionId })
                .then(res => console.log(res.data))
                .catch((error) => console.log(error.message))
        }
    }, [axiosSecure, sessionId])
    return (
        <div>
            Payment sucess
        </div>
    );
};

export default PaymentSuccess;