import React, { useState } from "react";
import GoogleLogin from "../../Components/Social Login/GoogleLogin";
import { Link, useNavigate, useLocation, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import FormInput from "../../Components/FromInput/FormInput";

const Login = () => {
    const { signInUser, user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        setIsSubmitting(true);
        const { email, password } = data;

        signInUser(email, password)
            .then(() => {
                toast.success("Signed in successfully");
                navigate(location.state || "/");
            })
            .catch((error) => {
                toast.error(error.code);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (user) {
        return <Navigate to={location.state || "/"} />;
    }

    return (
        <div className="flex flex-col justify-center md:p-10 w-full lg:max-w-[500px] bg-base-100 md:shadow-md">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign in
                </h1>
            </div>

            <div className="mt-8">
                <div className="px-4 pb-4 pt-8 sm:rounded-lg w-full sm:shadow">
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <FormInput
                            label="Email address"
                            name="email"
                            type="text"
                            register={register}
                            rules={{ required: "Please enter your email" }}
                            error={errors.email}
                            placeholder={'email'}
                        />

                        {/* Password */}
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            register={register}
                            placeholder={'password'}
                            rules={{
                                required: "Please enter a valid password",
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                                    message:
                                        "Password must have 8+ characters, with uppercase, lowercase, number, and special character.",
                                },
                            }}
                            error={errors.password}
                        />

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a className="font-medium text-indigo-400 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            className="btn btn-primary w-full"
                            disabled={!isChecked || isSubmitting}
                        >
                            {isSubmitting ? <Loader size={20} /> : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
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

                        <div className="mt-6">
                            <GoogleLogin />
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <span className="dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/auth/register"
                                state={location.state}
                                className="font-semibold text-indigo-600 dark:text-indigo-100"
                            >
                                Create Account
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
