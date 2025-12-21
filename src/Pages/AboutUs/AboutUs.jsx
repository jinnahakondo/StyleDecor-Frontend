import React from 'react';
import Container from '../../Components/Container/Container';
import { Sparkles, Users, CalendarCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
const AboutUs = () => {
    const content = [
        "Connect customers with verified professional decorators",
        "Offer a wide range of event decoration services",
        "Ensure fair pricing and secure booking",
        "Make event planning simple and hassle-free"
    ]
    return (
        <div>
            <div className="min-h-screen bg-base-100 text-base-content ">
                {/* --- Header --- */}
                <div className="relative overflow-hidden bg-linear-to-b from-primary/10 to-base-100 py-20 lg:py-32 rounded-2xl">
                    <div className="container mx-auto px-6 text-center">
                        <div className=" mb-4 p-3 uppercase font-bold">
                            About StyleDecor
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 -tracking-tighter ">
                            Making Every Event <br className='mb-4' />
                            <span className="text-primary ">Beautiful & Memorable</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 leading-relaxed">
                            StyleDecor is a modern event decoration platform that connects customers with skilled and professional decorators. We make it easy to plan, book, and enjoy beautifully decorated events without stress.
                        </p>
                    </div>
                </div>

                {/* --- Who We Are & Mission --- */}
                <div className="container mx-auto px-6 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Who We Are</h2>
                            <p className="text-lg opacity-70">
                                We are a trusted platform built to simplify event decoration services. Whether it’s a wedding, birthday, corporate event, or private celebration, StyleDecor helps customers find the right decorators for their needs with transparency and confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <div className="flex-1 p-6 bg-primary text-primary-content rounded-2xl shadow-lg">
                                    <h3 className="font-bold text-xl mb-2">Our Mission</h3>
                                    <p className="text-sm opacity-90">To make quality event decoration accessible to everyone by creating a reliable and easy-to-use platform.</p>
                                </div>
                                <div className="flex-1 p-6 bg-base-200 rounded-2xl border border-base-300">
                                    <h3 className="font-bold text-xl mb-2">Our Vision</h3>
                                    <p className="text-sm opacity-70">To become a leading event decoration platform by delivering trust, creativity, and excellent service.</p>
                                </div>
                            </div>
                        </div>

                        {/* What We Do */}
                        <div className="bg-base-200 p-8 rounded-3xl space-y-6 shadow-inner border border-base-300">
                            <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                            <ul className="space-y-4">
                                {content.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="mt-1 bg-primary/20 p-1 rounded-full">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- Why Choose Us Section --- */}
                <div className="bg-neutral text-neutral-content py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-16 ">Why Choose StyleDecor</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <ShieldCheck className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-lg">Trusted Experts</h4>
                                <p className="text-sm opacity-60">Verified professional decorators</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <CalendarCheck className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-lg">Simple Booking</h4>
                                <p className="text-sm opacity-60">Hassle-free process</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-lg">Focus on You</h4>
                                <p className="text-sm opacity-60">Customer-focused support</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <div className="text-primary font-bold text-2xl">$</div>
                                </div>
                                <h4 className="font-bold text-lg">Fair Pricing</h4>
                                <p className="text-sm opacity-60">Transparent & secure</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CTA Section --- */}
                <section className="container mx-auto px-6 py-24 text-center">
                    <div className="max-w-3xl mx-auto bg-base-200 border border-base-300 rounded-[3rem] p-12 shadow-xl">
                        <h2 className="text-4xl font-bold mb-4">Let’s Create Something Special</h2>
                        <p className="text-lg opacity-70 mb-10">
                            Planning an event? Explore our services and let StyleDecor help you turn your ideas into reality.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to={'/services'} className="btn btn-primary btn-lg rounded-full group">
                                Browse Services
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to={'/contact'} className="btn btn-outline btn-lg rounded-full">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>



        </div >
    );
};

export default AboutUs;