import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {

    //states

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);


    // form submit function

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        // Main container Div
        <div className="w-full h-full flex flex-col justify-center items-center px-8">
            <form onSubmit={handleSubmit}>
                <div className="pt-6 text-center mb-8">
                    <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-[14px] font-normal text-slate-500 mt-1.5">
                        Sign in to your KindReach account to continue.
                    </p>
                </div>


                {/*Email Field container*/}
                <div className="mt-6">
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-[43.99px] px-3.5 text-[14px] bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                </div>


                {/*Password Field Container*/}

                <div className="mt-6">
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                        Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative w-[392.2px] h-[43.99px]">
                        <input type={showPassword ? "text" : "Password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-full px-3.5 pr-10 text-[14px] bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>


                    {/*Remember Me & Forgot Password Row Container */}

                    <div className="py-4">
                        <div className="mt-4.5 flex items-center justify-between ">
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded border border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                                />
                                <span className="text-[12px]  text-slate-600 font-normal">
                                    Remember Me
                                </span>
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                Forgot Password ?
                            </Link>
                        </div>
                    </div>
                </div>


                {/* Sign In Button */}
                <button
                    type="submit"
                    className="w-full h-[43.99px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[14px] rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                    Sign In to KindReach
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-[14px] text-slate-500 font-normal">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}