import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  Package,
  Users,
  Search,
  PlusCircle,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logoGreen from "../assets/logo-green.png";
import homeHero from "../assets/home-hero.png";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Search submit aur signup page
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoGreen}
              alt="KindReach Logo"
               className="h-24 w-auto object-contain"
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center flex-1 max-w-xs mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search donations, causes..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#about-us" className="hover:text-emerald-600 transition">
              About Us
            </a>
            <a href="#services" className="hover:text-emerald-600 transition">
              Our Services
            </a>
            <a href="#donations" className="hover:text-emerald-600 transition">
              Donations
            </a>
            <a href="#contact-us" className="hover:text-emerald-600 transition">
              Contact Us
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CS619 Final Year Project</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Charity Management System for{" "}
                  <span className="text-emerald-600">
                    Donation & Request Handling
                  </span>
                </h1>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  KindReach is a transparent platform designed to connect
                  generous donors directly with verified needy persons. By
                  eliminating traditional middlemen, we ensure efficient
                  request processing, direct item allocation, and staff
                  verification.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/signup"
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Register New Account
                  </Link>
                  <a
                    href="#about-us"
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-2 border border-slate-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Hero image */}
              <div className="lg:col-span-5">
                <img
                  src={homeHero}
                  alt="KindReach Charity Support"
                  className="w-full h-95 object-cover rounded-2xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about-us" className="py-16 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
              About System
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Transparent & Accountable Charity
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Our platform bridges the gap between underprivileged applicants
              and willing donors. Every request undergoes rigorous verification
              by authorized staff to ensure genuine assistance reaches authentic
              beneficiaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Verified Beneficiaries
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Staff members verify applicant records using CNIC, regional
                location, and income criteria.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <Package className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Direct Relief Delivery
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Donors can post food rations, apparel, or funds, directly
                targeting genuine relief requests.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <Users className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Multi-Role System
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tailored dashboards for Needy Persons, Donors, and System
                Administrators.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="py-16 bg-white border-t border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                Our Services
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                What KindReach Offers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  1. Food & Ration Support
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Distribution of essential monthly grocery items, flour, oil,
                  and staples to verified families.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  2. Apparel & Goods Allocation
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Listing clothing sets, footwear, and basic domestic items
                  provided directly by donors.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  3. Direct Financial Grants
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Transparent monetary assistance for medical, educational, or
                  emergency relief requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Donations preview & login */}
        <section id="donations" className="py-16 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Recent Available Donations
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Active items uploaded by generous donors
              </p>
            </div>
            <Link
              to="/login"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Browse All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                  Food Ration
                </span>
                <span className="text-[11px] text-slate-400">Lahore</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Atta (25 kg bags)
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                5 bags available for distribution
              </p>
              <Link
                to="/login"
                className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:border-emerald-600 hover:text-emerald-600 transition flex items-center justify-center"
              >
                Request Item
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                  Apparel
                </span>
                <span className="text-[11px] text-slate-400">Islamabad</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Children&apos;s Clothing Set
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                20 items for ages 5–10 years
              </p>
              <Link
                to="/login"
                className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:border-emerald-600 hover:text-emerald-600 transition flex items-center justify-center"
              >
                Request Item
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  Financial Support
                </span>
                <span className="text-[11px] text-slate-400">Karachi</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Monthly Support Fund
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                PKR 5,000 allowance for ration
              </p>
              <Link
                to="/login"
                className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:border-emerald-600 hover:text-emerald-600 transition flex items-center justify-center"
              >
                Request Item
              </Link>
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section
          id="contact-us"
          className="py-16 bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 border-t border-emerald-100"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-widest mb-4">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                  Together, We Can Make a{" "}
                  <span className="text-emerald-600">Difference.</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl mb-6">
                  Every small act of kindness can bring hope to someone in need.
                  Join KindReach and help us build a community where support
                  reaches the right people.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Join KindReach
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-emerald-100 p-7 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Have Questions?
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  For assistance regarding donations, request verification, or
                  general information, feel free to contact us.
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        Email Address
                      </p>
                      <a
                        href="mailto:support@kindreach.org"
                        className="text-sm font-bold text-slate-800 hover:text-emerald-600"
                      >
                        support@kindreach.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        Phone Number
                      </p>
                      <a
                        href="tel:+92042111546372"
                        className="text-sm font-bold text-slate-800 hover:text-emerald-600"
                      >
                        +92 3040169098
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        Location
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        Khanpur Rahim Yar Khan, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-8 pb-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={logoGreen}
                  alt="KindReach Logo"
                  className="h-24 w-auto object-contain"
                />
                <span className="font-bold text-slate-800">
                  Charity Management System
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Connecting generous donors with verified needy persons through a
                transparent and accountable charity platform.
              </p>
            </div>
            <div className="md:justify-self-end">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Contact Information
              </h4>
              <div className="space-y-2 text-xs text-slate-500">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  support@kindreach.org
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                 +92 3040169098
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Khanpur Rahim Yar Khan, Pakistan
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-6 pt-5 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} KindReach. Built for Final Year
              Project (CS619).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}