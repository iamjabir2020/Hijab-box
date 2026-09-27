export interface Product {
  id: string;
  name: string;
  category: 'modal' | 'chiffon' | 'jersey' | 'organza' | 'printed' | 'accessories' | 'boxes';
  subCategory: string;
  tag?: string;
  badge?: 'Sale' | 'Bestseller' | 'Essential' | 'New' | 'Top Rated' | 'Artisanal';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  imageAlt: string;
  colors?: string[];
  dimensions?: string;
  fabricDetails?: string;
  inStock?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface GiftOrderDetails {
  isGift: boolean;
  recipientName: string;
  occasion: string;
  message: string;
}

export interface CheckoutDetails {
  email: string;
  phone: string;
  newsletter: boolean;
  country: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  saveAddress: boolean;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  upiVpa: string;
  billingSameAsShipping: boolean;
}
