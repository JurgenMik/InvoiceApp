import React, {useState, useEffect} from 'react';
import { MdDelete } from 'react-icons/md';

function EditInvoice({invoiceInfo, invoices, setInfo, setEdit, setInvoices} : any) {

    useEffect(() => {
        handleTotalPrice();
    }, [invoiceInfo.items])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInfo({...invoiceInfo, [e.target.name] : e.target.value});
    }

    const handleSenderChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInfo({...invoiceInfo, senderAddress : {...invoiceInfo.senderAddress, [e.target.name] : e.target.value}});
    }

    const handleClientChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInfo({...invoiceInfo, clientAddress : {...invoiceInfo.clientAddress, [e.target.name] : e.target.value}});
    }

    const handleSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setInfo({...invoiceInfo, paymentTerms : e.target.value});
    }

    const handleNewItem = () => {
        const items = [...invoiceInfo.items];
        let editedItems = items.concat({name: '', quantity : '', price : '', total : ''});

        setInfo({...invoiceInfo, items : editedItems});
    }

    const handleItemChange = (e : React.ChangeEvent<HTMLInputElement>, index : number) => {
        const name = e.target.name;
        let newArr : any = [...invoiceInfo.items];

        newArr[index][name] = e.target.valueAsNumber || e.target.value;
        setInfo({...invoiceInfo, items : newArr});
    }

    const handleTotalPrice = () => {
        let itemsTotal  = invoiceInfo.items.reduce((previousTotal : number, itemTotal : any) => previousTotal + itemTotal.total, 0);

        setInfo({...invoiceInfo, total : itemsTotal});
    }

    const handleDeleteItem = (e : React.MouseEvent<HTMLOrSVGElement>, item : any) => {
        let updatedItems = invoiceInfo.items.filter((invoiceItem : any) => invoiceItem.name !== item.name);

        setInfo({...invoiceInfo, items : updatedItems});
    }

    const handleSave = () => {
        setInvoices(invoices.filter((invoice : any) => invoice.id !== invoiceInfo.id).concat(invoiceInfo));
        setEdit(false);
    }

    return (
        <div className="sm:w-1/3 w-full absolute min-h-screen bg-white z-30 sm:left-28 left-0 sm:top-0 top-24 rounded-r-2xl shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-1/2 h-28 flex items-center justify-center">
                <h1 className="text-3xl font-bold">Edit Invoice</h1>
            </div>
            <div className="w-3/4 ml-auto mr-auto">
                <h1 className="text-violet-600">Bill From</h1>
                <div className="w-full mt-2">
                    <label className="text-indigo-300">
                        Street Address
                    </label>
                    <input
                        name="street"
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded-md"
                        value={invoiceInfo.senderAddress.street}
                        onChange={handleSenderChange}
                    />
                    <div className="flex flex-row mt-4 space-x-6">
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                City
                            </label>
                            <input
                                name="city"
                                type="text"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                placeholder="City..."
                                value={invoiceInfo.senderAddress.city}
                                onChange={handleSenderChange}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Post Code
                            </label>
                            <input
                                name="postCode"
                                type="text"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={invoiceInfo.senderAddress.postCode}
                                onChange={handleSenderChange}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={invoiceInfo.senderAddress.country}
                                onChange={handleSenderChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <h1 className="text-violet-600">Bill To</h1>
                    <div className="mt-2">
                        <label className="text-indigo-300">
                            Client's Name
                        </label>
                        <input
                            name="clientName"
                            type="text"
                            className="p-2 w-full border border-gray-300 rounded-md mt-2 mb-2"
                            value={invoiceInfo.clientName}
                            onChange={handleChange}
                        />
                        <label className="text-indigo-300">
                            Client's Email
                        </label>
                        <input
                            name="clientEmail"
                            type="email"
                            className="p-2 w-full border border-gray-300 rounded-md mt-2 mb-2"
                            value={invoiceInfo.clientEmail}
                            onChange={handleChange}
                        />
                        <label className="text-indigo-300">
                            Street Address
                        </label>
                        <input
                            name="street"
                            type="text"
                            className="p-2 w-full border border-gray-300 rounded-md mt-2"
                            value={invoiceInfo.clientAddress.street}
                            onChange={handleClientChange}
                        />
                    </div>
                    <div className="flex flex-row mt-4 space-x-6">
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                City
                            </label>
                            <input
                                name="city"
                                type="text"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={invoiceInfo.clientAddress.city}
                                onChange={handleClientChange}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Post Code
                            </label>
                            <input
                                name="postCode"
                                type="text"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={invoiceInfo.clientAddress.postCode}
                                onChange={handleClientChange}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Country
                            </label>
                            <input
                                name="country"
                                type="text"
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={invoiceInfo.clientAddress.country}
                                onChange={handleClientChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 space-x-6">
                        <div className="w-1/2 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Invoice Date
                            </label>
                            <input
                                name="createdAt"
                                type="date"
                                className="p-2 w-full border border-gray-300 rounded-md mb-2"
                                value={invoiceInfo.createdAt}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/2 flex flex-col">
                            <label className="text-indigo-300 flex-col">
                                Payment Terms
                            </label>
                            <select
                                name="paymentTerms"
                                className="p-2 w-full border border-gray-300 rounded-md mb-2"
                                value={invoiceInfo.paymentTerms}
                                onChange={handleSelect}
                            >
                                <option value={0}>Payment Terms</option>
                                <option value={7}>7 days</option>
                                <option value={30}>30 days</option>
                                <option value={1}>1 day</option>
                            </select>
                        </div>
                    </div>
                    <label className="text-indigo-300">
                        Project Description
                    </label>
                    <input
                        name="description"
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded-md mt-2 mb-2"
                        value={invoiceInfo.description}
                        onChange={handleChange}
                    />
                </div>
                <h1 className="text-xl text-gray-500">
                    Item List
                </h1>
                <div className="w-full flex flex-row text-indigo-300 sm:space-x-20 space-x-8 mt-6">
                    <h1>Item Name</h1>
                    <h1>Qty.</h1>
                    <h1>Price</h1>
                    <h1>Total</h1>
                </div>
                {invoiceInfo.items.map((item : any, index : number) => {
                    return (
                        <div className="w-full flex flex-row space-x-3" key={index}>
                            <input
                                name="name"
                                type="text"
                                className="p-2 w-4/5 border border-gray-300 rounded-md mt-2 mb-2"
                                value={item.name}
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="quantity"
                                type="number"
                                className="p-2 w-1/3 border border-gray-300 rounded-md mt-2 mb-2"
                                value={item.quantity}
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="price"
                                type="number"
                                className="p-2 w-1/2 border border-gray-300 rounded-md mt-2 mb-2"
                                value={item.price}
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="total"
                                type="number"
                                className="p-2 w-1/2 border border-gray-300 rounded-md mt-2 mb-2"
                                value={item.total}
                                onChange={e => handleItemChange(e, index)}
                            />
                            <MdDelete onClick={e => handleDeleteItem(e, item)} className="text-6xl text-gray-500" />
                        </div>
                    )
                })}
                <div onClick={handleNewItem} className="w-full flex justify-center mt-6 text-indigo-500 font-bold">
                    + Add New Item
                </div>
                <div className="mt-6">
                    <button onClick={handleSave} className="float-right mb-6 p-3 pr-4 pl-4 rounded-full text-white bg-violet-700">
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditInvoice;