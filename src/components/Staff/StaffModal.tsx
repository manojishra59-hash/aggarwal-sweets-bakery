import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import {
  X,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Sparkles,
  Tag,
  Utensils,
  Users,
  ShieldCheck,
  Package,
  BarChart3,
  Database,
  Crown,
  Lock,
  Menu as MenuIcon,
  AlertTriangle,
} from 'lucide-react';

import { DashboardTab } from './tabs/DashboardTab';
import { ProductsTab } from './tabs/ProductsTab';
import { OrdersTab } from './tabs/OrdersTab';
import { FestivalTab } from './tabs/FestivalTab';
import { CouponsTab } from './tabs/CouponsTab';
import { TableBookingsTab } from './tabs/TableBookingsTab';
import { CustomerCRMTab } from './tabs/CustomerCRMTab';
import { StaffTab } from './tabs/StaffTab';
import { InventoryTab } from './tabs/InventoryTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { DatabaseSchemaTab } from './tabs/DatabaseSchemaTab';

import { AdminOrder, OrderStatus, InventoryItem, ActivityLog } from './types';
import { INITIAL_ORDERS, INITIAL_INVENTORY, INITIAL_LOGS } from './mockStaffData';
import { BRAND_NAME } from '../../data/sweetsData';

interface TabErrorBoundaryProps {
  children: React.ReactNode;
  tabName: string;
}

interface TabErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class TabErrorBoundary extends Component<TabErrorBoundaryProps, TabErrorBoundaryState> {
  declare props: TabErrorBoundaryProps;
  declare setState: (state: Partial<TabErrorBoundaryState>) => void;
  state: TabErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): TabErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in Tab ${this.props.tabName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-[#141414] border border-amber-500/40 text-white space-y-4 shadow-2xl font-sans">
          <div className="flex items-center space-x-3 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold font-serif">Unable to load {this.props.tabName}</h3>
          </div>
          <p className="text-xs text-gray-300">
            A temporary rendering issue occurred in this section ({this.state.error?.message || 'Unknown error'}).
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black text-xs font-bold uppercase tracking-wider cursor-pointer hover:scale-105 transition-all"
          >
            Retry Loading Tab
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared Persistent State for Orders, Inventory & Logs
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    const saved = localStorage.getItem('aggarwal_staff_orders') || localStorage.getItem('aggarwal_admin_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('aggarwal_staff_inventory') || localStorage.getItem('aggarwal_admin_inventory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_INVENTORY;
  });

  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('aggarwal_staff_logs') || localStorage.getItem('aggarwal_admin_logs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_LOGS;
  });

  if (!isOpen) return null;

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const safeOrders = Array.isArray(orders) ? orders : INITIAL_ORDERS;
    const updated = safeOrders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('aggarwal_staff_orders', JSON.stringify(updated));

    // Append log entry
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      user: 'Executive Staff',
      action: `Updated status of Order #${orderId} to "${newStatus}"`,
      timestamp: 'Just now',
      type: 'order',
    };
    const safeLogs = Array.isArray(logs) ? logs : INITIAL_LOGS;
    const updatedLogs = [newLog, ...safeLogs];
    setLogs(updatedLogs);
    localStorage.setItem('aggarwal_staff_logs', JSON.stringify(updatedLogs));
  };

  const handleRestockInventory = (id: string, amount: number) => {
    const safeInventory = Array.isArray(inventory) ? inventory : INITIAL_INVENTORY;
    const updated = safeInventory.map((it) =>
      it.id === id ? { ...it, stockQuantity: it.stockQuantity + amount } : it
    );
    setInventory(updated);
    localStorage.setItem('aggarwal_staff_inventory', JSON.stringify(updated));
  };

  const safeOrdersList = Array.isArray(orders) ? orders : INITIAL_ORDERS;
  const safeInventoryList = Array.isArray(inventory) ? inventory : INITIAL_INVENTORY;

  const tabsNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: ClipboardList, badge: safeOrdersList.filter(o => o.orderStatus === 'New').length },
    { id: 'festivals', label: 'Festival', icon: Sparkles },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'bookings', label: 'Table Booking', icon: Utensils },
    { id: 'customers', label: 'Customer CRM', icon: Users },
    { id: 'staff', label: 'Staff', icon: ShieldCheck },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: safeInventoryList.filter(i => i.stockQuantity <= i.minThreshold).length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'database', label: 'Database Schema', icon: Database },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#0F0E0B] text-white font-sans flex flex-col">
      {/* Top Gold Header */}
      <header className="h-16 bg-[#16140E] border-b border-[#D4AF37]/50 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xl relative z-40">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#221E14] border border-[#D4AF37]/40 text-[#F4D03F]"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1A1A1A] via-[#2A2412] to-[#1A1A1A] border border-[#D4AF37] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)]">
              <Crown className="w-5 h-5 text-[#F4D03F]" />
            </div>
            <div>
              <h1 className="text-base font-black font-serif tracking-wider text-white flex items-center space-x-1.5">
                <span>{BRAND_NAME}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black border border-[#D4AF37] text-[#F4D03F] font-mono">
                  STAFF
                </span>
              </h1>
              <p className="text-[10px] text-[#F4D03F]">Executive Control Portal</p>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-xl bg-[#221E14] border border-[#D4AF37]/40 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-200 font-medium">Server Connected</span>
          </div>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-[#221B1B] hover:bg-red-900/80 text-gray-200 hover:text-white border border-red-500/40 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Logout Staff Session"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
            title="Exit Staff Portal and Back to Store"
          >
            <X className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Exit Portal</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`w-64 bg-[#121212] border-r border-[#D4AF37]/30 flex flex-col p-4 space-y-1.5 shrink-0 transition-all duration-300 z-30 ${
            mobileMenuOpen
              ? 'absolute inset-y-16 left-0 bottom-0 bg-[#121212] shadow-2xl'
              : 'hidden lg:flex'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#F4D03F] px-3 py-1 mb-1">
            Management Navigation
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto scrollbar-none pr-1">
            {tabsNav.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885]'
                      : 'text-gray-300 hover:text-white hover:bg-[#1A1A1A] border border-transparent hover:border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#D4AF37]'}`} />
                    <span>{tab.label}</span>
                  </div>

                  {Boolean(tab.badge) && tab.badge! > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-black text-[#F4D03F]' : 'bg-[#D4AF37] text-black'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#D4AF37]/20 text-[11px] text-gray-400 space-y-1 mt-auto">
            <div className="text-white font-bold flex items-center space-x-1">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Role: Executive Staff / Manager</span>
            </div>
            <div>Full permissions enabled</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-[#0A0A0A] p-4 sm:p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <TabErrorBoundary tabName="Dashboard">
              <DashboardTab
                orders={safeOrdersList}
                inventory={safeInventoryList}
                logs={Array.isArray(logs) ? logs : INITIAL_LOGS}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            </TabErrorBoundary>
          )}

          {activeTab === 'products' && (
            <TabErrorBoundary tabName="Products">
              <ProductsTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'orders' && (
            <TabErrorBoundary tabName="Orders">
              <OrdersTab orders={safeOrdersList} onUpdateStatus={handleUpdateOrderStatus} />
            </TabErrorBoundary>
          )}

          {activeTab === 'festivals' && (
            <TabErrorBoundary tabName="Festivals">
              <FestivalTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'coupons' && (
            <TabErrorBoundary tabName="Coupons">
              <CouponsTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'bookings' && (
            <TabErrorBoundary tabName="Table Bookings">
              <TableBookingsTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'customers' && (
            <TabErrorBoundary tabName="Customer CRM">
              <CustomerCRMTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'staff' && (
            <TabErrorBoundary tabName="Staff Management">
              <StaffTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'inventory' && (
            <TabErrorBoundary tabName="Inventory">
              <InventoryTab inventory={safeInventoryList} onRestock={handleRestockInventory} />
            </TabErrorBoundary>
          )}

          {activeTab === 'analytics' && (
            <TabErrorBoundary tabName="Analytics">
              <AnalyticsTab />
            </TabErrorBoundary>
          )}

          {activeTab === 'database' && (
            <TabErrorBoundary tabName="Database Schema">
              <DatabaseSchemaTab />
            </TabErrorBoundary>
          )}
        </main>
      </div>
    </div>
  );
};


