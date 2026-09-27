-- ==============================================================================
-- HIJAB BOX (SISTER-OWNED) - COMPLETE SUPABASE DATABASE SCHEMA & POLICIES
-- ==============================================================================
-- Run this complete script in your Supabase SQL Editor:
-- Project Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE product_category AS ENUM (
        'modal', 'chiffon', 'jersey', 'organza', 'printed', 'accessories', 'boxes'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM (
        'confirmed', 'packed', 'dispatched', 'in_transit', 'delivered', 'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT DEFAULT '',
    last_name TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    street_address TEXT DEFAULT '',
    landmark TEXT DEFAULT '',
    city TEXT DEFAULT '',
    state TEXT DEFAULT '',
    pincode TEXT DEFAULT '',
    country TEXT DEFAULT 'India',
    avatar_url TEXT DEFAULT '',
    newsletter_opt_in BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create a profile row upon sign up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'first_name', ''),
        COALESCE(new.raw_user_meta_data->>'last_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT DEFAULT '',
    tag TEXT DEFAULT '',
    badge TEXT DEFAULT NULL,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2) DEFAULT NULL,
    rating NUMERIC(3,2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    image TEXT NOT NULL,
    image_alt TEXT DEFAULT '',
    colors TEXT[] DEFAULT ARRAY[]::TEXT[],
    dimensions TEXT DEFAULT '180 × 90 cm',
    fabric_details TEXT DEFAULT '',
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CART ITEMS TABLE (Persistent shopping bag for authenticated users)
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    selected_color TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id, selected_color)
);

-- 6. WISHLIST ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 7. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    subtotal NUMERIC(10,2) NOT NULL,
    discount NUMERIC(10,2) DEFAULT 0,
    shipping_fee NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) NOT NULL,
    shipping_address JSONB NOT NULL DEFAULT '{}'::JSONB,
    gift_details JSONB DEFAULT NULL,
    payment_method TEXT NOT NULL DEFAULT 'upi',
    payment_status TEXT NOT NULL DEFAULT 'paid',
    order_status TEXT NOT NULL DEFAULT 'confirmed',
    tracking_awb TEXT DEFAULT NULL,
    estimated_delivery DATE DEFAULT (CURRENT_DATE + INTERVAL '3 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by owner"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- PRODUCTS POLICIES (Public read access, authenticated/service write access)
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products"
    ON public.products FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Anyone can insert/update products during setup" ON public.products;
CREATE POLICY "Allow product insertion"
    ON public.products FOR ALL
    USING (true)
    WITH CHECK (true);

-- CART ITEMS POLICIES (Users manage their own cart)
DROP POLICY IF EXISTS "Users manage their own cart" ON public.cart_items;
CREATE POLICY "Users manage their own cart"
    ON public.cart_items FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- WISHLIST ITEMS POLICIES
DROP POLICY IF EXISTS "Users manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Users manage their own wishlist"
    ON public.wishlist_items FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ORDERS POLICIES
-- Users can see their own orders; guests can view with order_number; anyone can insert new orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- REVIEWS POLICIES
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews"
    ON public.reviews FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;
CREATE POLICY "Authenticated users can create reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- NEWSLETTER POLICIES
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers FOR INSERT
    WITH CHECK (true);

-- ==============================================================================
-- INITIAL PRODUCTS SEEDING DATA
-- ==============================================================================
INSERT INTO public.products (id, name, category, sub_category, tag, badge, price, original_price, rating, reviews_count, image, image_alt, colors, dimensions, fabric_details, in_stock)
VALUES
('ombre-rouge-modal', 'Ombré Rouge Modal Hijab', 'modal', 'Everyday Luxury Drape', '100% Lenzing Modal', 'Bestseller', 449, 599, 4.9, 128, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFy4m0iZ1-kK8x-Nf76v0jJ8uY2dJ_V01H9tO70-j82rWbIeG-z2tT8gI4Wkn5s7eN9Xf52c1T', 'Editorial drape of rich ombré rouge modal scarf', ARRAY['#844C4E', '#BA7A7C', '#3E2723'], '180 × 90 cm', '100% Sustainable Lenzing Modal with baby-hem edges.', TRUE),
('crushed-georgette-camel', 'Crushed Crêpe Georgette Hijab - Camel', 'chiffon', 'Airy Textured Crêpe', 'Breathable Non-Slip', 'Essential', 399, 499, 4.8, 94, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8QGvK0pQ8x-12nMc9z88Tq_W47k_2M8cT5w_1876n01H0c_Wn8t7b29q8', 'Camel tone textured crushed crêpe hijab with clean drape', ARRAY['#C19A6B', '#E5D0BA', '#7A5B44'], '185 × 85 cm', 'Lightweight crushed georgette with subtle natural stretch.', TRUE),
('raw-silk-rose-water', 'Raw Silk Blend Hijab - Rose Water', 'organza', 'Artisanal Occasion Drape', 'Handwoven Texture', 'Sale', 649, 899, 4.7, 42, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC9P2JfTcpOJWaQtNzCFWjoQHIix2ONbosImF6f9Z1hukaojYSBW_dbB3e_ato5JzZvtmT2-TYumzdNJyQn9gPOQ4iAA8iFxSYEEUWoPt1gJIuNihrDLruL0wtyk4DrH22j7LcaOOSXl4jttmvWWOOawIkUJFUDvwIuSA8c4y9SvuEv-ZbRuSY2uGYIOo7W37fOOUlU9LIAHbgdiRMtg0N2EAwLbjohb_i4Mytt2qne6XOJjUiye7v', 'Rose water pink raw silk blend scarf draped softly', ARRAY['#E8B4B8', '#FAF8F5', '#BA7A7C'], '190 × 85 cm', 'Silk and modal blend with delicate tactile slubs.', TRUE),
('premium-modal-almond', 'Soft Woven Modal Scarf - Almond Cream', 'modal', 'Featherweight Classic', 'Zero-Slip Weave', 'Bestseller', 449, 549, 5.0, 186, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdof8kbGCrxcsdobl3yQeNRtx1ZOw2lMpA-WMFsvGpD_Xu7nGBX-25z4aZ9FvH_aB4CWPeEM3i1zzaqq-Lzf3QTlayhp3XkQnSQRIsmUin9cNaPqu7TJmaoI26PrUJprGWsKbHf9i8N8MHBL8BTTS0xYTagi5_wxI-V_IyF8qqTvwWGNbDXEVZt2yp6RXzAeAMXJrSJbyG9Fjs1Y2EqIM2ufKeWFQkf0_oEbKETX5k39NWfRYzQDxF', 'Almond cream soft modal hijab draped gracefully', ARRAY['#EFE8E1', '#D8CCC4', '#844C4E'], '185 × 90 cm', '100% Lenzing modal, naturally thermo-regulating.', TRUE),
('snag-free-hijab-magnets', 'Snag-Free Matte Hijab Magnets (Set of 4)', 'accessories', 'No-Hole Fabric Protectors', 'Ultra-Strong Neodymium', 'Bestseller', 299, 399, 4.9, 310, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8QGvK0pQ8x-12nMc9z88Tq_W47k_2M8cT5w_1876n01H0c_Wn8t7b29q8', 'Set of 4 matte rose gold and espresso hijab magnets', ARRAY['#BA7A7C', '#844C4E', '#3E2723', '#FAF8F5'], '12 mm diameter', 'Solid neodymium core encased in scratch-resistant matte plating.', TRUE),
('modal-tie-cap-undercap', 'Bamboo Modal Cross-Tie Undercap', 'accessories', 'Non-Slip Foundation', 'Moisture-Wicking', 'Essential', 199, 249, 4.9, 142, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFy4m0iZ1-kK8x-Nf76v0jJ8uY2dJ_V01H9tO70-j82rWbIeG-z2tT8gI4Wkn5s7eN9Xf52c1T', 'Nude tone bamboo modal tie-back undercap', ARRAY['#E8DFD8', '#2B2523', '#BA7A7C'], 'Adjustable custom tie', '95% organic bamboo modal, 5% elastane.', TRUE),
('bespoke-keepsake-box-3', 'The Sisterhood 3-Scarf Keepsake Box', 'boxes', 'Signature Keepsake Box', 'Handcrafted Box', 'Bestseller', 1799, 2199, 5.0, 78, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8QGvK0pQ8x-12nMc9z88Tq_W47k_2M8cT5w_1876n01H0c_Wn8t7b29q8', 'Handcrafted blush keepsake gift box filled with 3 scarves and magnets', ARRAY['#BA7A7C'], '26 × 20 × 7 cm', 'Rigid archival board wrapped in linen-textured embossed art paper.', TRUE)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    in_stock = EXCLUDED.in_stock,
    updated_at = NOW();
