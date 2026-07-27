import React, { useState } from 'react';
import { Compass, BookOpen, BookmarkCheck, Sparkles, LogIn, UserCheck, ChevronDown, MapPin } from 'lucide-react';
import { GoogleUser } from '../types';
import logoImg from '../assets/images/wanderlust_logo_1784986231866.jpg';

interface NavbarProps {
  activeTab: 'planner' | 'blogs' | 'saved';
  setActiveTab: (tab: 'planner' | 'blogs' | 'saved') => void;
  user: GoogleUser;
  onOpenGoogleLoginModal: () => void;
  onLogout: () => void;
  savedTripsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenGoogleLoginModal,
  onLogout,
  savedTripsCount,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('planner')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-rose-500 p-0.5 shadow-md shadow-sky-500/25 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden relative flex items-center justify-center">
              <img
                src={logoImg}
                alt="WL Wanderlust Travel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent font-black tracking-tighter">WL</span>
                <span>Wanderlust</span>
                <span className="text-rose-600 font-serif italic text-xl">Travel</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5" /> Earth Engine
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 hidden sm:flex items-center gap-1.5 mt-0.5">
              <span>🌍 Earth Journeys</span> • <span>🚗 Car</span> • <span>🏍️ Bike</span> • <span>🚆 Train</span> • <span>✈️ Flight</span> • <span>₹ INR</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'planner'
                ? 'bg-white text-rose-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Route Planner
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'blogs'
                ? 'bg-white text-rose-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Travel Blogs
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === 'saved'
                ? 'bg-white text-rose-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            Saved Trips
            {savedTripsCount > 0 && (
              <span className="w-5 h-5 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {savedTripsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Google Authentication Pill */}
        <div className="flex items-center gap-3">
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 p-1.5 pr-3 rounded-full border border-slate-200/80 transition-all cursor-pointer"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500/30"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                    <UserCheck className="w-2.5 h-2.5" /> Google Account (No OTP)
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 mb-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Logged In As</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenGoogleLoginModal();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <LogIn className="w-3.5 h-3.5 text-blue-500" /> Switch / Edit Google Account
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenGoogleLoginModal}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 hover:opacity-95 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current bg-white text-slate-900 rounded-full p-0.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google Sign-In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex border-t border-slate-200/80 bg-white">
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex-1 py-3 text-center text-xs font-semibold flex flex-col items-center gap-1 ${
            activeTab === 'planner' ? 'text-rose-600 border-t-2 border-rose-600' : 'text-slate-500'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Planner
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex-1 py-3 text-center text-xs font-semibold flex flex-col items-center gap-1 ${
            activeTab === 'blogs' ? 'text-rose-600 border-t-2 border-rose-600' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Blogs
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 text-center text-xs font-semibold flex flex-col items-center gap-1 ${
            activeTab === 'saved' ? 'text-rose-600 border-t-2 border-rose-600' : 'text-slate-500'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          Saved ({savedTripsCount})
        </button>
      </div>
    </header>
  );
};
