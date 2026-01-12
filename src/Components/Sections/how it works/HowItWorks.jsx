import React from 'react';
import SectionTitle from '../../SectionTitle';
import { FaBriefcase, FaCreditCard } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import FeatureCard from '../../Cards/FeatureCard';

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
                {process.map((card, index) => <FeatureCard key={index} card={card} />)}
            </div>
        </section>
    );
};

export default HowItWorks;
