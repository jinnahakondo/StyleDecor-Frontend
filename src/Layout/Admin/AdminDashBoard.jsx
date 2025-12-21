import React from 'react';
import { FaDollarSign, FaCalendarCheck, FaUserTie, FaUsers } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader/Loader';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import {
    Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';


const AdminDashBoard = () => {


    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    // total earnings
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

    // get category wise booking count
    const { data: serviceDemand = [], } = useQuery({
        queryKey: ['booking-count', 'category-wise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking-count-by-category')
            return res.data
        }
    })

    //get weekly bookings
    const { data: weeklyBookings } = useQuery({
        queryKey: ['weeklybookings', 'admin-ds'],
        queryFn: async () => {
            const res = await axiosSecure.get('/weekly-bookings/per-day')
            return res.data;
        }
    })
    console.log(weeklyBookings);

    let totalRevenue = 0;
    data.forEach(adminEarning => {
        totalRevenue = totalRevenue + adminEarning.adminEarning
    });


    const stats = [
        { title: "Total Revenue", value: <span className='flex items-center gap-1'><FaBangladeshiTakaSign />{totalRevenue}</span> },
        { title: "Total Bookings", value: totalBookings.length },
        { title: "Total Decorators", value: totalDecorators.length },
        { title: "Total Users", value: totalUsers.length }
    ]


    const COLORS = [
        '#4F46E5',
        '#FB7185',
        '#38BDF8',
        '#FBBF24',
    ];

    if (bookingsLoading || decoratorsLoading || usersLoading) {
        return <span className='h-screen grid place-items-center'><Loader /></span>
    }
    return (
        <div className=''>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
                {stats.map((item, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-11/12'>
                <ResponsiveContainer height={300} className={'mt-20 '}>
                    <PieChart>
                        <Pie
                            data={serviceDemand}
                            dataKey="count"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {serviceDemand.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>

                </ResponsiveContainer>
                <ResponsiveContainer height={300} className={'mt-20 '}>
                    <BarChart data={weeklyBookings}
                        barCategoryGap={'20%'}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={'_id'} />
                        <YAxis dataKey={'totalBooking'} />
                        <Tooltip />
                        <Bar dataKey={'totalBooking'} fill='blue' barSize={40} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminDashBoard;