import React from 'react';
import SectionTitle from '../../SectionTitle';
import { FaBriefcase, FaCreditCard } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";

const HowItWorks = () => {

    const process = [
        {
            icon: <FaBriefcase size={26} />,
            title: 'Choose a Service',
            description: 'Browse our services and select the one that best fits your needs.'
        },
        {
            icon: <LuCalendarClock size={26} />,
            title: 'Book Your Schedule',
            description: 'Choose your preferred date, time, and provide the service address.'
        },
        {
            icon: <FaListUl size={26} />,
            title: 'Select Quantity',
            description: 'Set the required service quantity based on your needs.'
        },
        {
            icon: <FaCreditCard size={26} />,
            title: 'Make Online Payment',
            description: 'Pay securely online using trusted payment methods.'
        },
    ];

    return (
        <section className="py-12">
            <SectionTitle>How It Works</SectionTitle>
            <p className='text-center'>Book your service in just a few simple steps</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {process.map((step, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-base-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                            {step.icon}
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {step.title}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
