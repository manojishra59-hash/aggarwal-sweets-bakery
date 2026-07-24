-- ====================================================
-- AGGARWAL SWEETS - COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- ====================================================

-- 1. EXTENSIONS & SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================
-- TABLE DEFINITIONS
-- ====================================================

-- SETTINGS
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL DEFAULT 'Aggarwal Sweets & Bakery',
    tagline TEXT DEFAULT 'Artisanal Indian Mithai & Fine Bakery Since 2004',
    phone TEXT NOT NULL DEFAULT '+91 98100 12345',
    email TEXT DEFAULT 'info@aggarwalsweets.com',
    address TEXT NOT NULL DEFAULT 'Plot 42, Main Market, Rajouri Garden, New Delhi, 110027',
    whatsapp TEXT NOT NULL DEFAULT '919810012345',
    google_maps TEXT DEFAULT 'https://maps.google.com',
    gst_number TEXT DEFAULT '07AAAAA0000A1Z5',
    logo TEXT DEFAULT 'https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=200',
    social_links JSONB DEFAULT '{"instagram": "https://instagram.com", "facebook": "https://facebook.com"}'::jsonb,
    opening_hours TEXT DEFAULT 'Monday – Sunday: 8:00 AM – 10:30 PM',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMINS
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    store TEXT NOT NULL DEFAULT 'Flagship Rajouri Garden',
    role TEXT NOT NULL DEFAULT 'Super Admin' CHECK (role IN ('Super Admin', 'Store Manager', 'Order Executive', 'Inventory Specialist')),
    permissions JSONB DEFAULT '["all"]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT UNIQUE,
    email TEXT UNIQUE,
    address TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    item_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store TEXT NOT NULL DEFAULT 'Aggarwal Sweets Rajouri Garden',
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(10,2) CHECK (discount_price >= 0),
    stock NUMERIC(10,2) NOT NULL DEFAULT 50.0 CHECK (stock >= 0),
    unit TEXT NOT NULL DEFAULT 'kg' CHECK (unit IN ('kg', 'box', 'piece', 'gm', 'pack')),
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    best_seller BOOLEAN DEFAULT false,
    festival_special BOOLEAN DEFAULT false,
    available BOOLEAN DEFAULT true,
    shelf_life TEXT DEFAULT '7 Days',
    purity_badge TEXT DEFAULT '100% Pure Desi Ghee',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INVENTORY
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    current_stock NUMERIC(10,2) NOT NULL DEFAULT 0.0 CHECK (current_stock >= 0),
    minimum_stock NUMERIC(10,2) NOT NULL DEFAULT 10.0 CHECK (minimum_stock >= 0),
    status TEXT DEFAULT 'IN_STOCK' CHECK (status IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK')),
    last_restocked TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    address TEXT,
    order_count INT DEFAULT 0 CHECK (order_count >= 0),
    total_spending NUMERIC(12,2) DEFAULT 0.0 CHECK (total_spending >= 0),
    loyalty_tier TEXT DEFAULT 'Silver' CHECK (loyalty_tier IN ('Silver', 'Gold', 'Platinum', 'VIP')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COUPONS
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
    percentage NUMERIC(5,2) DEFAULT 0 CHECK (percentage >= 0 AND percentage <= 100),
    flat_amount NUMERIC(10,2) DEFAULT 0 CHECK (flat_amount >= 0),
    discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,
    min_order_amount NUMERIC(10,2) DEFAULT 0 CHECK (min_order_amount >= 0),
    max_discount_amount NUMERIC(10,2) DEFAULT 0 CHECK (max_discount_amount >= 0),
    expiry_date DATE NOT NULL,
    usage_limit INT DEFAULT 100 CHECK (usage_limit >= 0),
    times_used INT DEFAULT 0 CHECK (times_used >= 0),
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    shipping_address TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    discount NUMERIC(10,2) DEFAULT 0 CHECK (discount >= 0),
    delivery_charge NUMERIC(10,2) DEFAULT 0 CHECK (delivery_charge >= 0),
    gst NUMERIC(10,2) DEFAULT 0 CHECK (gst >= 0),
    grand_total NUMERIC(10,2) NOT NULL CHECK (grand_total >= 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('COD', 'UPI', 'CARD', 'NETBANKING')),
    payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    order_status TEXT NOT NULL DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Confirmed', 'Preparing', 'Packaging', 'Out for Delivery', 'Delivered', 'Cancelled')),
    coupon_code TEXT,
    special_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    price_per_unit NUMERIC(10,2) NOT NULL CHECK (price_per_unit >= 0),
    total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COUPON USAGE
CREATE TABLE IF NOT EXISTS public.coupon_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE BOOKINGS
CREATE TABLE IF NOT EXISTS public.table_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    guests INT NOT NULL CHECK (guests > 0),
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    special_request TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    avatar TEXT,
    location TEXT DEFAULT 'New Delhi',
    approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OFFERS & POPUPS
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    banner_image TEXT NOT NULL,
    discount_text TEXT NOT NULL,
    popup_active BOOLEAN DEFAULT false,
    valid_till DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'All Sweets',
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOGS / STORIES
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author TEXT DEFAULT 'Halwai Master Rameshwar',
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ORDER', 'BOOKING', 'CONTACT', 'LOW_STOCK', 'REVIEW', 'SYSTEM')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- TRIGGERS FOR UPDATED_AT
-- ====================================================

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_table_bookings_updated_at BEFORE UPDATE ON public.table_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(available);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(is_read) WHERE is_read = false;

-- ====================================================
-- FUNCTIONS
-- ====================================================

-- 1. FUNCTION TO GENERATE SEQUENTIAL ORDER ID
CREATE OR REPLACE FUNCTION generate_order_id()
RETURNS TEXT AS $$
DECLARE
    next_val INT;
    new_order_id TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 4) AS INT)), 1000) + 1
    INTO next_val
    FROM public.orders
    WHERE order_number LIKE 'AS-%';
    
    new_order_id := 'AS-' || next_val;
    RETURN new_order_id;
END;
$$ LANGUAGE plpgsql;

-- 2. FUNCTION TO CREATE NOTIFICATION
CREATE OR REPLACE FUNCTION create_notification(
    p_title TEXT,
    p_message TEXT,
    p_type TEXT
) RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO public.notifications (title, message, type)
    VALUES (p_title, p_message, p_type)
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- 3. FUNCTION TO UPDATE INVENTORY STOCK
CREATE OR REPLACE FUNCTION update_product_stock(
    p_product_id UUID,
    p_quantity_deducted NUMERIC
) RETURNS VOID AS $$
DECLARE
    v_new_stock NUMERIC;
    v_min_stock NUMERIC;
    v_product_name TEXT;
BEGIN
    UPDATE public.products
    SET stock = GREATEST(0, stock - p_quantity_deducted)
    WHERE id = p_product_id
    RETURNING stock, name INTO v_new_stock, v_product_name;

    UPDATE public.inventory
    SET current_stock = v_new_stock,
        status = CASE 
            WHEN v_new_stock <= 0 THEN 'OUT_OF_STOCK'
            WHEN v_new_stock <= minimum_stock THEN 'LOW_STOCK'
            ELSE 'IN_STOCK'
        END,
        updated_at = NOW()
    WHERE product_id = p_product_id
    RETURNING minimum_stock INTO v_min_stock;

    -- Trigger Low Stock Alert
    IF v_new_stock <= COALESCE(v_min_stock, 10.0) THEN
        PERFORM create_notification(
            'Low Stock Warning',
            'Stock for ' || v_product_name || ' dropped to ' || v_new_stock || ' kg!',
            'LOW_STOCK'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ====================================================
-- AUTOMATIC BUSINESS TRIGGERS
-- ====================================================

-- 1. Trigger on New Order
CREATE OR REPLACE FUNCTION on_order_created()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM create_notification(
        'New Online Order ' || NEW.order_number,
        'Order placed by ' || NEW.customer_name || ' for ₹' || NEW.grand_total,
        'ORDER'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_on_order_created
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION on_order_created();

-- 2. Trigger on New Booking
CREATE OR REPLACE FUNCTION on_booking_created()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM create_notification(
        'New Table Reservation',
        NEW.customer_name || ' requested table for ' || NEW.guests || ' guests on ' || NEW.booking_date,
        'BOOKING'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_on_booking_created
AFTER INSERT ON public.table_bookings
FOR EACH ROW EXECUTE FUNCTION on_booking_created();

-- 3. Trigger on New Contact Message
CREATE OR REPLACE FUNCTION on_contact_created()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM create_notification(
        'New Customer Inquiry',
        'Message from ' || NEW.name || ' (' || NEW.phone || ')',
        'CONTACT'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_on_contact_created
AFTER INSERT ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION on_contact_created();

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Reviews" ON public.reviews FOR SELECT USING (approved = true);
CREATE POLICY "Public Read Active Offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (For orders, bookings, contact forms, reviews)
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Table Bookings" ON public.table_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Customers" ON public.customers FOR INSERT WITH CHECK (true);

-- FULL ALL PERMISSIONS FOR ADMINS / SERVICE ROLE
CREATE POLICY "Admin All Settings" ON public.settings FOR ALL USING (true);
CREATE POLICY "Admin All Products" ON public.products FOR ALL USING (true);
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Admin All Orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Admin All Bookings" ON public.table_bookings FOR ALL USING (true);
CREATE POLICY "Admin All Customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Admin All Coupons" ON public.coupons FOR ALL USING (true);
CREATE POLICY "Admin All Inventory" ON public.inventory FOR ALL USING (true);
CREATE POLICY "Admin All Notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Admin All Contacts" ON public.contact_messages FOR ALL USING (true);
CREATE POLICY "Admin All Reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Admin All Offers" ON public.offers FOR ALL USING (true);
CREATE POLICY "Admin All Blogs" ON public.blogs FOR ALL USING (true);
CREATE POLICY "Admin All Admins" ON public.admins FOR ALL USING (true);

-- ====================================================
-- SEED INITIAL STORE SETTINGS & ADMIN DATA
-- ====================================================

INSERT INTO public.settings (business_name, tagline, phone, email, address, whatsapp, gst_number)
VALUES (
    'Aggarwal Sweets & Bakery',
    'Artisanal Indian Mithai & Fine Bakery Since 2004',
    '+91 98100 12345',
    'info@aggarwalsweets.com',
    'Plot 42, Main Market, Rajouri Garden, New Delhi, 110027',
    '919810012345',
    '07AAAAA0000A1Z5'
)
ON CONFLICT DO NOTHING;
