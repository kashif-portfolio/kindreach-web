import React from 'react';

export default function RequestHelp() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Breadcrumb & Header */}
            <div>
                <p className="text-xs text-slate-400 mb-1">Home / Request Help</p>
                <h1 className="text-xl font-bold text-slate-800">Request Help</h1>
                <p className="text-sm text-slate-500">Request a specific item or financial assistance</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Help Type *</label>
                        <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-500 bg-white focus:outline-none focus:border-[#009689]">
                            <option>Select...</option>
                            <option>Finacial Aid</option>
                            <option>Food Items</option>
                            <option>Clohes</option>
                            <option>Old Household Items</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">What do you need? *</label>
                        <textarea
                            rows={3}
                            placeholder="Explain what is needed and how it will support your household."
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity / Requested Amount *</label>
                            <input
                                type="text"
                                placeholder="e.g. PKR 5,000 or 2 food packs"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location *</label>
                            <input
                                type="text"
                                placeholder="Karachi"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency *</label>
                            <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-500 bg-white focus:outline-none focus:border-[#009689]">
                                <option>Select...</option>
                                <option>Normal - within 7 days</option>
                                <option>Priority - within 3 days</option>
                                <option>Urgent - within 24 Hours</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Donor (Optional)</label>
                            <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-500 bg-white focus:outline-none focus:border-[#009689]">
                                <option>Select...</option>
                                <option>Any Suitable Donor</option>
                                <option>Ahmad Khan - Lahore</option>
                                <option>Sara Khan - Karachi</option>
                                <option>Usman Ali - Islambad</option>

                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Supporting Document (Optional)</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                                <div className="flex flex-col items-center justify-center pt-3 pb-3 px-4 text-center">
                                    <svg className="w-6 h-6 mb-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="text-xs text-slate-500 font-medium">
                                        <span className="text-[#009689]">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">PDF, PNG, JPG or DOC (MAX. 10MB)</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#009689] text-white rounded-lg text-sm font-medium hover:bg-[#00796b] transition-all"
                        >
                            Submit Help Request
                        </button>
                    </div>
                </div>

                {/* Right Info Card: How matching works */}
                <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm h-fit space-y-4">
                    <h3 className="text-sm font-bold text-slate-800">How matching works</h3>
                    <ol className="space-y-3.5 text-xs text-slate-600">
                        <li className="flex gap-3 items-start">
                            <span className="font-semibold text-slate-700">1</span>
                            <span>Your verified profile is attached securely.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="font-semibold text-slate-700">2</span>
                            <span>HopeFlow compares type, city, urgency, and availability.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="font-semibold text-slate-700">3</span>
                            <span>Admin or a suitable donor reviews the request.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="font-semibold text-slate-700">4</span>
                            <span>You receive a notification when the status changes.</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}