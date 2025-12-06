import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
    const { googleLogin } = useAuth();

    const navigate = useNavigate()

    const handelLogin = () => {
        googleLogin()
            .then(() => {
                navigate('/');
                toast.success('loged in successfull')
            })
            .catch(error => {
                toast.error(error.code)
            })

    }
    return (
        <button
            onClick={handelLogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full  ">
            <FcGoogle className='text-xl' /> <span> Login with Google</span>
        </button>
    );
};

export default GoogleLogin;