import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const GoogleLogin = () => {
    const { googleLogin, user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate()


    useEffect(() => {
        if (user) {
            const userInfo = {
                name: user?.displayName,
                email: user?.email,
                role: 'user',
                profileImage: user?.photoURL,
                createdAt: new Date()
            }

            axiosSecure.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    navigate('/');
                })
                .catch(error => console.log(error.code))

        }
    }, [user, axiosSecure, navigate])


    const handelLogin = () => {
        googleLogin()
            .then(() => {
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