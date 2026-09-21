import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [activeBox, setActiveBox] = useState(0);

    return (
        <div className="w-full max-w-110 mx-auto px-6 pt-12 pb-12 flex flex-col items-center">

            {/* 1. Heading */}
            <h2 className="text-[24px] font-bold text-slate-900 text-center mb-6">
                Enter Verification Code
            </h2>

            {/* 2. Info Box Section */}
            <div className="w-full pt-7 flex justify-center">
                <div className="w-full max-w-[392.02px] bg-[#F0FDFA] border border-[#CBFBF1] rounded-2xl py-3.5 px-4 flex items-center gap-3">

                    {/* Icon Box */}
                    <div className="w-7.75 h-7.75 bg-[#F0FDFA] border border-[#CBFBF1] rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#009689]" />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col">
                        <h4 className="text-[13px] font-semibold text-[#005F5A]">
                            Code sent to your email
                        </h4>
                        <p className="text-[12px] text-[#009689]">
                            We sent a 6-digit OTP code to <span className="font-bold">user@example.com</span>
                        </p>
                    </div>

                </div>
            </div>

            {/* 3. 6 OTP Input Boxes Section */}
            <div className="w-full pt-6 flex justify-center">
                <div className="flex items-center gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index]}
                            onFocus={() => setActiveBox(index)}
                            onChange={(e) => {
                                const newOtp = [...otp];
                                newOtp[index] = e.target.value;
                                setOtp(newOtp);
                            }}
                            className={`w-13.75 h-13.75 text-center text-[20px] font-bold rounded-xl outline-none transition-all duration-200 ${otp[index] !== ''
                                ? 'bg-[#ECFDF5] border-2 border-primary text-primary' // Jab number likha ho
                                : activeBox === index
                                    ? 'bg-white border-2 border-primary text-slate-800'     // Jab sirf click/focus ho
                                    : 'bg-white border border-slate-200 text-slate-800'        // Normal unselected state
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* 4. Resend OTP Timer Section (12px top & bottom padding) */}
            <div className="w-full pt-3 pb-6 flex justify-center items-center">
                <p className="text-[14px] text-slate-600">
                    Resend OTP in <span className="font-bold text-slate-900">00:56</span>
                </p>
            </div>

            {/* 5. Buttons Section */}
            <div className="w-full max-w-[392.02px] flex flex-col pt-2">
                
                {/* Verify & Continue Button */}
                <button className="w-full h-12 bg-[#009689] hover:bg-[#007F75] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center">
                    Verify & Continue
                </button>

                {/* Back Button (with 12px top gap) */}
                <div className="w-full pt-3">
                    <Link 
                        to="/forgot-password" 
                        className="w-full h-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>

            </div>

        </div>
    );
}