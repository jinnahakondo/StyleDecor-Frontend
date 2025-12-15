import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useRole from '../../../Hooks/useRole';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const { user, loading } = useAuth();
    const role = useRole()



    console.log(user);
    return (
        <div className='p-10 max-w-4xl mx-auto flex flex-col gap-5'>

            {/* basic profile info  */}
            <div className='flex max-lg:flex-col items-center gap-5'>
                <div className=''>
                    {
                        isEdit
                            ?
                            <div className=''>
                                <label for='profile'>
                                    <img src={user?.photoURL} alt="user image" className='w-20 h-20 lg:h-28 lg:w-28 rounded-full ' />
                                </label>
                                <input type='file' id='profile' name='profile' accept="image/*" className='hidden ' />
                            </div>
                            :
                            <img src={user?.photoURL} alt="user image" className='w-20 h-20 lg:h-28 lg:w-28 rounded-full ' />
                    }
                </div>
                <div className='space-y-1'>
                    <p className='text-accent font-medium lg:text-2xl max-lg:text-center'>{user?.displayName}</p>
                    <p className='text-accent font-medium lg:text-2xl'>{user?.email}</p>
                    <p className=' font-medium  text-primary'>{role.role}</p>
                </div>
            </div>
            <div className='divider'></div>
            {/* name  */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <p className='lg:text-2xl text-accent font-medium flex-1'>Name</p>
                {
                    isEdit
                        ?
                        <input
                            defaultValue={user?.displayName}
                            type="text" className='lg:text-2xl text-accent font-medium py-5 outline-0 flex-1 ' />
                        :
                        <p className='lg:text-2xl text-accent font-medium '>{user?.displayName}</p>

                }
            </div>
            <div className='divider'></div>
            {/* email  */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <p className='lg:text-2xl text-accent font-medium flex-1'>Email Address</p>
                <p className='lg:text-2xl text-accent font-medium'>{user?.email}</p>
            </div>
            <div className='divider'></div>
            {/* mobile number  */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <p className='lg:text-2xl text-accent font-medium flex-1'>Mobile Number</p>
                {
                    isEdit
                        ?
                        <input defaultValue={user?.phoneNumber} type="number" className='lg:text-2xl text-accent font-medium py-5 outline-0 flex-1' />
                        :
                        <p className='lg:text-2xl text-accent font-medium'>{user?.phoneNumber}</p>

                }
            </div>
            <div className='divider'></div>
            {/*  lastLoginAt  */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10'>
                <p className='lg:text-2xl text-accent font-medium flex-1'>lastLoginAt</p>
                <p className='lg:text-2xl text-accent font-medium'>{format(new Date(Number(user?.metadata?.lastLoginAt)), "PPPpp")}</p>

            </div>
            <div className=''>
                <button className='btn mr-8' onClick={() => setIsEdit(!isEdit)}>Edit</button>
                <button className='btn btn-primary'>Save Change</button>
            </div>
        </div>
    );
};

export default MyProfile;