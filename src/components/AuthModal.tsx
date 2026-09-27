import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    signInWithPassword,
    signUpWithPassword,
    useDemoAccount,
    isConfigured,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (mode === 'signin') {
      const res = await signInWithPassword(email, password);
      if (res.success) {
        setSuccessMsg('Welcome back, sister!');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 800);
      } else {
        setErrorMsg(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } else {
      if (!firstName.trim()) {
        setErrorMsg('Please enter your first name.');
        setLoading(false);
        return;
      }
      const res = await signUpWithPassword(email, password, firstName, lastName);
      if (res.success) {
        setSuccessMsg('Account created successfully! Welcome to the Sisterhood.');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Failed to create account.');
      }
    }
    setLoading(false);
  };

  const handleUseDemo = () => {
    useDemoAccount();
    setSuccessMsg('Switched to Sister Amina Patel (Demo Account)');
    setTimeout(() => {
      setAuthModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#fff8f6] w-full max-w-md rounded-2xl shadow-2xl border border-[#d6c2c1] overflow-hidden flex flex-col relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-[#f5eeeb] px-6 py-5 border-b border-[#d6c2c1]/60 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[10px] text-[#BA7A7C] uppercase tracking-[0.25em] font-semibold block">
              Sisterhood Portal
            </span>
            <h2 className="font-serif text-2xl text-[#2B2523] mt-0.5">
              {mode === 'signin' ? 'Sign In to Hijab Box' : 'Join the Sisterhood'}
            </h2>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#524343] hover:bg-[#ebdcd9] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Backend notice */}
        <div className="px-6 pt-3 pb-1">
          <div className="flex items-center justify-between text-[11px] text-[#524343] bg-[#f5eeeb]/80 px-3 py-1.5 rounded-lg border border-[#d6c2c1]/40">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              Backend: {isConfigured ? 'Supabase Auth (Live)' : 'Local Session Mode'}
            </span>
            <span className="text-[#BA7A7C]">PostgreSQL Synced</span>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-[#d6c2c1]/40 px-6 pt-2">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 font-label-caps text-xs tracking-wider text-center transition-all border-b-2 font-medium ${
              mode === 'signin'
                ? 'border-[#BA7A7C] text-[#2B2523]'
                : 'border-transparent text-[#524343] hover:text-[#2B2523]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 font-label-caps text-xs tracking-wider text-center transition-all border-b-2 font-medium ${
              mode === 'signup'
                ? 'border-[#BA7A7C] text-[#2B2523]'
                : 'border-transparent text-[#524343] hover:text-[#2B2523]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-500 shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 text-xs bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label-caps text-[11px] text-[#524343] block mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Amina"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                />
              </div>
              <div>
                <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Patel"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sister@example.com"
              className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
            />
          </div>

          <div>
            <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
            />
            {mode === 'signup' && (
              <span className="text-[10px] text-[#8c7e7a] mt-1 block">Minimum 6 characters</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#844C4E] hover:bg-[#6e3e40] text-white rounded-lg font-label-caps text-xs tracking-widest uppercase transition-all shadow-md disabled:opacity-50 mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : mode === 'signin' ? (
              <span>Sign In to Account</span>
            ) : (
              <span>Create Sisterhood Account</span>
            )}
          </button>

          <div className="pt-2 text-center">
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d6c2c1]/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-[#8c7e7a] bg-[#fff8f6] px-2">
                Quick Testing
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseDemo}
              className="w-full py-2 px-3 border border-[#BA7A7C]/60 text-[#844C4E] hover:bg-[#f5eeeb] rounded-lg font-label-caps text-xs tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              Use Demo Sister Account (Amina Patel)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
