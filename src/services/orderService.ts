import { CartItem, CheckoutDetails, GiftOrderDetails } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface OrderRecord {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: Partial<CheckoutDetails>;
  giftDetails?: GiftOrderDetails;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: 'confirmed' | 'packed' | 'dispatched' | 'in_transit' | 'delivered';
  trackingAwb?: string;
  createdAt: string;
}

const LOCAL_ORDERS_KEY = 'hb_local_orders';

export async function placeOrderInDatabase({
  userId,
  items,
  subtotal,
  discount,
  shippingFee,
  total,
  checkoutDetails,
  giftDetails,
}: {
  userId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  checkoutDetails: CheckoutDetails;
  giftDetails?: GiftOrderDetails;
}): Promise<{
  success: boolean;
  order: OrderRecord;
  error?: string;
}> {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const orderNumber = `#HB${randomNum}`;
  const now = new Date().toISOString();

  const newOrder: OrderRecord = {
    id: `ord-${Date.now()}`,
    orderNumber,
    userId,
    customerEmail: checkoutDetails.email,
    customerPhone: checkoutDetails.phone,
    customerName: `${checkoutDetails.firstName} ${checkoutDetails.lastName}`.trim(),
    items,
    subtotal,
    discount,
    shippingFee,
    total,
    shippingAddress: {
      firstName: checkoutDetails.firstName,
      lastName: checkoutDetails.lastName,
      streetAddress: checkoutDetails.streetAddress,
      landmark: checkoutDetails.landmark,
      city: checkoutDetails.city,
      state: checkoutDetails.state,
      pincode: checkoutDetails.pincode,
      country: checkoutDetails.country,
      phone: checkoutDetails.phone,
      shippingMethod: checkoutDetails.shippingMethod,
    },
    giftDetails: giftDetails?.isGift ? giftDetails : undefined,
    paymentMethod: checkoutDetails.paymentMethod,
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    trackingAwb: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
    createdAt: now,
  };

  // Always save to localStorage as local cache
  saveOrderToLocalStorage(newOrder);

  if (!isSupabaseConfigured) {
    return { success: true, order: newOrder };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: newOrder.orderNumber,
        user_id: userId || null,
        customer_email: newOrder.customerEmail,
        customer_phone: newOrder.customerPhone,
        customer_name: newOrder.customerName,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        discount: newOrder.discount,
        shipping_fee: newOrder.shippingFee,
        total: newOrder.total,
        shipping_address: newOrder.shippingAddress,
        gift_details: newOrder.giftDetails || null,
        payment_method: newOrder.paymentMethod,
        payment_status: newOrder.paymentStatus,
        order_status: newOrder.orderStatus,
        tracking_awb: newOrder.trackingAwb,
      })
      .select('id, order_number, created_at')
      .single();

    if (error) {
      console.warn('Supabase order creation note:', error.message);
      // Fallback succeeds locally
      return { success: true, order: newOrder, error: error.message };
    }

    if (data) {
      newOrder.id = data.id;
      newOrder.createdAt = data.created_at || now;
      saveOrderToLocalStorage(newOrder);
    }

    return { success: true, order: newOrder };
  } catch (err: any) {
    console.warn('Network error placing order on Supabase:', err);
    return { success: true, order: newOrder, error: err?.message };
  }
}

export async function getUserOrders(userId?: string, email?: string): Promise<OrderRecord[]> {
  const localOrders = getLocalOrders();

  if (!isSupabaseConfigured) {
    return localOrders;
  }

  try {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (email) {
      query = query.eq('customer_email', email);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return localOrders;
    }

    const remoteOrders: OrderRecord[] = data.map((d) => ({
      id: d.id,
      orderNumber: d.order_number,
      userId: d.user_id,
      customerEmail: d.customer_email,
      customerPhone: d.customer_phone,
      customerName: d.customer_name,
      items: (d.items as CartItem[]) || [],
      subtotal: Number(d.subtotal),
      discount: Number(d.discount || 0),
      shippingFee: Number(d.shipping_fee || 0),
      total: Number(d.total),
      shippingAddress: d.shipping_address || {},
      giftDetails: d.gift_details,
      paymentMethod: d.payment_method || 'upi',
      paymentStatus: d.payment_status || 'paid',
      orderStatus: d.order_status || 'confirmed',
      trackingAwb: d.tracking_awb,
      createdAt: d.created_at,
    }));

    return remoteOrders;
  } catch {
    return localOrders;
  }
}

function saveOrderToLocalStorage(order: OrderRecord) {
  if (typeof window === 'undefined') return;
  const existing = getLocalOrders();
  const filtered = existing.filter((o) => o.orderNumber !== order.orderNumber);
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([order, ...filtered]));
}

function getLocalOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
