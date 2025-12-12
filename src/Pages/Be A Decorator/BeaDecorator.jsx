import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BeaDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const { data = [] } = useQuery({
        queryKey: ["divisons"],
        queryFn: async () => {
            const res = await axios.get('/serviceCenters.json')
            return res.data;
        }

    })

    // get divisions
    const duplicateDivisions = data.map(d => d.division);
    const divisions = [...new Set(duplicateDivisions)]

    // watching division 
    const division = useWatch({
        control,
        name: 'region'
    })

    //get districts
    const districtsObj = data.filter(d => d.division === division)
    const districts = districtsObj.map(d => d.district)

    // form submit function 
    const handelBeADecorator = async (data) => {
        data.photo = user?.photoURL;
        const res = await axiosSecure.post('/decorators', data);
        if (res.data.insertedId) {
            reset()
            Swal.fire({
                title: "your application has ben sent!",
                text: ". We will send a confirmation email you soon!.",
                icon: "success"
            });
        }
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto '>
                <h2 className='heading-one mb-10'>Be A Decorator</h2>
                <form onSubmit={handleSubmit(handelBeADecorator)}>
                    <div className='flex flex-col lg:flex-row gap-5 lg:gap-12'>
                        {/* left side  */}
                        <div className='flex flex-col gap-5 flex-1'>
                            {/* name  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='font-medium'>Name</label>
                                <input type="text" className='input outline-0 border border-accent w-full' placeholder='Name' {...register('name')} defaultValue={user?.displayName} readOnly />
                            </div>
                            {/* age  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="age" className='font-medium'>Your Age</label>
                                <input type="number" className='input outline-0 border border-accent w-full' placeholder='your age' {...register('age')} />
                            </div>
                            {/* region  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="region" className='font-medium'>Region</label>
                                < select className='input outline-0 border border-accent w-full'
                                    {...register('region')}  >
                                    <option value='' >Select Your Region</option>
                                    {
                                        divisions.map(division => <option key={division} value={division}>{division}</option>)
                                    }

                                </select>
                            </div>
                            {/* contact no  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="contact" className='font-medium'>Contact No.</label>
                                <input type="number" className='input outline-0 border border-accent w-full' placeholder='your contact no.' {...register('contact')} />
                            </div>

                        </div>

                        {/* right side  */}
                        <div className='flex flex-col gap-5 flex-1'>

                            {/* email  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='font-medium'>Email</label>
                                <input type="email" className='input outline-0 border border-accent w-full' placeholder='Email' {...register('email')} defaultValue={user?.email} readOnly />
                            </div>

                            {/* nid  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="nid" className='font-medium'>Nid No.</label>
                                <input type="number" className='input outline-0 border border-accent w-full' placeholder='your nid no.' {...register('nid')} />
                            </div>


                            {/* district  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="district" className='font-medium'>District</label>
                                < select className='input outline-0 border border-accent w-full'  {...register('district')}  >
                                    <option value=''>Select Your District</option>
                                    {
                                        districts.map(district => <option key={district} value={district}>{district}</option>)
                                    }
                                </select>
                            </div>
                            {/* category  */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="category" className='font-medium'>Category</label>
                                < select className='input outline-0 border border-accent w-full'  {...register('category')}  >

                                    <option value=''>Select a Category</option>
                                    <option value='home'>home</option>
                                    <option value='wedding'>wedding</option>
                                    <option value='office'> office</option>
                                    <option value='seminar'> seminar</option>
                                    <option value='meeting'> meeting</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    {/* additional information  */}
                    <div className='flex flex-col gap-1 col-span-2 mt-5'>
                        <label htmlFor="additionalInfo" className='font-medium'>Additional Info.</label>
                        < textarea placeholder='additional information' className='textarea outline-0 border border-accent w-full'  {...register('additionalInfo')} />

                    </div>
                    <button className='btn btn-primary mt-5  font-bold'>Apply to be a decortor</button>
                </form>
            </div>
        </div>
    );
};

export default BeaDecorator;