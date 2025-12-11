import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import { Link } from 'react-router';

const PaymentHistroy = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistory.map(history => <tr key={history._id}>
                                <td>{history?.serviceName}</td>
                                <td>{history?.amount}</td>
                                <td>{format(history?.paidAt, 'd MMM yyyy')}</td>
                                <td className='text-primary'><Link to={`/track-service/${history.serviceId}`}>{history?.transectionId}</Link></td>
                                <td>{history?.paymentStatus}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistroy;