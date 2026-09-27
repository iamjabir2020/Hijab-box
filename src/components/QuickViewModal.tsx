import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { to4kUrl, handleImageError } from '../utils/imageUtils';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || (quickViewProduct.colors && quickViewProduct.colors[0]) || '';
  const inWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B2523]/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[#D8CCC4]/50 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#2B2523] flex items-center justify-center hover:bg-white shadow transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-[#F5EFEB]">
            <img
              src={to4kUrl(quickViewProduct.image)}
              alt={quickViewProduct.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={handleImageError}
            />
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#844C4E] text-white font-label-caps text-[10px] uppercase rounded-full shadow-sm">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-label-caps uppercase text-[#BA7A7C] text-xs tracking-widest block">
                {quickViewProduct.subCategory}
              </span>
              <h2 className="font-headline-md text-2xl text-[#2B2523] mt-1 font-normal">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#BA7A7C] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#524343]">({quickViewProduct.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-headline-sm text-2xl text-[#2B2523] font-medium">
                  ₹{quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#847373] line-through">
                    ₹{quickViewProduct.originalPrice}
                  </span>
                )}
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-[#657150] font-semibold uppercase">
                    Save ₹{quickViewProduct.originalPrice - quickViewProduct.price}
                  </span>
                )}
              </div>

              {quickViewProduct.fabricDetails && (
                <p className="text-sm text-[#524343] mt-3 leading-relaxed">
                  {quickViewProduct.fabricDetails}
                </p>
              )}

              {quickViewProduct.dimensions && (
                <div className="mt-3 py-2 px-3 bg-[#FAF8F5] rounded border border-[#E8DFD8] text-xs text-[#524343] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#BA7A7C] text-[16px]">straighten</span>
                  <span>{quickViewProduct.dimensions}</span>
                </div>
              )}

              {/* Color Swatches */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mt-4">
                  <span className="font-label-caps text-[11px] uppercase text-[#524343] tracking-wider block mb-2">
                    Available Shades
                  </span>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all shadow-sm ${
                          currentColor === c ? 'border-[#BA7A7C] scale-110 ring-2 ring-[#BA7A7C]/20' : 'border-white'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#f2e6e2] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#F5EFEB] rounded p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#2B2523] hover:bg-white rounded"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium text-sm text-[#2B2523]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#2B2523] hover:bg-white rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#2B2523] hover:bg-[#BA7A7C] text-white font-label-md text-xs uppercase rounded transition-colors shadow flex items-center justify-center gap-2 font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {added ? 'check' : 'add_shopping_cart'}
                  </span>
                  {added ? 'Added to Bag!' : `Add to Bag • ₹${quickViewProduct.price * quantity}`}
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`w-11 h-11 rounded border border-[#D8CCC4] flex items-center justify-center transition-colors ${
                    inWish ? 'text-[#BA7A7C] border-[#BA7A7C] bg-[#FAF8F5]' : 'text-[#524343] hover:text-[#BA7A7C]'
                  }`}
                  title={inWish ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: inWish ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#657150] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                  Dispatches within 24–48 hours
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Hand-inspected in Baroda
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
