import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import Loader from '../Loader/Loader';

const GoogleLogin = () => {
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { googleLogin, } = useAuth();

    const instance = useAxios();

    const navigate = useNavigate()

    const location = useLocation()

    const handelLogin = () => {
        setIsSubmiting(true)
        googleLogin()
            .then((res) => {
                const userInfo = {
                    name: res?.user?.displayName,
                    email: res?.user.email,
                    role: 'user',
                    profileImage: res?.user.photoURL,
                    createdAt: new Date()
                }

                instance.post('/users', userInfo)
                    .then(() => {
                        navigate(location.state || '/');
                    })
                    .catch(error => console.log(error.code))

                toast.success('loged in successfull')
                setIsSubmiting(false)
            })
            .catch(error => {
                toast.error(error.code)
                setIsSubmiting(false)

            })

    }
    return (
        <button
            onClick={handelLogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full  ">
            {isSubmiting ? <Loader size={20} /> :
                <>
                    <FcGoogle className='text-xl' /> <span> Login with Google</span>
                </>
            }
        </button>
    );
};

export default GoogleLogin;