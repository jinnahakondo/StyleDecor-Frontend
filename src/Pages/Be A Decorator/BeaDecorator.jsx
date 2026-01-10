import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/SectionTitle";

const BeaDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, reset, handleSubmit, control } = useForm();

    const { data = [] } = useQuery({
        queryKey: ["divisons", "be-a-decorator"],
        queryFn: async () => {
            const res = await axios.get("/serviceCenters.json");
            return res.data;
        },
    });

    const divisions = [...new Set(data.map(d => d.division))];

    const region = useWatch({ control, name: "region" });

    const districts = data
        .filter(d => d.division === region)
        .map(d => d.district);

    const handelBeADecorator = async (formData) => {
        formData.photo = user?.photoURL;
        formData.createdAt = new Date();

        const res = await axiosSecure.post("/decorators", formData);
        if (res.data.insertedId) {
            reset();
            Swal.fire({
                title: "Application Submitted",
                text: "We will contact you soon.",
                icon: "success",
            });
        }
    };

    return (
        <div className="pb-14">
            <div className="max-w-3xl mx-auto px-4">

                <SectionTitle>Be a Decorator</SectionTitle>

                <form
                    onSubmit={handleSubmit(handelBeADecorator)}
                    className="mt-10 space-y-8"
                >

                    {/* Personal Info */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-base-content/70">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input
                                className="input input-bordered"
                                {...register("name")}
                                defaultValue={user?.displayName}
                                readOnly
                                placeholder="Full name"
                            />

                            <input
                                className="input input-bordered"
                                {...register("email")}
                                defaultValue={user?.email}
                                readOnly
                                placeholder="Email address"
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                {...register("age")}
                                placeholder="Age"
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                {...register("contact")}
                                placeholder="Contact number"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-base-content/70">
                            Location
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <select className="select select-bordered" {...register("region")}>
                                <option value="">Select region</option>
                                {divisions.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <select className="select select-bordered" {...register("district")}>
                                <option value="">Select district</option>
                                {districts.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Professional */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-base-content/70">
                            Professional Details
                        </h3>

                        <select className="select select-bordered w-full" {...register("category")}>
                            <option value="">Select service category</option>
                            <option value="home">Home</option>
                            <option value="wedding">Wedding</option>
                            <option value="office">Office</option>
                            <option value="seminar">Seminar</option>
                            <option value="meeting">Meeting</option>
                        </select>

                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("nid")}
                            placeholder="National ID number"
                        />
                    </div>

                    {/* Additional */}
                    <div className="space-y-3">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register("additionalInfo")}
                            placeholder="Additional information (optional)"
                        />
                    </div>

                    {/* Submit */}
                    <button className="btn btn-primary w-full md:w-fit px-10">
                        Apply to be a Decorator
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BeaDecorator;
