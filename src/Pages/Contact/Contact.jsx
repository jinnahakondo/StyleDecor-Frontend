import React from 'react';
import Container from '../../Components/Container/Container';
import { useForm } from "react-hook-form";
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router';

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handelSendMessage = (data) => {
        // console.log(data);
        
    };

    return (
        <div className="bg-base-100 py-16 lg:py-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-5xl font-black text-base-content mb-4 tracking-tight">
                                Get in <span className="text-primary">Touch</span>
                            </h2>
                            <p className="text-lg opacity-70">
                                Have a question or want to plan an event? Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Phone className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 font-medium">Call Us</p>
                                    <p className="text-lg font-bold">+8801773331334</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Mail className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 font-medium">Email Us</p>
                                    <p className="text-lg font-bold">mdjinnahakondo@gmail.com</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <MapPin className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 font-medium">Our Location</p>
                                    <p className="text-lg font-bold">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="pt-6">
                            <p className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4">Follow Us</p>
                            <div className="flex gap-4">
                                {[
                                    { icon: <FaFacebook />, link: 'https://facebook.com/RobiulislamJinnah' },
                                    { icon: <FaTwitter />, link: 'https://x.com' },
                                    { icon: <FaInstagram />, link: 'https://instagram.com' },
                                    { icon: <FaLinkedin />, link: 'https://linkedin.com' }
                                ].map((social, idx) => (
                                    <Link
                                        key={idx}
                                        to={social.link}
                                        className="btn btn-circle btn-outline btn-primary hover:text-white transition-all duration-300"
                                    >
                                        <span className="text-xl">{social.icon}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="card bg-base-100 shadow-2xl border border-base-200 p-2">
                        <form onSubmit={handleSubmit(handelSendMessage)} className="card-body gap-6 p-8 lg:p-12">
                            <div className="form-control">
                                <label className="label font-semibold mr-2">Full Name</label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="input input-bordered bg-base-200 focus:input-primary border-none focus:outline-offset-0"
                                    placeholder="John Doe"
                                />
                                
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold mr-2">Email Address</label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="input input-bordered bg-base-200 focus:input-primary border-none focus:outline-offset-0"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold mr-2">Message</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows={4}
                                    className="textarea textarea-bordered bg-base-200 focus:textarea-primary border-none focus:outline-offset-0"
                                    placeholder="Tell us about your event..."
                                ></textarea>
                            </div>

                            <button className="btn btn-primary btn-block h-14 rounded-xl text-lg group">
                                Send Message
                                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Contact;