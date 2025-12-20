import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';


const Earnings = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    //get only completed for total earnings 
    const { data: payments = [] } = useQuery({
        queryKey: ["decorator-earnigns", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-earnings/decorator/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })


    // for get assigned but !completed to calculate pending  earnings
    const { data: pendingPayments = [] } = useQuery({
        queryKey: ["decorator-earnigns-pending", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pending-earnings/decorator/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })

    // calculate total earnings 
    const completedPayments = payments.map(payment => payment.decoratorEarning)
    let totalEarning = 0;
    completedPayments.forEach(price => {
        totalEarning = totalEarning + price
    });

    //calculate pending earnings
    const pendingEarnigns = pendingPayments.map(payment => payment.decoratorEarning)
    let pendingEarning = 0;
    pendingEarnigns.forEach(earning => {
        pendingEarning = pendingEarning + earning
    });


    return (
        <div>

            <div className="max-w-md  p-10 rounded-2xl shadow-md flex flex-col gap-6 bg-white">

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Total Earnings</p>
                    <h2 className="text-lg font-semibold">৳ {totalEarning}</h2>
                </div>

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Pending Amount</p>
                    <h2 className="text-lg font-semibold">৳ {pendingEarning}</h2>
                </div>

                {/* <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">This Month</p>
                    <h2 className="text-lg font-semibold">৳50</h2>
                </div> */}

                <div className="flex items-center justify-between py-3 px-8 rounded-xl bg-blue-50 text-blue-700 shadow-sm">
                    <p className="text-sm font-medium">Completed Jobs</p>
                    <h2 className="text-lg font-semibold">{completedPayments?.length}</h2>
                </div>

            </div>


        </div>
    );
};

export default Earnings;