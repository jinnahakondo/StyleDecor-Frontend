import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({ service }) => {

    return (
        <div className='h-full'>
            <div className=" bg-white rounded-2xl shadow-md transition-all overflow-hidden border hover:shadow-primary hover:shadow-lg hover:scale-105 border-gray-100 h-full flex flex-col">
                {/* Image */}
                <figure className='rounded-lg'>
                    <img
                        src={service?.image}
                        alt="Service"
                        className="w-full h-52 object-cover"
                    />
                </figure>

                {/* Content */}
                <div className="p-5 space-y-3 mt-auto">
                    <div className="badge badge-soft badge-primary">{service.category}</div>

                    <h2 className="heading-two">{service.title}</h2>
                    <p className=" font-medium text-primary">Rating: {service.rating}</p>
                    <p className=" text-accent font-bold">
                        Price: $ {service.price}
                    </p>

                    {/* Button */}
                    <Link to={`/service-details/${service._id}`} className="btn btn-primary mt-2 w-fit">Book Now</Link>
                </div>
            </div>
        </div >
    );
};

export default ServiceCard;