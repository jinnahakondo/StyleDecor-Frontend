import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const BeaDecorator = () => {
    const { user } = useAuth()
    const {
        register,
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
    const handelBeADecorator = () => {
        console.log("clicked");
    }

    return (
        <div>
            Be A Decorator
            <div>
                <form onSubmit={handleSubmit(handelBeADecorator)}>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='font-medium'>Name</label>
                            <input type="text" className='input outline-0 border border-accent' placeholder='Name' {...register('name')} defaultValue={user?.displayName} readOnly />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='font-medium'>Email</label>
                            <input type="text" className='input outline-0 border border-accent' placeholder='Email' {...register('email')} defaultValue={user?.email} readOnly />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="region" className='font-medium'>Region</label>
                            < select className='input outline-0 border border-accent'
                                {...register('region')}  >
                                <option value='' >Select Your Region</option>
                                {
                                    divisions.map(division => <option key={division} value={division}>{division}</option>)
                                }

                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="district" className='font-medium'>District</label>
                            < select className='input outline-0 border border-accent'  {...register('district')}  >
                                <option value=''>Select Your District</option>
                                {
                                    districts.map(district => <option key={district} value={district}>{district}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="category" className='font-medium'>Category</label>
                            < select className='input outline-0 border border-accent'  {...register('category')}  >

                                <option value=''>Select a Category</option>
                                <option value=''>home</option>
                                <option value=''>wedding</option>
                                <option value=''> office</option>
                                <option value=''> seminar</option>
                                <option value=''> meeting</option>

                            </select>
                        </div>



                    </div>
                </form>
            </div>
        </div>
    );
};

export default BeaDecorator;