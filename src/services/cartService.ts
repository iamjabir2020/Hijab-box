import { CartItem, Product } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

export async function fetchRemoteCart(userId: string): Promise<CartItem[] | null> {
  if (!isSupabaseConfigured || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('id, product_id, quantity, selected_color')
      .eq('user_id', userId);

    if (error || !data || data.length === 0) {
      return null;
    }

    const items: CartItem[] = [];
    for (const row of data) {
      const product = PRODUCTS.find((p) => p.id === row.product_id);
      if (product) {
        items.push({
          id: row.id,
          product,
          quantity: row.quantity,
          selectedColor: row.selected_color || (product.colors && product.colors[0]),
        });
      }
    }
    return items;
  } catch (err) {
    console.warn('Error fetching remote cart:', err);
    return null;
  }
}

export async function upsertRemoteCartItem(
  userId: string,
  product: Product,
  quantity: number,
  selectedColor?: string
) {
  if (!isSupabaseConfigured || !userId) return;

  try {
    await supabase.from('cart_items').upsert(
      {
        user_id: userId,
        product_id: product.id,
        quantity,
        selected_color: selectedColor || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,product_id,selected_color' }
    );
  } catch (err) {
    console.warn('Error syncing cart item with Supabase:', err);
  }
}

export async function removeRemoteCartItem(userId: string, productId: string) {
  if (!isSupabaseConfigured || !userId) return;

  try {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
  } catch (err) {
    console.warn('Error removing cart item from Supabase:', err);
  }
}

export async function clearRemoteCart(userId: string) {
  if (!isSupabaseConfigured || !userId) return;

  try {
    await supabase.from('cart_items').delete().eq('user_id', userId);
  } catch (err) {
    console.warn('Error clearing cart from Supabase:', err);
  }
}
