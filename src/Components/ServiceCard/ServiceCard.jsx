import React from "react";
import { Link } from "react-router";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import { AiFillStar } from "react-icons/ai";
import PrimaryButton from "../buttons/PrimaryButton";

const ServiceCard = ({ service, badge }) => {

    return (
        <div className="p-2 sm:p-0 h-full">
            <div className="card bg-base-200 shadow hover:scale-y-105 transition-all h-full relative">

                {/* Badge */}
                {

                    badge && <div className="absolute top-3 left-3 z-10">
                        <span className="badge badge-primary badge-sm">{badge}</span>
                    </div>
                }

                {/* Image */}
                <figure className="px-3 pt-3">
                    <img
                        src={service?.image}
                        alt={service?.title}
                        className="rounded-xl h-40 w-full object-cover hover:scale-105 transition"
                    />
                </figure>

                {/* Content */}
                <div className="card-body p-4">
                    <h2 className="card-title text-sm">
                        {service.title}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-warning text-sm">
                        {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} />
                        ))}
                        <span className="text-xs text-base-content/60">
                            {service.rating}
                        </span>
                    </div>

                    {/* Stock */}
                    <p className="text-xs text-base-content/60">
                        Stock: {service.stock || 12} pieces
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className=" font-bold flex items-center">
                            <FaBangladeshiTakaSign />
                            {service.price}
                        </span>
                        {/* <span className="text-xs line-through text-base-content/50">
              ৳ {service.oldPrice || 1485}
            </span> */}
                    </div>

                    {/* Actions */}
                    <div className="card-actions justify-between items-center mt-2">
                        <PrimaryButton
                            path={`/service-details/${service._id}`}
                            style={'w-full'}
                        >
                            View Details
                        </PrimaryButton>

                        {/* <button className="btn btn-primary btn-sm btn-square">
                            <FaShoppingBag />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
