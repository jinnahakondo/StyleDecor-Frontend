import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import Loader from '../../../Components/Loader/Loader';

const TrackService = () => {
    const instance = useAxios()
    const { trackingId } = useParams()

    const { data = {}, isLoading } = useQuery({
        queryKey: ['track-servie', trackingId],
        queryFn: async () => {
            const res = await instance.get(`/track-service/${trackingId}`)
            return res.data;
        }
    })
    const { trackingStatus = [], title } = data;

    if (isLoading) {
        return <span className='grid place-items-center h-screen'><Loader /></span>
    }
    return (
        <div className='h-screen grid place-items-center max-w-5xl mx-auto'>

            <ul className="timeline timeline-vertical">
                <h2 className='heading-two text-center mb-5'>{title}</h2>
                <li>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-primary h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">pending assign</div>
                    <hr className='bg-purple-300' />
                </li>
                {trackingStatus.map((status, i) => <li key={i}>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-primary h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">{status}</div>
                    <hr className='bg-purple-300' />
                </li>)}


            </ul>
        </div>
    );
};

export default TrackService;