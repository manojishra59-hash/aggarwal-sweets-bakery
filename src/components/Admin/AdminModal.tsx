import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Boxes,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Tag,
  Sparkles,
  BookOpen,
  Settings,
  BarChart3,
  LogOut,
  X,
  Bell,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  PartyPopper,
  UserCheck,
  Building2,
  Lock,
} from 'lucide-react';
import {
  apiService,
  AdminProduct,
  AdminCategory,
  OrderRecord,
  BookingRecord,
  CustomerRecord,
  CouponRecord,
  OfferRecord,
  BlogRecord,
  SettingsRecord,
  NotificationRecord,
} from '../../lib/apiService';

import { OverviewTab } from './tabs/OverviewTab';
import { ProductsTab } from './tabs/ProductsTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { InventoryTab } from './tabs/InventoryTab';
import { OrdersTab } from './tabs/OrdersTab';
import { BookingsTab } from './tabs/BookingsTab';
import { CustomersTab } from './tabs/CustomersTab';
import { ReviewsTab } from './tabs/ReviewsTab';
import { ContactsTab } from './tabs/ContactsTab';
import { CouponsTab } from './tabs/CouponsTab';
import { OffersTab } from './tabs/OffersTab';
import { BlogsTab } from './tabs/BlogsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ReportsTab } from './tabs/ReportsTab';
import { FestivalsTab } from './tabs/FestivalsTab';
import { StaffTab } from './tabs/StaffTab';
import { BranchesTab } from './tabs/BranchesTab';
import { SecurityBackupTab } from './tabs/SecurityBackupTab';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Realtime Data State
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [coupons, setCoupons] = useState<CouponRecord[]>([]);
  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [settings, setSettings] = useState<SettingsRecord>({
    businessName: 'Aggarwal Sweets & Bakery',
    tagline: 'Artisanal Indian Mithai & Fine Bakery Since 2004',
    phone: '+91 98100 12345',
    whatsapp: '919810012345',
    email: 'info@aggarwalsweets.com',
    address: 'Plot 42, Main Market, Rajouri Garden, New Delhi, 110027',
    openingHours: 'Monday – Sunday: 8:00 AM – 10:30 PM',
    gstNumber: '07AAAAA0000A1Z5',
  });
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, c, o, b, cust, coup, off, bl, set, notif] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
        apiService.getOrders(),
        apiService.getBookings(),
        apiService.getCustomers(),
        apiService.getCoupons(),
        apiService.getOffers(),
        apiService.getBlogs(),
        apiService.getSettings(),
        apiService.getNotifications(),
      ]);

      setProducts(p);
      setCategories(c);
      setOrders(o);
      setBookings(b);
      setCustomers(cust);
      setCoupons(coup);
      setOffers(off);
      setBlogs(bl);
      setSettings(set);
      setNotifications(notif);
    } catch (e) {
      console.error('Error loading admin state:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders & POS', icon: ShoppingBag, badge: orders.filter((o) => o.status === 'Preparing' || o.status === 'Pending').length },
    { id: 'products', label: 'Products & Mithai', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'festivals', label: 'Festivals & Banners', icon: PartyPopper },
    { id: 'inventory', label: 'Inventory & Materials', icon: Boxes, badge: products.filter((p) => p.stockKg <= 10).length, badgeColor: 'bg-rose-500' },
    { id: 'bookings', label: 'Table Bookings', icon: Calendar, badge: bookings.filter((b) => b.status === 'Pending').length },
    { id: 'customers', label: 'CRM & Loyalty', icon: Users },
    { id: 'staff', label: 'Staff & Payroll', icon: UserCheck },
    { id: 'branches', label: 'Store Outlets', icon: Building2 },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'contacts', label: 'Inquiries', icon: MessageSquare },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'offers', label: 'Offers & Popups', icon: Sparkles },
    { id: 'blogs', label: 'Stories / Blog', icon: BookOpen },
    { id: 'reports', label: 'Sales Reports', icon: BarChart3 },
    { id: 'security', label: 'Security & Backup', icon: Lock },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md animate-in fade-in duration-200 text-white font-sans flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-[#121212] border-b border-[#D4AF37]/30 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl btn-gold flex items-center justify-center text-black font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold font-serif-luxury text-white tracking-wide flex items-center space-x-2">
              <span>{settings.businessName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F4D03F] border border-[#D4AF37]/40 uppercase font-mono font-bold">
                ERP Admin Console
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">Store Operations, Inventory, Festivals & Multi-Branch ERP</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Refresh Data */}
          <button
            onClick={loadData}
            className="p-2 rounded-xl bg-[#181818] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#F4D03F] hover:border-[#F4D03F] transition-colors cursor-pointer"
            title="Refresh Realtime Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 rounded-xl bg-[#181818] border border-[#D4AF37]/30 text-gray-300 hover:text-white transition-colors cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-[#181818] border border-[#D4AF37]/40 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-xs font-bold text-[#F4D03F] uppercase">Realtime Notifications</span>
                  <span className="text-[10px] text-gray-400 font-mono">{notifications.length} alerts</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#121212] border border-white/5 text-xs">
                      <p className="font-bold text-white">{n.title}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Close Panel */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#181818] border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#121212] border-r border-[#D4AF37]/20 p-4 shrink-0 overflow-y-auto hidden md:block space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-extrabold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black text-white ${
                      item.badgeColor || 'bg-amber-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Mobile Nav Header */}
        <div className="md:hidden bg-[#181818] p-2 border-b border-[#D4AF37]/20 flex overflow-x-auto gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'bg-[#121212] text-gray-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#0A0A0A]">
          {activeTab === 'overview' && (
            <OverviewTab
              orders={orders}
              bookings={bookings}
              products={products}
              customers={customers}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab orders={orders} settings={settings} onRefresh={loadData} />
          )}

          {activeTab === 'products' && (
            <ProductsTab products={products} categories={categories} onRefresh={loadData} />
          )}

          {activeTab === 'categories' && (
            <CategoriesTab categories={categories} onRefresh={loadData} />
          )}

          {activeTab === 'festivals' && <FestivalsTab />}

          {activeTab === 'inventory' && (
            <InventoryTab products={products} onRefresh={loadData} />
          )}

          {activeTab === 'bookings' && (
            <BookingsTab bookings={bookings} onRefresh={loadData} />
          )}

          {activeTab === 'customers' && <CustomersTab customers={customers} />}

          {activeTab === 'staff' && <StaffTab />}

          {activeTab === 'branches' && <BranchesTab />}

          {activeTab === 'reviews' && <ReviewsTab />}

          {activeTab === 'contacts' && <ContactsTab />}

          {activeTab === 'coupons' && <CouponsTab coupons={coupons} onRefresh={loadData} />}

          {activeTab === 'offers' && <OffersTab offers={offers} />}

          {activeTab === 'blogs' && <BlogsTab blogs={blogs} />}

          {activeTab === 'reports' && <ReportsTab orders={orders} products={products} />}

          {activeTab === 'security' && <SecurityBackupTab />}

          {activeTab === 'settings' && <SettingsTab settings={settings} onRefresh={loadData} />}
        </main>
      </div>
    </div>
  );
};
