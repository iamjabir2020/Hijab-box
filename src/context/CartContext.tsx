import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GiftOrderDetails, CheckoutDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  drawerOpen: boolean;
  searchOpen: boolean;
  wishlistOpen: boolean;
  quickViewProduct: Product | null;
  activePage: string;
  promoCode: string;
  discount: number;
  promoApplied: boolean;
  giftDetails: GiftOrderDetails;
  checkoutDetails: CheckoutDetails;
  lastOrderId: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  shippingProgressPercent: number;
  amountNeededForFreeShipping: number;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setActivePage: (page: string) => void;
  applyPromoCode: (code: string) => boolean;
  setGiftDetails: React.Dispatch<React.SetStateAction<GiftOrderDetails>>;
  setCheckoutDetails: React.Dispatch<React.SetStateAction<CheckoutDetails>>;
  placeOrder: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the 3 items shown in Image 8 and Image 10
  const initialCart: CartItem[] = [
    {
      id: 'cart-1',
      product: PRODUCTS.find((p) => p.id === 'ombre-rouge-modal') || PRODUCTS[0],
      quantity: 1,
      selectedColor: '#844C4E',
    },
    {
      id: 'cart-2',
      product: PRODUCTS.find((p) => p.id === 'snag-free-hijab-magnets') || PRODUCTS[8],
      quantity: 1,
      selectedColor: '#BA7A7C',
    },
    {
      id: 'cart-3',
      product: PRODUCTS.find((p) => p.id === 'modal-tie-cap-undercap') || PRODUCTS[10],
      quantity: 1,
      selectedColor: '#E8DFD8',
    },
  ];

  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [wishlist, setWishlist] = useState<string[]>(['chantilly-lace-hijab']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<string>('shop');
  const [promoCode, setPromoCode] = useState<string>('SISTERHOOD10');
  const [discount, setDiscount] = useState<number>(50);
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [lastOrderId, setLastOrderId] = useState<string>('#HB123456');

  const [giftDetails, setGiftDetails] = useState<GiftOrderDetails>({
    isGift: true,
    recipientName: 'Dearest Zahra',
    occasion: 'Just Because • Sisterhood Love',
    message: 'May your days be draped in grace, peace, and endless barakah. With heartfelt love from your sister.',
  });

  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    email: 'amina.patel@sisterhood.co',
    phone: '9512607726',
    newsletter: true,
    country: 'India',
    firstName: 'Amina',
    lastName: 'Patel',
    streetAddress: 'Flat 402, Al-Noor Residency, Near Jubilee Baug',
    landmark: 'Opposite Old Clock Tower',
    pincode: '390001',
    city: 'Vadodara (Baroda)',
    state: 'Gujarat',
    saveAddress: true,
    shippingMethod: 'standard',
    paymentMethod: 'upi',
    upiVpa: 'amina@oksbi',
    billingSameAsShipping: true,
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 899;
  
  // Standard shipping is ₹60 unless subtotal >= ₹899 or promo code covers it
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || checkoutDetails.shippingMethod === 'standard';
  const shippingFee = checkoutDetails.shippingMethod === 'express' ? 120 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60);

  const total = Math.max(0, subtotal - discount + (subtotal >= FREE_SHIPPING_THRESHOLD && checkoutDetails.shippingMethod === 'standard' ? 0 : shippingFee));
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          product,
          quantity,
          selectedColor: selectedColor || (product.colors && product.colors[0]),
        },
      ];
    });
    setDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SISTERHOOD10' || clean === 'SISTERHOOD2026' || clean === 'MODEST50') {
      setPromoCode(clean);
      setDiscount(50);
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  const placeOrder = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setLastOrderId(`#HB${randomNum}`);
    setActivePage('order-confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        drawerOpen,
        searchOpen,
        wishlistOpen,
        quickViewProduct,
        activePage,
        promoCode,
        discount,
        promoApplied,
        giftDetails,
        checkoutDetails,
        lastOrderId,
        subtotal,
        shippingFee,
        total,
        itemCount,
        shippingProgressPercent,
        amountNeededForFreeShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        setDrawerOpen,
        setSearchOpen,
        setWishlistOpen,
        setQuickViewProduct,
        setActivePage,
        applyPromoCode,
        setGiftDetails,
        setCheckoutDetails,
        placeOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
