import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { LOGO_URL } from '../data/products';

export const Header: React.FC = () => {
  const {
    itemCount,
    wishlist,
    activePage,
    setActivePage,
    setDrawerOpen,
    setSearchOpen,
    setWishlistOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'SHOP HIJABS', key: 'shop' },
    { label: 'ACCESSORIES', key: 'accessories' },
    { label: 'HIJAB BOXES', key: 'boxes' },
    { label: 'CUSTOMIZE YOUR BOX', key: 'customize' },
    { label: 'OUR STORY', key: 'story' },
    { label: 'CONTACT', key: 'contact' },
    { label: 'SALE', key: 'sale' },
  ];

  const handleNavClick = (key: string) => {
    setActivePage(key);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD8]/40">
      {/* Top Banner Announcement */}
      <div className="bg-[#F5EFEB] py-2 px-4 sm:px-8 lg:px-16 text-center border-b border-[#D8CCC4]/30">
        <p className="font-label-caps uppercase text-[#2B2523] tracking-widest text-[11px] leading-tight">
          FREE SHIPPING ON ORDERS ABOVE ₹899 <span className="text-[#BA7A7C] mx-2">•</span> THOUGHTFULLY PACKED WITH LOVE
        </p>
      </div>

      {/* Main Nav Container */}
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-6">
        {/* Logo & Subtitle */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('shop')}
        >
          <img
            alt="Hijab Box Authentic Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col text-left">
            <span className="font-headline-sm font-medium tracking-tight text-[#2B2523]">
              HIJAB BOX
            </span>
            <span className="font-label-caps text-[9px] tracking-[0.2em] text-[#BA7A7C] uppercase -mt-1 font-semibold">
              Sister-Owned
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`font-label-caps uppercase py-1 text-[11px] tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#BA7A7C] border-b border-[#BA7A7C] font-semibold'
                    : 'text-[#524343] hover:text-[#201a18]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="p-1 text-[#524343] hover:text-[#201a18] transition-colors cursor-pointer"
            title="Search products"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setWishlistOpen(true)}
            aria-label="Wishlist"
            className="relative p-1 text-[#524343] hover:text-[#201a18] transition-colors cursor-pointer"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#BA7A7C] text-white font-label-caps text-[9px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <div
            className="w-8 h-8 rounded-full bg-[#844C4E] flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
            title="Amina Patel (Sister Profile)"
            onClick={() => handleNavClick('checkout')}
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>

          {/* Cart Icon & Flyout Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-1 text-[#524343] hover:text-[#201a18] transition-colors flex items-center cursor-pointer"
            title="View Cart"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#BA7A7C] text-white font-label-caps text-[10px] flex items-center justify-center font-semibold leading-none shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1 text-[#524343] hover:text-[#201a18] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-t border-[#D8CCC4]/40 px-6 py-4 shadow-lg flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`text-left font-label-caps uppercase py-2 text-[12px] tracking-wider ${
                activePage === item.key
                  ? 'text-[#BA7A7C] font-bold pl-2 border-l-2 border-[#BA7A7C]'
                  : 'text-[#201a18]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#D8CCC4]/40 flex gap-4 text-xs text-[#685e5b]">
            <button onClick={() => { setActivePage('cart'); setMobileMenuOpen(false); }} className="hover:text-[#BA7A7C]">
              View Cart ({itemCount})
            </button>
            <button onClick={() => { setWishlistOpen(true); setMobileMenuOpen(false); }} className="hover:text-[#BA7A7C]">
              Wishlist ({wishlist.length})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
