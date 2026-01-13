import React from 'react';
import { format } from 'date-fns';
import { FaBangladeshiTakaSign } from "react-icons/fa6";


const RecieptModal = ({ showReciept, paymentInfo }) => {

    return (
        <dialog ref={showReciept} className="modal">
            <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b bg-base-200 text-base-content">
                    <h2 className="text-lg font-semibold ">
                        Payment Receipt
                    </h2>
                    <p className="text-sm">
                        Transaction details
                    </p>
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-5 text-sm">

                    <div className="flex justify-between">
                        <span className="">Transaction ID</span>
                        <span className="font-medium text-gray-800">
                            {paymentInfo?.transectionId}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Date</span>
                        <span >
                            {paymentInfo?.paidAt
                                ? format(new Date(paymentInfo.paidAt), 'dd MMM yyyy')
                                : '--'}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span >Time</span>
                        <span >
                            {paymentInfo?.paidAt
                                ? format(new Date(paymentInfo.paidAt), 'hh:mm a')
                                : '--'}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span >Payment Method</span>
                        <span className="font-medium">
                            Card
                        </span>
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                        <span className="font-medium">
                            Total Amount
                        </span>
                        <span className="text-2xl font-semibold flex items-center gap-1">
                            <FaBangladeshiTakaSign />{paymentInfo?.amount}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-base-200 text-base-content flex justify-end">
                    <form method="dialog">
                        <button className="btn btn-sm rounded-full px-6">
                            Close
                        </button>
                    </form>
                </div>

            </div>
        </dialog>
    );
};

export default RecieptModal;
