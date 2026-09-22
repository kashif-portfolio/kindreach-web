import React from "react";
import { Link } from 'react-router-dom';
import { Check } from "lucide-react";

export default function PasswordSuccess() {
    return (
        <div className="w-full max-w-110 mx-auto px-6 py-20 flex flex-col items-center text-center">

            <div className="w-20 h-20 bg-[#009689] rounded-full flex items-center justify-center text-white mb-6 shadow-sm">
                <Check className="w-9 h-9 stroke-3" />
            </div>

            <h2 className="text-[26px] font-bold text-slate-900 mb-2 ">
                Password Reset!
            </h2>

            <p className="text-[14px] text-text-muted mb-8 max-w-85">
                Your password has been successfully reset. You can now sign in with your new password.
            </p>

            <div className="w-full max-w-[392.02px]">
                <Link
                    to="/login"
                    className="w-full h-12 bg-[#009689] hover:bg-[#007F75] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center"
                >
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
}