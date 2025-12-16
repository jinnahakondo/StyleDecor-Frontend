import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ShowDecorators = ({ showDecoratorRef, showDecorators: decorators, decoratorsRefetch, booking, bookingsRefetch, booingLoding }) => {
    const axiosSecure = useAxiosSecure()

    console.log("decorators from modal", decorators);

    const handelAsign = async (decorator) => {

        const bookingInfoUpdate = {
            decoratorName: decorator?.name,
            decoratorEmail: decorator?.email,
            status: "Assigned"
        }
        const { serviceId, title, price, category, customerName, customerEmail, customerAddress, bookingDate, bookingTime, paymentStatus, district, decoratorEmail } = booking;

        const assignedBookingInfo = {
            serviceId,
            title,
            price,
            category,
            customerName,
            customerEmail,
            customerAddress,
            bookingDate,
            bookingTime,
            paymentStatus,
            district,
            decoratorEmail: decorator?.email,
            status: 'Assigned',
        }

        const trackingInfo = {
            serviceId,
            title,
            price,
            customerName,
            customerEmail,
            trackingStatus: ["Assigned"]
        }

        try {
            await axiosSecure.patch(`/bookings/${booking._id}`, bookingInfoUpdate)
            await axiosSecure.post('/assigned-bookings', assignedBookingInfo)
            await axiosSecure.post('/trackings', trackingInfo)
            decoratorsRefetch()
            toast.success(`${decorator.name} has benn asigned for this service`)
            bookingsRefetch()
            showDecoratorRef.current.close()
        } catch (error) {
            toast.error(error.code)
        }

    }

    return (
        <div>
            <dialog ref={showDecoratorRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{decorators?.length}
                        <span> {decorators.length <= 1 && "decorator found"}</span>
                        <span> {decorators.length > 1 && " deorators found"}</span>
                    </h3>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        {
                            booingLoding ? 'loading...'
                                :
                                <table className="table">
                                    <tbody>
                                        {decorators.map(d => <tr key={d._id}>
                                            <td>{d?.name}</td>
                                            <td>{d?.district}</td>
                                            <td>{d?.category}</td>
                                            <td><button
                                                onClick={() => handelAsign(d)}
                                                disabled={d?.workingStatus !== 'available'}
                                                className='btn btn-primary btn-sm'>Asign</button></td>
                                        </tr>)}
                                    </tbody>
                                </table>
                        }

                    </div>
                    <p className="py-4"></p>
                </div>
            </dialog>
        </div>
    );
};

export default ShowDecorators;