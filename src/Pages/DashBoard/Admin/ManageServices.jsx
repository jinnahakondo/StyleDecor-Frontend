import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import PostImage from '../../../Utils/PostImage';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { format } from "date-fns";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from '../../../Hooks/useAuth';

const ManageServices = () => {

    const { user } = useAuth()

    const modalRef = useRef(null);
    const [serviceImage, setServiceImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [service, setService] = useState(null);

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    /* =======================
        GET SERVICES
    ======================= */
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['manage-services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/services');
            return res.data;
        }
    });

    /* =======================
        UPDATE SERVICE
    ======================= */
    const { mutate: updateService, isPending: updating } = useMutation({
        mutationFn: async (updateInfo) => {
            const res = await axiosSecure.patch(`/services/${service._id}?email=${user?.email}`, updateInfo);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(`${data.title} updated successfully`);
            setServiceImage(null);
            queryClient.invalidateQueries({ queryKey: ['manage-services'] });
            reset();
            modalRef.current.close();
        }
    });

    const handleUpdateSubmit = (data) => {
        const updateInfo = {
            ...data,
            image: serviceImage || service?.image,
            price: Number(data.price),
        };
        updateService(updateInfo);
    };

    /* =======================
        DELETE SERVICE
    ======================= */
    const { mutate: deleteService } = useMutation({
        mutationFn: async (service) => {
            await axiosSecure.delete(`/services/${service._id}?email=${user?.email}`);
            return service;
        },
        onSuccess: (service) => {
            toast.success(`${service.title} deleted`);
            queryClient.invalidateQueries({ queryKey: ['manage-services'] });
        }
    });

    const handelDelete = (service) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This service will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteService(service);
            }
        });
    };

    return (
        <div>
            <h2 className="heading-one mb-4">Manage Services</h2>
            <p className="text-sm text-gray-500 mb-6">
                {services.length} {services.length <= 1 ? "Service Found" : "Services Found"}
            </p>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Service</th>
                            <th>Category</th>
                            <th className="whitespace-nowrap">Price</th>
                            <th className="whitespace-nowrap">Created</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            services.map(service => (
                                <tr key={service._id} className="hover">
                                    <td className="font-medium">
                                        {service.title}
                                    </td>

                                    <td className="capitalize">
                                        {service.category}
                                    </td>

                                    <td className="whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1 font-medium">
                                            <FaBangladeshiTakaSign />
                                            {service.price}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap text-sm">
                                        {format(new Date(service.createdAt), 'dd MMM yyyy')}
                                    </td>

                                    <td className="text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => {
                                                    setService(service);
                                                    modalRef.current.showModal();
                                                    reset({
                                                        title: service.title,
                                                        description: service.description,
                                                        category: service.category,
                                                        price: service.price,
                                                    });
                                                }}
                                            >
                                                <FiEdit />
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline btn-error"
                                                onClick={() => handelDelete(service)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= MODAL ================= */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg mb-4">Update Service</h3>

                    <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">

                        {/* IMAGE */}
                        <div>
                            <label className="font-medium">Service Image</label>
                            <label htmlFor="serviceImage">
                                <div className="mt-2 w-32 h-20 border rounded-lg grid place-items-center cursor-pointer overflow-hidden">
                                    {serviceImage ? (
                                        <img src={serviceImage} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-sm">
                                            <FaCloudUploadAlt />
                                            {uploading ? 'Uploading...' : 'Upload'}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <input
                                id="serviceImage"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setUploading(true);
                                    try {
                                        const url = await PostImage(file);
                                        setServiceImage(url);
                                    } finally {
                                        setUploading(false);
                                    }
                                }}
                            />
                        </div>

                        {/* TITLE */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="Service name"
                            {...register('title')}
                        />

                        {/* DESCRIPTION */}
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Service description"
                            {...register('description')}
                        />

                        {/* CATEGORY + PRICE */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select
                                className="select select-bordered"
                                {...register('category')}
                            >
                                <option value="">Select category</option>
                                <option value="home">Home</option>
                                <option value="wedding">Wedding</option>
                                <option value="office">Office</option>
                                <option value="seminar">Seminar</option>
                                <option value="meeting">Meeting</option>
                            </select>

                            <div>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    placeholder="Price"
                                    {...register('price', {
                                        required: "Price required",
                                        min: { value: 65, message: "Minimum 65 Taka" }
                                    })}
                                />
                                {errors.price && (
                                    <p className="text-error text-sm mt-1">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            disabled={uploading || updating}
                        >
                            {updating ? "Updating..." : "Update"}
                        </button>
                    </form>

                    <form method="dialog" className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                reset();
                                setService(null);
                                setServiceImage(null);
                            }}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageServices;
