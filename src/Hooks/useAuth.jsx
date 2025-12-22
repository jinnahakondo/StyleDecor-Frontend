import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex';

const useAuth = () => {
    const context = use(AuthContext)
    return context;
};

export default useAuth;