import React, {useState, useEffect} from 'react';
import {invoiceInterface} from '../Interfaces/InvoiceInterface'
import {MdDelete} from 'react-icons/md';

function CreateInvoice({invoices, setInvoices, setCreate} : any) {

    const [newInvoice, setInvoice] = useState<invoiceInterface>({
        id : 'XXNEW' + (Math.floor(Math.random() * 300)).toString(),
        createdAt: '',
        paymentDue: '',
        description: '',
        paymentTerms: '',
        clientName: '',
        clientEmail: '',
        status: 'Pending',
        senderAddress: {street: '', city: '', postCode: '', country: ''},
        clientAddress: {street: '', city: '', postCode: '', country: ''},
        items: [],
        total: 0
    });
    const [itemList, setItems] = useState<object[]>([]);

    useEffect(() => {
        if (newInvoice.total !== 0) {
            handleSaveInvoice();
        }
    }, [newInvoice.total])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInvoice({...newInvoice, [e.target.name] : e.target.value});
    }

    const handleSenderChange = (e : React.ChangeEvent<HTMLInputElement>) => {
       setInvoice({...newInvoice, senderAddress : {...newInvoice.senderAddress, [e.target.name] : e.target.value}});
    }

    const handleClientChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInvoice({...newInvoice, clientAddress : {...newInvoice.clientAddress, [e.target.name] : e.target.value}});
    }

    const handleSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setInvoice({...newInvoice, paymentTerms : e.target.value});
    }

    const handleNewItem = () => {
        setItems(itemList.concat({name: '', quantity : 0, price : 0, total : 0}));
    }

    const handleItemChange = (e : React.ChangeEvent<HTMLInputElement>, index : number) => {
        const name  = e.target.name;
        let newArr : any = [...itemList];

        newArr[index][name] = e.target.valueAsNumber || e.target.value;
        setItems(newArr);

        setInvoice({...newInvoice, items : itemList});
    }

    const handleDeleteItem = (e : React.MouseEvent<HTMLOrSVGElement>, item : any) => {
        let updatedItems = itemList.filter((invoiceItem : any) => invoiceItem.name !== item.name);

        setItems((prev : any) => updatedItems);

        setInvoice({...newInvoice, items : updatedItems});
    }

    const handleTotalPrice = () => {
      let itemsTotal  = newInvoice.items.reduce((previousTotal : number, itemTotal : any) => previousTotal + itemTotal.total, 0);

      setInvoice({...newInvoice, total : itemsTotal});
    }

    const handleSaveInvoice = () => {
       setInvoices(invoices.concat(newInvoice));
       setCreate(false);
    }

    return (
        <div className="sm:w-1/3 w-full absolute min-h-screen bg-white z-30 sm:left-28 left-0 rounded-r-2xl shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-1/2 h-28 flex items-center justify-center">
                <h1 className="text-3xl font-bold">New Invoice</h1>
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
                        placeholder="Address..."
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
                                placeholder="Post Code..."
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
                                placeholder="Country..."
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
                            placeholder="Name..."
                            onChange={handleChange}
                        />
                        <label className="text-indigo-300">
                            Client's Email
                        </label>
                        <input
                            name="clientEmail"
                            type="email"
                            className="p-2 w-full border border-gray-300 rounded-md mt-2 mb-2"
                            placeholder="Email..."
                            onChange={handleChange}
                        />
                        <label className="text-indigo-300">
                            Street Address
                        </label>
                        <input
                            name="street"
                            type="text"
                            className="p-2 w-full border border-gray-300 rounded-md mt-2"
                            placeholder="Address..."
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
                                placeholder="City..."
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
                                placeholder="Post Code..."
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
                                placeholder="Country..."
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
                                placeholder="City..."
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
                        placeholder="Name..."
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
                {itemList.map((item : any, index : number) => {
                    return (
                        <div className="w-full flex flex-row space-x-3" key={index}>
                            <input
                                name="name"
                                type="text"
                                className="p-2 w-4/5 border border-gray-300 rounded-md mt-2 mb-2"
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="quantity"
                                type="number"
                                className="p-2 w-1/3 border border-gray-300 rounded-md mt-2 mb-2"
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="price"
                                type="number"
                                className="p-2 w-1/2 border border-gray-300 rounded-md mt-2 mb-2"
                                onChange={e => handleItemChange(e, index)}
                            />
                            <input
                                name="total"
                                type="number"
                                className="p-2 w-1/2 border border-gray-300 rounded-md mt-2 mb-2"
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
                    <button onClick={handleTotalPrice} className="float-right mb-6 p-3 pr-4 pl-4 rounded-full text-white bg-violet-700">
                        Save & Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateInvoice;