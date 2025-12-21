import React from 'react';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Loader/Loader';
import AssignedProjects from '../Pages/DashBoard/Deocrator/AssignedProjects';
import AdminDashBoard from '../Layout/Admin/AdminDashBoard';
import MyBookings from '../Pages/DashBoard/User/MyBookings';
import AdminRoutes from './AdminRoutes';
import DecoratorRoutes from './DecoratorRoutes';
import UserRoutes from './UserRoutes';

const DashboardIndex = () => {
    const { role, isLoading } = useRole()
    if (isLoading) {
        return <div className='grid place-items-center h-screen'><Loader /></div>
    }
    if (role === "admin") {
        return <AdminRoutes><AdminDashBoard /></AdminRoutes>
    }
    if (role === "decorator") {
        return <DecoratorRoutes>< AssignedProjects /></DecoratorRoutes>
    }
    if (role === "user") {
        <UserRoutes> < MyBookings /></UserRoutes>
    }

};

export default DashboardIndex;