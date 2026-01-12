import React from 'react';
import SectionTitle from '../../SectionTitle';
import {
  FaPalette,
  FaClock,
  FaCreditCard,
  FaChartLine,
  FaUsersCog,
  FaHeadset,
} from "react-icons/fa";
import FeatureCard from '../../Cards/FeatureCard';

const WhyChooseStyleDecore = () => {

  const whyChoose = [
    {
      id: 1,
      icon: <FaPalette size={26} />,
      title: "Creative & Custom Designs",
      description:
        "We create unique and personalized decoration designs tailored to your event theme, style, and budget.",
    },
    {
      id: 2,
      icon: <FaClock size={26} />,
      title: "On-Time Service Guarantee",
      description:
        "Our professional team ensures timely setup and completion.",
    },
    {
      id: 3,
      icon: <FaCreditCard size={26} />,
      title: "Secure Online Payments",
      description:
        "Pay confidently using our secure online payment system.",
    },
    {
      id: 4,
      icon: <FaChartLine size={26} />,
      title: "Real-Time Booking Tracking",
      description:
        "Track your booking status directly from your dashboard.",
    },
    {
      id: 5,
      icon: <FaUsersCog size={26} />,
      title: "Verified Professional Team",
      description:
        "We work with trained and verified decorators.",
    },
    {
      id: 6,
      icon: <FaHeadset size={26} />,
      title: "Dedicated Customer Support",
      description:
        "Our support team is always available to assist you.",
    },
  ];

  return (
    <section className="py-12">
      <SectionTitle>Why Choose StyleDecor</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {whyChoose.map(card => (
          <FeatureCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseStyleDecore;
