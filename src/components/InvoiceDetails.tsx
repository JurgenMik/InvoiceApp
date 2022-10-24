import React from 'react';
import {BiChevronLeft} from 'react-icons/bi';
import {BsDot} from 'react-icons/bs';

function InvoiceDetails({setView, setInvoices, invoiceInfo, invoices} : any) {

    const handleBack = () => {
        setView(false);
    }

    const handleDelete = () => {
        setInvoices((prev : any) => invoices.filter((invoice : any ) => invoice.id !== invoiceInfo.id));
        setView(false);
    }

    return (
        <div className="col-span-4 sm:mt-16 mt-8">
            <div className="flex flex-row sm:justify-start justify-center space-x-8">
                <BiChevronLeft
                    className="text-2xl font-bold text-indigo-500"
                    onClick={handleBack}
                />
                <h1 className="text-lg">Go Back</h1>
            </div>
            <div className="sm:w-3/4 w-full mt-6 h-24 sm:flex block flex-row items-center shadow-md">
                <div className="sm:w-2/3 h-full ml-4 text-indigo-300 flex flex-row items-center">
                    <h1>Status</h1>
                    <div className={`sm:w-1/6 w-1/2 ml-4 flex flex-row items-center justify-center rounded-md ${invoiceInfo.status === 'Paid' ? "bg-green-50 text-green-300" : null} 
                                    ${invoiceInfo.status === 'Pending' ? "bg-orange-50 text-orange-400" : null} ${invoiceInfo.status === 'Draft' ? "bg-gray-50 text-slate-800" : null}`}>
                        <BsDot className="text-5xl" />
                        <p>{invoiceInfo.status}</p>
                    </div>
                </div>
                <div className="sm:w-1/3 w-2/3 sm:space-x-4 space-x-2 inline sm:space-y-0 space-y-4 sm:ml-0 ml-2">
                    <button className="text-indigo-500">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="p-3 pl-6 pr-6 text-white rounded-full bg-red-500">
                        Delete
                    </button>
                    {invoiceInfo.status !== 'Paid' ?
                    <button className="p-3 pr-4 pl-4 text-white rounded-full bg-violet-700">
                        Mark as Paid
                    </button>
                    : null}
                </div>
            </div>
            <div className="sm:w-3/4 w-full h-1/2 sm:mt-12 mt-24">
                <div className="w-full h-1/5 sm:flex">
                    <div className="sm:w-1/3 sm:flex sm:flex-col inline">
                        <p className="text-2xl font-bold"><span className="text-indigo-300">#</span>
                            {invoiceInfo.id}
                        </p>
                        <h1 className="text-indigo-300">
                            {invoiceInfo.description}
                        </h1>
                    </div>
                    <div className="sm:w-2/3 flex flex-col text-indigo-300 sm:items-end sm:mt-0 mt-6 sm:mb-0 mb-6">
                        <p>
                            {invoiceInfo.senderAddress.street}
                        </p>
                        <p>
                            {invoiceInfo.senderAddress.city}
                        </p>
                        <p>
                            {invoiceInfo.senderAddress.postCode}
                        </p>
                        <p>
                            {invoiceInfo.senderAddress.country}
                        </p>
                    </div>
                </div>
                <div className="w-full grid sm:grid-cols-3 grid-cols-2 h-2/5">
                    <div className="col-span-1">
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-indigo-300">
                                Invoice Date
                            </h1>
                            <p className="text-xl font-bold">
                                {invoiceInfo.createdAt}
                            </p>
                            <h1 className="text-indigo-300">
                                Payment Due
                            </h1>
                            <p className="text-xl font-bold">
                                {invoiceInfo.paymentDue}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col text-indigo-300 space-y-1">
                            <h1>Bill To</h1>
                            <p className="text-xl text-black font-bold">
                                {invoiceInfo.clientName}
                            </p>
                            <p>
                                {invoiceInfo.clientAddress.street}
                            </p>
                            <p>
                                {invoiceInfo.clientAddress.city}
                            </p>
                            <p>
                                {invoiceInfo.clientAddress.postCode}
                            </p>
                            <p>
                                {invoiceInfo.clientAddress.country}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col">
                            <h1 className="text-indigo-300">
                                Sent To
                            </h1>
                            <p className="text-xl font-bold">
                                {invoiceInfo.clientEmail}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-11/12 h-1/3 ml-auto mr-auto mt-10">
                    <table className="w-full text-center text-lg text-black justify-center">
                        <thead className="text-indigo-300">
                        <tr>
                            <th className="w-1/4">Item</th>
                            <th className="w-1/4">QTY.</th>
                            <th className="w-1/4">Price</th>
                            <th className="w-1/4">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoiceInfo.items.map((item : any,  index : number) => {
                            return (
                                <tr key={index}>
                                    <td className="font-bold">
                                        {item.name}
                                    </td>
                                    <td className="text-indigo-300">
                                        {item.quantity}
                                    </td>
                                    <td className="text-indigo-300 font-bold">
                                        £{item.price}
                                    </td>
                                    <td className="font-bold">
                                        £{item.total}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-28 bg-slate-800 rounded-b-lg flex text-white sm:mt-0 mt-16">
                    <div className="sm:w-3/4 w-1/2 h-full flex items-center sm:ml-16 ml-8">
                        <h1>Amount Due</h1>
                    </div>
                    <div className="w-1/4 h-full flex items-center text-4xl">
                        <h1>£{invoiceInfo.total}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails;