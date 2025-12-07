import React from 'react';

const ServiceCard = () => {
    return (
        <div>
            <div className=" bg-white rounded-2xl shadow-md transition-all overflow-hidden border hover:shadow-primary hover:shadow-lg hover:scale-105 border-gray-100">
                {/* Image */}
                <figure className='rounded-lg'>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Service"
                        className="w-full h-full object-cover"
                    />
                </figure>

                {/* Content */}
                <div className="p-5 space-y-3">
                    <div className="badge badge-soft badge-primary">Cleaning</div>

                    <h2 className="heading-two">House Cleaning</h2>
                    <p className="text-sm font-medium text-primary">Jenny Wilson</p>
                    <p className="text-sm text-gray-500">
                        255 Grand Park Ave, New York
                    </p>

                    {/* Button */}
                    <button className="btn btn-primary mt-2 w-fit">Book Now</button>
                </div>
            </div>

            {/* <div className="card bg-base-100 w-96 shadow-sm">
                <figure className='rounded-lg'>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className='rounded-lg'
                    />
                </figure>
                <div className="p-5 space-y-3 ">
                    <div className="badge badge-soft badge-primary">Primary</div>
                    <h2 className="card-title heading-two">Card Title</h2>
                    <p>Price: ৳ 1,000</p>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div> */}
        </div >
    );
};

export default ServiceCard;