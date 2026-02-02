import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';
import useRole from '../../../Hooks/useRole';
import Loader from '../../../Components/Loader/Loader';
import PostImage from '../../../Utils/PostImage';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [photoURL, setPhotoURL] = useState('')
    const { user, loading, updateUserProfile } = useAuth();
    const role = useRole()
    if (loading) {
        return <span className='h-screen grid place-items-center'><Loader /></span>
    }

    const handelUpdateProfile = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        if (name && photoURL) {
            return await updateUserProfile({ displayName: name, photoURL })
        }
        if (name && !photoURL) {
            return await updateUserProfile({ displayName: name })
        }
        if (!name && photoURL) {
            return await updateUserProfile({ photoURL })
        }

    }

    return (
        <form onSubmit={(e) => handelUpdateProfile(e)} className="max-w-4xl mx-auto p-4 lg:p-8">
            <div className="bg-base-100 rounded-2xl md:shadow-sm md:border border-base-200 p-6 lg:p-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div>
                        {isEdit ? (
                            <label htmlFor="profile" className="cursor-pointer">
                                <img
                                    src={photoURL || user?.photoURL}
                                    alt="profile"
                                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full ring-2 ring-primary object-cover"
                                />
                                <input

                                    onChange={async (e) => {
                                        const photo = e.target.files[0];
                                        if (!photo) return
                                        const url = await PostImage(photo)
                                        setPhotoURL(url)
                                    }}
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
                                name='name'
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
                                name='number'
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

                    {/* Actions */}
                    <div className="flex gap-4 justify-end">
                        <button
                            type='button'
                            className="btn btn-outline"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {isEdit ? 'Cancel' : 'Edit Profile'}
                        </button>

                        {
                            isEdit && <button type='submit' className="btn btn-primary">
                                Save Changes
                            </button>
                        }
                    </div>

                </div>

            </div >
        </form >

    );
};

export default MyProfile;