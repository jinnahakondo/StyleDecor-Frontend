import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ShowDecorators = ({ showDecoratorRef, showDecorators: decorators, decoratorsRefetch }) => {
    const axiosSecure = useAxiosSecure()

    const handelAsign = async (decorator) => {
        const workingStatus = 'Assigned'
        await axiosSecure.patch(`/asign/decorator/${decorator._id}`, { workingStatus })
        decoratorsRefetch()
        toast.success(`${decorator.name} has benn asigned for this service`)
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
                    </div>
                    <p className="py-4"></p>
                </div>
            </dialog>
        </div>
    );
};

export default ShowDecorators;