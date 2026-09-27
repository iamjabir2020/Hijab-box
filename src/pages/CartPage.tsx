import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cart,
    subtotal,
    total,
    itemCount,
    shippingFee,
    discount,
    promoCode,
    promoApplied,
    applyPromoCode,
    amountNeededForFreeShipping,
    shippingProgressPercent,
    updateQuantity,
    removeFromCart,
    addToCart,
    giftDetails,
    setGiftDetails,
    setDrawerOpen,
    setActivePage,
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = () => {
    if (applyPromoCode(inputPromo)) {
      setPromoError(false);
      setInputPromo('');
    } else {
      setPromoError(true);
    }
  };

  const recommendedProducts = [
    PRODUCTS.find((p) => p.id === 'chantilly-lace-hijab') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'pearl-loop-pins-set') || PRODUCTS[9],
    PRODUCTS.find((p) => p.id === 'arm-sleeve-extensions') || PRODUCTS[11],
    PRODUCTS.find((p) => p.id === 'watercolor-modal-hijab') || PRODUCTS[2],
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Page Atmosphere */}
      <div className="w-full bg-[#FAF8F5] py-5 border-b border-[#E8DFD8]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-1.5 text-[#524343] font-label-caps text-[11px] tracking-widest uppercase mb-3">
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#BA7A7C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-[#D8CCC4]">/</span>
            <span className="text-[#2B2523] font-semibold">Your Cart</span>
          </nav>

          {/* Editorial Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
            <div>
              <span className="font-label-caps uppercase text-[#BA7A7C] tracking-[0.2em] block mb-1 text-[11px] font-semibold">
                Faith Inspires Modesty
              </span>
              <h1 className="font-headline-xl text-3xl sm:text-4xl text-[#2B2523] font-normal tracking-tight">
                Your Shopping Bag{' '}
                <span className="font-body-md text-[#524343] text-base font-normal tracking-normal">
                  ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
                </span>
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-[#524343] mt-1">
                Curated with intention, prepared with love in our Baroda studio.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#524343] font-label-sm text-xs">
              <span className="material-symbols-outlined text-[18px] text-[#657150]">verified</span>
              <span>Sister-Owned • Dispatched via Express Courier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Milestone Indicator */}
      <div className="w-full bg-[#F5EFEB] py-3.5 shadow-sm border-b border-[#D8CCC4]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="bg-white p-3.5 rounded-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 border border-[#E8DFD8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#BA7A7C]/10 flex items-center justify-center text-[#BA7A7C] shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <p className="font-label-md text-xs sm:text-sm text-[#2B2523] font-medium">
                  {amountNeededForFreeShipping > 0 ? (
                    <>
                      You are only <span className="text-[#BA7A7C] font-bold">₹{amountNeededForFreeShipping}</span> away from{' '}
                      <span className="font-semibold underline decoration-[#BA7A7C] decoration-2">
                        Complimentary Domestic Shipping
                      </span>!
                    </>
                  ) : (
                    <span className="text-[#657150] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Complimentary Domestic Shipping Unlocked!
                    </span>
                  )}
                </p>
                <p className="font-body-sm text-xs text-[#524343]">
                  Complimentary luxury shipping applies to all orders over ₹899 across India.
                </p>
              </div>
            </div>

            {/* Progress Bar Meter */}
            <div className="w-full md:w-72 shrink-0 space-y-1">
              <div className="flex justify-between font-label-caps text-[11px] text-[#524343]">
                <span>₹{subtotal.toFixed(0)} Cart Value</span>
                <span className="text-[#BA7A7C] font-bold">{shippingProgressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-[#E8DFD8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#BA7A7C] rounded-full transition-all duration-700"
                  style={{ width: `${shippingProgressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bag Content & Summary Section */}
      <div className="w-full py-10 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* LEFT COLUMN: Cart Items & Custom Packaging (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Items List Container */}
              <div className="flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="bg-white p-12 rounded-lg text-center border border-[#E8DFD8] text-[#524343]">
                    <span className="material-symbols-outlined text-5xl text-[#D8CCC4] mb-3">shopping_bag</span>
                    <h3 className="font-headline-sm text-xl text-[#2B2523] mb-1 font-medium">Your Bag is Empty</h3>
                    <p className="text-sm text-[#524343] mb-6">
                      Explore our handcrafted hijabs and tactile essentials.
                    </p>
                    <button
                      onClick={() => setActivePage('shop')}
                      className="px-6 py-2.5 bg-[#BA7A7C] text-white font-label-sm uppercase rounded shadow hover:bg-[#844c4e] transition-colors"
                    >
                      Return to Archive
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 sm:p-5 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 relative group border border-[#E8DFD8]/80"
                    >
                      {/* Thumbnail */}
                      <div className="w-full sm:w-28 sm:h-36 shrink-0 rounded overflow-hidden bg-[#F5EFEB] relative">
                        <img
                          src={item.product.image}
                          alt={item.product.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.product.badge && (
                          <span className="absolute top-1 left-1 bg-[#844C4E] text-white font-label-caps text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider">
                            {item.product.badge}
                          </span>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-label-caps text-[10px] uppercase text-[#BA7A7C] tracking-widest font-semibold block">
                                {item.product.tag || item.product.subCategory}
                              </span>
                              <h2 className="font-headline-sm text-lg text-[#2B2523] font-medium hover:text-[#BA7A7C] transition-colors">
                                {item.product.name}
                              </h2>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              aria-label="Remove item"
                              className="text-[#524343] hover:text-[#BA7A7C] transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                          </div>

                          <div className="mt-2 space-y-0.5 font-body-sm text-xs text-[#524343]">
                            {item.selectedColor && (
                              <p className="flex items-center gap-1.5">
                                <span
                                  className="inline-block w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                                  style={{ backgroundColor: item.selectedColor }}
                                ></span>
                                <span>
                                  Shade:{' '}
                                  <strong>
                                    {item.product.id === 'ombre-rouge-modal'
                                      ? 'Crimson Dusk'
                                      : item.product.id === 'snag-free-hijab-magnets'
                                      ? 'Matte Sand & Earth Rose'
                                      : 'Taupe Heather'}
                                  </strong>
                                </span>
                              </p>
                            )}
                            <p>Dimensions: {item.product.dimensions || '180 × 90 cm (Generous Drape)'}</p>
                            <p className="text-[#657150] font-medium text-[12px] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span> In Stock •
                              Hand Finished
                            </p>
                          </div>
                        </div>

                        {/* Price & Controls */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f2e6e2]">
                          {/* Stepper */}
                          <div className="flex items-center bg-[#F5EFEB] rounded p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#2B2523] hover:bg-white rounded transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">remove</span>
                            </button>
                            <span className="w-8 text-center font-label-md text-xs font-semibold text-[#2B2523]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#2B2523] hover:bg-white rounded transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">add</span>
                            </button>
                          </div>

                          <div className="flex items-baseline gap-2">
                            {item.product.originalPrice && (
                              <span className="font-body-sm text-xs text-[#524343]/60 line-through">
                                ₹{item.product.originalPrice * item.quantity}
                              </span>
                            )}
                            <span className="font-headline-sm text-lg font-semibold text-[#2B2523]">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sisterhood Gifting Accordion / Customizer */}
              <div className="bg-[#F5EFEB] p-5 rounded-lg shadow-sm border border-[#D8CCC4]/50">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gift-toggle"
                    checked={giftDetails.isGift}
                    onChange={(e) =>
                      setGiftDetails((prev) => ({ ...prev, isGift: e.target.checked }))
                    }
                    className="mt-1 accent-[#BA7A7C] w-4 h-4 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="gift-toggle" className="cursor-pointer block">
                      <span className="font-headline-sm text-lg text-[#2B2523] block font-medium">
                        This is a Gift Order
                      </span>
                      <span className="font-body-sm text-xs text-[#524343] block mt-0.5">
                        Complimentary hand-calligraphed Sisterhood note card &amp; reusable embossed dust bag included with your parcel.
                      </span>
                    </label>

                    {/* Expandable Gift Details */}
                    {giftDetails.isGift && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-[#D8CCC4]/40">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-label-caps text-[10px] uppercase text-[#2B2523]/70 mb-1 font-semibold">
                              Recipient Name
                            </label>
                            <input
                              type="text"
                              value={giftDetails.recipientName}
                              onChange={(e) =>
                                setGiftDetails((prev) => ({ ...prev, recipientName: e.target.value }))
                              }
                              placeholder="e.g. Dearest Muna"
                              className="w-full bg-white px-3 py-2 text-[#201a18] font-body-sm text-xs rounded border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C]"
                            />
                          </div>
                          <div>
                            <label className="block font-label-caps text-[10px] uppercase text-[#2B2523]/70 mb-1 font-semibold">
                              Occasion / Note Tag
                            </label>
                            <select
                              value={giftDetails.occasion}
                              onChange={(e) =>
                                setGiftDetails((prev) => ({ ...prev, occasion: e.target.value }))
                              }
                              className="w-full bg-white px-3 py-2 text-[#201a18] font-body-sm text-xs rounded border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C]"
                            >
                              <option>Just Because • Sisterhood Love</option>
                              <option>Eid Mubarak Blessing</option>
                              <option>Nikah / Wedding Congratulations</option>
                              <option>New Hijab Journey Encouragement</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block font-label-caps text-[10px] uppercase text-[#2B2523]/70 mb-1 font-semibold">
                            Your Handwritten Message
                          </label>
                          <textarea
                            rows={2}
                            value={giftDetails.message}
                            onChange={(e) =>
                              setGiftDetails((prev) => ({ ...prev, message: e.target.value }))
                            }
                            placeholder="Write your words here; our Baroda studio sisters pen this in gold calligraphy ink..."
                            className="w-full bg-white px-3 py-2 text-[#201a18] font-body-sm text-xs rounded border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] resize-none"
                          />
                        </div>
                        <div className="flex items-center gap-1.5 text-[#BA7A7C] font-label-sm text-xs italic pt-1">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                          <span>Hand-wrapped in delicate blush tissue and sealed with our wax emblem.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Studio Fulfillment Dispatch Note */}
              <div className="bg-[#fdf1ed] p-4 rounded-lg flex items-center gap-3 text-[#524343] font-body-sm text-xs border border-[#ece0dd]">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[24px] shrink-0">
                  inventory_2
                </span>
                <p>
                  <strong className="text-[#2B2523] font-medium">Baroda Studio Hand-Pack:</strong> Orders dispatched within 24–48 hours via premium express couriers with real-time SMS tracking updates.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Checkout Card (5 cols) */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DFD8]">
                {/* Summary Title */}
                <div className="pb-3 border-b border-[#f2e6e2]">
                  <span className="font-label-caps text-[11px] uppercase text-[#BA7A7C] tracking-widest block font-semibold">
                    Cart Review
                  </span>
                  <h2 className="font-headline-md text-2xl text-[#2B2523] font-normal tracking-tight">
                    Order Summary
                  </h2>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 py-4 font-body-md text-sm border-b border-[#f2e6e2]">
                  <div className="flex justify-between items-center text-[#524343]">
                    <span>Bag Subtotal ({itemCount} items)</span>
                    <span className="text-[#2B2523] font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && discount > 0 && (
                    <div className="flex justify-between items-center text-[#657150]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">sell</span>
                        <span>Sisterhood Discount (Summer Edit)</span>
                      </span>
                      <span className="font-medium">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[#524343]">
                    <div className="flex flex-col">
                      <span>Standard Express Shipping</span>
                      <span className="text-[11px] text-[#BA7A7C]">Free shipping threshold at ₹899</span>
                    </div>
                    <span className="text-[#2B2523] font-medium">
                      {subtotal >= 899 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#524343]">
                    <span>Gift Packaging &amp; Calligraphy</span>
                    <span className="text-[#657150] font-medium uppercase font-label-caps text-[10px] tracking-wider bg-[#F5EFEB] px-2 py-0.5 rounded">
                      Complimentary
                    </span>
                  </div>
                </div>

                {/* Total Price Section */}
                <div className="py-4 flex justify-between items-baseline border-b border-[#f2e6e2]">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-lg font-medium text-[#2B2523]">Total Due</span>
                    <span className="font-body-sm text-[11px] text-[#524343]">
                      Includes all GST &amp; Indian domestic tariffs
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-lg text-2xl font-semibold text-[#2B2523]">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      placeholder="HAVE A PROMO CODE?"
                      className="w-full bg-[#F5EFEB] px-3 py-2.5 uppercase tracking-wider text-[#201a18] font-label-md text-xs placeholder:text-[#524343]/50 focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] rounded border border-[#D8CCC4]/50"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="absolute right-1 px-4 py-1.5 bg-[#2B2523] hover:bg-[#BA7A7C] text-white font-label-sm text-xs uppercase rounded transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[12px] text-[#657150] font-medium mt-1.5 inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      Code "{promoCode}" active (₹{discount} OFF saved)
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[12px] text-[#ba1a1a] font-medium mt-1 inline-block">
                      Invalid coupon code. Try "SISTERHOOD10"
                    </span>
                  )}
                </div>

                {/* Primary Checkout CTA */}
                <div className="pt-5 space-y-2.5">
                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      setActivePage('checkout');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-4 bg-[#BA7A7C] hover:bg-[#a06466] disabled:opacity-50 text-white font-label-md text-xs font-semibold uppercase tracking-wider text-center block rounded shadow hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Proceed to Checkout • ₹{total.toFixed(2)}
                  </button>
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-full py-2.5 px-4 bg-[#F5EFEB] hover:bg-[#E8DFD8] text-[#2B2523] font-label-sm text-xs uppercase tracking-wider text-center block rounded transition-colors cursor-pointer font-medium"
                  >
                    Toggle Quick Drawer Preview
                  </button>
                </div>

                {/* Express Payment Rails */}
                <div className="pt-4 text-center">
                  <span className="font-label-caps text-[10px] text-[#524343] uppercase tracking-widest block mb-2 font-semibold">
                    Guaranteed Safe &amp; Instant Payment
                  </span>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap text-[#524343] font-label-caps text-[10px]">
                    <span className="px-2.5 py-1 bg-[#F5EFEB] rounded font-semibold text-[#2B2523]">
                      UPI (GPay / PhonePe)
                    </span>
                    <span className="px-2.5 py-1 bg-[#F5EFEB] rounded font-semibold text-[#2B2523]">
                      Paytm
                    </span>
                    <span className="px-2.5 py-1 bg-[#F5EFEB] rounded font-semibold text-[#2B2523]">
                      Visa / Mastercard
                    </span>
                    <span className="px-2.5 py-1 bg-[#F5EFEB] rounded font-semibold text-[#2B2523]">
                      NetBanking
                    </span>
                  </div>
                </div>

                {/* Trust Markers */}
                <div className="mt-4 pt-4 border-t border-[#f2e6e2] space-y-2">
                  <div className="flex items-center gap-2 text-[#524343] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">verified_user</span>
                    <span>100% Authentic Eco-Certified Lenzing Modal</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#524343] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">cached</span>
                    <span>Hassle-Free 7-Day Exchange &amp; Sisterhood Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#524343] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[18px]">lock</span>
                    <span>Bank-Grade 256-Bit SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Cross-Sell / "You May Also Love" Section */}
      <section className="w-full bg-[#F5EFEB] py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div>
              <span className="font-label-caps uppercase text-[#BA7A7C] tracking-[0.2em] block mb-1 text-[11px] font-semibold">
                Add to Your Box &amp; Unlock Free Shipping
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] font-normal tracking-tight">
                You May Also Love
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#524343] mt-1">
                Frequently matched with your selected modal drape &amp; palette.
              </p>
            </div>
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-label-caps text-xs uppercase text-[#2B2523] hover:text-[#BA7A7C] transition-colors underline underline-offset-4 tracking-widest text-left"
            >
              View Full Collection →
            </button>
          </div>

          {/* 4-Card Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group border border-[#E8DFD8]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#2B2523] text-white font-label-caps text-[9px] px-2 py-0.5 uppercase tracking-widest rounded">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#BA7A7C] uppercase tracking-wider block font-semibold">
                      {p.subCategory}
                    </span>
                    <h3 className="font-headline-sm text-base text-[#2B2523] mt-0.5 line-clamp-1 font-medium">
                      {p.name}
                    </h3>
                    <p className="font-body-sm text-xs text-[#524343] line-clamp-1 mt-0.5">
                      {p.fabricDetails || 'Tactile luxury weave'}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f2e6e2] flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      {p.originalPrice && (
                        <span className="font-body-sm text-xs text-[#524343] line-through">
                          ₹{p.originalPrice}
                        </span>
                      )}
                      <span className="font-label-md text-sm font-semibold text-[#2B2523]">
                        ₹{p.price}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-3 py-1.5 bg-[#F5EFEB] hover:bg-[#BA7A7C] hover:text-white text-[#2B2523] font-label-caps text-[10px] uppercase font-semibold rounded transition-colors duration-200 cursor-pointer"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sisterhood Values / Modesty Reflection Banner */}
      <div className="w-full bg-[#FAF8F5] py-14 border-t border-[#E8DFD8]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-[#BA7A7C] block mb-2 font-semibold">
            ✦ FAITH INSPIRES MODESTY ✦
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl text-[#2B2523] max-w-2xl mx-auto italic mb-2">
            “Tell the believing men and believing women to lower their gaze and guard their modesty.”
          </blockquote>
          <p className="font-body-sm text-xs text-[#524343] tracking-wide">
            Surah An-Nur (24:30–31) • Baroda Sister-Owned Legacy Since 2024
          </p>
        </div>
      </div>
    </div>
  );
};
