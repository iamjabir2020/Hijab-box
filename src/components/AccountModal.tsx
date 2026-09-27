import React, { useState, useEffect } from 'react';
import { useAuth, UserProfile } from '../context/AuthContext';
import { getUserOrders, OrderRecord } from '../services/orderService';
import { seedProductsToDatabase } from '../services/productService';
import { testSupabaseConnection, isSupabaseConfigured, saveCustomSupabaseConfig, clearCustomSupabaseConfig, supabaseUrl } from '../lib/supabase';

export const AccountModal: React.FC = () => {
  const {
    accountModalOpen,
    setAccountModalOpen,
    profile,
    updateProfile,
    signOut,
    setAuthModalOpen,
    connectionStatus,
    recheckConnection,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'supabase'>('profile');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  
  // Profile form state
  const [formData, setFormData] = useState<UserProfile>(
    profile || {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      streetAddress: '',
      landmark: '',
      city: 'Vadodara (Baroda)',
      state: 'Gujarat',
      pincode: '390001',
      country: 'India',
      newsletterOptIn: true,
    }
  );
  const [savingProfile, setSavingProfile] = useState<boolean>(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Supabase settings state
  const [customUrl, setCustomUrl] = useState<string>(supabaseUrl || '');
  const [customKey, setCustomKey] = useState<string>('');
  const [seedingLoading, setSeedingLoading] = useState<boolean>(false);
  const [seedingResult, setSeedingResult] = useState<string | null>(null);
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (accountModalOpen && activeTab === 'orders') {
      loadOrders();
    }
  }, [accountModalOpen, activeTab, profile]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    const data = await getUserOrders(profile?.id, profile?.email);
    setOrders(data);
    setLoadingOrders(false);
  };

  if (!accountModalOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    const res = await updateProfile(formData);
    if (res.success) {
      setProfileMsg({ type: 'success', text: 'Profile & default shipping address saved to database!' });
    } else {
      setProfileMsg({ type: 'error', text: res.error || 'Failed to update profile' });
    }
    setSavingProfile(false);
  };

  const handleSeed = async () => {
    setSeedingLoading(true);
    setSeedingResult(null);
    const res = await seedProductsToDatabase();
    setSeedingResult(res.message);
    setSeedingLoading(false);
  };

  const handleTestPing = async () => {
    setTestingConnection(true);
    const res = await testSupabaseConnection();
    setTestResult(`${res.connected ? '✅ Connected' : '❌ Disconnected'}: ${res.message} ${res.latencyMs ? `(${res.latencyMs}ms)` : ''}`);
    await recheckConnection();
    setTestingConnection(false);
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl || !customKey) {
      alert('Please provide both Project URL and Anon Key');
      return;
    }
    saveCustomSupabaseConfig(customUrl, customKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#fff8f6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#d6c2c1] overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#f5eeeb] px-6 py-4 border-b border-[#d6c2c1]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#844C4E] flex items-center justify-center text-white font-serif text-lg font-bold shadow-sm">
              {profile?.firstName ? profile.firstName.charAt(0) : 'S'}
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#2B2523] leading-tight">
                {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : 'Sister Account'}
              </h2>
              <p className="font-body-sm text-xs text-[#524343]">{profile?.email || 'Guest Sister'}</p>
            </div>
          </div>
          <button
            onClick={() => setAccountModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#524343] hover:bg-[#ebdcd9] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#d6c2c1]/50 px-6 bg-white">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 font-label-caps text-xs tracking-wider border-b-2 font-medium transition-all ${
              activeTab === 'profile'
                ? 'border-[#BA7A7C] text-[#2B2523]'
                : 'border-transparent text-[#524343] hover:text-[#2B2523]'
            }`}
          >
            Sister Profile &amp; Address
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 font-label-caps text-xs tracking-wider border-b-2 font-medium transition-all ${
              activeTab === 'orders'
                ? 'border-[#BA7A7C] text-[#2B2523]'
                : 'border-transparent text-[#524343] hover:text-[#2B2523]'
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 px-4 font-label-caps text-xs tracking-wider border-b-2 font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'border-[#BA7A7C] text-[#2B2523]'
                : 'border-transparent text-[#524343] hover:text-[#2B2523]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            Supabase Backend
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: Profile & Address */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileMsg && (
                <div
                  className={`p-3 text-xs rounded-lg border flex items-center gap-2 ${
                    profileMsg.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {profileMsg.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{profileMsg.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Email</label>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full px-3 py-2 text-sm bg-[#f5eeeb] border border-[#d6c2c1] rounded-lg text-[#524343]"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Default Shipping Address</label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  placeholder="Flat, Building, Street"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C] mb-2"
                />
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Landmark (Optional)"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#d6c2c1]/40">
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setAccountModalOpen(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 font-label-caps uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 bg-[#844C4E] hover:bg-[#6e3e40] text-white rounded-lg font-label-caps text-xs tracking-wider uppercase transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="text-center py-8 text-sm text-[#524343]">Loading your orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-[48px] text-[#BA7A7C]/40">local_shipping</span>
                  <p className="font-serif text-lg text-[#2B2523] mt-2">No orders placed yet</p>
                  <p className="font-body-sm text-xs text-[#524343] mt-1">
                    When you order handcrafted pieces, you can track their status and details here.
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-xl p-4 border border-[#d6c2c1] shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5eeeb] pb-3">
                      <div>
                        <span className="font-label-caps text-xs font-bold text-[#2B2523] tracking-wider">
                          Order {ord.orderNumber}
                        </span>
                        <p className="text-[11px] text-[#524343]">
                          Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[11px] uppercase font-label-caps font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          {ord.orderStatus}
                        </span>
                        <span className="font-serif text-base font-semibold text-[#844C4E]">
                          ₹{ord.total}
                        </span>
                      </div>
                    </div>

                    {/* Items preview */}
                    <div className="space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-[#2B2523]">
                          <span className="truncate max-w-[70%]">
                            {it.quantity}× {it.product.name}
                          </span>
                          <span className="text-[#524343]">₹{it.product.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {ord.trackingAwb && (
                      <div className="bg-[#f5eeeb] p-2.5 rounded-lg text-[11px] flex items-center justify-between text-[#524343]">
                        <span>
                          <strong>AWB Tracking:</strong> {ord.trackingAwb}
                        </span>
                        <span className="text-[#844C4E] font-medium">Baroda Express</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Supabase Backend Details & Tools */}
          {activeTab === 'supabase' && (
            <div className="space-y-5 text-sm">
              <div className="bg-white p-4 rounded-xl border border-[#d6c2c1] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-[#2B2523] font-medium">Connection Status</h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-label-caps font-semibold ${
                      isSupabaseConfigured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isSupabaseConfigured ? 'Supabase Configured' : 'Local Fallback Mode'}
                  </span>
                </div>
                <p className="text-xs text-[#524343] leading-relaxed">
                  {connectionStatus.message}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleTestPing}
                    disabled={testingConnection}
                    className="px-3 py-1.5 bg-[#f5eeeb] hover:bg-[#ebdcd9] text-[#2B2523] text-xs font-label-caps uppercase rounded-lg border border-[#d6c2c1] cursor-pointer transition-colors"
                  >
                    {testingConnection ? 'Testing...' : 'Test Connection Ping'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSeed}
                    disabled={seedingLoading}
                    className="px-3 py-1.5 bg-[#844C4E] hover:bg-[#6e3e40] text-white text-xs font-label-caps uppercase rounded-lg cursor-pointer transition-colors"
                  >
                    {seedingLoading ? 'Seeding...' : 'Seed 7 Products to Database'}
                  </button>
                </div>

                {testResult && (
                  <p className="text-xs font-mono bg-[#f5eeeb] p-2 rounded border border-[#d6c2c1]/60">
                    {testResult}
                  </p>
                )}

                {seedingResult && (
                  <p className="text-xs font-mono bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-200">
                    {seedingResult}
                  </p>
                )}
              </div>

              {/* Set custom credentials without code edits */}
              <form onSubmit={handleSaveSupabaseConfig} className="bg-white p-4 rounded-xl border border-[#d6c2c1] space-y-3">
                <h4 className="font-serif text-base text-[#2B2523] font-medium">
                  Connect Your Supabase Project
                </h4>
                <p className="text-xs text-[#524343]">
                  Enter your Supabase URL and Anon Key from your Supabase Dashboard (<span className="font-mono text-[11px]">Settings &gt; API</span>). You can also set them in your environment variables as <span className="font-mono text-[11px]">VITE_SUPABASE_URL</span> and <span className="font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</span>.
                </p>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">
                    Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://your-project-id.supabase.co"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#fdfaf8] border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-[#524343] block mb-1">
                    Anon Public Key (VITE_SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 text-xs font-mono bg-[#fdfaf8] border border-[#d6c2c1] rounded-lg focus:outline-none focus:border-[#BA7A7C]"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#844C4E] hover:bg-[#6e3e40] text-white text-xs font-label-caps uppercase tracking-wider rounded-lg cursor-pointer"
                  >
                    Save &amp; Connect Live
                  </button>
                  {isSupabaseConfigured && (
                    <button
                      type="button"
                      onClick={clearCustomSupabaseConfig}
                      className="px-3 py-2 text-xs text-red-600 hover:text-red-800 font-label-caps uppercase cursor-pointer"
                    >
                      Reset to Local Mode
                    </button>
                  )}
                </div>
              </form>

              {/* Database Schema SQL */}
              <div className="bg-white p-4 rounded-xl border border-[#d6c2c1] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-[#2B2523] font-medium">Database Schema Script</h4>
                  <span className="text-[11px] text-[#BA7A7C] font-mono">/supabase/schema.sql</span>
                </div>
                <p className="text-xs text-[#524343]">
                  The complete SQL script is generated at <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">/supabase/schema.sql</code>. It provisions tables for <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">profiles</code>, <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">products</code>, <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">cart_items</code>, <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">wishlist_items</code>, and <code className="bg-[#f5eeeb] px-1 py-0.5 rounded">orders</code> with Row Level Security (RLS) policies and initial seed data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
