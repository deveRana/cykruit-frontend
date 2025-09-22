"use client";

import React from 'react';

const ContactForm = () => {
    return (
        <div className="p-8 mx-auto w-full bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl text-slate-900 font-bold mb-8 text-center">Contact us</h2>
            <form className="space-y-6">
                <div>
                    <label className='text-sm text-slate-900 font-medium mb-2 block'>Name</label>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        className="w-full py-3 px-4 text-slate-800 bg-gray-50 border-2 border-gray-200 rounded-lg 
                       focus:border-[#0062FF] focus:bg-white text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div>
                    <label className='text-sm text-slate-900 font-medium mb-2 block'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        className="w-full py-3 px-4 text-slate-800 bg-gray-50 border-2 border-gray-200 rounded-lg 
                       focus:border-[#0062FF] focus:bg-white text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div>
                    <label className='text-sm text-slate-900 font-medium mb-2 block'>Subject</label>
                    <input
                        type='text'
                        placeholder='Enter Subject'
                        className="w-full py-3 px-4 text-slate-800 bg-gray-50 border-2 border-gray-200 rounded-lg 
                       focus:border-[#0062FF] focus:bg-white text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div>
                    <label className='text-sm text-slate-900 font-medium mb-2 block'>Message</label>
                    <textarea
                        placeholder='Enter Message'
                        rows={6}
                        className="w-full px-4 text-slate-800 bg-gray-50 border-2 border-gray-200 rounded-lg 
                       focus:border-[#0062FF] focus:bg-white text-sm pt-3 outline-none transition-all duration-200"
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className="text-white bg-[#0062FF] font-semibold hover:bg-blue-700 tracking-wide 
                     text-base px-6 py-3 w-full border-0 outline-none cursor-pointer rounded-lg 
                     transition-colors duration-200">
                    Send message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
