import React from 'react';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Loader/Loader';

const DecoratorRoutes = ({ children }) => {
    const { role, isLoading } = useRole()
    if (isLoading){
         return <Loader />
    }
    if (role !== "decorator") {
        return
    }
    return children
};

export default DecoratorRoutes;