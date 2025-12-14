import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import PostImage from '../../../Utils/PostImage';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const AddService = () => {
    const [serviceImage, setServiceImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const { mutate, isPending } = useMutation({
        mutationFn: async (service) => {
            await axiosSecure.post('/services', service);

        },
        onSuccess: () => {
            reset()
            setServiceImage(null)
            toast.success('service added successfully')
        },
        onError: () => {
            console.log("failed to add service");
        }
    })

    const handelAddService = async (data) => {
        if (!serviceImage) {
            return toast.error('Please upload service image');
        }
        const serviceInfo = {
            ...data,
            image: serviceImage,
            rating: 4,
            createdAt: new Date(),
            price: Number(data.price)
        }

        mutate(serviceInfo)
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit(handelAddService)}>
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
                            {...register('title', { required: 'please enter service name' })} />
                        {
                            errors?.title &&
                            <p className='text-red-500'>{errors?.title?.message}</p>
                        }
                    </div>
                    {/* service description  */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold'>Service description</label>
                        <textarea type="text" className='textarea outline-0 border border-accent w-full' placeholder='Type here'
                            {...register('description', { required: "please add a description" })} />
                        {
                            errors?.description &&
                            <p className='text-red-500'>{errors?.description?.message}</p>
                        }
                    </div>
                    {/* service category & price  */}
                    <div >
                        <div className='grid grid-cols-2 gap-7'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Service Category</label>
                                <select {...register('category', { required: "please select a category" })} className='dropdown input outline-0'>
                                    <option value="">Select a category</option>
                                    <option value="home">Home</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="office">Office</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="meeting">Meeting</option>
                                </select>
                                {
                                    errors?.category &&
                                    <p className='text-red-500'>{errors?.category?.message}</p>
                                }
                            </div>
                            {/* price  */}
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Service Price</label>
                                <input type="number" defaultValue={'0'} className='input outline-0' {...register('price',
                                    {
                                        required: "please enter service price", min: {
                                            value: 1,
                                            message: "price must be greater than 0"
                                        }
                                    })} />
                                {
                                    errors?.price &&
                                    <p className='text-red-500'>{errors?.price?.message}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary px-10' type='submit' disabled={!serviceImage || uploading || isPending}>
                        {isPending ? "Adding..." : "Add"}</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;