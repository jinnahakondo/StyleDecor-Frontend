import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Camera,
} from "lucide-react";

import GoogleLogin from "../../Components/Social Login/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PostImage from "../../Utils/PostImage";
import userPic from "../../assets/user.png";

const Register = () => {
    const { createUser, updateUserProfile, user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [profilePic, setProfilePic] = useState(userPic);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleCreateUser = async (data) => {
        setIsSubmitting(true);
        const { name, email, password, photo } = data;

        const updateInfo = { displayName: name, photoURL: photo };
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

            toast.success("Welcome! Account created.");
            navigate(location.state || "/");
        } catch (error) {
            toast.error(error.code?.split("/")[1]?.replace(/-/g, " ") || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const photoURL = await PostImage(file);
            setProfilePic(photoURL);
            setValue("photo", photoURL);
        } catch (error) {
            toast.error("Image upload failed");
        }
    };

    if (user) return <Navigate to="/" />;

    return (
        <div className="h-full flex items-center justify-center bg-base-100">
            <div className="w-full max-w-md bg-base-100/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-base-300 p-10">
                
                {/* Minimal Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-black tracking-tight text-base-content">
                        Create Account
                    </h2>
                    <p className="text-base-content/50 mt-2 font-medium">Step into your new journey</p>
                </div>

                <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-6">
                    
                    {/* Centered Avatar Upload */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-300 ring-4 ring-primary/20 shadow-xl">
                                <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
                            </div>
                            <label className="absolute -bottom-2 -right-2 bg-primary text-primary-content p-2 rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                <Camera size={18} />
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="form-control w-full">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                type="text"
                                placeholder="Display Name"
                                {...register("name", { required: "Name is required" })}
                                className="input input-bordered w-full pl-12 h-10 rounded-2xl bg-base-200/30 border-none focus:ring-2 ring-primary/50 transition-all text-lg"
                            />
                        </div>
                        {errors.name && <span className="text-error text-xs mt-1 ml-4">{errors.name.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="form-control w-full">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email", { required: "Email is required" })}
                                className="input input-bordered w-full pl-12 h-10 rounded-2xl bg-base-200/30 border-none focus:ring-2 ring-primary/50 transition-all text-lg"
                            />
                        </div>
                        {errors.email && <span className="text-error text-xs mt-1 ml-4">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control w-full">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Use at least 6 characters" } 
                                })}
                                className="input input-bordered w-full pl-12 pr-12 h-10 rounded-2xl bg-base-200/30 border-none focus:ring-2 ring-primary/50 transition-all text-lg"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPass(!showPass)} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-error text-xs mt-1 ml-4">{errors.password.message}</span>}
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3 px-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary rounded-lg transition-all"
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-sm font-medium opacity-60">
                            Agree to Terms & Conditions
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!isChecked || isSubmitting}
                        className="btn btn-primary w-full h-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                    >
                        {isSubmitting ? <Loader size={24} /> : "Sign Up"}
                    </button>
                </form>

                <div className="divider text-base-content/20 my-8 text-xs font-bold tracking-widest">OR</div>

                <GoogleLogin />

                <p className="text-center mt-8 text-sm font-medium opacity-60">
                    Already have an account?{" "}
                    <Link
                        to="/auth"
                        state={location.state}
                        className="text-primary font-bold hover:underline ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;