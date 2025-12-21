import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading, refetch } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data.role || ''
        },
        enabled: !!user?.email
    })

    console.log(role);
    return { role, isLoading, refetch }
};

export default useRole;