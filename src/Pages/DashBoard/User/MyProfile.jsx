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
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 lg:p-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div>
                        {isEdit ? (
                            <label htmlFor="profile" className="cursor-pointer">
                                <img
                                    src={user?.photoURL}
                                    alt="profile"
                                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full ring-2 ring-primary object-cover"
                                />
                                <input
                                    type="file"
                                    id="profile"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <img
                                src={user?.photoURL}
                                alt="profile"
                                className="w-24 h-24 lg:w-28 lg:h-28 rounded-full ring-2 ring-base-300 object-cover"
                            />
                        )}
                    </div>

                    <div className="text-center lg:text-left space-y-1">
                        <h2 className="text-xl lg:text-2xl font-semibold">
                            {user?.displayName}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>
                        <span className="text-sm font-medium text-primary">
                            {role?.role}
                        </span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="grid gap-6">

                    {/* Name */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <p className="lg:w-1/3 text-sm text-gray-500">Name</p>
                        {isEdit ? (
                            <input
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full lg:w-2/3"
                            />
                        ) : (
                            <p className="font-medium">{user?.displayName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <p className="lg:w-1/3 text-sm text-gray-500">
                            Email Address
                        </p>
                        <p className="font-medium">{user?.email}</p>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <p className="lg:w-1/3 text-sm text-gray-500">
                            Mobile Number
                        </p>
                        {isEdit ? (
                            <input
                                defaultValue={user?.phoneNumber}
                                type="tel"
                                className="input input-bordered w-full lg:w-2/3"
                            />
                        ) : (
                            <p className="font-medium">
                                {user?.phoneNumber || 'Not provided'}
                            </p>
                        )}
                    </div>

                    {/* Last Login */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <p className="lg:w-1/3 text-sm text-gray-500">
                            Last Login
                        </p>
                        <p className="font-medium">
                            {format(
                                new Date(Number(user?.metadata?.lastLoginAt)),
                                'PPPpp'
                            )}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                    <button
                        className="btn btn-outline"
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        {isEdit ? 'Cancel' : 'Edit Profile'}
                    </button>

                    <button className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

    );
};

export default MyProfile;