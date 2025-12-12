import React from 'react';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Loader/Loader';
import useAuth from '../Hooks/useAuth';

const AdminRoutes = ({ children }) => {
    const { SignOUtUser, loading } = useAuth();
    const { role, isLoading } = useRole()

    if (isLoading || loading) {
        return <Loader />
    }
 
    if (role !== 'admin') {
        return SignOUtUser()
    }
    return children
};

export default AdminRoutes;