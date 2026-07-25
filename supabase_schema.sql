-- ====================================================
-- AGGARWAL SWEETS MANAGEMENT SYSTEM - PRODUCTION SUPABASE SCHEMA
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
-- MODULE 1: STORE SETTINGS
-- ====================================================
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

-- ====================================================
-- MODULE 2: CATEGORIES & PRODUCTS
-- ====================================================
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

-- ====================================================
-- MODULE 3: INVENTORY MANAGEMENT
-- ====================================================
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    current_stock NUMERIC(10,2) NOT NULL DEFAULT 0.0 CHECK (current_stock >= 0),
    minimum_stock NUMERIC(10,2) NOT NULL DEFAULT 10.0 CHECK (minimum_stock >= 0),
    reorder_quantity NUMERIC(10,2) NOT NULL DEFAULT 50.0 CHECK (reorder_quantity >= 0),
    supplier_name TEXT DEFAULT 'Amul Dairy & Local Desi Ghee Vendors',
    status TEXT DEFAULT 'IN_STOCK' CHECK (status IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK')),
    last_restocked TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 4: CUSTOMERS & CRM
-- ====================================================
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    address TEXT,
    city TEXT DEFAULT 'New Delhi',
    order_count INT DEFAULT 0 CHECK (order_count >= 0),
    total_spending NUMERIC(12,2) DEFAULT 0.0 CHECK (total_spending >= 0),
    loyalty_tier TEXT DEFAULT 'Silver' CHECK (loyalty_tier IN ('Silver', 'Gold', 'Platinum', 'VIP')),
    loyalty_points INT DEFAULT 0 CHECK (loyalty_points >= 0),
    tags TEXT[] DEFAULT ARRAY['Walk-in']::TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.crm_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('Phone', 'WhatsApp', 'Email', 'In-Store', 'Website')),
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('Inquiry', 'Feedback', 'Complaint', 'VIP Request', 'Custom Order')),
    subject TEXT NOT NULL,
    notes TEXT NOT NULL,
    resolved BOOLEAN DEFAULT true,
    staff_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 5: LOYALTY PROGRAM
-- ====================================================
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    order_id UUID,
    points_earned INT DEFAULT 0 CHECK (points_earned >= 0),
    points_redeemed INT DEFAULT 0 CHECK (points_redeemed >= 0),
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 6: ORDERS & ORDER ITEMS
-- ====================================================
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

CREATE TABLE IF NOT EXISTS public.coupon_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 7: TABLE BOOKING & DINE-IN
-- ====================================================
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

-- ====================================================
-- MODULE 8: FESTIVALS & SPECIAL OFFERS
-- ====================================================
CREATE TABLE IF NOT EXISTS public.festivals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tagline TEXT,
    banner_url TEXT NOT NULL,
    discount_percentage NUMERIC(5,2) DEFAULT 0.0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN DEFAULT true,
    featured_products UUID[] DEFAULT ARRAY[]::UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 9: STAFF MANAGEMENT & PAYROLL
-- ====================================================
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    employee_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    designation TEXT NOT NULL CHECK (designation IN ('Head Halwai', 'Assistant Chef', 'Billing Cashier', 'Store Manager', 'Delivery Boy', 'Cleaner')),
    department TEXT NOT NULL DEFAULT 'Sweets Section',
    monthly_salary NUMERIC(10,2) NOT NULL CHECK (monthly_salary >= 0),
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ON_LEAVE', 'TERMINATED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payroll (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID REFERENCES public.staff(id) ON DELETE CASCADE,
    month_year TEXT NOT NULL, -- e.g. "2026-10"
    base_salary NUMERIC(10,2) NOT NULL CHECK (base_salary >= 0),
    bonus NUMERIC(10,2) DEFAULT 0.0 CHECK (bonus >= 0),
    deductions NUMERIC(10,2) DEFAULT 0.0 CHECK (deductions >= 0),
    net_pay NUMERIC(10,2) NOT NULL CHECK (net_pay >= 0),
    payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'PROCESSING')),
    payment_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MODULE 10: ADMINS & USER PROFILES
-- ====================================================
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

-- ====================================================
-- MODULE 11: REVIEWS, MESSAGES & NOTIFICATIONS
-- ====================================================
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

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ORDER', 'BOOKING', 'CONTACT', 'LOW_STOCK', 'REVIEW', 'SYSTEM')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_table_bookings_updated_at BEFORE UPDATE ON public.table_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_festivals_updated_at BEFORE UPDATE ON public.festivals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_updated_at BEFORE UPDATE ON public.payroll FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

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
CREATE INDEX IF NOT EXISTS idx_staff_employee_id ON public.staff(employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_staff_month ON public.payroll(staff_id, month_year);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(is_read) WHERE is_read = false;

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Festivals" ON public.festivals FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Reviews" ON public.reviews FOR SELECT USING (approved = true);

-- Public Insert Policies (Orders, Bookings, Contacts, Reviews, Customer signup)
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Bookings" ON public.table_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Customers" ON public.customers FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin All Settings" ON public.settings FOR ALL USING (true);
CREATE POLICY "Admin All Products" ON public.products FOR ALL USING (true);
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Admin All Inventory" ON public.inventory FOR ALL USING (true);
CREATE POLICY "Admin All Customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Admin All CRM" ON public.crm_interactions FOR ALL USING (true);
CREATE POLICY "Admin All Loyalty" ON public.loyalty_transactions FOR ALL USING (true);
CREATE POLICY "Admin All Orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Admin All Order Items" ON public.order_items FOR ALL USING (true);
CREATE POLICY "Admin All Bookings" ON public.table_bookings FOR ALL USING (true);
CREATE POLICY "Admin All Festivals" ON public.festivals FOR ALL USING (true);
CREATE POLICY "Admin All Staff" ON public.staff FOR ALL USING (true);
CREATE POLICY "Admin All Payroll" ON public.payroll FOR ALL USING (true);
CREATE POLICY "Admin All Notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Admin All Reviews" ON public.reviews FOR ALL USING (true);

-- ====================================================
-- STORAGE BUCKETS SETUP (Product Images & Festival Banners)
-- ====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('product-images', 'product-images', true),
    ('festival-banners', 'festival-banners', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Public Access Policies
CREATE POLICY "Public Access Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Public Upload Product Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public Access Festival Banners"
ON storage.objects FOR SELECT
USING (bucket_id = 'festival-banners');

CREATE POLICY "Public Upload Festival Banners"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'festival-banners');

-- ====================================================
-- INITIAL SEED DATA
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

INSERT INTO public.festivals (name, tagline, banner_url, discount_percentage, start_date, end_date, active)
VALUES (
    'Diwali Mahotsav 2026',
    'Celebrate With Pure Desi Ghee Kaju Katli & Royal Gift Boxes',
    'https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=1200',
    20.0,
    '2026-10-15',
    '2026-11-05',
    true
)
ON CONFLICT DO NOTHING;
