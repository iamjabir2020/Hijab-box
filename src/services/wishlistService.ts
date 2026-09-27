import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function fetchRemoteWishlist(userId: string): Promise<string[] | null> {
  if (!isSupabaseConfigured || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('product_id')
      .eq('user_id', userId);

    if (error || !data) return null;
    return data.map((row) => row.product_id);
  } catch (err) {
    console.warn('Error fetching remote wishlist:', err);
    return null;
  }
}

export async function toggleRemoteWishlistItem(userId: string, productId: string, add: boolean) {
  if (!isSupabaseConfigured || !userId) return;

  try {
    if (add) {
      await supabase.from('wishlist_items').upsert(
        { user_id: userId, product_id: productId },
        { onConflict: 'user_id,product_id' }
      );
    } else {
      await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
    }
  } catch (err) {
    console.warn('Error updating remote wishlist:', err);
  }
}
