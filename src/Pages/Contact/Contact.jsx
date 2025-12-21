import React from 'react';
import Container from '../../Components/Container/Container';
import { useForm } from "react-hook-form"
import { Send } from 'lucide-react';
import { IoCall } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router';

const Contact = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    return (
        <div>
            <Container>
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 mt-20  items-center'>

                    {/* left */}
                    <div className='max-w-sm '>
                        <h2 className='text-5xl font-extrabold '>Contact us</h2>
                        <div className='space-y-7 mt-10'>
                            <div className='flex items-center gap-3 text-lg font-bold text-accent mt-7'> <span className='text-5xl'>
                                <Send className='text-primary w-10 h-10' />
                            </span>
                                <span>mdjinnahakondo@gmail.com</span>
                            </div>
                            <div className='flex items-center gap-3 text-lg font-bold text-accent mt-7'> <span className='text-5xl'>
                                <IoCall className='text-primary w-10 h-10' />
                            </span>
                                <span>+8801773331334</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Link to='/' className='hover:-translate-y-1 transition-all'><FaFacebook className='w-10 h-10 text-primary ' /></Link>
                                <Link to='/' className='hover:-translate-y-1 transition-all'><FaTwitterSquare className='w-10 h-10 text-primary ' /></Link>
                                <Link to='/' className='hover:-translate-y-1 transition-all'><FaInstagram className='w-10 h-10 text-primary ' /></Link>
                                <Link to='/' className='hover:-translate-y-1 transition-all'><FaLinkedin className='w-10 h-10 text-primary ' /></Link>

                            </div>
                        </div>
                    </div>

                    <div className=' w-full  '>
                        <form onSubmit={handleSubmit()} className=''>
                            <div className="  w-full flex flex-col gap-5 ">
                                <div className='flex flex-col gap-0.5'>
                                    <input type="email" className="input input-xl border-0 rounded-lg w-full bg-gray-100 focus:outline-0" placeholder="Full Name" />
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <input type="email" className="input input-xl  rounded-lg w-full bg-gray-100 focus:outline-0 border-0" placeholder="email" />
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <textarea
                                        rows={5}
                                        className="textarea textarea-xl rounded-lg w-full bg-gray-100 focus:outline-0 border-0" placeholder="write your message here" ></textarea>
                                </div>

                                <div>
                                    <button className="btn btn-primary mt-4 px-8 py-7 rounded-md shadow text-xl">Send Message</button>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;