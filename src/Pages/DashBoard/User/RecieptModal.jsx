import React from 'react';

const RecieptModal = ({ showReciept, paymentInfo }) => {
    console.log(paymentInfo);
    return (
        <div>

            <dialog ref={showReciept} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className=''>
                        <div className='flex justify-between items-center mt-10'>
                            <h2 className='text-xl font-medium'>Transection ID</h2>
                            <p>{paymentInfo?.transectionId}</p>
                        </div>
                        <div className='divider'></div>
                        <div className='flex justify-between items-center mt-10'>
                            <h2 className='text-xl font-medium'>Time</h2>
                            <p>{new Date(paymentInfo?.paidAt).toLocaleString().split(' ')[1]}</p>
                        </div>
                        <div className='divider'></div>
                        <div className='flex justify-between items-center mt-10'>
                            <h2 className='text-xl font-medium'>Date</h2>
                            <p>{new Date(paymentInfo?.paidAt).toLocaleString().split(' ')[0]}</p>
                        </div>
                        <div className='divider'></div>
                        <div className='flex justify-between items-center mt-10'>
                            <h2 className='text-xl font-medium'>Payment Methode</h2>
                            <p>Card</p>
                        </div>
                        <div className='divider'></div>
                        <div className='flex justify-between items-center mt-10'>
                            <h2 className='text-xl font-medium'>Amount</h2>
                            <p className='text-base'><span className='text-2xl mr-1'>৳</span>{paymentInfo?.amount}</p>
                        </div>
                        <div className='divider'></div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RecieptModal;