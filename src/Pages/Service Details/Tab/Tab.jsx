import React from "react";
import Reviews from "../Reviews/Reviews";

const Tab = ({ service }) => {
    return (
        <div className="mt-16">

            {/* Tabs */}
            <div className="tabs tabs-bordered">

                <input
                    type="radio"
                    name="service_tabs"
                    className="tab text-sm font-medium"
                    aria-label="Description"
                    defaultChecked
                />
                <div className="tab-content pt-8">
                    <p className="text-base-content/80 leading-relaxed max-w-4xl">
                        {service?.description}
                    </p>
                </div>

                <input
                    type="radio"
                    name="service_tabs"
                    className="tab text-sm font-medium"
                    aria-label={`Reviews (${service?.reviews?.length || 0})`}
                />
                <div className="tab-content pt-8">
                    <Reviews reviews={service?.reviews} />
                </div>

            </div>
        </div>
    );
};

export default Tab;
