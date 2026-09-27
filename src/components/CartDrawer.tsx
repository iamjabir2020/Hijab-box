import React from 'react';
import { useCart } from '../context/CartContext';
import { to4kUrl, handleImageError } from '../utils/imageUtils';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    drawerOpen,
    setDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    amountNeededForFreeShipping,
    shippingProgressPercent,
    setActivePage,
    itemCount,
  } = useCart();

  if (!drawerOpen) return null;

  const handleCheckout = () => {
    setDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCart = () => {
    setDrawerOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2B2523]/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Top Header */}
          <div className="p-5 bg-[#FAF8F5] border-b border-[#E8DFD8] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] uppercase text-[#BA7A7C] tracking-[0.2em] font-semibold">
                Quick Drawer View
              </span>
              <span className="font-headline-sm text-lg text-[#2B2523] font-medium">
                Your Shopping Bag ({itemCount})
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-[#524343] hover:text-[#2B2523] p-1 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Drawer Free Shipping Reminder */}
          <div className="bg-[#fdf1ed] px-5 py-2.5 flex items-center justify-between text-xs text-[#524343] border-b border-[#ece0dd]">
            {amountNeededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-[#BA7A7C]">₹{amountNeededForFreeShipping}</strong> for free express shipping
              </span>
            ) : (
              <span className="text-[#657150] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                You unlocked Complimentary Express Shipping!
              </span>
            )}
            <span className="font-label-caps text-[11px] font-bold text-[#BA7A7C]">
              {shippingProgressPercent}%
            </span>
          </div>

          {/* Drawer Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-[#524343]">
                <span className="material-symbols-outlined text-4xl text-[#D8CCC4] mb-2">shopping_bag</span>
                <p className="font-headline-sm text-base text-[#2B2523]">Your bag is currently empty</p>
                <p className="text-xs text-[#524343] mt-1">Discover our newly curated modal fabric drapes</p>
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setActivePage('shop');
                  }}
                  className="mt-4 px-5 py-2 bg-[#BA7A7C] text-white text-xs font-semibold rounded uppercase tracking-wider hover:bg-[#844c4e] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3.5 items-center pb-3 border-b border-[#f2e6e2] last:border-0">
                  <div className="w-16 h-20 bg-[#F5EFEB] rounded overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={to4kUrl(item.product.image)}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline-sm text-sm text-[#2B2523] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#847373] hover:text-[#ba1a1a] transition-colors ml-1"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-xs text-[#524343] truncate">
                      {item.product.dimensions || item.product.subCategory}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-[#F5EFEB] rounded px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#2B2523] hover:text-[#BA7A7C] px-1 text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-medium px-2 text-[#2B2523]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#2B2523] hover:text-[#BA7A7C] px-1 text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-[#2B2523] text-sm">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FAF8F5] border-t border-[#E8DFD8] space-y-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-label-caps uppercase text-[#524343] text-xs">
                  Estimated Subtotal
                </span>
                <span className="font-headline-sm text-lg font-semibold text-[#2B2523]">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#BA7A7C] hover:bg-[#844c4e] text-white font-label-md uppercase text-center block rounded transition-colors font-medium shadow-sm cursor-pointer"
              >
                Checkout Now
              </button>
              <button
                onClick={handleViewCart}
                className="w-full py-2.5 bg-white border border-[#D8CCC4] hover:bg-[#F5EFEB] text-[#2B2523] font-label-sm uppercase text-center block rounded transition-colors font-medium"
              >
                View Full Bag ({itemCount})
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center font-label-caps text-[11px] uppercase tracking-wider text-[#524343] hover:text-[#BA7A7C] pt-1 transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
