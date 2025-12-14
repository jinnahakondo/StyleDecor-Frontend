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


const ManageServices = () => {

    const modalRef = useRef(null)
    const [serviceImage, setServiceImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [service, setService] = useState(null)
    console.log(service);

    const queryClient = useQueryClient();

    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { data: services = [], isLoading, } = useQuery({
        queryKey: ['manage-services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/services');
            return res.data;
        }
    })
    // for edit service 
    const { mutate: handelUpdate, isPending: updating } = useMutation({
        mutationFn: async (updateInfo) => {
            const res = await axiosSecure.patch(`/services/${service._id}`, updateInfo);
            return res.data;
        },
        onSuccess: (data) => {
            setServiceImage(null)
            toast.success(`${data.title} service updated successfully`)
            queryClient.invalidateQueries({ queryKey: ['manage-services'] })
            reset();
            modalRef.current.close();

        },
        onError: () => {
            console.log("failed to update service");
        }
    })
    //handelEdit
    const handleUpdateSubmit = (data) => {
        const updateServiceInfo = {
            ...data,
            image: serviceImage || service?.image,
            price: Number(data.price)
        }
        handelUpdate(updateServiceInfo)
    }

    //handelDelete
    const handelDelete = (service) => {
        Swal.fire({
            text: "Want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(service)
            }
        });
    }

    // query for delete
    const { mutate } = useMutation({
        mutationFn: async (service) => {
            const res = await axiosSecure.delete(`/services/${service._id}`)
            console.log(res);
            return service
        },
        onSuccess: (service) => {
            toast.success(`${service?.title} service has been deleted`)
            queryClient.invalidateQueries({ queryKey: ['manage-services'] })
        }
    })

    return (
        <div>
            <div>
                <h2 className='heading-one mb-10'>Manage Services</h2>
                <p> {services?.length} {services?.length <= 1 ? "Service Founded" : " Services Founded"}</p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? 'loading...' :
                                services.map(service => <tr key={service._id}>
                                    <td>{service?.title}</td>
                                    <td>{service?.category}</td>
                                    <td>${service?.price}</td>
                                    <td>{format(service?.createdAt, 'dd MMMM yy')}</td>
                                    <td>
                                        <div className='flex items-center gap-5'>
                                            <button
                                                onClick={() => {
                                                    modalRef.current.showModal()
                                                    setService(service)
                                                    reset({
                                                        title: service.title,
                                                        description: service.description,
                                                        category: service.category,
                                                        price: service.price,
                                                    });
                                                }}
                                                className='text-base  lg:text-xl btn-sm lg:btn '><FiEdit /></button>
                                            <button
                                                onClick={() => handelDelete(service)}
                                                className='text-base lg:text-xl text-error btn-sm lg:btn bg-transparent'><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {/* modal  */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* <h3 className="font-bold text-lg">Update this service</h3> */}
                    <div className=''>
                        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
                            <div className='flex flex-col gap-4 max-w-md'>
                                {/* service image  */}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold'>Service Image</label>
                                    <label htmlFor='serviceImage'>
                                        <div className='w-32 h-[70px] border border-gray-400 rounded-lg grid place-items-center overflow-hidden'>
                                            {
                                                serviceImage ?
                                                    <img src={serviceImage} alt="service image" className='w-full h-full object-cover' />
                                                    :
                                                    <div className='flex flex-col items-center'>
                                                        <FaCloudUploadAlt className='text-2xl' />
                                                        <span className='text-sm'> {uploading ? 'uploading...' : 'Upload'}</span>
                                                    </div>
                                            }
                                        </div>
                                    </label>
                                    <input id='serviceImage' type="file" accept='image/*' onChange={async (e) => {
                                        setUploading(true)
                                        const file = e.target.files[0]
                                        if (!file) {
                                            setUploading(false)
                                            return
                                        }
                                        try {
                                            const imageUrl = await PostImage(file)
                                            setServiceImage(imageUrl)
                                        } catch (error) {
                                            console.log("image uploading failed", error.code);
                                        }
                                        finally {
                                            setUploading(false)
                                        }

                                    }} className='hidden' />

                                </div>
                                {/* service name  */}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold'>Service Name</label>
                                    <input type="text" className='input outline-0 border border-accent w-full' placeholder='Service Name'
                                        {...register('title')}

                                    />
                                </div>
                                {/* service description  */}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold'>Service description</label>
                                    <textarea type="text" className='textarea outline-0 border border-accent w-full' placeholder='Type here'
                                        {...register('description',)}

                                    />

                                </div>
                                {/* service category & price  */}
                                <div >
                                    <div className='grid grid-cols-2 gap-7'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold'>Service Category</label>
                                            <select {...register('category')} className='dropdown input outline-0'

                                            >
                                                <option value="">Select a category</option>
                                                <option value="home">Home</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="office">Office</option>
                                                <option value="seminar">Seminar</option>
                                                <option value="meeting">Meeting</option>
                                            </select>

                                        </div>
                                        {/* price  */}
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold'>Service Price</label>
                                            <input type="number" className='input outline-0'
                                                placeholder='service price'
                                                {...register('price',
                                                    {
                                                        required: "please enter service price", min: {
                                                            value: 1,
                                                            message: "price must be greater than 0"
                                                        }
                                                    })}

                                            />
                                            {
                                                errors?.price &&
                                                <p className='text-red-500'>{errors?.price?.message}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className=''>

                                    <button className='btn btn-primary w-full' type='submit' disabled={uploading || updating}>
                                        {updating ? "Updating..." : "Update"}</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => {
                                setService(null);
                                setServiceImage(null);
                                reset()
                            }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageServices;