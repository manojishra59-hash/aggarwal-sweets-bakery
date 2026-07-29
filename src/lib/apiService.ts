import { supabase, isSupabaseConfigured } from './supabase';
import { SweetItem, ReviewItem, CartItem } from '../types';
import { FEATURED_SWEETS, GOOGLE_REVIEWS, BRAND_NAME, BRAND_PHONE, BRAND_WHATSAPP, BRAND_ADDRESS, BRAND_HOURS } from '../data/sweetsData';
export { BRAND_WHATSAPP, BRAND_NAME, BRAND_PHONE };

export interface StaffProduct extends SweetItem {
  stockKg: number;
  isEnabled: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFestivalSpecial?: boolean;
  images?: string[];
}
export type AdminProduct = StaffProduct;

export interface StaffCategory {
  id: string;
  name: string;
  description: string;
  isVisible: boolean;
  displayOrder: number;
}
export type AdminCategory = StaffCategory;

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  status: 'Pending' | 'Preparing' | 'Packaging' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: string;
  notes?: string;
  items: {
    sweetId: string;
    sweetName: string;
    quantityKg: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

export interface BookingRecord {
  id: string;
  bookingNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  guestsCount: number;
  bookingDate: string;
  bookingTime: string;
  eventType: string;
  specialRequest?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
}

export interface CustomerRecord {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  isBlocked: boolean;
  totalOrders: number;
  totalSpent: number;
  birthday?: string;
  anniversary?: string;
  loyaltyPoints?: number;
  segment?: 'VIP Royal' | 'Regular' | 'New' | 'Festival Corporate';
}

export interface FestivalCampaignRecord {
  id: string;
  name: string;
  festivalType: 'Diwali' | 'Holi' | 'Raksha Bandhan' | 'Wedding Season' | 'Durga Puja' | 'New Year' | 'Other';
  bannerImage: string;
  specialProducts: string[];
  discountPercent: number;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Upcoming' | 'Expired';
  description: string;
}

export interface RawMaterialRecord {
  id: string;
  name: string;
  category: 'Ghee' | 'Milk' | 'Sugar' | 'Dry Fruits' | 'Packaging Material' | 'Spices & Flavors' | 'Flour & Grains';
  currentStock: number;
  unit: 'kg' | 'liters' | 'boxes' | 'grams';
  minThreshold: number;
  costPerUnit: number;
  supplierName: string;
  lastRestocked: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  itemsSupplied: string[];
  totalPurchaseAmount: number;
}

export interface PurchaseRecord {
  id: string;
  createdAt: string;
  materialName: string;
  supplierName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  invoiceRef: string;
}

export interface StaffRecord {
  id: string;
  name: string;
  role: 'Owner' | 'Manager' | 'Staff' | 'Head Halwai';
  phone: string;
  email: string;
  branch: string;
  monthlySalary: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  permissions: {
    manageProducts: boolean;
    manageOrders: boolean;
    manageInventory: boolean;
    manageStaff: boolean;
    manageReports: boolean;
  };
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Half Day' | 'Leave';
  shiftTiming: string;
}

export interface SalaryRecord {
  id: string;
  staffId: string;
  staffName: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPayable: number;
  paymentStatus: 'Paid' | 'Pending';
  paidDate?: string;
}

export interface LoyaltyRecord {
  customerId: string;
  customerName: string;
  customerPhone: string;
  totalPointsEarned: number;
  currentPointsBalance: number;
  pointsRedeemed: number;
  tier: 'Gold' | 'Platinum' | 'Royal VIP';
}

export interface BranchRecord {
  id: string;
  name: string;
  address: string;
  phone: string;
  managerName: string;
  isActive: boolean;
  todaySales: number;
}

export interface ActivityLogRecord {
  id: string;
  timestamp: string;
  userRole: string;
  userName: string;
  action: string;
  details: string;
}

export interface ContactRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  isRead: boolean;
  replyNotes?: string;
}

export interface CouponRecord {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  timesUsed: number;
  expiryDate: string;
  isEnabled: boolean;
}

export interface OfferRecord {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  bannerImage: string;
  popupActive: boolean;
  bannerActive: boolean;
  validTill: string;
}

export interface BlogRecord {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  status: 'published' | 'draft';
}

export interface SettingsRecord {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  gstNumber: string;
  logoUrl?: string;
  googleMapsUrl?: string;
}

export interface NotificationRecord {
  id: string;
  createdAt: string;
  type: 'order' | 'booking' | 'contact' | 'stock' | 'review';
  title: string;
  message: string;
  isRead: boolean;
}

// Initial Local Fallback Seed Data
const INITIAL_PRODUCTS: AdminProduct[] = FEATURED_SWEETS.map((s, idx) => ({
  ...s,
  stockKg: 45 + idx * 10,
  isEnabled: true,
  isFeatured: idx < 4,
  isBestSeller: idx === 1 || idx === 0,
  isFestivalSpecial: idx === 2 || idx === 7,
  images: [s.image],
}));

const INITIAL_CATEGORIES: AdminCategory[] = [
  { id: 'cat-1', name: 'Ghee Sweets', description: 'Pure A2 Desi Ghee traditional delicacies', isVisible: true, displayOrder: 1 },
  { id: 'cat-2', name: 'Dry Fruit Sweets', description: 'Premium cashew, pistachio & fig rolls', isVisible: true, displayOrder: 2 },
  { id: 'cat-3', name: 'Syrup Sweets', description: 'Rose & saffron soaked hot jamuns & rasgulla', isVisible: true, displayOrder: 3 },
  { id: 'cat-4', name: 'Bengali Sweets', description: 'Fresh chhena light & spongy delights', isVisible: true, displayOrder: 4 },
  { id: 'cat-5', name: 'Milk Sweets', description: 'Caramelized milk cake, peda & khoya barfi', isVisible: true, displayOrder: 5 },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-1082',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Rajesh Sharma',
    customerPhone: '+91 98100 98765',
    customerEmail: 'rajesh.sharma@gmail.com',
    deliveryAddress: 'House 14, Block B, Rajouri Garden, New Delhi',
    status: 'Out for Delivery',
    totalAmount: 1620,
    discountAmount: 100,
    couponCode: 'DIWALI2026',
    paymentMethod: 'Cash on Delivery',
    notes: 'Please pack in luxury gold gift box.',
    items: [
      { sweetId: 'motichoor-laddu', sweetName: 'Motichoor Laddu', quantityKg: 1.5, unitPrice: 640, totalPrice: 960 },
      { sweetId: 'kaju-katli', sweetName: 'Kaju Katli', quantityKg: 0.8, unitPrice: 980, totalPrice: 760 },
    ],
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-1083',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    customerName: 'Ananya Malhotra',
    customerPhone: '+91 98711 22334',
    customerEmail: 'ananya@gmail.com',
    deliveryAddress: 'A-42, Janakpuri, New Delhi',
    status: 'Preparing',
    totalAmount: 2480,
    discountAmount: 0,
    paymentMethod: 'UPI / Online',
    notes: 'Fresh morning batch preferred.',
    items: [
      { sweetId: 'gulab-jamun', sweetName: 'Gulab Jamun', quantityKg: 2, unitPrice: 520, totalPrice: 1040 },
      { sweetId: 'dry-fruit-sweets', sweetName: 'Royal Dry Fruit Anjeer Roll', quantityKg: 1, unitPrice: 1250, totalPrice: 1250 },
    ],
  },
];

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-201',
    bookingNumber: 'TBK-501',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    customerName: 'Vikramaditya Gupta',
    customerPhone: '+91 98990 11223',
    customerEmail: 'vikram.g@gmail.com',
    guestsCount: 6,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    bookingTime: '19:30',
    eventType: 'Family Sweet Tasting Session',
    specialRequest: 'Arrangement for senior citizens, quiet corner table.',
    status: 'Approved',
  },
];

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    name: 'Rajesh Sharma',
    phone: '+91 98100 98765',
    email: 'rajesh.sharma@gmail.com',
    address: 'Rajouri Garden, New Delhi',
    isBlocked: false,
    totalOrders: 4,
    totalSpent: 6400,
    birthday: '1988-10-15',
    anniversary: '2014-11-20',
    loyaltyPoints: 640,
    segment: 'VIP Royal',
  },
  {
    id: 'cust-2',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    name: 'Ananya Malhotra',
    phone: '+91 98711 22334',
    email: 'ananya@gmail.com',
    address: 'Janakpuri, New Delhi',
    isBlocked: false,
    totalOrders: 2,
    totalSpent: 3800,
    birthday: '1992-05-18',
    loyaltyPoints: 380,
    segment: 'Regular',
  },
  {
    id: 'cust-3',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    name: 'Vikramaditya Gupta',
    phone: '+91 98990 11223',
    email: 'vikram.g@gmail.com',
    address: 'Connaught Place, New Delhi',
    isBlocked: false,
    totalOrders: 8,
    totalSpent: 18500,
    birthday: '1982-12-04',
    anniversary: '2010-02-14',
    loyaltyPoints: 1850,
    segment: 'Festival Corporate',
  },
];

const INITIAL_FESTIVALS: FestivalCampaignRecord[] = [
  {
    id: 'fest-1',
    name: 'Grand Diwali Royal Mahotsav 2026',
    festivalType: 'Diwali',
    bannerImage: 'https://res.cloudinary.com/q8pk1ufj/image/upload/v1784720744/diwali_box.jpg',
    specialProducts: ['kaju-katli', 'motichoor-laddu', 'dry-fruit-sweets'],
    discountPercent: 15,
    startDate: '2026-10-01',
    expiryDate: '2026-11-15',
    status: 'Active',
    description: 'Bespoke 24K Gold velvet trunks & organic Desi Ghee mithai hampers for Diwali gifting.',
  },
  {
    id: 'fest-2',
    name: 'Rakhi Sweets & Silver Platter Collection',
    festivalType: 'Raksha Bandhan',
    bannerImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    specialProducts: ['kaju-katli', 'besan-laddu'],
    discountPercent: 10,
    startDate: '2026-08-01',
    expiryDate: '2026-08-25',
    status: 'Upcoming',
    description: 'Custom silver thali packaging with handcrafted designer Rakhis and pure Desi Ghee laddus.',
  },
  {
    id: 'fest-3',
    name: 'Royal Wedding Sweets Trunk Campaign',
    festivalType: 'Wedding Season',
    bannerImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    specialProducts: ['dry-fruit-sweets', 'kaju-katli'],
    discountPercent: 20,
    startDate: '2026-11-01',
    expiryDate: '2027-02-28',
    status: 'Upcoming',
    description: 'Customized wedding invitation mithai boxes with embossed gold leaf logo.',
  },
];

const INITIAL_RAW_MATERIALS: RawMaterialRecord[] = [
  {
    id: 'raw-1',
    name: 'Pure A2 Organic Cow Ghee',
    category: 'Ghee',
    currentStock: 180,
    unit: 'kg',
    minThreshold: 50,
    costPerUnit: 780,
    supplierName: 'Organic Bilona Farms Co.',
    lastRestocked: '2026-07-20',
  },
  {
    id: 'raw-2',
    name: 'Fresh Full Cream Milk',
    category: 'Milk',
    currentStock: 450,
    unit: 'liters',
    minThreshold: 100,
    costPerUnit: 65,
    supplierName: 'Mother Dairy Bulk Supply',
    lastRestocked: '2026-07-24',
  },
  {
    id: 'raw-3',
    name: 'Refined Sulphur-Free Sugar',
    category: 'Sugar',
    currentStock: 600,
    unit: 'kg',
    minThreshold: 150,
    costPerUnit: 44,
    supplierName: 'Uttam Sugar Mills',
    lastRestocked: '2026-07-18',
  },
  {
    id: 'raw-4',
    name: 'Kashmiri Mogra Saffron (Kesar)',
    category: 'Spices & Flavors',
    currentStock: 1200,
    unit: 'grams',
    minThreshold: 300,
    costPerUnit: 220,
    supplierName: 'Pampore Kashmiri Saffron Exporters',
    lastRestocked: '2026-07-10',
  },
  {
    id: 'raw-5',
    name: 'Premium W240 Cashew Nuts (Kaju)',
    category: 'Dry Fruits',
    currentStock: 85,
    unit: 'kg',
    minThreshold: 30,
    costPerUnit: 820,
    supplierName: 'Mangalore Cashew Importers',
    lastRestocked: '2026-07-21',
  },
  {
    id: 'raw-6',
    name: 'Royal Gold Embossed Boxes (1kg)',
    category: 'Packaging Material',
    currentStock: 420,
    unit: 'boxes',
    minThreshold: 100,
    costPerUnit: 65,
    supplierName: 'Luxuria Packaging Printers',
    lastRestocked: '2026-07-15',
  },
];

const INITIAL_SUPPLIERS: SupplierRecord[] = [
  {
    id: 'sup-1',
    name: 'Organic Bilona Farms Co.',
    contactPerson: 'Suresh Kumar',
    phone: '+91 98112 33445',
    email: 'suresh@bilonaghee.com',
    itemsSupplied: ['Pure A2 Organic Cow Ghee', 'Fresh Mawa Khoya'],
    totalPurchaseAmount: 450000,
  },
  {
    id: 'sup-2',
    name: 'Pampore Kashmiri Saffron Exporters',
    contactPerson: 'Tariq Ahmed',
    phone: '+91 94190 88776',
    email: 'tariq@kashmirsaffron.in',
    itemsSupplied: ['Kashmiri Mogra Saffron (Kesar)'],
    totalPurchaseAmount: 320000,
  },
  {
    id: 'sup-3',
    name: 'Luxuria Packaging Printers',
    contactPerson: 'Harpreet Singh',
    phone: '+91 98730 44556',
    email: 'harpreet@luxuriapackaging.com',
    itemsSupplied: ['Royal Gold Embossed Boxes', 'Velvet Trunks'],
    totalPurchaseAmount: 180000,
  },
];

const INITIAL_PURCHASES: PurchaseRecord[] = [
  {
    id: 'pur-101',
    createdAt: '2026-07-21',
    materialName: 'Premium W240 Cashew Nuts (Kaju)',
    supplierName: 'Mangalore Cashew Importers',
    quantity: 50,
    unit: 'kg',
    totalCost: 41000,
    invoiceRef: 'INV-MCI-8821',
  },
  {
    id: 'pur-102',
    createdAt: '2026-07-20',
    materialName: 'Pure A2 Organic Cow Ghee',
    supplierName: 'Organic Bilona Farms Co.',
    quantity: 100,
    unit: 'kg',
    totalCost: 78000,
    invoiceRef: 'INV-OBF-4412',
  },
];

const INITIAL_STAFF: StaffRecord[] = [
  {
    id: 'stf-1',
    name: 'Manoj Aggarwal',
    role: 'Owner',
    phone: '+91 98100 12345',
    email: 'owner@aggarwalsweets.com',
    branch: 'Rajouri Garden (Main Flagship)',
    monthlySalary: 150000,
    joinDate: '2004-01-01',
    status: 'Active',
    permissions: { manageProducts: true, manageOrders: true, manageInventory: true, manageStaff: true, manageReports: true },
  },
  {
    id: 'stf-2',
    name: 'Ramesh Halwai Master',
    role: 'Head Halwai',
    phone: '+91 98111 44556',
    email: 'ramesh.halwai@aggarwalsweets.com',
    branch: 'Rajouri Garden (Main Flagship)',
    monthlySalary: 65000,
    joinDate: '2010-03-15',
    status: 'Active',
    permissions: { manageProducts: true, manageOrders: true, manageInventory: true, manageStaff: false, manageReports: false },
  },
  {
    id: 'stf-3',
    name: 'Priya Sharma',
    role: 'Manager',
    phone: '+91 98711 66778',
    email: 'priya@aggarwalsweets.com',
    branch: 'Rajouri Garden (Main Flagship)',
    monthlySalary: 45000,
    joinDate: '2021-06-01',
    status: 'Active',
    permissions: { manageProducts: true, manageOrders: true, manageInventory: true, manageStaff: true, manageReports: true },
  },
  {
    id: 'stf-4',
    name: 'Amit Verma',
    role: 'Staff',
    phone: '+91 98991 22334',
    email: 'amit@aggarwalsweets.com',
    branch: 'Janakpuri Outlet',
    monthlySalary: 28000,
    joinDate: '2023-02-10',
    status: 'Active',
    permissions: { manageProducts: false, manageOrders: true, manageInventory: false, manageStaff: false, manageReports: false },
  },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', staffId: 'stf-1', staffName: 'Manoj Aggarwal', date: '2026-07-25', status: 'Present', shiftTiming: '08:00 - 20:00' },
  { id: 'att-2', staffId: 'stf-2', staffName: 'Ramesh Halwai Master', date: '2026-07-25', status: 'Present', shiftTiming: '06:00 - 18:00' },
  { id: 'att-3', staffId: 'stf-3', staffName: 'Priya Sharma', date: '2026-07-25', status: 'Present', shiftTiming: '09:00 - 19:00' },
  { id: 'att-4', staffId: 'stf-4', staffName: 'Amit Verma', date: '2026-07-25', status: 'Present', shiftTiming: '10:00 - 20:00' },
];

const INITIAL_SALARIES: SalaryRecord[] = [
  {
    id: 'sal-1',
    staffId: 'stf-2',
    staffName: 'Ramesh Halwai Master',
    month: 'July 2026',
    baseSalary: 65000,
    bonus: 5000,
    deductions: 0,
    netPayable: 70000,
    paymentStatus: 'Paid',
    paidDate: '2026-07-01',
  },
  {
    id: 'sal-2',
    staffId: 'stf-3',
    staffName: 'Priya Sharma',
    month: 'July 2026',
    baseSalary: 45000,
    bonus: 2500,
    deductions: 0,
    netPayable: 47500,
    paymentStatus: 'Paid',
    paidDate: '2026-07-01',
  },
];

const INITIAL_BRANCHES: BranchRecord[] = [
  {
    id: 'br-1',
    name: 'Rajouri Garden (Main Flagship)',
    address: 'Plot 42, Main Market, Rajouri Garden, New Delhi',
    phone: '+91 98100 12345',
    managerName: 'Priya Sharma',
    isActive: true,
    todaySales: 142500,
  },
  {
    id: 'br-2',
    name: 'Janakpuri Outlet',
    address: 'A-42, Central Market, Janakpuri, New Delhi',
    phone: '+91 98711 22334',
    managerName: 'Amit Verma',
    isActive: true,
    todaySales: 89400,
  },
  {
    id: 'br-3',
    name: 'Connaught Place Boutique',
    address: 'Block E, Inner Circle, Connaught Place, New Delhi',
    phone: '+91 98990 11223',
    managerName: 'Vikram Singh',
    isActive: true,
    todaySales: 215000,
  },
];

const INITIAL_LOGS: ActivityLogRecord[] = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    userRole: 'Owner',
    userName: 'Manoj Aggarwal',
    action: 'System Backup Created',
    details: 'Full JSON data snapshot generated.',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    userRole: 'Manager',
    userName: 'Priya Sharma',
    action: 'Stock Restocked',
    details: 'Added 50kg Motichoor Laddu stock.',
  },
];

const INITIAL_COUPONS: CouponRecord[] = [
  {
    id: 'c-1',
    code: 'FESTIVE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 1000,
    maxDiscountAmount: 300,
    usageLimit: 500,
    timesUsed: 42,
    expiryDate: '2026-12-31',
    isEnabled: true,
  },
  {
    id: 'c-2',
    code: 'ROYAL100',
    discountType: 'flat',
    discountValue: 100,
    minOrderAmount: 1500,
    usageLimit: 200,
    timesUsed: 18,
    expiryDate: '2026-12-31',
    isEnabled: true,
  },
];

const INITIAL_OFFERS: OfferRecord[] = [
  {
    id: 'off-1',
    title: 'Grand Festive Celebration 2026',
    subtitle: 'Get 15% OFF on Royal Velvet Gift Trunks & Corporate Hampers',
    discountText: 'FLAT 15% OFF',
    bannerImage: 'https://res.cloudinary.com/q8pk1ufj/image/upload/v1784720744/diwali_box.jpg',
    popupActive: true,
    bannerActive: true,
    validTill: '2026-11-15',
  },
];

const INITIAL_BLOGS: BlogRecord[] = [
  {
    id: 'blog-1',
    createdAt: new Date().toISOString(),
    title: 'The Art of Slow-Cooked Khoya & Pure A2 Desi Ghee Mithai',
    slug: 'art-of-slow-cooked-khoya',
    excerpt: 'Discover how our master halwais slow-churn organic milk for 6 hours in copper kadhais.',
    content: 'Full story on traditional halwai craftsmanship passed down since 1984...',
    author: 'Halwai Master Chef Devendra',
    coverImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    status: 'published',
  },
];

const INITIAL_SETTINGS: SettingsRecord = {
  businessName: BRAND_NAME,
  tagline: 'Artisanal Indian Mithai & Fine Bakery Since 2004',
  phone: BRAND_PHONE,
  whatsapp: BRAND_WHATSAPP,
  email: 'info@aggarwalsweets.com',
  address: BRAND_ADDRESS,
  openingHours: BRAND_HOURS,
  gstNumber: '07AAAAA0000A1Z5',
  logoUrl: '',
};

const INITIAL_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: 'notif-1',
    createdAt: new Date().toISOString(),
    type: 'order',
    title: 'New Online Mithai Order #ORD-8821',
    message: 'Received 5kg Kaju Katli & Royal Gift Box order (₹4,900) for delivery.',
    isRead: false,
  },
  {
    id: 'notif-2',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    type: 'booking',
    title: 'Diwali Banquet Hall Reservation',
    message: 'Corporate VIP booking request for 80 guests on Oct 28.',
    isRead: false,
  },
  {
    id: 'notif-3',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    type: 'stock',
    title: 'Low Raw Material Stock: A2 Pure Desi Ghee',
    message: 'Stock level dropped below minimum threshold (18 kg remaining).',
    isRead: true,
  },
];

// Local storage helper functions
function getLocal<T>(key: string, initial: T): T {
  try {
    const data = localStorage.getItem(`aggarwal_${key}`);
    return data ? JSON.parse(data) : initial;
  } catch {
    return initial;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`aggarwal_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to local state', e);
  }
}

// Unified API Service
export const apiService = {
  // PRODUCTS
  async getProducts(): Promise<AdminProduct[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            description: item.description || '',
            pricePerKg: Number(item.price_per_kg),
            halfKgPrice: Number(item.half_kg_price),
            image: item.image || '',
            freshToday: Boolean(item.fresh_today),
            rating: Number(item.rating || 4.9),
            ingredients: item.ingredients || [],
            stockKg: Number(item.stock_kg || 50),
            isEnabled: item.is_enabled ?? true,
            isFeatured: item.is_featured ?? false,
            isBestSeller: item.is_best_seller ?? false,
            isFestivalSpecial: item.is_festival_special ?? false,
            images: item.images || [item.image],
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch products error, using local state:', e);
      }
    }
    return getLocal<AdminProduct[]>('products', INITIAL_PRODUCTS);
  },

  async saveProduct(product: Partial<AdminProduct>): Promise<AdminProduct> {
    const products = getLocal<AdminProduct[]>('products', INITIAL_PRODUCTS);
    let updated: AdminProduct;

    if (product.id) {
      const idx = products.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...product } as AdminProduct;
        updated = products[idx];
      } else {
        updated = { ...product } as AdminProduct;
        products.push(updated);
      }
    } else {
      updated = {
        id: `prod-${Date.now()}`,
        name: product.name || 'New Sweet',
        category: product.category || 'Ghee Sweets',
        description: product.description || '',
        pricePerKg: product.pricePerKg || 500,
        halfKgPrice: product.halfKgPrice || 260,
        image: product.image || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
        freshToday: true,
        rating: 5.0,
        ingredients: product.ingredients || ['Pure Desi Ghee'],
        stockKg: product.stockKg || 50,
        isEnabled: true,
        isFeatured: false,
        isBestSeller: false,
        isFestivalSpecial: false,
        images: [product.image || ''],
      };
      products.push(updated);
    }

    setLocal('products', products);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').upsert({
          id: updated.id.startsWith('prod-') ? undefined : updated.id,
          name: updated.name,
          category: updated.category,
          description: updated.description,
          price_per_kg: updated.pricePerKg,
          half_kg_price: updated.halfKgPrice,
          image: updated.image,
          stock_kg: updated.stockKg,
          is_enabled: updated.isEnabled,
          is_featured: updated.isFeatured,
          is_best_seller: updated.isBestSeller,
          is_festival_special: updated.isFestivalSpecial,
          ingredients: updated.ingredients,
        });
      } catch (e) {
        console.error('Supabase product save error:', e);
      }
    }

    return updated;
  },

  async deleteProduct(id: string): Promise<void> {
    const products = getLocal<AdminProduct[]>('products', INITIAL_PRODUCTS).filter((p) => p.id !== id);
    setLocal('products', products);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase product delete error:', e);
      }
    }
  },

  // ORDERS
  async getOrders(): Promise<OrderRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          return data.map((o) => ({
            id: o.id,
            orderNumber: o.order_number,
            createdAt: o.created_at,
            customerName: o.customer_name,
            customerPhone: o.customer_phone,
            customerEmail: o.customer_email,
            deliveryAddress: o.delivery_address || 'Store Pickup / Local Delivery',
            status: o.status || 'Preparing',
            totalAmount: Number(o.total_amount),
            discountAmount: Number(o.discount_amount || 0),
            couponCode: o.coupon_code,
            paymentMethod: o.payment_method || 'Cash on Delivery',
            notes: o.notes,
            items: [],
          }));
        }
      } catch (e) {
        console.warn('Supabase orders fetch error:', e);
      }
    }
    return getLocal<OrderRecord[]>('orders', INITIAL_ORDERS);
  },

  async createOrder(order: Partial<OrderRecord>): Promise<OrderRecord> {
    const orders = getLocal<OrderRecord[]>('orders', INITIAL_ORDERS);
    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: order.customerName || 'Valued Guest',
      customerPhone: order.customerPhone || BRAND_PHONE,
      customerEmail: order.customerEmail || '',
      deliveryAddress: order.deliveryAddress || 'Store Pickup',
      status: 'Preparing',
      totalAmount: order.totalAmount || 0,
      discountAmount: order.discountAmount || 0,
      couponCode: order.couponCode,
      paymentMethod: order.paymentMethod || 'WhatsApp Direct / Cash',
      notes: order.notes,
      items: order.items || [],
    };

    orders.unshift(newOrder);
    setLocal('orders', orders);

    // Update customer stats
    const customers = getLocal<CustomerRecord[]>('customers', INITIAL_CUSTOMERS);
    const existingCustIdx = customers.findIndex((c) => c.phone === newOrder.customerPhone);
    if (existingCustIdx !== -1) {
      customers[existingCustIdx].totalOrders += 1;
      customers[existingCustIdx].totalSpent += newOrder.totalAmount;
    } else {
      customers.push({
        id: `cust-${Date.now()}`,
        createdAt: new Date().toISOString(),
        name: newOrder.customerName,
        phone: newOrder.customerPhone,
        email: newOrder.customerEmail,
        address: newOrder.deliveryAddress,
        isBlocked: false,
        totalOrders: 1,
        totalSpent: newOrder.totalAmount,
      });
    }
    setLocal('customers', customers);

    // Decrease Inventory stock
    const products = getLocal<AdminProduct[]>('products', INITIAL_PRODUCTS);
    newOrder.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.sweetId || prod.name === item.sweetName);
      if (p) {
        p.stockKg = Math.max(0, p.stockKg - item.quantityKg);
      }
    });
    setLocal('products', products);

    // Create Notification
    this.addNotification({
      type: 'order',
      title: `New Order #${newOrder.orderNumber}`,
      message: `Received ₹${newOrder.totalAmount} order from ${newOrder.customerName}`,
    });

    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').insert({
          order_number: newOrder.orderNumber,
          customer_name: newOrder.customerName,
          customer_phone: newOrder.customerPhone,
          customer_email: newOrder.customerEmail,
          delivery_address: newOrder.deliveryAddress,
          status: newOrder.status,
          total_amount: newOrder.totalAmount,
          discount_amount: newOrder.discountAmount,
          coupon_code: newOrder.couponCode,
          payment_method: newOrder.paymentMethod,
          notes: newOrder.notes,
        });
      } catch (e) {
        console.error('Supabase order insert error:', e);
      }
    }

    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: OrderRecord['status']): Promise<void> {
    const orders = getLocal<OrderRecord[]>('orders', INITIAL_ORDERS);
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      setLocal('orders', orders);
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (e) {
        console.error('Supabase update status error:', e);
      }
    }
  },

  // BOOKINGS
  async getBookings(): Promise<BookingRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          return data.map((b) => ({
            id: b.id,
            bookingNumber: b.booking_number,
            createdAt: b.created_at,
            customerName: b.customer_name,
            customerPhone: b.customer_phone,
            customerEmail: b.customer_email,
            guestsCount: b.guests_count,
            bookingDate: b.booking_date,
            bookingTime: b.booking_time,
            eventType: b.event_type,
            specialRequest: b.special_request,
            status: b.status,
          }));
        }
      } catch (e) {
        console.warn('Supabase bookings fetch error:', e);
      }
    }
    return getLocal<BookingRecord[]>('bookings', INITIAL_BOOKINGS);
  },

  async createBooking(booking: Partial<BookingRecord>): Promise<BookingRecord> {
    const bookings = getLocal<BookingRecord[]>('bookings', INITIAL_BOOKINGS);
    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      bookingNumber: `TBK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      customerName: booking.customerName || 'Guest',
      customerPhone: booking.customerPhone || '',
      customerEmail: booking.customerEmail || '',
      guestsCount: booking.guestsCount || 2,
      bookingDate: booking.bookingDate || new Date().toISOString().split('T')[0],
      bookingTime: booking.bookingTime || '19:00',
      eventType: booking.eventType || 'Table Reservation',
      specialRequest: booking.specialRequest || '',
      status: 'Pending',
    };

    bookings.unshift(newBooking);
    setLocal('bookings', bookings);

    this.addNotification({
      type: 'booking',
      title: `New Reservation #${newBooking.bookingNumber}`,
      message: `${newBooking.customerName} booked for ${newBooking.guestsCount} guests on ${newBooking.bookingDate}`,
    });

    if (isSupabaseConfigured) {
      try {
        await supabase.from('bookings').insert({
          booking_number: newBooking.bookingNumber,
          customer_name: newBooking.customerName,
          customer_phone: newBooking.customerPhone,
          customer_email: newBooking.customerEmail,
          guests_count: newBooking.guestsCount,
          booking_date: newBooking.bookingDate,
          booking_time: newBooking.bookingTime,
          event_type: newBooking.eventType,
          special_request: newBooking.specialRequest,
          status: 'Pending',
        });
      } catch (e) {
        console.error('Supabase booking insert error:', e);
      }
    }

    return newBooking;
  },

  async updateBookingStatus(id: string, status: BookingRecord['status']): Promise<void> {
    const bookings = getLocal<BookingRecord[]>('bookings', INITIAL_BOOKINGS);
    const b = bookings.find((item) => item.id === id);
    if (b) {
      b.status = status;
      setLocal('bookings', bookings);
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (e) {
        console.error('Supabase booking update error:', e);
      }
    }
  },

  // CONTACT MESSAGES
  async getContactMessages(): Promise<ContactRecord[]> {
    return getLocal<ContactRecord[]>('contacts', []);
  },

  async submitContactMessage(contact: { name: string; phone: string; email?: string; message: string }): Promise<void> {
    const contacts = getLocal<ContactRecord[]>('contacts', []);
    const newContact: ContactRecord = {
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      message: contact.message,
      isRead: false,
    };
    contacts.unshift(newContact);
    setLocal('contacts', contacts);

    this.addNotification({
      type: 'contact',
      title: `New Inquiry from ${newContact.name}`,
      message: newContact.message.substring(0, 60) + '...',
    });

    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_messages').insert({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          message: contact.message,
        });
      } catch (e) {
        console.error('Supabase contact insert error:', e);
      }
    }
  },

  // CATEGORIES
  async getCategories(): Promise<AdminCategory[]> {
    return getLocal<AdminCategory[]>('categories', INITIAL_CATEGORIES);
  },

  async saveCategory(cat: Partial<AdminCategory>): Promise<AdminCategory> {
    const categories = getLocal<AdminCategory[]>('categories', INITIAL_CATEGORIES);
    let updated: AdminCategory;
    if (cat.id) {
      const idx = categories.findIndex((c) => c.id === cat.id);
      if (idx !== -1) {
        categories[idx] = { ...categories[idx], ...cat } as AdminCategory;
        updated = categories[idx];
      } else {
        updated = { ...cat } as AdminCategory;
        categories.push(updated);
      }
    } else {
      updated = {
        id: `cat-${Date.now()}`,
        name: cat.name || 'New Category',
        description: cat.description || '',
        isVisible: true,
        displayOrder: categories.length + 1,
      };
      categories.push(updated);
    }
    setLocal('categories', categories);
    return updated;
  },

  // COUPONS
  async getCoupons(): Promise<CouponRecord[]> {
    return getLocal<CouponRecord[]>('coupons', INITIAL_COUPONS);
  },

  async saveCoupon(coupon: Partial<CouponRecord>): Promise<CouponRecord> {
    const coupons = getLocal<CouponRecord[]>('coupons', INITIAL_COUPONS);
    let updated: CouponRecord;
    if (coupon.id) {
      const idx = coupons.findIndex((c) => c.id === coupon.id);
      if (idx !== -1) {
        coupons[idx] = { ...coupons[idx], ...coupon } as CouponRecord;
        updated = coupons[idx];
      } else {
        updated = { ...coupon } as CouponRecord;
        coupons.push(updated);
      }
    } else {
      updated = {
        id: `c-${Date.now()}`,
        code: (coupon.code || 'MITHAI10').toUpperCase(),
        discountType: coupon.discountType || 'percentage',
        discountValue: coupon.discountValue || 10,
        minOrderAmount: coupon.minOrderAmount || 500,
        maxDiscountAmount: coupon.maxDiscountAmount,
        usageLimit: coupon.usageLimit || 100,
        timesUsed: 0,
        expiryDate: coupon.expiryDate || '2026-12-31',
        isEnabled: true,
      };
      coupons.push(updated);
    }
    setLocal('coupons', coupons);
    return updated;
  },

  // OFFERS
  async getOffers(): Promise<OfferRecord[]> {
    return getLocal<OfferRecord[]>('offers', INITIAL_OFFERS);
  },

  // BLOGS
  async getBlogs(): Promise<BlogRecord[]> {
    return getLocal<BlogRecord[]>('blogs', INITIAL_BLOGS);
  },

  // CUSTOMERS
  async getCustomers(): Promise<CustomerRecord[]> {
    return getLocal<CustomerRecord[]>('customers', INITIAL_CUSTOMERS);
  },

  // SETTINGS
  async getSettings(): Promise<SettingsRecord> {
    return getLocal<SettingsRecord>('settings', INITIAL_SETTINGS);
  },

  async saveSettings(s: Partial<SettingsRecord>): Promise<SettingsRecord> {
    const current = getLocal<SettingsRecord>('settings', INITIAL_SETTINGS);
    const updated = { ...current, ...s };
    setLocal('settings', updated);
    return updated;
  },

  // FESTIVALS
  async getFestivals(): Promise<FestivalCampaignRecord[]> {
    return getLocal<FestivalCampaignRecord[]>('festivals', INITIAL_FESTIVALS);
  },

  async saveFestival(f: Partial<FestivalCampaignRecord>): Promise<FestivalCampaignRecord> {
    const list = getLocal<FestivalCampaignRecord[]>('festivals', INITIAL_FESTIVALS);
    let updated: FestivalCampaignRecord;
    if (f.id) {
      const idx = list.findIndex((item) => item.id === f.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...f } as FestivalCampaignRecord;
        updated = list[idx];
      } else {
        updated = { ...f } as FestivalCampaignRecord;
        list.push(updated);
      }
    } else {
      updated = {
        id: `fest-${Date.now()}`,
        name: f.name || 'New Festival Campaign',
        festivalType: f.festivalType || 'Diwali',
        bannerImage: f.bannerImage || 'https://res.cloudinary.com/q8pk1ufj/image/upload/v1784720744/diwali_box.jpg',
        specialProducts: f.specialProducts || [],
        discountPercent: f.discountPercent || 10,
        startDate: f.startDate || new Date().toISOString().split('T')[0],
        expiryDate: f.expiryDate || '2026-11-30',
        status: 'Active',
        description: f.description || '',
      };
      list.push(updated);
    }
    setLocal('festivals', list);
    return updated;
  },

  async deleteFestival(id: string): Promise<void> {
    const list = getLocal<FestivalCampaignRecord[]>('festivals', INITIAL_FESTIVALS).filter((item) => item.id !== id);
    setLocal('festivals', list);
  },

  // RAW MATERIALS & SUPPLIERS
  async getRawMaterials(): Promise<RawMaterialRecord[]> {
    return getLocal<RawMaterialRecord[]>('raw_materials', INITIAL_RAW_MATERIALS);
  },

  async saveRawMaterial(mat: Partial<RawMaterialRecord>): Promise<RawMaterialRecord> {
    const list = getLocal<RawMaterialRecord[]>('raw_materials', INITIAL_RAW_MATERIALS);
    let updated: RawMaterialRecord;
    if (mat.id) {
      const idx = list.findIndex((m) => m.id === mat.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...mat } as RawMaterialRecord;
        updated = list[idx];
      } else {
        updated = { ...mat } as RawMaterialRecord;
        list.push(updated);
      }
    } else {
      updated = {
        id: `raw-${Date.now()}`,
        name: mat.name || 'New Ingredient',
        category: mat.category || 'Ghee',
        currentStock: mat.currentStock || 50,
        unit: mat.unit || 'kg',
        minThreshold: mat.minThreshold || 10,
        costPerUnit: mat.costPerUnit || 100,
        supplierName: mat.supplierName || 'General Supplier',
        lastRestocked: new Date().toISOString().split('T')[0],
      };
      list.push(updated);
    }
    setLocal('raw_materials', list);
    return updated;
  },

  async getSuppliers(): Promise<SupplierRecord[]> {
    return getLocal<SupplierRecord[]>('suppliers', INITIAL_SUPPLIERS);
  },

  async saveSupplier(sup: Partial<SupplierRecord>): Promise<SupplierRecord> {
    const list = getLocal<SupplierRecord[]>('suppliers', INITIAL_SUPPLIERS);
    let updated: SupplierRecord;
    if (sup.id) {
      const idx = list.findIndex((s) => s.id === sup.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...sup } as SupplierRecord;
        updated = list[idx];
      } else {
        updated = { ...sup } as SupplierRecord;
        list.push(updated);
      }
    } else {
      updated = {
        id: `sup-${Date.now()}`,
        name: sup.name || 'New Supplier',
        contactPerson: sup.contactPerson || '',
        phone: sup.phone || '',
        email: sup.email || '',
        itemsSupplied: sup.itemsSupplied || [],
        totalPurchaseAmount: sup.totalPurchaseAmount || 0,
      };
      list.push(updated);
    }
    setLocal('suppliers', list);
    return updated;
  },

  async getPurchases(): Promise<PurchaseRecord[]> {
    return getLocal<PurchaseRecord[]>('purchases', INITIAL_PURCHASES);
  },

  async addPurchase(pur: Partial<PurchaseRecord>): Promise<PurchaseRecord> {
    const list = getLocal<PurchaseRecord[]>('purchases', INITIAL_PURCHASES);
    const newPur: PurchaseRecord = {
      id: `pur-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      materialName: pur.materialName || 'Raw Material',
      supplierName: pur.supplierName || 'General Vendor',
      quantity: pur.quantity || 10,
      unit: pur.unit || 'kg',
      totalCost: pur.totalCost || 1000,
      invoiceRef: pur.invoiceRef || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    list.unshift(newPur);
    setLocal('purchases', list);

    // Increment raw material stock
    const mats = await this.getRawMaterials();
    const targetMat = mats.find((m) => m.name === newPur.materialName);
    if (targetMat) {
      targetMat.currentStock += newPur.quantity;
      targetMat.lastRestocked = newPur.createdAt;
      setLocal('raw_materials', mats);
    }

    return newPur;
  },

  // STAFF MANAGEMENT
  async getStaff(): Promise<StaffRecord[]> {
    return getLocal<StaffRecord[]>('staff', INITIAL_STAFF);
  },

  async saveStaff(s: Partial<StaffRecord>): Promise<StaffRecord> {
    const list = getLocal<StaffRecord[]>('staff', INITIAL_STAFF);
    let updated: StaffRecord;
    if (s.id) {
      const idx = list.findIndex((item) => item.id === s.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...s } as StaffRecord;
        updated = list[idx];
      } else {
        updated = { ...s } as StaffRecord;
        list.push(updated);
      }
    } else {
      updated = {
        id: `stf-${Date.now()}`,
        name: s.name || 'New Staff Member',
        role: s.role || 'Staff',
        phone: s.phone || '',
        email: s.email || '',
        branch: s.branch || 'Rajouri Garden (Main Flagship)',
        monthlySalary: s.monthlySalary || 25000,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        permissions: s.permissions || {
          manageProducts: false,
          manageOrders: true,
          manageInventory: false,
          manageStaff: false,
          manageReports: false,
        },
      };
      list.push(updated);
    }
    setLocal('staff', list);
    return updated;
  },

  async getAttendance(): Promise<AttendanceRecord[]> {
    return getLocal<AttendanceRecord[]>('attendance', INITIAL_ATTENDANCE);
  },

  async markAttendance(att: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const list = getLocal<AttendanceRecord[]>('attendance', INITIAL_ATTENDANCE);
    const existingIdx = list.findIndex((a) => a.staffId === att.staffId && a.date === att.date);
    let updated: AttendanceRecord;
    if (existingIdx !== -1) {
      list[existingIdx] = { ...list[existingIdx], ...att } as AttendanceRecord;
      updated = list[existingIdx];
    } else {
      updated = {
        id: `att-${Date.now()}`,
        staffId: att.staffId || 'stf-1',
        staffName: att.staffName || 'Staff Member',
        date: att.date || new Date().toISOString().split('T')[0],
        status: att.status || 'Present',
        shiftTiming: att.shiftTiming || '09:00 - 19:00',
      };
      list.unshift(updated);
    }
    setLocal('attendance', list);
    return updated;
  },

  async getSalaries(): Promise<SalaryRecord[]> {
    return getLocal<SalaryRecord[]>('salaries', INITIAL_SALARIES);
  },

  async paySalary(sal: Partial<SalaryRecord>): Promise<SalaryRecord> {
    const list = getLocal<SalaryRecord[]>('salaries', INITIAL_SALARIES);
    const newSal: SalaryRecord = {
      id: `sal-${Date.now()}`,
      staffId: sal.staffId || 'stf-1',
      staffName: sal.staffName || 'Staff Member',
      month: sal.month || 'July 2026',
      baseSalary: sal.baseSalary || 30000,
      bonus: sal.bonus || 0,
      deductions: sal.deductions || 0,
      netPayable: (sal.baseSalary || 30000) + (sal.bonus || 0) - (sal.deductions || 0),
      paymentStatus: 'Paid',
      paidDate: new Date().toISOString().split('T')[0],
    };
    list.unshift(newSal);
    setLocal('salaries', list);
    return newSal;
  },

  // MULTI-BRANCH
  async getBranches(): Promise<BranchRecord[]> {
    return getLocal<BranchRecord[]>('branches', INITIAL_BRANCHES);
  },

  async saveBranch(br: Partial<BranchRecord>): Promise<BranchRecord> {
    const list = getLocal<BranchRecord[]>('branches', INITIAL_BRANCHES);
    let updated: BranchRecord;
    if (br.id) {
      const idx = list.findIndex((b) => b.id === br.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...br } as BranchRecord;
        updated = list[idx];
      } else {
        updated = { ...br } as BranchRecord;
        list.push(updated);
      }
    } else {
      updated = {
        id: `br-${Date.now()}`,
        name: br.name || 'New Store Branch',
        address: br.address || '',
        phone: br.phone || '',
        managerName: br.managerName || 'Unassigned',
        isActive: true,
        todaySales: 0,
      };
      list.push(updated);
    }
    setLocal('branches', list);
    return updated;
  },

  // LOGS & BACKUP
  async getNotifications(): Promise<NotificationRecord[]> {
    return getLocal<NotificationRecord[]>('notifications', INITIAL_NOTIFICATIONS);
  },

  async addNotification(notif: Omit<NotificationRecord, 'id' | 'createdAt' | 'isRead'>): Promise<NotificationRecord> {
    const list = getLocal<NotificationRecord[]>('notifications', INITIAL_NOTIFICATIONS);
    const newNotif: NotificationRecord = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    list.unshift(newNotif);
    setLocal('notifications', list);
    return newNotif;
  },

  async markNotificationRead(id: string): Promise<void> {
    const list = getLocal<NotificationRecord[]>('notifications', INITIAL_NOTIFICATIONS);
    const updated = list.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setLocal('notifications', updated);
  },

  async getLogs(): Promise<ActivityLogRecord[]> {
    return getLocal<ActivityLogRecord[]>('logs', INITIAL_LOGS);
  },

  async addLog(userRole: string, userName: string, action: string, details: string): Promise<void> {
    const list = getLocal<ActivityLogRecord[]>('logs', INITIAL_LOGS);
    list.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userRole,
      userName,
      action,
      details,
    });
    setLocal('logs', list.slice(0, 100));
  },

  exportBackupJSON(): string {
    const data = {
      products: getLocal('products', INITIAL_PRODUCTS),
      categories: getLocal('categories', INITIAL_CATEGORIES),
      orders: getLocal('orders', INITIAL_ORDERS),
      bookings: getLocal('bookings', INITIAL_BOOKINGS),
      customers: getLocal('customers', INITIAL_CUSTOMERS),
      festivals: getLocal('festivals', INITIAL_FESTIVALS),
      raw_materials: getLocal('raw_materials', INITIAL_RAW_MATERIALS),
      suppliers: getLocal('suppliers', INITIAL_SUPPLIERS),
      purchases: getLocal('purchases', INITIAL_PURCHASES),
      staff: getLocal('staff', INITIAL_STAFF),
      branches: getLocal('branches', INITIAL_BRANCHES),
      settings: getLocal('settings', INITIAL_SETTINGS),
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  restoreBackupJSON(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products) setLocal('products', parsed.products);
      if (parsed.categories) setLocal('categories', parsed.categories);
      if (parsed.orders) setLocal('orders', parsed.orders);
      if (parsed.bookings) setLocal('bookings', parsed.bookings);
      if (parsed.customers) setLocal('customers', parsed.customers);
      if (parsed.festivals) setLocal('festivals', parsed.festivals);
      if (parsed.raw_materials) setLocal('raw_materials', parsed.raw_materials);
      if (parsed.suppliers) setLocal('suppliers', parsed.suppliers);
      if (parsed.purchases) setLocal('purchases', parsed.purchases);
      if (parsed.staff) setLocal('staff', parsed.staff);
      if (parsed.branches) setLocal('branches', parsed.branches);
      if (parsed.settings) setLocal('settings', parsed.settings);
      return true;
    } catch {
      return false;
    }
  },
};
