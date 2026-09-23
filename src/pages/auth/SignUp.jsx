import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
    // State to toggle between 'donor' and 'needy'
    const [userType, setUserType] = useState('donor'); // 'donor' or 'needy'

    // Password show/hide states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        cnic: '',
        city: '',
        monthlyIncome: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="w-full max-w-110 mx-auto px-6 py-10 flex flex-col">

            {/* Role Switcher Tabs (Donor vs Needy) */}
            <div className="flex bg-[#F1F5F9] p-1 rounded-xl mb-4">
                <button
                    type="button"
                    onClick={() => setUserType('donor')}
                    className={`flex-1 py-2.5 text-[14px] font-medium rounded-lg transition-all ${userType === 'donor'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-text-muted hover:text-slate-900'
                        }`}
                >
                    Join as a Donor
                </button>
                <button
                    type="button"
                    onClick={() => setUserType('needy')}
                    className={`flex-1 py-2.5 text-[14px] font-medium rounded-lg transition-all ${userType === 'needy'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-text-muted hover:text-slate-900'
                        }`}
                >
                    Apply for Aid
                </button>
            </div>

            {/* Header / Title based on Role */}
            <div className="text-center mb-4">
                <h2 className="text-[24px] font-bold text-slate-900">
                    {userType === 'donor' ? 'Join as a Donor' : 'Apply for Aid'}
                </h2>
                <p className="text-[14px] text-text-muted mt-1">
                    {userType === 'donor'
                        ? 'Start making a real difference today. Your generosity changes lives.'
                        : 'Register as a Needy Person to request donations and community support.'}
                </p>
            </div>

            {/* Needy Verification Notice Box (Figma ke mutabiq) */}
            {userType === 'needy' && (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3.5 rounded-xl mb-4 text-[13px] text-[#166534]">
                    Your details will be verified by our Admin team before account activation — typically 1-2 business days.
                </div>
            )}

            {/* Form Fields */}
            <div className="w-full flex flex-col gap-4">

                {/* Full Name */}
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={userType === 'donor' ? "Ahmed Khan" : "Fatima Bibi"}
                        className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                    />
                </div>

                {/* CNIC (Only for Needy) OR Email/Phone Grid */}
                {userType === 'needy' ? (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                CNIC / ID Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                placeholder="35202-1234567-1"
                                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+92 300 000 0000"
                                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ahmed@email.com"
                                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+92 300 000 0000"
                                className="w-full h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Email for Needy (Optional) */}
                {userType === 'needy' && (
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Email Address <span className="text-xs text-text-muted font-normal">(optional)</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="fatima@email.com (optional)"
                            className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                        />
                    </div>
                )}

                {/* City / Location */}
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                        {userType === 'donor' ? 'City / Location' : 'City / Address'} <span className="text-red-500">*</span>
                    </label>
                    {userType === 'donor' ? (
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-[#009689] transition-all"
                        >
                            <option value="">Select...</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                        </select>
                    ) : (
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="DHA Phase 2, Karachi, Sindh"
                            className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                        />
                    )}
                </div>

                {/* Monthly Income Level (Only for Needy) */}
                {userType === 'needy' && (
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Monthly Income Level <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="monthlyIncome"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-[#009689] transition-all"
                        >
                            <option value="">Select...</option>
                            <option value="Below 20,000">Below 20,000 PKR</option>
                            <option value="20,000 - 40,000">20,000 - 40,000 PKR</option>
                        </select>
                    </div>
                )}

                {/* Password & Confirm Password (Donor has both, Needy has single password in design) */}
                {userType === 'donor' ? (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 chars"
                                    className="w-full h-10 px-3 pr-9 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter"
                                    className="w-full h-10 px-3 pr-9 bg-white border border-[#CBD5E1] rounded-xl text-[13px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min. 6 characters"
                                className="w-full h-10 px-4 pr-12 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Terms Checkbox (Only for Donor) */}
                {userType === 'donor' && (
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="w-4 h-4 accent-[#009689] rounded"
                        />
                        <span className="text-[13px] text-text-muted">
                            I agree to the <span className="text-[#009689] font-medium">Terms of Service</span> and <span className="text-[#009689] font-medium">Privacy Policy</span>
                        </span>
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-2">
                    <button
                        type="button"
                        className="w-full h-11 bg-[#009689] hover:bg-[#007F75] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center"
                    >
                        {userType === 'donor' ? 'Create Donor Account' : 'Submit Registration Application'}
                    </button>
                </div>

                {/* Already have an account */}
                <div className="text-center mt-2">
                    <p className="text-[14px] text-text-muted">
                        Already have an account? <Link to="/login" className="text-[#009689] font-medium hover:underline">Sign In</Link>
                    </p>
                </div>

            </div>

        </div>
    );
}