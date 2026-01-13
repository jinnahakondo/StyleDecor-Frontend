import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { FaBangladeshiTakaSign } from "react-icons/fa6";




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

            <div className="p-10">

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 '>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1 flex items-center gap-1"><FaBangladeshiTakaSign /> {totalEarning}</h3>
                            </div>
                            <div className={`p-3 rounded-lg`}>
                                icon
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                                View data →
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Pending Earning</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1 flex items-center gap-1"><FaBangladeshiTakaSign /> {pendingEarning}</h3>
                            </div>
                            <div className={`p-3 rounded-lg`}>
                                icon
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                                View data →
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Completed Jobs</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1 flex items-center gap-1"><FaBangladeshiTakaSign /> {completedPayments?.length}</h3>
                            </div>
                            <div className={`p-3 rounded-lg`}>
                                icon
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                                View data →
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Earnings;