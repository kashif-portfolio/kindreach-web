import React from "react"
import { Outlet } from "react-router-dom"
import logowhite from '../assets/logoWhite.svg'
import handsBg from '../assets/hands-together.jpg'
import { ShieldCheck, Handshake, Lock } from 'lucide-react';

export default function AuthLayout() {

    return (
        //Parent Div
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">

            {/* Left colum Branding Banner*/}
            <div className="relative md:w-1/2 p-6 md:p-8 text-white flex flex-col justify-between overflow-hidden bg-emerald-900 ">
                <div className="absolute inset-0 z-0" >
                    <img src={handsBg} alt="Background"
                        className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-950/90 via-emerald-900/80 to-emerald-800/80 backdrop-blur-[2px]"></div>
                </div>
                {/*Top logo*/}
                <div className="relative z-10">
                    <img src={logowhite} alt="Logo" className="h-16 w-auto object-contain" />
                </div>
                {/*Center Content*/}
                <div className="relative z-10 my-4 max-w-lg">
                    <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-3 block">Giving With Purpose</span>
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
                        Transparent Giving, <br />
                        Direct Impact.
                    </h1>
                    <p className="text-emerald-100 text-xs md:text-base mb-8 leading-relaxed">
                        KindReach connects compassionate donors with verified needy persons — ensuring every contribution reaches those who need it most.
                    </p>
                </div>
                {/*featured card*/}
                <div className="space-y-3">

                    {/*Card1*/}
                    <div className="flex items-center gap-4 bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-200" >
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xs text-white">100% Verified Needy</h4>
                            <p className="text-xs text-emerald-200">Every applicant is reviewed by our admin team</p>
                        </div>
                    </div>

                    {/*Card-2*/}
                    <div className="flex items-center gap-4 bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-200" >
                            <Handshake className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xs text-white">Direct Aid</h4>
                            <p className="text-xs text-emerald-200">Donations reach recipients without middlemen</p>
                        </div>
                    </div>

                    {/*Card-3*/}
                    <div className="flex items-center gap-4 bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-200" >
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xs text-white">Secure Platform</h4>
                            <p className="text-xs text-emerald-200">End-to-end encrypted · GDPR-compliant</p>
                        </div>
                    </div>

                </div>

                {/*Footer*/}
                <div className="relative z-10 text-xs mt-8 text-emerald-300">
                    © {new Date().getFullYear()} KindReach · All rights reserved
                </div>
            </div>

            {/* RIGHT COLUMN (Form Area via Outlet)*/}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}