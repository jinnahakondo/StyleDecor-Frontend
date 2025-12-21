import React, { useEffect } from 'react';
import useAuth from './useAuth';
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://style-decor-backend.vercel.app'
})
const useAxiosSecure = () => {
    const { user } = useAuth();
    useEffect(() => {
        // intercept request 
        const reqInterceptor = instance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })

        // intercept response
        const resInterceptor = instance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log(error);
        }
        )
        return () => {
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        }
    }, [user])

    return instance;
};

export default useAxiosSecure;