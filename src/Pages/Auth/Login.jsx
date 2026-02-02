import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import GoogleLogin from "../../Components/Social Login/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

const Login = () => {
    const { signInUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        setIsSubmitting(true);
        const { email, password } = data;

        try {
            await signInUser(email, password);
            toast.success("Welcome back!");
            navigate(location.state || "/");
        } catch (error) {
            toast.error(error.code?.split("/")[1]?.replace(/-/g, " ") || "Invalid credentials");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (user) return <Navigate to={location.state || "/"} />;

    return (
        <div className="h-full flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-md bg-base-100/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-base-300 p-10">
                
                {/* Minimal Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-4 rotate-3">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-base-content">
                        Welcome Back
                    </h2>
                    <p className="text-base-content/50 mt-2 font-medium">Please enter your details</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                    
                    {/* Email Field */}
                    <div className="form-control w-full">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email", { required: "Email is required" })}
                                className="input input-bordered w-full pl-12 h-12 rounded-2xl bg-base-200/30 border-none focus:ring-2 ring-primary/50 transition-all text-lg"
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
                                {...register("password", { required: "Password is required" })}
                                className="input input-bordered w-full pl-12 pr-12 h-12 rounded-2xl bg-base-200/30 border-none focus:ring-2 ring-primary/50 transition-all text-lg"
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

                    {/* Remember & Forgot Password */}
                    <div className="flex items-center justify-between px-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm rounded-lg"
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <span className="text-sm font-medium opacity-60">Remember me</span>
                        </label>
                        <button type="button" className="text-sm font-bold text-primary hover:underline">
                            Forgot?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!isChecked || isSubmitting}
                        className="btn btn-primary w-full h-12 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                    >
                        {isSubmitting ? <Loader size={24} /> : "Sign In"}
                    </button>
                </form>

                <div className="divider text-base-content/20 my-8 text-xs font-bold tracking-widest">OR</div>

                <GoogleLogin />

                {/* Quick Demo Access */}
                <div className="mt-8 p-4 rounded-3xl bg-base-200/50 border border-base-300">
                    <p className="text-[10px] font-black uppercase text-base-content/40 tracking-widest mb-3 text-center">Quick Demo Access</p>
                    <div className="flex justify-center gap-2">
                        {['admin', 'decorator', 'user'].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => {
                                    setValue("email", `${role}@gmail.com`);
                                    setValue('password', 'Asdf@1234');
                                }}
                                className="btn btn-xs btn-ghost hover:bg-primary/10 hover:text-primary capitalize rounded-lg"
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-center mt-8 text-sm font-medium opacity-60">
                    New here?{" "}
                    <Link
                        to="/auth/register"
                        state={location.state}
                        className="text-primary font-bold hover:underline ml-1"
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;