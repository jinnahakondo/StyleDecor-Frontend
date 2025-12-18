import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const Earnings = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data = [] } = useQuery({
        queryKey: ["decorator-earnigns"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-bookings/${user?.email}?status=Completed`)
            return res.data
        },
        enabled: !!user?.email
    })
    console.log(data);
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card ">
                    <p>Total Earnings</p>
                    <h2>৳50000</h2>
                </div>

                <div className="stat-card">
                    <p>This Month</p>
                    <h2>৳50</h2>
                </div>

                <div className="stat-card">
                    <p>Completed Jobs</p>
                    <h2>22</h2>
                </div>

                <div className="stat-card">
                    <p>Pending Amount</p>
                    <h2>৳2,000</h2>
                </div>
            </div>

        </div>
    );
};

export default Earnings;