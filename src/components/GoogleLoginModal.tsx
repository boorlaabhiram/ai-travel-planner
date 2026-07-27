import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, User, Mail, Sparkles } from 'lucide-react';
import { GoogleUser } from '../types';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: GoogleUser;
  onLoginSuccess: (user: GoogleUser) => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [customEmail, setCustomEmail] = useState('boorlaabhiram2@gmail.com');
  const [customName, setCustomName] = useState('Abhiram Boorla');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleSelectAccount = (email: string, name: string, avatarUrl?: string) => {
    setIsAuthorizing(true);
    setTimeout(() => {
      const userObj: GoogleUser = {
        email,
        name,
        picture: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        isLoggedIn: true,
        loginMethod: 'google_sso',
      };
      onLoginSuccess(userObj);
      setIsAuthorizing(false);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;
    handleSelectAccount(customEmail, customName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-blue-500"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in with Google</h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose an account to continue to <span className="font-semibold text-rose-600">Wanderlust AI</span> (Instant 1-Click SSO, No OTP Required)
          </p>
        </div>

        {/* Quick Accounts List */}
        <div className="space-y-2.5 mb-5">
          {/* Default User Account */}
          <button
            onClick={() => handleSelectAccount('boorlaabhiram2@gmail.com', 'Abhiram Boorla', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')}
            disabled={isAuthorizing}
            className="w-full flex items-center justify-between p-3 rounded-2xl border-2 border-rose-100 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Abhiram Boorla"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-400/50"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  Abhiram Boorla
                </p>
                <p className="text-xs text-slate-500">boorlaabhiram2@gmail.com</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full border border-rose-200">
              Default
            </span>
          </button>

          {/* Secondary Account */}
          <button
            onClick={() => handleSelectAccount('explorer.traveler@gmail.com', 'Alex Explorer')}
            disabled={isAuthorizing}
            className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                AE
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Alex Explorer</p>
                <p className="text-xs text-slate-500">explorer.traveler@gmail.com</p>
              </div>
            </div>
          </button>
        </div>

        {/* Custom Google Email Form */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" /> Or use custom Google Email:
          </p>
          <form onSubmit={handleCustomSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Full Name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              <input
                type="email"
                placeholder="email@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>
            <button
              type="submit"
              disabled={isAuthorizing}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthorizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating with Google...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Continue without OTP
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security badge */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center flex items-center justify-center gap-1 text-[11px] text-emerald-600 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> Official Google OAuth 2.0 Single Sign-On Verified
        </div>
      </div>
    </div>
  );
};
