import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart } = useCart();

  if (!wishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2B2523]/40 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-[#FAF8F5] border-b border-[#E8DFD8] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] uppercase text-[#BA7A7C] tracking-[0.2em] font-semibold">
                Your Sisterhood Keepsakes
              </span>
              <span className="font-headline-sm text-lg text-[#2B2523] font-medium">
                Saved Wishlist ({wishlist.length})
              </span>
            </div>
            <button
              onClick={() => setWishlistOpen(false)}
              className="text-[#524343] hover:text-[#2B2523] p-1"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 text-[#524343]">
                <span className="material-symbols-outlined text-4xl text-[#D8CCC4] mb-2">favorite_border</span>
                <p className="font-headline-sm text-base text-[#2B2523]">Your wishlist is empty</p>
                <p className="text-xs text-[#524343] mt-1">Tap the heart icon on any piece to save it here</p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="flex gap-3.5 items-center pb-3 border-b border-[#f2e6e2] last:border-0">
                  <div className="w-16 h-20 bg-[#F5EFEB] rounded overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline-sm text-sm text-[#2B2523] truncate">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#BA7A7C] hover:text-[#ba1a1a] p-1"
                        title="Remove from wishlist"
                      >
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-xs text-[#524343] truncate">
                      {product.subCategory}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-[#2B2523] text-sm">
                        ₹{product.price}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          toggleWishlist(product.id);
                        }}
                        className="px-3 py-1 bg-[#2B2523] hover:bg-[#BA7A7C] text-white text-[10px] font-label-caps uppercase rounded transition-colors"
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-5 bg-[#FAF8F5] border-t border-[#E8DFD8]">
            <button
              onClick={() => setWishlistOpen(false)}
              className="w-full py-2.5 bg-white border border-[#D8CCC4] hover:bg-[#F5EFEB] text-[#2B2523] font-label-sm uppercase rounded transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
