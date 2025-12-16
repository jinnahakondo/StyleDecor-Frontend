import React from 'react';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Loader/Loader';

const UserRoutes = ({ children }) => {
    const { role, isLoading } = useRole()
    if (isLoading) {
        return <Loader />
    }
    if (role !== 'user') {
        return
    }

    return children
};

export default UserRoutes;