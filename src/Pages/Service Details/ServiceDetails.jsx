import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loader/Loader";
import { FaUser } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdSupportAgent } from "react-icons/md";
import Tab from "./Tab/Tab";
import { format } from "date-fns";
import BookDrawer from "../../Components/Sections/Services/BookDrawer";
import useAuth from "../../Hooks/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";

const ServiceDetails = () => {
    const { user } = useAuth();
    const openBookDrawer = useRef(null);
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: service, isLoading } = useQuery({
        queryKey: ["service-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="h-screen grid place-items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pb-16">

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Image */}
                <div className="bg-base-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                        src={service?.image}
                        alt={service?.title}
                        className="max-h-[420px] object-contain hover:scale-110 transition w-full"
                    />
                </div>

                {/* Info */}
                <div className="space-y-6">

                    <h1 className="text-3xl font-semibold">
                        {service?.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="flex text-warning">
                            {[...Array(5)].map((_, i) => (
                                <AiFillStar key={i} />
                            ))}
                        </div>
                        <span className="text-sm text-base-content/60">
                            {service?.rating} ({service?.reviews?.length || 0} Reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-3">
                        <p className="text-3xl font-semibold flex items-center">
                            <FaBangladeshiTakaSign />
                            {service?.price}
                        </p>
                        <span className="text-sm text-base-content/60">
                            {service?.unit}
                        </span>
                    </div>

                    {/* Meta */}
                    <p className="text-sm text-base-content/60">
                        Created at:{" "}
                        {service?.createdAt &&
                            format(new Date(service.createdAt), "dd MMM yyyy")}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            className="btn btn-primary px-10"
                            onClick={() => {
                                if (user) {
                                    openBookDrawer.current.checked = true;
                                } else {
                                    navigate("/auth", { state: location.pathname });
                                }
                            }}
                        >
                            Book Now
                        </button>

                        {/* <button className="btn btn-outline px-10">
                            Add to Cart
                        </button> */}
                    </div>

                    {/* Trust Info */}
                    {/* <div className="pt-6 space-y-3 border-t border-base-300">
                        <div className="flex items-center gap-3 text-sm text-base-content/70">
                            <VscWorkspaceTrusted className="text-xl" />
                            Trusted Workers Team
                        </div>
                        <div className="flex items-center gap-3 text-sm text-base-content/70">
                            <FaUser className="text-xl" />
                            Reliable & Professional Staff
                        </div>
                        <div className="flex items-center gap-3 text-sm text-base-content/70">
                            <MdSupportAgent className="text-xl" />
                            24/7 Customer Support
                        </div>
                    </div> */}

                </div>
            </div>

            {/* Tabs */}
            <div className="mt-20">
                <Tab service={service} />
            </div>

            {/* Drawer */}
            <BookDrawer openBookDrawer={openBookDrawer} service={service} />
        </div>
    );
};

export default ServiceDetails;
