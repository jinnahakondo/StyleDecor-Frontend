import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import PostImage from '../../../Utils/PostImage';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

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

    const handelAddService = async (data) => {
        data.image = serviceImage;
        data.rating = 4;
        data.createdAt = new Date();
        await axiosSecure.post('/services', data);
        reset()
        setServiceImage(null)
        toast.success('service added successfully')
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
                            const imageUrl = await PostImage(file)
                            setUploading(false)
                            setServiceImage(imageUrl)
                        }} className='hidden' />

                    </div>
                    {/* service name  */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold'>Service Name</label>
                        <input type="text" className='input outline-0 border border-accent w-full' placeholder='Service Name'
                            {...register('title')} />
                    </div>
                    {/* service description  */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold'>Service description</label>
                        <textarea type="text" className='textarea outline-0 border border-accent w-full' placeholder='Type here'
                            {...register('description')} />
                    </div>
                    {/* service category & price  */}
                    <div >
                        <div className='grid grid-cols-2 gap-7'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Service Category</label>
                                <select {...register('category')} className='dropdown input outline-0'>
                                    <option value="">Select a category</option>
                                    <option value="home">Home</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="office">Office</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="meeting">Meeting</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Service Price</label>
                                <input type="number" defaultValue={'0'} className='input outline-0' {...register('price')} />
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary px-10' type='submit'>Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;