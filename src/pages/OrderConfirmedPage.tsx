import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const OrderConfirmedPage: React.FC = () => {
  const { lastOrderId, setActivePage, addToCart, checkoutDetails } = useCart();
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const curatedAdditions = [
    PRODUCTS.find((p) => p.id === 'chantilly-lace-hijab') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'pearl-loop-pins-set') || PRODUCTS[9],
    PRODUCTS.find((p) => p.id === 'watercolor-modal-hijab') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'arm-sleeve-extensions') || PRODUCTS[11],
  ];

  const instagramShots = [
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXbQjHIcn9y5_dILLLdTjLcMUPAMdHgI5tRwuEwredUpCsZAagwIORi7FV3Brnqbg4Xfv9cChDbmUvubBteNDP-kW9zMZiB9wbpDijX21deA9dP-k2e4QqsKWXvyJMlD2wW9oNgQd7w22N5jidVuKiLZjIbO1ipFRd99WqgJxd0WQxX0xFgSUN0p6KRZEraU4WCkNsxHdIDX2DXR_zWTuxGeTyQk2u-mKfb2_e43AuNhOASpqY8hRa',
      alt: 'Baroda design studio modal fabric rolls',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRPzfNDdC2_kL9oMN0rYNvnbc46YJMgAV-68KWmRZY4Y0lJinVnWH60R5L5xoEz1c7AeryOw2bNFaslkuWc5IcMjtgC1GhGGDuozamK2-Xqiop0JbYl0qt0D-lgm_aqLp2X6fDAqDrXjWoeIYyXHWPwlYmZOIZj-qQJiFiuE67hWbnJeJdE5-KAXU9r-7PEC-HdasJVF3LWwCh29YqYv7TRyN4cYhgYD7ZQQAMFMJ3mTpmqOeM1OIU',
      alt: 'Draping dusty rose hijab in studio mirror',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5jlsJ2zHopNXJPXiNaHx5kMghqB_9n5aVZubalJW-fYUi_cvYqgPrEreZ5qYbXy0t3csCUl9NPAOcfSDiMird-cFZ3KXeEKwcILC7M9TIyiT8yZ0KHKSlB59mFd4m0EBMM1oL3i2T-iG162y3D9Zy6WTT2ay7emy8WhAselwBwHPtx0-jOd13AkNGi9Nxypfx7pxUM66WIi_pdz-M8Eltiqj_7vLi50GyWglDcEHoKg9ASbBhfplA',
      alt: 'Hands stamping gold wax seal on keepsake card',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqMedw3DYPddFzezwIW5VLkGu6HDRy9ZOecVWQXCYACz1BLADFdynHsgwbgTUa8RixNyyU6_kYrg9RcT4koXzfYpomuUahre7Gg-ijAs9S0nHp17LUB1g1VktiA26iwkSQrXzH_yk7_-L5E45E_4X_OEQlj34hCkLQwmb0mZRXz9GmGTJDkbhkfV_V5-kV2Jrb4dfgnQJ0U1wIF5Ii6Z8bvmX8vlpKshMdzy_frhdIcQkiBMqtpHZe',
      alt: 'Curated gift boxes with dried botanical florals',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#fff8f6]">
      {/* 1. HERO / CONFIRMATION BADGE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 lg:pt-16 pb-8 text-center relative z-10">
        {/* Serene Circular Checkmark Badge */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#f7ebe8] flex items-center justify-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[#BA7A7C] text-[26px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
          </div>
        </div>

        <p className="font-label-caps text-xs text-[#BA7A7C] tracking-[0.22em] uppercase mb-2 font-semibold">
          Thank You for Choosing Hijab Box
        </p>
        <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-[#2B2523] mb-3 tracking-tight font-normal">
          YOUR ORDER IS CONFIRMED.
        </h1>
        <p className="font-body-lg text-sm sm:text-base text-[#524343] max-w-2xl mx-auto leading-relaxed">
          We’re so happy to have you with us. Your order has been received and we’re getting it ready with love and care.
        </p>

        {/* Key Metadata Ribbon */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2 px-6 rounded-full bg-[#fdf1ed] text-[#2B2523] shadow-sm border border-[#D8CCC4]/40">
          <span className="font-label-caps text-xs tracking-widest text-[#655d56] uppercase font-semibold">
            Order {lastOrderId}
          </span>
          <span className="text-[#BA7A7C] text-xs">•</span>
          <span className="font-label-caps text-xs tracking-widest text-[#655d56] uppercase font-semibold">
            Placed 24 Oct 2026
          </span>
          <span className="text-[#BA7A7C] text-xs">•</span>
          <span className="font-label-caps text-xs tracking-widest text-[#844c4e] uppercase font-semibold">
            Est. Delivery: 28 Oct — 31 Oct
          </span>
        </div>
      </section>

      {/* 2. PERSONAL THANK YOU NOTE ("A Little Note From Us") */}
      <section className="max-w-[880px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 relative z-10 w-full">
        <div className="relative bg-[#FAF8F5] p-6 sm:p-10 lg:p-12 rounded-xl shadow-md overflow-hidden border border-[#E8DFD8]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C68B8D]/15 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ede0d8]/40 to-transparent rounded-tr-full pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-xl mx-auto">
            <span
              className="material-symbols-outlined text-[#BA7A7C] text-3xl mb-2 opacity-80"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_florist
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl italic text-[#2B2523] mb-4 font-normal">
              A Little Note from Us
            </h2>
            <div className="space-y-3 font-serif text-[#1F1B1A] leading-relaxed text-center font-normal">
              <p className="text-base sm:text-lg font-medium">Thank you for choosing Hijab Box.</p>
              <p className="text-[#524343] font-sans text-xs sm:text-sm leading-relaxed">
                Every hijab we send out carries a little piece of what we believe in — modesty, confidence, comfort and the beauty of expressing yourself in your own way.
              </p>
              <p className="text-[#524343] font-sans text-xs sm:text-sm leading-relaxed">
                We’re truly grateful that you’ve chosen to make us a small part of your journey. Your order is now being prepared with care, thoughtfully packed and on its way to you soon.
              </p>
              <p className="text-[#2B2523] font-serif text-lg sm:text-xl pt-2 italic">
                “We hope you love every piece as much as we loved putting it together for you.”
              </p>
            </div>
            <div className="pt-6 mt-2 flex flex-col items-center">
              <span className="font-serif text-xl sm:text-2xl text-[#844C4E] italic leading-none mb-1">
                With love, The Hijab Box Sisters ♡
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ORDER CONFIRMATION CARD & BREAKDOWN */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Items & Cost Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-[#F5EFEB] p-5 sm:p-7 rounded-xl shadow-sm space-y-6 border border-[#D8CCC4]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8CCC4]/40">
              <div>
                <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">Order Breakdown</h3>
                <p className="font-label-caps text-xs text-[#655d56] uppercase tracking-wider">
                  Reference: {lastOrderId}
                </p>
              </div>
              <span className="font-label-caps text-[10px] text-white bg-[#6d7957] px-3 py-1 rounded-full uppercase font-bold">
                Confirmed
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg shadow-sm border border-[#E8DFD8]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHTE74xA76QUi7J3AStxVgdL1NNAL25PUyUN3kiOUT4roFydA1ylcA5RSOq0Oc2eccsN2IrsXdcB9Pp_P19MTQiMEmNm45wZaTqnllGgFV8Bnx5oYsWZGOzJfiPPVkx-bSJjwwt1BTGbAagGdD5HDOxWm6QRUId5Qqt871yzFAWOIgClpy6ia4IhdyI1zoNYeiVXCUvmHED6FybNDwbHxd2-iS-2AegsGCAxY7EnplaZQkeyG19nd7"
                  alt="Ombre Rouge Modal Hijab"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-sm text-[#2B2523] font-medium truncate">
                    Ombre Rouge Modal Hijab
                  </h4>
                  <p className="font-body-sm text-xs text-[#524343]">180×90 cm • Crimson Dusk</p>
                  <p className="font-label-caps text-[10px] text-[#655d56] uppercase tracking-widest mt-1">
                    Qty: 1
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-sm text-[#2B2523] font-semibold">₹599.00</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg shadow-sm border border-[#E8DFD8]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlFX2NIJG0fT9nonGINHekV74waVgmmqUSMoRIwc5NPIQt6rX15sTB3WA9GhKV2zIuiq9uOsRi_uCtY4Otylve-jRYPVBX5ADLvJaIV-vgGvZD9-t0US1C2pEkdgyLRDFqJZYJIGs0FgNwdiYe8LMDUZhEt_lfpjuNalqZOsD4zrXw7aelqtPirIyDN77SNg0TGOTPOkF84ogmM0EJnU0GPWBVG332S78TZ0HjwUdmNTf8geHHuLxx"
                  alt="Snag-Free Hijab Magnets"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-sm text-[#2B2523] font-medium truncate">
                    Snag-Free Hijab Magnets
                  </h4>
                  <p className="font-body-sm text-xs text-[#524343]">Matte Rose Gold • Pair of 2</p>
                  <p className="font-label-caps text-[10px] text-[#655d56] uppercase tracking-widest mt-1">
                    Qty: 1
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-sm text-[#2B2523] font-semibold">₹120.00</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg shadow-sm border border-[#E8DFD8]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO_iJmktCq4u3RyROb2jtL4FbEAJt37qb9akl-AWYEHCs2tH70h--osFnckanQO2SFQ8JmeSEgN122VBRu0j3hmTphrI10TlPTGwvYQHCScjlOWlFvckiBorjQKWeOAh2L1hoJgjILxQzDLm2i9dN21X7Xsw-S-beJa0qqUdyoSVCzioY7q7YsosXYt4tfvGGglq06XaeZD2Lx6OMuVwVqjGCwg9paOEDdGgoeJp40jBNnNZij9vdO"
                  alt="Modal Tie Cap Under-scarf"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-sm text-[#2B2523] font-medium truncate">
                    Modal Tie Cap Under-scarf
                  </h4>
                  <p className="font-body-sm text-xs text-[#524343]">Warm Nude Blush • Universal Fit</p>
                  <p className="font-label-caps text-[10px] text-[#655d56] uppercase tracking-widest mt-1">
                    Qty: 1
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-sm text-[#2B2523] font-semibold">₹99.00</p>
                </div>
              </div>

              {/* Complimentary item */}
              <div className="flex items-center gap-3 bg-[#f2e6e2]/60 p-3 rounded-lg border border-[#D8CCC4]/30">
                <div className="w-16 h-16 rounded bg-[#f7ebe8] flex items-center justify-center text-[#BA7A7C]">
                  <span className="material-symbols-outlined text-[24px]">redeem</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-sm text-[#2B2523] font-medium">
                    Sisterhood Gift Packaging &amp; Note
                  </h4>
                  <p className="font-body-sm text-xs text-[#524343]">
                    Signature rigid box, rose seal &amp; handwritten calligraphy card
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-xs text-[#844c4e] uppercase font-bold">
                    Complimentary
                  </span>
                </div>
              </div>
            </div>

            {/* Price Calculation */}
            <div className="bg-[#FAF8F5] p-4 rounded-lg space-y-2 text-xs border border-[#E8DFD8]">
              <div className="flex justify-between text-[#524343]">
                <span>Subtotal</span>
                <span className="text-[#2B2523] font-medium">₹818.00</span>
              </div>
              <div className="flex justify-between text-[#524343]">
                <span>Studio Dispatch (Baroda to Baroda Express)</span>
                <span className="text-[#546040] font-medium uppercase font-label-caps">FREE</span>
              </div>
              <div className="flex justify-between text-[#524343]">
                <span>Boutique Gift Packaging</span>
                <span className="text-[#546040] font-medium uppercase font-label-caps">Complimentary</span>
              </div>
              <div className="flex justify-between text-[#524343]">
                <span>Estimated Taxes (GST 5% Included)</span>
                <span className="text-[#2B2523] font-medium">₹39.00</span>
              </div>
              <div className="pt-2 flex justify-between items-baseline font-headline-sm text-base text-[#2B2523] border-t border-[#f2e6e2]">
                <span className="font-medium">Total Paid</span>
                <div className="text-right">
                  <span className="font-semibold text-[#844c4e] text-lg">₹818.00</span>
                  <p className="font-label-caps text-[10px] text-[#655d56] tracking-widest uppercase">
                    Via UPI ({checkoutDetails.upiVpa || 'amina@oksbi'}) • Verified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Shipping & Delivery Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5EFEB] p-5 sm:p-7 rounded-xl shadow-sm space-y-4 border border-[#D8CCC4]/40">
              <div>
                <div className="flex items-center gap-1.5 text-[#BA7A7C] mb-1">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                    Shipping Destination
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">
                  {checkoutDetails.firstName} {checkoutDetails.lastName}
                </h3>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#524343] leading-relaxed">
                {checkoutDetails.streetAddress}
                <br />
                {checkoutDetails.landmark}
                <br />
                {checkoutDetails.city}, {checkoutDetails.state} — {checkoutDetails.pincode}
                <br />
                India
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-[#524343]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">mail</span>
                  <span>{checkoutDetails.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">chat</span>
                  <span>
                    +91 {checkoutDetails.phone}{' '}
                    <span className="text-[#655d56] font-medium">(WhatsApp tracking active)</span>
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-lg flex items-center justify-between border border-[#E8DFD8]">
                <div>
                  <p className="font-label-caps text-[10px] text-[#655d56] uppercase tracking-widest font-semibold">
                    Delivery Method
                  </p>
                  <p className="font-body-sm text-xs text-[#2B2523] font-medium mt-0.5">
                    Standard Studio Courier
                  </p>
                  <p className="font-body-sm text-[11px] text-[#524343]">
                    BlueDart / Delhivery Express Partner
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#BA7A7C] text-3xl">
                  markunread_mailbox
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => setShowTrackingModal(true)}
                className="flex-1 py-3 px-4 bg-[#BA7A7C] hover:bg-[#844c4e] text-white font-label-md text-xs rounded text-center transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                Track My Order
              </button>
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 px-4 bg-[#F5EFEB] hover:bg-[#ece0dd] text-[#2B2523] font-label-md text-xs rounded text-center transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center font-medium cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ORDER TRACKING TIMELINE ("WE'LL KEEP YOU UPDATED") */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="bg-[#fdf1ed] p-6 lg:p-10 rounded-xl shadow-sm border border-[#ece0dd]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-[0.2em] mb-1 font-semibold">
              Status Overview
            </p>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] mb-2 font-normal">
              We’ll Keep You Updated
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#524343]">
              From our hands to your doorstep, you can follow your order every step of the way.
            </p>
          </div>

          {/* 6-Stage Timeline Bar */}
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-[#E8DFD8]">
              <div className="h-full bg-[#BA7A7C] w-[18%] transition-all duration-700"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center relative z-10">
              {/* Stage 1 (Active) */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#BA7A7C] text-white flex items-center justify-center shadow-md ring-4 ring-[#C68B8D]/20 mb-3">
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                </div>
                <span className="font-label-caps text-[11px] font-semibold text-[#BA7A7C] uppercase tracking-wider">
                  1. Order Placed
                </span>
                <p className="font-body-sm text-xs text-[#2B2523] font-medium mt-1">Today, 10:42 AM</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">Order received</p>
              </div>

              {/* Stage 2 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#655d56] flex items-center justify-center shadow-sm mb-3 border border-[#E8DFD8]">
                  <span className="material-symbols-outlined text-[22px]">check_circle</span>
                </div>
                <span className="font-label-caps text-[11px] font-medium text-[#2B2523] uppercase tracking-wider">
                  2. Confirmed
                </span>
                <p className="font-body-sm text-xs text-[#655d56] mt-1">Today, 10:45 AM</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">Verified &amp; inspected</p>
              </div>

              {/* Stage 3 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#655d56] flex items-center justify-center shadow-sm mb-3 border border-[#E8DFD8]">
                  <span className="material-symbols-outlined text-[22px]">dry_cleaning</span>
                </div>
                <span className="font-label-caps text-[11px] font-medium text-[#2B2523] uppercase tracking-wider">
                  3. Preparing
                </span>
                <p className="font-body-sm text-xs text-[#655d56] mt-1">In Queue</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">Hand-steaming &amp; QC</p>
              </div>

              {/* Stage 4 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#655d56] flex items-center justify-center shadow-sm mb-3 border border-[#E8DFD8]">
                  <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                </div>
                <span className="font-label-caps text-[11px] font-medium text-[#2B2523] uppercase tracking-wider">
                  4. Packed
                </span>
                <p className="font-body-sm text-xs text-[#655d56] mt-1">Est. Tomorrow</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">Wax-sealed with care</p>
              </div>

              {/* Stage 5 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#655d56] flex items-center justify-center shadow-sm mb-3 border border-[#E8DFD8]">
                  <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                </div>
                <span className="font-label-caps text-[11px] font-medium text-[#2B2523] uppercase tracking-wider">
                  5. Shipped
                </span>
                <p className="font-body-sm text-xs text-[#655d56] mt-1">Est. 26 Oct</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">On its way</p>
              </div>

              {/* Stage 6 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#655d56] flex items-center justify-center shadow-sm mb-3 border border-[#E8DFD8]">
                  <span className="material-symbols-outlined text-[22px]">home_pin</span>
                </div>
                <span className="font-label-caps text-[11px] font-medium text-[#2B2523] uppercase tracking-wider">
                  6. Delivered
                </span>
                <p className="font-body-sm text-xs text-[#655d56] mt-1">28–31 Oct</p>
                <p className="font-body-sm text-[11px] text-[#524343] mt-0.5">At your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PACKED WITH LOVE SECTION (Editorial Split) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="bg-[#F5EFEB] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center border border-[#D8CCC4]/40">
          <div className="lg:col-span-7 h-[340px] lg:h-[440px] relative">
            <img
              alt="Hand-packed Hijab Box packaging"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWtmSbABpq0Z7NDfVGeSu2VM7BglpbvSW6KlI1KyNJO9byDoPotDyAcMldKbBXKies3K5hkmZ7-jsmHfvWnehRPk-KOHlphqVDk2anLg1uZpXvarSToTa9SrJqlCCxX6TYDoJEjyyecHeeto0IUvRdEWsaYs2Ffr9KMfeJtDd4DMyv44jAMiZEgouwE_ZKJMnpbPrPf44pXemvRrr9rRCpYM2FQtZ_y0taLiQf2jTN_K7fKqKQHObg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2523]/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white font-label-caps text-xs tracking-widest uppercase font-semibold">
              Signature Baroda Packaging
            </div>
          </div>
          <div className="lg:col-span-5 p-6 lg:p-10 space-y-4">
            <p className="font-label-caps text-xs text-[#BA7A7C] tracking-[0.2em] uppercase font-semibold">
              Thoughtful Presentation
            </p>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] leading-tight font-normal">
              Packed with Love
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-[#524343] leading-relaxed">
              Your order isn’t just another package. We carefully prepare every order so that opening your Hijab Box feels just as special as choosing it.
            </p>
            <div className="space-y-2 font-body-sm text-xs text-[#2B2523] pt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">done_all</span>
                <span>Hand-steamed and wrinkle-inspected scarves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">done_all</span>
                <span>Delicately scented with organic Bulgarian rose &amp; oud whispers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">done_all</span>
                <span>Individually sealed with our signature wax emblem</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND MESSAGE & FAITH MOMENT */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 text-center w-full">
        <div className="bg-[#fdf1ed] py-12 px-6 lg:px-12 rounded-xl shadow-sm relative overflow-hidden border border-[#ece0dd]">
          <span className="material-symbols-outlined text-[#BA7A7C]/40 text-4xl mb-2 block mx-auto">
            auto_awesome
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2523] max-w-2xl mx-auto leading-snug mb-3 uppercase font-normal">
            “Modesty is beautiful. So is the way you wear it.”
          </h3>
          <p className="font-body-lg text-xs sm:text-sm text-[#524343] max-w-xl mx-auto mb-6 leading-relaxed">
            Thank you for allowing Hijab Box to be part of your wardrobe, your everyday moments, and your quiet celebrations.
          </p>
          {/* Quranic Verse */}
          <div className="max-w-lg mx-auto p-4 bg-[#FAF8F5] rounded-lg shadow-sm border border-[#E8DFD8]">
            <p className="font-serif text-base sm:text-lg text-[#2B2523] italic leading-relaxed">
              “Tell the believing men and believing women to lower their gaze and guard their modesty.”
            </p>
            <p className="font-label-caps text-xs text-[#844C4E] tracking-widest uppercase mt-2 font-semibold">
              Surah An-Nur (24:30–31)
            </p>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER SUPPORT & SISTERHOOD CONCIERGE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="bg-[#F5EFEB] p-6 lg:p-10 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D8CCC4]/40">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <p className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-[0.2em] font-semibold">
              Sisterhood Care
            </p>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] font-normal">
              Need anything? We’re here.
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#524343] pt-1">
              Questions about your order? Need help with delivery? Just want to talk to us? We’d be delighted to assist you directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/919512607726"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-[#FAF8F5] hover:bg-[#ece0dd] text-[#2B2523] font-label-md text-xs rounded shadow-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-[#BA7A7C] text-[20px]">chat</span>
              Chat on WhatsApp
            </a>
            <a
              href="mailto:hijabbox13@gmail.com"
              className="py-3 px-5 bg-[#BA7A7C] hover:bg-[#844c4e] text-white font-label-md text-xs rounded shadow-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-white text-[20px]">mail</span>
              Email Studio Concierge
            </a>
          </div>
        </div>
      </section>

      {/* 8. DISCOVER MORE ("WHEN YOU'RE READY FOR MORE") */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <p className="font-label-caps text-xs text-[#BA7A7C] tracking-[0.2em] uppercase font-semibold">
              Curated Additions
            </p>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] font-normal">
              When You’re Ready for More
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#524343] mt-0.5">
              Discover more thoughtfully curated pieces from Hijab Box.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-label-caps text-xs text-[#844C4E] hover:text-[#BA7A7C] uppercase tracking-widest flex items-center gap-1 transition-colors text-left"
          >
            <span>View Full Archive</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* 4-Item Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {curatedAdditions.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FAF8F5] rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300 border border-[#E8DFD8]"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[#f7ebe8]">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[#2B2523] font-label-caps text-[10px] uppercase font-semibold">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-body-md text-sm text-[#2B2523] font-medium group-hover:text-[#844C4E] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="font-body-sm text-xs text-[#655d56] truncate mt-0.5">
                    {product.subCategory}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#f2e6e2] flex items-center justify-between">
                  <span className="font-body-md text-sm text-[#2B2523] font-semibold">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-1.5 rounded-full text-[#655d56] hover:text-[#BA7A7C] transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM & FINAL EMOTIONAL CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-16 w-full">
        <div className="text-center mb-6">
          <p className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-[0.22em] mb-1 font-semibold">
            Stay Close
          </p>
          <h3 className="font-headline-md text-xl sm:text-2xl text-[#2B2523] font-medium">
            Follow our journey @hijabox__
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {instagramShots.map((shot, i) => (
            <a
              key={i}
              href="https://www.instagram.com/hijabox__/"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-lg overflow-hidden bg-[#f7ebe8] shadow-sm group relative block"
            >
              <img
                src={shot.img}
                alt={shot.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#2B2523]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
              </div>
            </a>
          ))}
        </div>

        {/* Closing Emotional Box */}
        <div className="bg-[#f2e6e2] py-10 px-6 text-center rounded-xl shadow-md max-w-2xl mx-auto border border-[#D8CCC4]/50">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2523] mb-2 font-normal">
            Thank you for being here.
          </h3>
          <p className="font-body-lg text-sm sm:text-base text-[#524343] mb-6">
            We can’t wait for your Hijab Box to reach you.
            <br />
            <span className="italic font-serif text-[#844C4E] text-base sm:text-lg">
              With love, from our family to yours. ♡
            </span>
          </p>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex py-3 px-8 bg-[#BA7A7C] hover:bg-[#844c4e] text-white font-label-md text-xs rounded uppercase tracking-widest transition-colors shadow-sm font-semibold cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </section>

      {/* Tracking Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 z-50 bg-[#2B2523]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#D8CCC4]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label-caps text-xs text-[#BA7A7C] uppercase font-semibold">
                  Live Dispatch Status
                </span>
                <h3 className="font-headline-sm text-xl text-[#2B2523] mt-0.5">Order {lastOrderId}</h3>
              </div>
              <button
                onClick={() => setShowTrackingModal(false)}
                className="text-[#524343] hover:text-[#2B2523]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 bg-[#fdf1ed] rounded-lg mb-4 text-xs text-[#524343] space-y-1">
              <p>
                <strong>Courier Partner:</strong> BlueDart Express (Air Cargo)
              </p>
              <p>
                <strong>Tracking AWB:</strong> BD892041289IN
              </p>
              <p>
                <strong>Origin:</strong> Baroda Central Studio, Gujarat
              </p>
              <p>
                <strong>Destination:</strong> Vadodara (Baroda) — 390001
              </p>
            </div>
            <div className="space-y-3 text-xs text-[#2B2523]">
              <div className="flex items-center gap-2 text-[#657150] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#657150] animate-pulse"></span>
                <span>Order Verified &amp; Hand-Inspection Underway</span>
              </div>
              <p className="text-[#524343]">
                Estimated handover to courier partner: Today, 5:00 PM IST. You will receive an SMS with live GPS link upon scan.
              </p>
            </div>
            <button
              onClick={() => setShowTrackingModal(false)}
              className="mt-6 w-full py-2.5 bg-[#BA7A7C] text-white text-xs uppercase font-label-md rounded font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
