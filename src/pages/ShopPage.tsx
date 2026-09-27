import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct, setActivePage } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('Curated Editorial');
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Fabric: All',
    'Palette: Earth & Rose',
    'In Stock Only',
  ]);
  const [loadedCount, setLoadedCount] = useState<number>(12);

  const categories = [
    { id: 'all', label: 'All (48)' },
    { id: 'modal', label: 'Modal' },
    { id: 'chiffon', label: 'Chiffon' },
    { id: 'jersey', label: 'Jersey' },
    { id: 'organza', label: 'Organza' },
    { id: 'printed', label: 'Printed' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'boxes', label: 'Hijab Boxes', icon: 'redeem' },
  ];

  const removeFilter = (filterName: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterName));
  };

  // Filter products based on category
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'modal') return p.category === 'modal';
    if (selectedCategory === 'chiffon') return p.category === 'chiffon';
    if (selectedCategory === 'jersey') return p.category === 'jersey';
    if (selectedCategory === 'organza') return p.category === 'organza';
    if (selectedCategory === 'printed') return p.category === 'printed';
    if (selectedCategory === 'accessories') return p.category === 'accessories';
    if (selectedCategory === 'boxes') return p.category === 'boxes';
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'Price: Low to High') return a.price - b.price;
    if (sortOption === 'Price: High to Low') return b.price - a.price;
    if (sortOption === 'Best Selling') return b.reviewsCount - a.reviewsCount;
    return 0; // Curated Editorial / default
  });

  const displayedProducts = sortedProducts.slice(0, loadedCount);

  return (
    <div className="flex flex-col w-full">
      {/* SHOP HERO: Editorial Banner */}
      <section className="relative w-full bg-[#fdf1ed] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d6c2c1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-[1px] bg-[#BA7A7C]"></span>
                <span className="font-label-caps text-[11px] uppercase text-[#BA7A7C] tracking-[0.2em] font-semibold">
                  The Catalogue
                </span>
              </div>
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-[56px] text-[#2B2523] leading-none tracking-tight">
                SHOP THE <span className="italic font-serif text-[#844C4E]">ARCHIVE</span>
              </h1>
              <p className="font-body-lg text-[#524343] max-w-xl leading-relaxed pt-1 text-base sm:text-lg">
                Thoughtfully curated hijabs, tactile essentials, and handcrafted keepsake boxes designed for effortless modesty and quiet, enduring elegance.
              </p>
              {/* Key Material Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[#524343] font-label-caps text-[11px] uppercase">
                <span className="px-3 py-1 bg-[#FAF8F5] rounded-full shadow-sm">100% Lenzing Modal</span>
                <span className="px-3 py-1 bg-[#FAF8F5] rounded-full shadow-sm">Crêpe Georgette</span>
                <span className="px-3 py-1 bg-[#FAF8F5] rounded-full shadow-sm">Four-Way Jersey</span>
                <span className="px-3 py-1 bg-[#FAF8F5] rounded-full shadow-sm">Sister-Owned</span>
              </div>
            </div>

            {/* Editorial Vignette Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-[#f7ebe8]">
                <img
                  className="w-full h-full object-cover"
                  alt="Editorial still life of luxurious folded modal and silk chiffon hijabs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRoKQBvENBHsy5Q0Zq9fs-nxRGsJVVI7v7BcnX112rj1WWe0bAbbeR8ABDdwRYxQHtoEALJVYX3qQUZNloCIXD0P916CQLQSDxl7VMWebkdKWkyj5Hrou7aGPCinXcCIuSpaypvz5nNT1sXZaexZ9HncsMcf3GEG2cjI9hCSUCUQWRXBYGfdNWjRNL5rp_oGiSDu2eVwQAcVSJRdxF5xjOycjAlIYmX1RGi5ujXR9A_FcJxu4f9X8a"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2523]/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF8F5]">
                  <div>
                    <span className="font-label-caps text-[10px] tracking-widest uppercase opacity-90 block">
                      Capsule Curations
                    </span>
                    <p className="font-serif text-xl italic leading-tight text-white">
                      Touch the Weaves
                    </p>
                  </div>
                  <span className="text-[11px] font-label-caps bg-[#FAF8F5]/25 backdrop-blur-md px-3 py-1 rounded-full uppercase text-white font-medium">
                    48 Pieces
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS & NAVIGATION */}
      <section className="w-full bg-[#FAF8F5] shadow-sm sticky top-20 z-30 border-b border-[#E8DFD8]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center overflow-x-auto py-3 gap-2 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full font-label-caps text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2B2523] text-white shadow-sm font-semibold'
                      : cat.icon
                      ? 'bg-[#F5EFEB] hover:bg-[#ece0dd] text-[#BA7A7C] flex items-center gap-1 font-semibold'
                      : 'bg-[#F5EFEB] hover:bg-[#ece0dd] text-[#524343]'
                  }`}
                >
                  {cat.icon && <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLBAR: Filters, Active Pills, Sort & View Modes */}
      <section className="w-full bg-[#fff8f6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-8 pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F5EFEB]/70 p-3 rounded-lg shadow-sm border border-[#D8CCC4]/40">
            {/* Left Filter Trigger & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (activeFilters.length === 0) {
                    setActiveFilters(['Fabric: All', 'Palette: Earth & Rose', 'In Stock Only']);
                  } else {
                    setActiveFilters([]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2B2523] text-white rounded-lg font-label-sm uppercase tracking-wider hover:bg-[#1F1B1A] transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Filters
              </button>
              <span className="h-4 w-[1px] bg-[#D8CCC4] hidden sm:block"></span>

              {/* Active Filter Tags */}
              {activeFilters.map((filter) => (
                <div
                  key={filter}
                  className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full text-[#524343] font-label-caps text-[10px] shadow-sm"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:text-[#BA7A7C] transition-colors cursor-pointer"
                    aria-label={`Remove filter ${filter}`}
                  >
                    <span className="material-symbols-outlined text-[12px] align-middle">close</span>
                  </button>
                </div>
              ))}

              <span className="font-label-caps text-[11px] uppercase text-[#524343]/70 tracking-widest pl-2">
                {sortedProducts.length} Pieces
              </span>
            </div>

            {/* Right Sort & Layout Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="shop-sort" className="font-label-caps uppercase text-[#524343] text-[11px]">
                  Sort:
                </label>
                <div className="relative">
                  <select
                    id="shop-sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white pl-3 pr-8 py-1.5 rounded-lg text-[#201a18] font-label-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] cursor-pointer shadow-sm border border-[#D8CCC4]/40"
                  >
                    <option>Curated Editorial</option>
                    <option>Newest Arrivals</option>
                    <option>Best Selling</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#524343] text-[16px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Column View Toggle */}
              <div className="hidden sm:flex items-center bg-white p-1 rounded-lg shadow-sm gap-1 border border-[#D8CCC4]/40">
                <button
                  onClick={() => setGridColumns(3)}
                  aria-label="3 Columns"
                  className={`p-1 rounded transition-colors ${
                    gridColumns === 3
                      ? 'bg-[#F5EFEB] text-[#2B2523] shadow-sm'
                      : 'text-[#524343] hover:text-[#2B2523] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  aria-label="4 Columns"
                  className={`p-1 rounded transition-colors ${
                    gridColumns === 4
                      ? 'bg-[#F5EFEB] text-[#2B2523] shadow-sm'
                      : 'text-[#524343] hover:text-[#2B2523] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOGUE: Editorial Grid */}
      <section className="w-full bg-[#fff8f6] pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-6`}
          >
            {displayedProducts.map((product: Product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[#F5EFEB]/40 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-[#D8CCC4]/30"
                >
                  {/* Image container */}
                  <div className="relative w-full aspect-[3/4] bg-[#f7ebe8] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onClick={() => setQuickViewProduct(product)}
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 font-label-caps text-[10px] uppercase rounded-full shadow-sm tracking-wider font-semibold ${
                            product.badge === 'Sale'
                              ? 'bg-[#844C4E] text-white'
                              : product.badge === 'Bestseller' || product.badge === 'Top Rated'
                              ? 'bg-[#546040] text-white'
                              : product.badge === 'Essential'
                              ? 'bg-[#2B2523] text-white'
                              : product.badge === 'New'
                              ? 'bg-[#655D56] text-white'
                              : 'bg-[#657150] text-white'
                          }`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      aria-label="Add to Wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md text-[#2B2523] flex items-center justify-center hover:text-[#BA7A7C] hover:bg-[#FAF8F5] shadow-sm transition-colors cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{
                          color: inWish ? '#BA7A7C' : undefined,
                          fontVariationSettings: inWish ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        favorite
                      </span>
                    </button>

                    {/* Quick Add Slide Up */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2.5 bg-[#2B2523]/95 backdrop-blur-md text-white font-label-sm uppercase rounded shadow-lg hover:bg-[#BA7A7C] transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium text-xs tracking-wider"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        Quick Add • ₹{product.price}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-1.5">
                    <div>
                      <span className="font-label-caps text-[10px] uppercase text-[#BA7A7C] tracking-widest block font-semibold">
                        {product.subCategory}
                      </span>
                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-headline-sm text-lg text-[#2B2523] tracking-tight mt-0.5 group-hover:text-[#844C4E] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-[#BA7A7C] text-[13px]">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[14px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="text-[12px] text-[#524343]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-sm text-lg font-semibold text-[#2B2523]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-[#524343]/60">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Swatches */}
                      {product.colors && (
                        <div className="flex items-center gap-1">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full shadow-sm border border-white"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION / PROGRESS */}
          <div className="flex flex-col items-center justify-center mt-14 space-y-3">
            <div className="w-48 h-1 bg-[#ece0dd] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#BA7A7C] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (displayedProducts.length / 48) * 100)}%` }}
              ></div>
            </div>
            <span className="font-label-caps uppercase text-[#524343] tracking-widest text-[11px]">
              Showing {displayedProducts.length} of 48 pieces
            </span>
            {displayedProducts.length < sortedProducts.length && (
              <button
                onClick={() => setLoadedCount((prev) => Math.min(sortedProducts.length, prev + 8))}
                className="px-8 py-3 rounded-lg bg-[#F5EFEB] hover:bg-[#ece0dd] text-[#2B2523] font-label-md uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 group cursor-pointer text-xs font-semibold"
              >
                <span>Load More Products</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">
                  expand_more
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SHOP DISCOVERY EDITORIAL BANNER */}
      <section className="w-full bg-[#fdf1ed] py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="bg-[#F5EFEB] rounded-xl overflow-hidden shadow-xl border border-[#D8CCC4]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Image Split */}
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/11]">
                <img
                  className="w-full h-full object-cover"
                  alt="Editorial lifestyle photo of modern Muslim woman in Baroda studio adjusting her drape hijab in front of a curved mirror"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC9P2JfTcpOJWaQtNzCFWjoQHIix2ONbosImF6f9Z1hukaojYSBW_dbB3e_ato5JzZvtmT2-TYumzdNJyQn9gPOQ4iAA8iFxSYEEUWoPt1gJIuNihrDLruL0wtyk4DrH22j7LcaOOSXl4jttmvWWOOawIkUJFUDvwIuSA8c4y9SvuEv-ZbRuSY2uGYIOo7W37fOOUlU9LIAHbgdiRMtg0N2EAwLbjohb_i4Mytt2qne6XOJjUiye7v"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B2523]/30 via-transparent to-transparent hidden lg:block"></div>
              </div>

              {/* Content Split */}
              <div className="lg:col-span-6 p-6 lg:p-12 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-[#BA7A7C]"></span>
                  <span className="font-label-caps uppercase text-[#BA7A7C] tracking-[0.2em] text-[11px] font-semibold">
                    Sisterhood Note
                  </span>
                </div>
                <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#2B2523] leading-tight font-normal">
                  Find Your Everyday <span className="italic font-serif text-[#844C4E]">Favourite</span>
                </h2>
                <p className="font-body-md text-[#524343] leading-relaxed text-sm sm:text-base">
                  From breathable day-long errands to festive weekend gatherings, each scarf is spun from carefully engineered natural modal and wrinkle-resistant weaves. We inspect every seam in Baroda so modesty feels second nature.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setActivePage('customize');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded bg-[#BA7A7C] hover:bg-[#a06466] text-white font-label-md uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer font-medium text-xs"
                  >
                    <span>Customize A Gift Box</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('story');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded bg-transparent hover:bg-[#FAF8F5] text-[#2B2523] font-label-md uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm border border-[#D8CCC4] cursor-pointer font-medium text-xs"
                  >
                    <span>Fabric Transparency Guide</span>
                  </button>
                </div>

                {/* Assurance Mini-Badges */}
                <div className="pt-4 grid grid-cols-2 gap-3 text-[#524343]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[20px]">local_shipping</span>
                    <span className="font-label-caps text-[11px] uppercase tracking-wide">
                      Pan-India Fast Dispatch
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#BA7A7C] text-[20px]">verified</span>
                    <span className="font-label-caps text-[11px] uppercase tracking-wide">
                      100% Breathable Lenzing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
