import React, { useState } from 'react';
import { Database, Copy, Check, ShieldCheck, Server, Key, Terminal } from 'lucide-react';

export const DatabaseSchemaTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- ====================================================================
-- AGGARWAL SWEETS - COMPLETE SUPABASE POSTGRESQL DATABASE SCHEMA
-- Features: Auth Sync, Products, Orders, Festival Campaigns, Coupons,
--           Table Bookings, Customer CRM, Inventory & RLS Security Policies
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    price_per_kg NUMERIC(10, 2) NOT NULL,
    half_kg_price NUMERIC(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    fresh_today BOOLEAN DEFAULT true,
    is_available BOOLEAN DEFAULT true,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    delivery_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    payment_status VARCHAR(50) DEFAULT 'Paid',
    order_status VARCHAR(50) DEFAULT 'New' CHECK (order_status IN ('New', 'Preparing', 'Ready', 'Delivered', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ORDER ITEMS TABLE (Relationship to Orders & Products)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    sweet_name VARCHAR(255) NOT NULL,
    quantity_kg NUMERIC(6, 2) NOT NULL,
    price_per_kg NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. FESTIVAL CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS public.festival_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    festival_name VARCHAR(100) NOT NULL,
    banner_url TEXT NOT NULL,
    discount_percentage NUMERIC(5, 2) DEFAULT 15,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent NUMERIC(5, 2) NOT NULL,
    min_order_value NUMERIC(10, 2) DEFAULT 499,
    expiry_date DATE NOT NULL,
    usage_limit INT DEFAULT 500,
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABLE BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.table_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    guest_count INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(50) NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    table_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. CUSTOMER CRM TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    total_orders INT DEFAULT 1,
    total_spent NUMERIC(10, 2) DEFAULT 0,
    loyalty_points INT DEFAULT 0,
    tier VARCHAR(50) DEFAULT 'Silver' CHECK (tier IN ('Silver', 'Gold', 'Platinum')),
    last_order_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. INVENTORY RAW MATERIALS TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock_quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    min_threshold NUMERIC(10, 2) DEFAULT 20,
    unit_price NUMERIC(10, 2) NOT NULL,
    supplier_name VARCHAR(255),
    supplier_phone VARCHAR(50),
    last_restocked TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festival_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ PERMISSIONS (Customers can view products, campaigns & coupons)
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Campaigns" ON public.festival_campaigns FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON public.coupons FOR SELECT USING (true);

-- PUBLIC INSERT FOR ORDERS & TABLE BOOKINGS
CREATE POLICY "Public Create Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Create Table Bookings" ON public.table_bookings FOR INSERT WITH CHECK (true);

-- STAFF AUTHENTICATED FULL CONTROL POLICIES
CREATE POLICY "Staff Full Control Products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff Full Control Orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff Full Control Inventory" ON public.inventory FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff Full Control Table Bookings" ON public.table_bookings FOR ALL USING (auth.role() = 'authenticated');
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Database className="w-5 h-5 text-[#F4D03F]" />
            <span>Supabase Database Schema & RLS Security Script</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Complete relational database setup for Products, Orders, CRM, Coupons & Inventory</p>
        </div>

        <button
          onClick={handleCopy}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'SQL Schema Copied!' : 'Copy SQL Schema'}</span>
        </button>
      </div>

      {/* SQL Viewer Box */}
      <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-[#D4AF37]/30 shadow-2xl relative font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3 text-gray-400 text-[11px]">
          <span className="flex items-center space-x-2 text-[#F4D03F]">
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
            <span>supabase_aggarwal_sweets_schema.sql</span>
          </span>
          <span>PostgreSQL 15+ Compatible</span>
        </div>

        <pre className="p-4 bg-black rounded-xl border border-gray-900 text-gray-300 overflow-x-auto text-[11px] leading-relaxed max-h-[500px]">
          {sqlSchema}
        </pre>
      </div>
    </div>
  );
};
