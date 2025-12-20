import React from 'react';
import { FaDollarSign, FaCalendarCheck, FaUserTie, FaUsers } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader/Loader';

const AdminDashBoard = () => {


    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data = [], isLoading } = useQuery({
        queryKey: ['admin-revenue', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-earnings/admin/${user.email}`)
            return res.data
        },
        enabled: !!user.email
    })

    //get total bookings 
    const { data: totalBookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: ['totalBookings', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-bookings')
            return res.data;
        }
    })

    //get total decorators 
    const { data: totalDecorators = [], isLoading: decoratorsLoading } = useQuery({
        queryKey: ['totaldeorators', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/total-decorators')
            return res.data;
        }
    })

    //get total users 
    const { data: totalUsers = [], isLoading: usersLoading } = useQuery({
        queryKey: ['totalUsers', 'admin-dashboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/total-decorators')
            return res.data;
        }
    })


    let totalRevenue = 0;
    data.forEach(adminEarning => {
        totalRevenue = totalRevenue + adminEarning.adminEarning
    });


    const stats = [
        { title: "Total Revenue", value: totalRevenue },
        { title: "Total Bookings", value: totalBookings.length },
        { title: "Total Decorators", value: totalDecorators.length },
        { title: "Total Users", value: totalUsers.length }
    ]
    if (bookingsLoading || decoratorsLoading || usersLoading) {
        return <span className='h-screen grid place-items-center'><Loader /></span>
    }
    return (
        <div className='bg-gray-50'>
            Admin Dashbord
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
                {stats.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{item.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${item.bg}`}>
                                {item.icon}
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                                View data →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashBoard;