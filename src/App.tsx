import React, {useState, useEffect, useMemo} from 'react';
import data from './data.json';
import InvoiceDetails from './components/InvoiceDetails';
import {RiMoonFill} from 'react-icons/ri';
import {BsPlus, BsDot} from 'react-icons/bs';
import {BiChevronRight} from 'react-icons/bi';
import {invoiceInterface} from './Interfaces/InvoiceInterface';

function App() {

    const [invoices, setInvoices] = useState<invoiceInterface[]>([]);
    const [invoiceInfo, setInfo] = useState<object>();
    const [detailedView, setView] = useState<boolean>(false);
    const [status, setStatus] = useState<number>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        setInvoices(data);
        setStatus(invoices.length);
    }, [])

    const handleSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    }

    const handleFilters = () => {
        if (filter === 'Paid') {
            setStatus(invoices.filter((invoice : any) =>
                invoice.status === 'Paid').length);
            return invoices.filter((invoice : any) => invoice.status === 'Paid');
        }
        if (filter === 'Draft') {
            setStatus(invoices.filter((invoice : any) =>
                invoice.status === 'Draft').length);
            return invoices.filter((invoice: any) => invoice.status === 'Draft');
        }
        if (filter === 'Pending') {
            setStatus(invoices.filter((invoice : any) =>
                invoice.status === 'Pending').length);
            return invoices.filter((invoice: any) => invoice.status === 'Pending');
        }
        setStatus(invoices.length);
        return invoices;
    }

    let filtered = useMemo(handleFilters, [invoices, filter]);

    const handleDetailedView = (details : any) => {
        setInfo(details);
        setView(true);
    }

    return (
    <div className="w-full min-h-screen sm:grid sm:grid-cols-5">
        <div className="sm:w-1/3 w-full sm:h-full h-24 bg-slate-800 text-white sm:rounded-r-3xl sm:col-span-1 flex sm:flex-col flex-row">
            <div className="sm:w-full w-3/4 sm:h-5/6 sm:border-b border-gray-700 flex sm:flex-col">
                <div className="sm:h-1/6 h-full sm:w-full w-1/3 bg-gradient-to-b from-violet-800 to-violet-400 rounded-r-3xl flex items-center justify-center">
                    <img
                        className="sm:w-11 w-8 sm:h-11 h-8"
                        src={'assets/logo.svg'}
                        alt="logo"
                    />
                </div>
                <div className="sm:h-5/6 h-full sm:w-full w-2/3 flex sm:items-end sm:justify-center items-center sm:pb-6">
                    <RiMoonFill className="text-indigo-500 hover:text-indigo-400 sm:ml-0 sm:float-none ml-auto float-right text-2xl sm:mr-0 mr-6" />
                </div>
            </div>
            <div className="sm:w-full w-1/4 sm:h-1/6 h-full flex items-center justify-center sm:border-0 border-l border-gray-700">
                <img
                    className="sm:w-12 w-10 sm:h-12 h-10 rounded-full"
                    src={'assets/image-avatar.jpg'}
                    alt="avatar"
                />
            </div>
        </div>
        {detailedView ? <InvoiceDetails invoiceInfo={invoiceInfo} setView={setView} invoices={invoices} setInvoices={setInvoices} setInfo={setInfo} /> :
        <div className="col-span-4 sm:mt-24 mt-16">
            <div className="sm:w-3/4 w-full h-16 flex items-center sm:flex-row flex-col">
                <div className="w-1/5 text-4xl font-bold">
                    <h1>Invoices</h1>
                </div>
                <div className="w-4/5 flex sm:ml-auto sm:space-x-16 space-x-4 sm:mt-0 mt-4">
                    <select
                        name="status"
                        className="ml-auto font-bold"
                        onChange={handleSelect}
                    >
                        <option value="">Filter by status</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                    <button className="sm:p-2 p-1 bg-violet-600 text-white rounded-full flex flex-row items-center">
                        <BsPlus className="sm:w-8 w-10 sm:h-8 h-10 rounded-full bg-white text-violet-600 mr-4"/> New
                        Invoice
                    </button>
                </div>
            </div>
            <div className="text-gray-400 sm:mt-0 mt-12 sm:ml-0 ml-4">
                <p>
                    There are {status} total invoices
                </p>
            </div>
            <div className="sm:w-3/4 w-full mt-16 sm:flex justify-center items-center sm:flex-col sm:space-y-2 space-y-16">
                {invoices.length === 0 ? <div><img className="w-72 h-64 sm:ml-0 ml-12" src={'assets/illustration-empty.svg'} alt="illustration" />
                        <h1 className="text-center text-black font-bold text-2xl">There is nothing here</h1></div> :
                    filtered.map((details : any, index : number) => {
                        return (
                            <div className="w-full sm:h-16 h-36" key={index}>
                                <div className="w-full h-full sm:flex grid grid-cols-2 sm:flex-row items-center justify-center text-lg">
                                    <div className="sm:w-1/5 w-full flex justify-center">
                                        <p><span className="text-indigo-500">#</span>
                                            {details.id}
                                        </p>
                                    </div>
                                    <div className="sm:w-1/5 w-full flex justify-center">
                                        <p className="text-indigo-300">
                                            Due {details.paymentDue}
                                        </p>
                                    </div>
                                    <div className="sm:w-1/5 w-full flex justify-center">
                                        <p className="text-indigo-300">
                                            {details.clientName}
                                        </p>
                                    </div>
                                    <div className="sm:w-1/5 w-full flex justify-center">
                                        <p className="text-2xl font-bold">
                                            £{details.total}
                                        </p>
                                    </div>
                                    <div className={`sm:w-36 w-4/5 ml-auto mr-auto flex flex-row items-center justify-center rounded-md ${details.status === 'Paid' ? "bg-green-50 text-green-300" : null} 
                                    ${details.status === 'Pending' ? "bg-orange-50 text-orange-400" : null} ${details.status === 'Draft' ? "bg-gray-50 text-slate-800" : null}`}>
                                        <BsDot className="text-5xl" />
                                        <p>{details.status}</p>
                                    </div>
                                    <BiChevronRight onClick={e => handleDetailedView(details)} className="sm:w-16 w-full ml-2 text-3xl text-indigo-500" />
                                </div>
                            </div>
                        )
                        })}
                </div>
            </div>
        }
        </div>
  );
}

export default App;
