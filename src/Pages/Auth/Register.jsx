import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import GoogleLogin from "../../Components/Social Login/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import userPic from "../../assets/user.png";
import PostImage from "../../Utils/PostImage";
import Loader from "../../Components/Loader/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import FormInput from "../../Components/FromInput/FormInput";

const Register = () => {
    const { createUser, updateUserProfile, user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [profilePic, setProfilePic] = useState(userPic);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // ===============================
    // Handle Register
    // ===============================
    const handleCreateUser = async (data) => {
        setIsSubmitting(true);

        const { name, email, password, photo } = data;

        const updateInfo = {
            displayName: name,
            photoURL: photo,
        };

        const userInfo = {
            name,
            email,
            role: "user",
            profileImage: photo,
            createdAt: new Date(),
        };

        try {
            await createUser(email, password);
            await updateUserProfile(updateInfo);
            await axiosSecure.post("/users", userInfo);

            toast.success("Account created successfully");
            navigate(location.state || "/");
        } catch (error) {
            toast.error(error.code || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ===============================
    // Handle Image Upload
    // ===============================
    const handleOnChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const photoURL = await PostImage(file);
        setProfilePic(photoURL);
        setValue("photo", photoURL);
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col justify-center md:p-10 w-full lg:max-w-[500px] bg-base-100 lg:shadow-md">
            {/* Title */}
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Register
                </h1>
            </div>

            <div className="mt-8">
                <div className="px-4 pb-4 pt-6 sm:rounded-lg w-full sm:shadow">
                    <form
                        onSubmit={handleSubmit(handleCreateUser)}
                        className="space-y-6"
                    >
                        {/* Profile Photo */}
                        <div>
                            <label
                                htmlFor="photo"
                                className="grid place-items-center cursor-pointer"
                            >
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                                />
                            </label>

                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handleOnChange}
                                className="hidden"
                            />
                        </div>

                        {/* Name */}
                        <FormInput
                            label="Your Name"
                            name="name"
                            placeholder="Jinnah Akondo"
                            register={register}
                            rules={{ required: "Name is required" }}
                            error={errors.name}
                        />

                        {/* Email */}
                        <FormInput
                            label="Your Email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            register={register}
                            rules={{ required: "Email is required" }}
                            error={errors.email}
                        />

                        {/* Password */}
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="********"
                            register={register}
                            rules={{
                                required: "Password is required",
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                                    message:
                                        "Password must have 8+ characters with uppercase, lowercase, number, and special character.",
                                },
                            }}
                            error={errors.password}
                        />

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label
                                htmlFor="remember_me"
                                className="ml-2 block text-sm text-gray-900 dark:text-white"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn btn-primary w-full"
                            disabled={!isChecked || isSubmitting}
                        >
                            {isSubmitting ? <Loader size={20} /> : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-white">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <GoogleLogin />
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <span className="dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/auth"
                                state={location.state}
                                className="font-semibold text-indigo-600 dark:text-indigo-100"
                            >
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
