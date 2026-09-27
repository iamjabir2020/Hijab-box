import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { to4kUrl, handleImageError } from '../utils/imageUtils';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, addToCart, setQuickViewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  if (!searchOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.fabricDetails && p.fabricDetails.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B2523]/50 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-12">
      <div className="bg-[#FAF8F5] rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[#D8CCC4]/50 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-5 border-b border-[#D8CCC4]/50 flex items-center gap-3 bg-white">
          <span className="material-symbols-outlined text-[#BA7A7C] text-[24px]">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search modal hijabs, chantilly lace, chiffon, magnets, boxes..."
            autoFocus
            className="flex-1 bg-transparent text-base text-[#2B2523] placeholder-[#847373] focus:outline-none font-body-md"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#847373] hover:text-[#2B2523] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 text-[#524343] hover:text-[#2B2523] rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-5 py-3 bg-[#F5EFEB] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="font-label-caps uppercase text-[10px] text-[#524343] tracking-wider shrink-0">
            Categories:
          </span>
          {['all', 'modal', 'chiffon', 'jersey', 'organza', 'printed', 'accessories', 'boxes'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-full uppercase font-label-caps text-[10px] tracking-wider transition-colors shrink-0 ${
                selectedCat === cat
                  ? 'bg-[#2B2523] text-white shadow-sm'
                  : 'bg-white text-[#524343] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="flex justify-between items-center text-xs text-[#847373] pb-2">
            <span>{filtered.length} items found</span>
            {searchTerm && <span>Filtering for: "{searchTerm}"</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.slice(0, 8).map((product: Product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded-lg border border-[#E8DFD8] flex gap-3 items-center hover:border-[#BA7A7C] transition-all group"
              >
                <div
                  className="w-16 h-20 rounded bg-[#F5EFEB] overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => {
                    setQuickViewProduct(product);
                    setSearchOpen(false);
                  }}
                >
                  <img
                    src={to4kUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-label-caps text-[9px] uppercase text-[#BA7A7C] tracking-wider block">
                    {product.subCategory}
                  </span>
                  <h4
                    className="font-headline-sm text-sm text-[#2B2523] truncate cursor-pointer hover:text-[#BA7A7C]"
                    onClick={() => {
                      setQuickViewProduct(product);
                      setSearchOpen(false);
                    }}
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium text-sm text-[#2B2523]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#847373] line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="mt-2 text-[10px] font-label-caps uppercase text-[#844C4E] hover:text-[#BA7A7C] font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#847373]">
              <span className="material-symbols-outlined text-3xl mb-1 text-[#D8CCC4]">search_off</span>
              <p className="font-headline-sm text-base text-[#2B2523]">No pieces match your search</p>
              <p className="text-xs text-[#524343] mt-1">
                Try searching for "Modal", "Chiffon", "Magnets", or "Lace".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
