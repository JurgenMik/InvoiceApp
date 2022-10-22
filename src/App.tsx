import React from 'react';
import {RiMoonFill} from 'react-icons/ri';

function App() {

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
                    <RiMoonFill className="text-indigo-500 sm:ml-0 sm:float-none ml-auto float-right text-2xl sm:mr-0 mr-6" />
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
        <div className="col-span-4 mt-8">

        </div>
    </div>
  );
}

export default App;
