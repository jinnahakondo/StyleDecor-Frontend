import React from 'react';
import SectionTitle from '../../../SectionTitle';
import {
    FaHome,
    FaRing,
    FaBuilding,
    FaChalkboardTeacher,
    FaHandshake,
} from "react-icons/fa";
import CategoryCard from './CategoryCard';
import FeatureCard from '../../../Cards/FeatureCard';

const Categories = () => {

    const categories = [
        {
            title: "Home",
            description: "Decoration & setup for your home events",
            count: 120,
            icon: <FaHome size={20} />,
        },
        {
            title: "Wedding",
            description: "Beautiful wedding decoration services",
            count: 80,
            icon: <FaRing size={20} />,
        },
        {
            title: "Office",
            description: "Professional office decoration solutions",
            count: 60,
            icon: <FaBuilding size={20} />,
        },
        {
            title: "Seminar",
            description: "Stage & venue decoration for seminars",
            count: 40,
            icon: <FaChalkboardTeacher size={20} />,
        },
        {
            title: "Meeting",
            description: "Clean and modern meeting setup services",
            count: 30,
            icon: <FaHandshake size={20} />,
        },
    ];

    return (
        <div>
            <SectionTitle>Categories</SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-10">
                {categories.map((card, index) => (
                    <FeatureCard key={index} card={card} style='items-start' align='text-left' />
                ))}
            </div>
        </div>
    );
};

export default Categories;