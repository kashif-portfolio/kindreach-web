import React from 'react';
import { Outlet } from 'react-router-dom';
import logoWhite from '../assets/logo-white.png'; // Make sure file name in src/assets matches

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA]">
      {/* Left Column - Branding Banner */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#059669] to-[#0D9488] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Top Logo */}
        <div className="relative z-10">
          <img src={logoWhite} alt="KindReach Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Center Tagline & Details */}
        <div className="relative z-10 my-12 md:my-0 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Transparent Giving, <br />
            Direct Impact.
          </h1>
          <p className="text-emerald-50 text-base md:text-lg mb-8 leading-relaxed">
            Connecting donors directly with verified families in need with total transparency.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                100%
              </div>
              <div>
                <h4 className="font-semibold text-sm">Verified Needs</h4>
                <p className="text-xs text-emerald-100">Every case is thoroughly audited before listed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Text */}
        <div className="relative z-10 text-xs text-emerald-100">
          © {new Date().getFullYear()} KindReach. All rights reserved.
        </div>
      </div>

      {/* Right Column - Dynamic Form Render */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Active child route component will render inside this Outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}