import React from 'react';
import GoogleLogin from '../../Components/Social Login/GoogleLogin';
import { Link } from 'react-router';
import { useForm } from "react-hook-form"

const Register = () => {
    return (
        <div className="flex flex-col justify-center p-10 w-11/12 lg:max-w-[500px] bg-base-100 shadow-md">
            <div className="text-center sm:mx-auto sm:w-full ">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Register
                </h1>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full ">
                <div className=" px-4 pb-4 pt-8 sm:rounded-lg w-full sm:shadow">
                    <form className="space-y-6 w-full">
                        {/* name  */}
                        <div>
                            <label
                                htmlFor="Name"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                YOur Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder='your name'
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    value=""
                                />
                            </div>
                        </div>
                        {/* email  */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                Your Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder='example@gmail.com'
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    value=""
                                />
                            </div>
                        </div>

                        {/* photo  */}
                        <div>
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                Your Photo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="photo"
                                    type="file"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    value=""
                                />
                            </div>
                        </div>
                        {/* password  */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    placeholder='*******'
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    value=""
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 disabled:cursor-wait disabled:opacity-50"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                                >
                                    Remember me
                                </label>
                            </div>

                        </div>
                        <div>
                            <button className='btn w-full'>Create Account</button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-white">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <GoogleLogin />
                        </div>
                    </div>
                    <div className="m-auto mt-6 w-fit md:mt-8">
                        <span className="m-auto dark:text-gray-400">
                            Already have an account?
                            <Link to={'/auth'} className="font-semibold text-indigo-600 dark:text-indigo-100" href="/register">
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;