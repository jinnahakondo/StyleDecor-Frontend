import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";
import RecieptModal from './RecieptModal';

const PaymentHistroy = () => {
    const [paymentInfo, setPaymentInfo] = useState({})
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const showReciept = useRef(null)
    const { data: paymentHistory = [], isLoading } = useQuery({
        queryKey: ["payment-history"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`)
            console.log(res.data);
            return res.data;
        }
    })


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-md table-zebra">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Amount</th>
                            <th>paidAt</th>
                            <th>Transection Id</th>
                            <th>Payment Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistory.map(history => <tr key={history._id}>
                                <td>{history?.serviceName}</td>
                                <td>{history?.amount}</td>
                                <td>{format(history?.paidAt, 'd MMM yyyy')}</td>
                                <td>{history?.transectionId}</td>
                                <td>{history?.paymentStatus}</td>
                                <td onClick={() => {
                                    setPaymentInfo(history)
                                    showReciept.current.showModal();
                                }}><IoEyeOutline className='text-2xl cursor-pointer' /></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <RecieptModal showReciept={showReciept} paymentInfo={paymentInfo}/>
        </div>
    );
};

export default PaymentHistroy;