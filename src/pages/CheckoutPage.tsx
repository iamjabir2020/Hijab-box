import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { LOGO_URL } from '../data/products';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    itemCount,
    checkoutDetails,
    setCheckoutDetails,
    placeOrder,
    setActivePage,
  } = useCart();

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [vpaVerified, setVpaVerified] = useState(true);
  const [promoApplied] = useState(true);

  // Compute shipping fee based on selected method
  const shippingCharge = shippingMethod === 'express' ? 120 : (subtotal >= 899 ? 0 : 0);
  const codCharge = paymentMethod === 'cod' ? 40 : 0;
  const discountAmount = promoApplied ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCharge + codCharge);
  const gstAmount = Number((subtotal * 0.05).toFixed(2));

  const handlePlaceOrder = () => {
    placeOrder();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff8f6] text-[#201a18]">
      {/* Checkout Dedicated Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD8]">
        <div className="h-16 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <button
            onClick={() => {
              setActivePage('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-[#524343] hover:text-[#201a18] transition-colors font-label-caps text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>RETURN TO BAG</span>
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              alt="Hijab Box Authentic Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <div className="flex flex-col text-left">
              <span className="font-headline-sm font-medium tracking-tight text-[#2B2523] text-base sm:text-lg">
                HIJAB BOX
              </span>
              <span className="font-label-caps text-[9px] tracking-[0.2em] text-[#BA7A7C] uppercase -mt-1 font-semibold">
                Sister-Owned
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#657150] font-label-caps text-xs">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span className="hidden sm:inline tracking-wider font-semibold">SECURE ENCRYPTED CHECKOUT</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Workspace */}
      <main className="w-full pt-16 bg-[#fff8f6] flex-1">
        <div className="flex flex-col w-full">
          {/* Top Checkout Stage Tracker Banner */}
          <div className="w-full bg-[#F5EFEB] py-3 shadow-sm border-b border-[#D8CCC4]/40">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-2">
              {/* Stepper Nav */}
              <nav aria-label="Checkout Progress" className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setActivePage('cart')}
                  className="flex items-center gap-1.5 text-[#657150] font-label-caps text-xs cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-[#dae8bf] text-[#151f06] flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="text-[#201a18]">1. Bag &amp; Info</span>
                </button>
                <span className="text-[#d6c2c1] font-light text-xs">/</span>
                <div className="flex items-center gap-1.5 font-label-caps text-xs text-[#BA7A7C] font-bold">
                  <span className="w-5 h-5 rounded-full bg-[#BA7A7C] text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>2. Shipping &amp; Courier</span>
                </div>
                <span className="text-[#d6c2c1] font-light text-xs">/</span>
                <div className="flex items-center gap-1.5 font-label-caps text-xs text-[#524343] opacity-60">
                  <span className="w-5 h-5 rounded-full bg-[#E8DFD8] text-[#655d56] flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>3. Payment</span>
                </div>
              </nav>

              {/* Reassurance Badge */}
              <div className="flex items-center gap-2 text-[#655d56] font-label-sm text-xs">
                <span className="material-symbols-outlined text-[16px] text-[#657150]">verified_user</span>
                <span>256-Bit Encrypted • Direct Sister Dispatch</span>
              </div>
            </div>
          </div>

          {/* Form Columns */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              {/* LEFT COLUMN: Checkout Flow (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* SECTION 1: Contact Information */}
                <section className="bg-white rounded-xl p-5 lg:p-7 shadow-sm border border-[#E8DFD8]">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-[11px] font-bold">
                        01
                      </span>
                      <h2 className="font-headline-sm text-lg text-[#2B2523] font-medium">Contact Information</h2>
                    </div>
                    <span className="font-label-caps text-xs text-[#BA7A7C] underline underline-offset-4 decoration-[#C68B8D]">
                      Already have an account? Log in
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                        Email Address for Order Confirmation
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={checkoutDetails.email}
                          onChange={(e) =>
                            setCheckoutDetails((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all pr-10 border border-[#D8CCC4]/50"
                        />
                        <span
                          className="material-symbols-outlined absolute right-3 top-3.5 text-[#657150] text-[20px]"
                          title="Valid Email"
                        >
                          check_circle
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp Mobile Updates */}
                    <div>
                      <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                        Mobile Number (WhatsApp Dispatch Updates)
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg bg-[#f7ebe8] text-[#524343] font-label-md text-sm border-y border-l border-[#D8CCC4]/50">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={checkoutDetails.phone}
                          onChange={(e) =>
                            setCheckoutDetails((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-r-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all pr-10 border border-[#D8CCC4]/50"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#657150] text-[20px]">
                          check_circle
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-[#524343]/80 mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#657150]">chat</span>
                        Receive live courier tracking and discreet delivery pings via WhatsApp.
                      </p>
                    </div>

                    {/* Sisterhood Newsletter Checkbox */}
                    <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checkoutDetails.newsletter}
                        onChange={(e) =>
                          setCheckoutDetails((prev) => ({ ...prev, newsletter: e.target.checked }))
                        }
                        className="mt-1 h-4 w-4 rounded accent-[#BA7A7C] cursor-pointer"
                      />
                      <span className="font-body-sm text-xs text-[#2B2523]">
                        Keep me updated on newly curated modal fabric restocks, limited sisterhood gift sets, and Baroda notes.
                      </span>
                    </label>
                  </div>
                </section>

                {/* SECTION 2: Delivery Address */}
                <section className="bg-white rounded-xl p-5 lg:p-7 shadow-sm border border-[#E8DFD8]">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-[11px] font-bold">
                        02
                      </span>
                      <h2 className="font-headline-sm text-lg text-[#2B2523] font-medium">Delivery Address</h2>
                    </div>
                    <span className="font-label-caps text-xs text-[#657150] flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span> Pan-India Courier
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Country Presetted */}
                    <div>
                      <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                        Country / Region
                      </label>
                      <div className="w-full px-4 py-3 rounded-lg bg-[#f7ebe8] text-[#2B2523] font-body-md text-sm flex items-center justify-between border border-[#D8CCC4]/50">
                        <span>India (Domestic Express)</span>
                        <span className="material-symbols-outlined text-[18px] text-[#524343]">lock</span>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={checkoutDetails.firstName}
                          onChange={(e) =>
                            setCheckoutDetails((prev) => ({ ...prev, firstName: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={checkoutDetails.lastName}
                          onChange={(e) =>
                            setCheckoutDetails((prev) => ({ ...prev, lastName: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                        />
                      </div>
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                        Address (House No, Building, Street)
                      </label>
                      <input
                        type="text"
                        value={checkoutDetails.streetAddress}
                        onChange={(e) =>
                          setCheckoutDetails((prev) => ({ ...prev, streetAddress: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={checkoutDetails.landmark}
                        onChange={(e) =>
                          setCheckoutDetails((prev) => ({ ...prev, landmark: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>

                    {/* City, State, PIN */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                          PIN Code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={6}
                            value={checkoutDetails.pincode}
                            onChange={(e) =>
                              setCheckoutDetails((prev) => ({ ...prev, pincode: e.target.value }))
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all pr-8 border border-[#D8CCC4]/50"
                          />
                          <span className="material-symbols-outlined absolute right-2.5 top-3.5 text-[#657150] text-[18px]">
                            verified
                          </span>
                        </div>
                        <span className="text-[11px] text-[#657150] font-medium mt-1 inline-block">
                          Serviceable: Baroda Hub
                        </span>
                      </div>
                      <div>
                        <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                          City
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={checkoutDetails.city}
                          className="w-full px-4 py-3 rounded-lg bg-[#f7ebe8] text-[#2B2523] font-body-md text-sm focus:outline-none border border-[#D8CCC4]/50"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-xs text-[#524343] mb-1.5 uppercase font-semibold">
                          State
                        </label>
                        <select
                          value={checkoutDetails.state}
                          onChange={(e) =>
                            setCheckoutDetails((prev) => ({ ...prev, state: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                        >
                          <option value="Gujarat">Gujarat</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi NCR">Delhi NCR</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Rajasthan">Rajasthan</option>
                        </select>
                      </div>
                    </div>

                    {/* Save Address Checkbox */}
                    <label className="flex items-center gap-3 pt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checkoutDetails.saveAddress}
                        onChange={(e) =>
                          setCheckoutDetails((prev) => ({ ...prev, saveAddress: e.target.checked }))
                        }
                        className="h-4 w-4 rounded accent-[#BA7A7C] cursor-pointer"
                      />
                      <span className="font-body-sm text-xs text-[#2B2523]">
                        Save this address to my Sisterhood profile for faster 1-click checkout.
                      </span>
                    </label>
                  </div>
                </section>

                {/* SECTION 3: Shipping & Studio Dispatch */}
                <section className="bg-white rounded-xl p-5 lg:p-7 shadow-sm border border-[#E8DFD8]">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-[11px] font-bold">
                      03
                    </span>
                    <h2 className="font-headline-sm text-lg text-[#2B2523] font-medium">Shipping &amp; Studio Dispatch</h2>
                  </div>

                  <div className="space-y-3">
                    {/* Option 1: Standard Studio Dispatch */}
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                        shippingMethod === 'standard'
                          ? 'bg-[#fdf1ed] border-[#BA7A7C]'
                          : 'bg-white border-[#E8DFD8] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="mt-1 accent-[#BA7A7C] h-4 w-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-label-md text-sm text-[#2B2523] font-semibold">
                              Standard Studio Dispatch
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#dae8bf] text-[#151f06] text-[10px] font-label-caps font-bold">
                              COMPLIMENTARY
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#524343] mt-0.5">
                            Delivered via Bluedart / Delhivery in 3–5 business days. Hand-packed in Baroda.
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-2 shrink-0">
                        <span className="font-label-md text-sm font-bold text-[#657150]">FREE</span>
                        <span className="block line-through text-[11px] text-[#847373]">₹60.00</span>
                      </div>
                    </label>

                    {/* Option 2: Express Air Priority */}
                    <label
                      onClick={() => setShippingMethod('express')}
                      className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                        shippingMethod === 'express'
                          ? 'bg-[#fdf1ed] border-[#BA7A7C]'
                          : 'bg-white border-[#E8DFD8] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="mt-1 accent-[#BA7A7C] h-4 w-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-label-md text-sm text-[#2B2523] font-semibold">
                              Express Air Priority
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#ece0dd] text-[#2B2523] text-[10px] font-label-caps font-bold">
                              AIR CARGO
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#524343] mt-0.5">
                            1–2 business days priority air dispatch directly from Gujarat central hub.
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-2 shrink-0">
                        <span className="font-label-md text-sm font-bold text-[#2B2523]">₹120.00</span>
                      </div>
                    </label>
                  </div>
                </section>

                {/* SECTION 4: Payment Method */}
                <section className="bg-white rounded-xl p-5 lg:p-7 shadow-sm border border-[#E8DFD8]">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-[11px] font-bold">
                        04
                      </span>
                      <h2 className="font-headline-sm text-lg text-[#2B2523] font-medium">Payment Method</h2>
                    </div>
                    <span className="font-label-caps text-xs text-[#655d56]">All transactions encrypted</span>
                  </div>

                  <div className="space-y-3">
                    {/* UPI Option */}
                    <div
                      className={`rounded-xl overflow-hidden border ${
                        paymentMethod === 'upi' ? 'bg-[#fdf1ed] border-[#BA7A7C]' : 'bg-white border-[#E8DFD8]'
                      }`}
                    >
                      <label className="flex items-center justify-between p-4 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            value="upi"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="accent-[#BA7A7C] h-4 w-4"
                          />
                          <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                            UPI (Instant 0% Fee)
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#C68B8D]/20 text-[#6b383a] text-[10px] font-label-caps font-bold">
                            RECOMMENDED
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-80 text-xs font-medium text-[#524343]">
                          <span>GPay • PhonePe • Paytm</span>
                        </div>
                      </label>

                      {/* UPI Details */}
                      {paymentMethod === 'upi' && (
                        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#f2e6e2]">
                          <p className="font-body-sm text-xs text-[#524343]">
                            Pay instantly via any UPI App or enter your Virtual Payment Address (VPA):
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={checkoutDetails.upiVpa}
                              onChange={(e) =>
                                setCheckoutDetails((prev) => ({ ...prev, upiVpa: e.target.value }))
                              }
                              placeholder="username@okhdfcbank or 9876543210@paytm"
                              className="flex-1 px-4 py-2.5 rounded-lg bg-white text-[#2B2523] font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] border border-[#D8CCC4]"
                            />
                            <button
                              type="button"
                              onClick={() => setVpaVerified(true)}
                              className="px-4 py-2.5 bg-[#2B2523] text-white font-label-sm text-xs rounded-lg hover:bg-[#1F1B1A] transition-colors cursor-pointer uppercase font-medium"
                            >
                              {vpaVerified ? 'Verified ✓' : 'Verify & Pay'}
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-[#657150]">
                            <span className="material-symbols-outlined text-[15px]">flash_on</span>
                            <span>Instant payment confirmation without card redirects.</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Credit & Debit Card Option */}
                    <div
                      className={`rounded-xl border ${
                        paymentMethod === 'card' ? 'bg-[#fdf1ed] border-[#BA7A7C]' : 'bg-white border-[#E8DFD8]'
                      }`}
                    >
                      <label className="flex items-center justify-between p-4 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-[#BA7A7C] h-4 w-4"
                          />
                          <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                            Credit / Debit Card
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#524343] text-[11px] font-label-caps">
                          <span>VISA • MASTERCARD • RUPAY</span>
                        </div>
                      </label>
                    </div>

                    {/* Net Banking */}
                    <div
                      className={`rounded-xl border ${
                        paymentMethod === 'netbanking' ? 'bg-[#fdf1ed] border-[#BA7A7C]' : 'bg-white border-[#E8DFD8]'
                      }`}
                    >
                      <label className="flex items-center justify-between p-4 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            value="netbanking"
                            checked={paymentMethod === 'netbanking'}
                            onChange={() => setPaymentMethod('netbanking')}
                            className="accent-[#BA7A7C] h-4 w-4"
                          />
                          <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                            Net Banking
                          </span>
                        </div>
                        <span className="text-[#524343] text-[11px]">HDFC, ICICI, SBI, Axis &amp; 40+ banks</span>
                      </label>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      className={`rounded-xl border ${
                        paymentMethod === 'cod' ? 'bg-[#fdf1ed] border-[#BA7A7C]' : 'bg-white border-[#E8DFD8]'
                      }`}
                    >
                      <label className="flex items-center justify-between p-4 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-[#BA7A7C] h-4 w-4"
                          />
                          <div>
                            <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                              Cash on Delivery (COD)
                            </span>
                            <span className="block text-[11px] text-[#524343]">
                              Includes ₹40 Baroda verification &amp; handling fee
                            </span>
                          </div>
                        </div>
                        <span className="font-label-caps text-xs text-[#655d56]">+₹40</span>
                      </label>
                    </div>
                  </div>

                  {/* Billing Checkbox */}
                  <div className="mt-4 pt-3 border-t border-[#f2e6e2]">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checkoutDetails.billingSameAsShipping}
                        onChange={(e) =>
                          setCheckoutDetails((prev) => ({
                            ...prev,
                            billingSameAsShipping: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded accent-[#BA7A7C] cursor-pointer"
                      />
                      <span className="font-body-sm text-xs text-[#2B2523]">
                        Billing address is same as shipping address
                      </span>
                    </label>
                  </div>
                </section>

                {/* CTA & Legal Subtext */}
                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 px-6 bg-[#BA7A7C] hover:bg-[#844c4e] text-white rounded-lg font-label-md text-sm sm:text-base font-semibold tracking-wider flex items-center justify-center gap-3 shadow-md transition-all active:scale-[0.99] cursor-pointer uppercase"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    <span>PLACE ORDER • ₹{finalTotal.toFixed(2)}</span>
                  </button>
                  <p className="font-body-sm text-xs text-center text-[#524343] max-w-lg mx-auto">
                    By placing this order, you agree to Hijab Box Terms &amp; Studio Return Policies. Every order is inspected, delicately scented, and packed by hand by our sister team.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Order Summary & Sister Note (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
                {/* Order Summary Card */}
                <div className="bg-white rounded-xl p-5 lg:p-7 shadow-sm border border-[#E8DFD8]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f2e6e2]">
                    <h3 className="font-headline-sm text-lg text-[#2B2523]">Your Sisterhood Parcel</h3>
                    <span className="font-label-caps text-xs text-[#BA7A7C] font-bold">
                      {itemCount} ITEMS
                    </span>
                  </div>

                  {/* Itemised List */}
                  <div className="divide-y divide-transparent space-y-3 py-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-20 rounded-md overflow-hidden bg-[#f7ebe8] shrink-0 shadow-sm">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1 right-1 bg-[#2B2523]/80 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-body-md text-sm font-medium text-[#2B2523] truncate">
                              {item.product.name}
                            </h4>
                            <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#524343]">
                            {item.product.dimensions || 'Standard 180×90 cm • Ultra Soft'}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#657150]">
                            <span className="material-symbols-outlined text-[13px]">eco</span>
                            <span>100% Breathable Modal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sisterhood Packaging Feature Callout */}
                  <div className="my-3 p-3.5 rounded-lg bg-[#fdf1ed] flex items-start gap-3 border border-[#ece0dd]">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[20px] mt-0.5">redeem</span>
                    <div className="text-left">
                      <p className="font-label-md text-xs font-semibold text-[#2B2523]">
                        Sisterhood Gift Wrap Included
                      </p>
                      <p className="font-body-sm text-xs text-[#524343] mt-0.5">
                        Signature rigid box, scented organic tissue, hand-written gratitude card &amp; hijab care bookmark.
                      </p>
                    </div>
                  </div>

                  {/* Promo Code Bar */}
                  <div className="pt-1 pb-3 border-b border-[#f2e6e2]">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="SISTERHOOD2026"
                        className="flex-1 px-3 py-2 rounded-lg bg-[#fdf1ed] text-[#2B2523] font-body-sm text-xs uppercase tracking-wider border border-[#D8CCC4]"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#f2e6e2] text-[#2B2523] font-label-caps text-[11px] font-bold rounded-lg uppercase"
                      >
                        APPLIED
                      </button>
                    </div>
                    <p className="text-[11px] text-[#657150] font-medium mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                      Complimentary shipping discount activated
                    </p>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="space-y-2 pt-3 text-xs text-[#524343]">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} Items)</span>
                      <span className="text-[#2B2523] font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Studio Shipping Dispatch</span>
                      <span className="text-[#657150] font-medium">
                        {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Boutique Gift Wrapping</span>
                      <span className="text-[#657150] font-medium">Complimentary</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated GST (Included)</span>
                      <span className="text-[#2B2523] font-medium">₹{gstAmount.toFixed(2)}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-[#f2e6e2]">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-lg font-semibold text-[#2B2523]">Total Due</span>
                        <span className="font-label-caps text-[10px] text-[#524343]">ALL APPLICABLE TAXES INCLUDED</span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-md text-2xl text-[#2B2523] font-bold">
                          ₹{finalTotal.toFixed(2)}
                        </span>
                        <span className="block text-[11px] text-[#524343]">INR</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sister-Founders Note */}
                <div className="bg-[#fdf1ed] rounded-xl p-4 shadow-sm border border-[#ece0dd]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#E8DFD8]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Three Muslim sister founders in soft earthy tone scarves"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdof8kbGCrxcsdobl3yQeNRtx1ZOw2lMpA-WMFsvGpD_Xu7nGBX-25z4aZ9FvH_aB4CWPeEM3i1zzaqq-Lzf3QTlayhp3XkQnSQRIsmUin9cNaPqu7TJmaoI26PrUJprGWsKbHf9i8N8MHBL8BTTS0xYTagi5_wxI-V_IyF8qqTvwWGNbDXEVZt2yp6RXzAeAMXJrSJbyG9Fjs1Y2EqIM2ufKeWFQkf0_oEbKETX5k39NWfRYzQDxF"
                      />
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-base leading-tight text-[#2B2523] font-medium">
                        A Note from Our Baroda Team
                      </h4>
                      <p className="font-body-sm text-xs text-[#524343] mt-1 italic leading-relaxed">
                        “Every parcel leaving our studio in Baroda is packed with prayer and intention. May each piece bring grace, modesty, and effortless confidence to your daily journey.”
                      </p>
                      <span className="block font-label-caps text-[10px] tracking-widest text-[#BA7A7C] mt-2 uppercase font-semibold">
                        — Founding Sisters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges Grid */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 rounded-lg bg-white shadow-sm border border-[#E8DFD8] flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[22px]">swap_horizontal_circle</span>
                    <span className="font-label-caps text-[10px] uppercase font-bold text-[#2B2523] mt-1">
                      7-Day Studio Exchange
                    </span>
                    <span className="text-[11px] text-[#524343]">Hassle-free sister support</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white shadow-sm border border-[#E8DFD8] flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[#657150] text-[22px]">verified</span>
                    <span className="font-label-caps text-[10px] uppercase font-bold text-[#2B2523] mt-1">
                      100% Authentic Quality
                    </span>
                    <span className="text-[11px] text-[#524343]">Pure breathable modal &amp; silk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Footer */}
      <footer className="w-full bg-[#F5EFEB] py-4 border-t border-[#E8DFD8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-body-sm text-xs text-[#524343]">
          <p>Faith Inspires Modesty • © 2026 Hijab Box. Baroda.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActivePage('contact')} className="hover:text-[#BA7A7C] transition-colors">
              Shipping
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#BA7A7C] transition-colors">
              Returns
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#BA7A7C] transition-colors">
              Assistance
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
