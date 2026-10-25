import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../../services/authService';

export default function SignUp() {
    // State to toggle between 'donor' and 'needy'
    const [userType, setUserType] = useState('donor'); // 'donor' or 'needy'

    // Password show/hide toggle states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form inputs state
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

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 1. Basic required validations
        if (!formData.fullName.trim()) {
            setError('Full Name is required');
            return;
        }

        if (!formData.email.trim()) {
            setError('Email address is required');
            return;
        }

        // 2. Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // 3. Minimum password length validation
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // 4. Terms agreement check (Required for Donor)
        if (userType === 'donor' && !formData.agreeTerms) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);

        try {
            // Prepare payload for backend (Backend only needs single password)
            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.city || '',
                role: userType === 'donor' ? 'Donor' : 'Needy',
                cnic: formData.cnic || null,
                incomeStatus: formData.monthlyIncome || null,
            };

            const result = await registerUser(payload);

            if (result.status === 'success') {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
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

            {/* Header Title based on selected Role */}
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

            {/* Needy Verification Notice Box */}
            {userType === 'needy' && (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3.5 rounded-xl mb-4 text-[13px] text-[#166534]">
                    Your details will be verified by our Admin team before account activation — typically 1-2 business days.
                </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

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

                {/* CNIC (Needy) OR Email & Phone (Donor) */}
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
                                autoComplete="email"
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

                {/* Mandatory Email Address Field for Needy */}
                {userType === 'needy' && (
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="fatima@email.com"
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

                {/* Monthly Income Level (Needy only) */}
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

                {/* Password and Confirm Password Grid for ALL users */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
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

                    {/* Confirm Password Field */}
                    <div className="flex flex-col">
                        <label className="text-[14px] font-medium text-slate-900 mb-1.5">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                autoComplete="new-password"
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

                {/* Terms Checkbox (Donor only) */}
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

                {/* Error Display Alert */}
                {error && (
                    <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl">
                        {error}
                    </div>
                )}

                {/* Submit Action Button */}
                <div className="mt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#009689] hover:bg-[#007F75] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer disabled:opacity-50"
                    >
                        {loading
                            ? 'Please wait...'
                            : userType === 'donor'
                                ? 'Create Donor Account'
                                : 'Submit Registration Application'}
                    </button>
                </div>

                {/* Footer Link to Login */}
                <div className="text-center mt-2">
                    <p className="text-[14px] text-text-muted">
                        Already have an account? <Link to="/login" className="text-[#009689] font-medium hover:underline">Sign In</Link>
                    </p>
                </div>

            </form>
        </div>
    );
}