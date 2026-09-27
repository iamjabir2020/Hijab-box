import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GiftOrderDetails, CheckoutDetails } from '../types';
import { PRODUCTS } from '../data/products';
import { useAuth } from './AuthContext';
import { getProducts } from '../services/productService';
import { placeOrderInDatabase } from '../services/orderService';
import {
  fetchRemoteCart,
  upsertRemoteCartItem,
  removeRemoteCartItem,
  clearRemoteCart,
} from '../services/cartService';
import {
  fetchRemoteWishlist,
  toggleRemoteWishlistItem,
} from '../services/wishlistService';

interface CartContextType {
  products: Product[];
  loadingProducts: boolean;
  refreshProducts: () => Promise<void>;
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
  placeOrder: () => Promise<string>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  // Initial cart items
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
    email: profile?.email || 'amina.patel@sisterhood.co',
    phone: profile?.phone || '9512607726',
    newsletter: true,
    country: profile?.country || 'India',
    firstName: profile?.firstName || 'Amina',
    lastName: profile?.lastName || 'Patel',
    streetAddress: profile?.streetAddress || 'Flat 402, Al-Noor Residency, Near Jubilee Baug',
    landmark: profile?.landmark || 'Opposite Old Clock Tower',
    pincode: profile?.pincode || '390001',
    city: profile?.city || 'Vadodara (Baroda)',
    state: profile?.state || 'Gujarat',
    saveAddress: true,
    shippingMethod: 'standard',
    paymentMethod: 'upi',
    upiVpa: 'amina@oksbi',
    billingSameAsShipping: true,
  });

  // Sync profile details when profile changes
  useEffect(() => {
    if (profile) {
      setCheckoutDetails((prev) => ({
        ...prev,
        email: profile.email || prev.email,
        firstName: profile.firstName || prev.firstName,
        lastName: profile.lastName || prev.lastName,
        phone: profile.phone || prev.phone,
        streetAddress: profile.streetAddress || prev.streetAddress,
        landmark: profile.landmark || prev.landmark,
        city: profile.city || prev.city,
        state: profile.state || prev.state,
        pincode: profile.pincode || prev.pincode,
        country: profile.country || prev.country,
      }));
    }
  }, [profile]);

  // Load products from Supabase
  const refreshProducts = async () => {
    setLoadingProducts(true);
    const res = await getProducts();
    if (res.products && res.products.length > 0) {
      setProducts(res.products);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Fetch remote cart and wishlist for authenticated user
  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      fetchRemoteCart(userId).then((remoteItems) => {
        if (remoteItems && remoteItems.length > 0) {
          setCart(remoteItems);
        }
      });
      fetchRemoteWishlist(userId).then((remoteWish) => {
        if (remoteWish && remoteWish.length > 0) {
          setWishlist(remoteWish);
        }
      });
    }
  }, [user]);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 899;

  const shippingFee =
    checkoutDetails.shippingMethod === 'express'
      ? 120
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : 60;

  const total = Math.max(
    0,
    subtotal -
      discount +
      (subtotal >= FREE_SHIPPING_THRESHOLD && checkoutDetails.shippingMethod === 'standard'
        ? 0
        : shippingFee)
  );
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || (product.colors && product.colors[0]);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: `cart-${Date.now()}`,
            product,
            quantity,
            selectedColor: color,
          },
        ];
      }
      return updated;
    });

    if (user?.id) {
      upsertRemoteCartItem(user.id, product, quantity, color);
    }
    setDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (user?.id) {
      removeRemoteCartItem(user.id, productId);
    }
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
    if (user?.id) {
      const item = cart.find((i) => i.product.id === productId);
      if (item) {
        upsertRemoteCartItem(user.id, item.product, quantity, item.selectedColor);
      }
    }
  };

  const toggleWishlist = (productId: string) => {
    const isPresent = wishlist.includes(productId);
    setWishlist((prev) =>
      isPresent ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    if (user?.id) {
      toggleRemoteWishlistItem(user.id, productId, !isPresent);
    }
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

  const placeOrder = async (): Promise<string> => {
    const res = await placeOrderInDatabase({
      userId: user?.id,
      items: cart,
      subtotal,
      discount,
      shippingFee,
      total,
      checkoutDetails,
      giftDetails,
    });

    const newOrderId = res.order.orderNumber;
    setLastOrderId(newOrderId);
    setActivePage('order-confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (user?.id) {
      clearRemoteCart(user.id);
    }
    return newOrderId;
  };

  const clearCart = () => {
    setCart([]);
    if (user?.id) {
      clearRemoteCart(user.id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        loadingProducts,
        refreshProducts,
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
