import React from 'react';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Loader/Loader';

const AdminRoutes = ({ children }) => {
    const { role, isLoading } = useRole()
    if (isLoading) <Loader />
    if (role !== 'admin') {
        return
    }
    return children
};

export default AdminRoutes;