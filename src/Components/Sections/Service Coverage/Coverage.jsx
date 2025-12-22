import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../../Loader/Loader';


const Coverage = () => {
    const { data: serviceCenters = [], isLoading } = useQuery({
        queryKey: ["home-serviceCenters"],
        queryFn: async () => {
            const res = await axios.get('./serviceCenters.json');
            return res.data
        }
    })
    const mapRef = useRef(null)

    const position = [23.685, 90.356]

    const handelSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const serarched = serviceCenters.find(c => c.district.toLowerCase().includes(search.toLowerCase()))
        mapRef.current.flyTo(serarched.coordinates, 14)
    }

    if (isLoading) Loader
    return (
        <div>
            <h2 className='heading-one text-center mb-10'> Area Of Service Coverage</h2>
            <form className='mb-10 flex items-center justify-center' onSubmit={handelSearch}>
                <div className="join ">
                    <div >
                        <label className="input validator join-item outline-0 focus:border border-gray-400 w-full ">
                            <svg className="h-[1em] opacity-50 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="text" placeholder="Serarch Service Centers" name='search' required className='' />
                        </label>
                        {/* <div className="validator-hint hidden">Enter valid email address</div> */}
                    </div>
                    <button type='submit' className="btn btn-primary join-item">Search</button>
                </div>
            </form>
            <div className='h-[600px] w-full border overflow-x-hidden'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-full'
                    ref={mapRef}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map(serviceCenter => <Marker key={serviceCenter.district} position={serviceCenter.coordinates}>
                            <Popup>
                                <strong>{serviceCenter.district}</strong> <br />
                                {serviceCenter.coveredArea.join(' ')}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;