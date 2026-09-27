import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Fetch products from Supabase, with automatic static fallback
 */
export async function getProducts(): Promise<{
  products: Product[];
  fromDatabase: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured) {
    return { products: PRODUCTS, fromDatabase: false };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price', { ascending: false });

    if (error) {
      console.warn('Supabase products fetch failed, using local catalogue:', error.message);
      return { products: PRODUCTS, fromDatabase: false, error: error.message };
    }

    if (data && data.length > 0) {
      const formatted: Product[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        subCategory: item.sub_category || '',
        tag: item.tag || '',
        badge: item.badge || undefined,
        price: Number(item.price),
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        rating: Number(item.rating || 5),
        reviewsCount: Number(item.reviews_count || 0),
        image: item.image,
        imageAlt: item.image_alt || item.name,
        colors: item.colors || [],
        dimensions: item.dimensions || '180 × 90 cm',
        fabricDetails: item.fabric_details || '',
        inStock: item.in_stock ?? true,
      }));
      return { products: formatted, fromDatabase: true };
    }

    // Table is empty, return static products
    return { products: PRODUCTS, fromDatabase: false };
  } catch (err: any) {
    console.warn('Network error fetching Supabase products:', err);
    return { products: PRODUCTS, fromDatabase: false, error: err?.message };
  }
}

/**
 * Seeds static products into Supabase products table
 */
export async function seedProductsToDatabase(): Promise<{
  success: boolean;
  insertedCount: number;
  message: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      insertedCount: 0,
      message: 'Supabase credentials not configured in environment or settings.',
    };
  }

  try {
    const rows = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      sub_category: p.subCategory,
      tag: p.tag || null,
      badge: p.badge || null,
      price: p.price,
      original_price: p.originalPrice || null,
      rating: p.rating,
      reviews_count: p.reviewsCount,
      image: p.image,
      image_alt: p.imageAlt,
      colors: p.colors || [],
      dimensions: p.dimensions || '180 × 90 cm',
      fabric_details: p.fabricDetails || null,
      in_stock: p.inStock ?? true,
    }));

    const { data, error } = await supabase
      .from('products')
      .upsert(rows, { onConflict: 'id' })
      .select('id');

    if (error) {
      return { success: false, insertedCount: 0, message: error.message };
    }

    return {
      success: true,
      insertedCount: data?.length || rows.length,
      message: `Successfully seeded ${data?.length || rows.length} products into Supabase!`,
    };
  } catch (err: any) {
    return {
      success: false,
      insertedCount: 0,
      message: err?.message || 'Failed to seed products',
    };
  }
}
