import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { ContactPage } from './pages/ContactPage';
import { CustomizeBoxPage } from './pages/CustomizeBoxPage';
import { OurStoryPage } from './pages/OurStoryPage';

const AppContent: React.FC = () => {
  const { activePage } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Checkout page has its own dedicated header & footer layout as specified in Image 10
  if (activePage === 'checkout') {
    return <CheckoutPage />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff8f6] text-[#201a18]">
      {/* Authentic Header */}
      <Header />

      {/* Main Content View */}
      <main className="w-full pt-20 bg-[#fff8f6] flex-1">
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'accessories' && <ShopPage />}
        {activePage === 'sale' && <ShopPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'order-confirmed' && <OrderConfirmedPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'customize' && <CustomizeBoxPage />}
        {activePage === 'boxes' && <CustomizeBoxPage />}
        {activePage === 'story' && <OurStoryPage />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Instant Search Modal */}
      <SearchModal />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Quick View Fabric & Shade Modal */}
      <QuickViewModal />

      {/* 5-Column Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
