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
 
 
    
    return (
        <div>

            <div className="max-w-md  p-10 rounded-2xl shadow-md flex flex-col gap-6 bg-white">

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Total Earnings</p>
                    <h2 className="text-lg font-semibold">৳50,000</h2>
                </div>

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Pending Amount</p>
                    <h2 className="text-lg font-semibold">৳2,000</h2>
                </div>

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">This Month</p>
                    <h2 className="text-lg font-semibold">৳50</h2>
                </div>

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Completed Jobs</p>
                    <h2 className="text-lg font-semibold">22</h2>
                </div>

            </div>


        </div>
    );
};

export default Earnings;