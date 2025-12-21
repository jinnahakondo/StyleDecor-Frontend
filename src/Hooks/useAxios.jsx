import axios from 'axios';
import React from 'react';
const instance = axios.create({
    baseURL: 'https://style-decor-backend.vercel.app'
})

const useAxios = () => {

    return instance;
};

export default useAxios;