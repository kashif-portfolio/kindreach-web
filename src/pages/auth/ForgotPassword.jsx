import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"


export default function ForgotPassword() {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefualt();
        //form submit logic here 
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center px-8">
            <div className="w-full height-[440px]">
                {/* Header section */}
                <div className="mt-6 text-center">
                    <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
                        Reset Password
                    </h2>

                    <p className="text-[14px] font-normal text-slate-500 mt-1.5">
                        Enter your registered email address to receive a 6-digit verification code.
                    </p>
                </div>

                <div className="mt-7 space-y-5 mb-5">

                    {/* Email field section */}

                    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-[43.99px] px-3.5 text-[14px] bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-[#009689] transition-all"
                    >
                    </input>
                </div>

                {/* Send OTP Button */}
                <button
                    type="submit"
                    className="w-full h-[43.99px] bg-[#009689] hover:bg-[#007F75] text-white font-semibold text-[14px] rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                    Send OTP Code
                </button>

                {/* Back to Login Button */}
                <Link
                    to="/login"
                    className="w-full h-[43.99px] bg-white hover:bg-slate-50 text-slate-700  border border-slate-200 font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>


                <div className="mt-8">

                    <div className="w-full max-w-[392.04px] bg-[#edf4fc] border border-slate-200 rounded-2xl px-5 py-4">

                        <h4 className="text-[14px] font-semibold text-slate-900">
                            How it works
                        </h4>

                        {/* Steps List */}
                        <div className="space-y-2">

                            {/* Step-1 */}

                            <div className="flex items-start pt-2">
                                <span className="w-5 h-5 rounded-full bg-[#D0FAE5] text-emerald-800 flex items-center justify-center text-[11px] font-bold shrink-0 pt-0.5">
                                    1
                                </span>

                                <span className="text-[13px] text-slate-600 ml-2.5">
                                    Enter your registered email address.
                                </span>
                            </div>

                            {/* Step-2 */}

                            <div className="flex items-start pt-2">
                                <span className="w-5 h-5 rounded-full bg-[#D0FAE5] text-emerald-800 flex items-center justify-center text-[11px] font-bold shrink-0 pt-0.5">
                                    2
                                </span>

                                <span className="text-[13px] text-slate-600 ml-2.5">
                                    We'll send a 6-digit OTP code to your inbox.
                                </span>
                            </div>

                            {/* Step-3 */}

                            <div className="flex items-start pt-2">
                                <span className="w-5 h-5 rounded-full bg-[#D0FAE5] text-emerald-800 flex items-center justify-center text-[11px] font-bold shrink-0 pt-0.5">
                                    3
                                </span>

                                <span className="text-[13px] text-slate-600 ml-2.5">
                                    Verify the code and set your new password.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}