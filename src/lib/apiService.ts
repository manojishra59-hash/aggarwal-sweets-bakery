import { supabase, isSupabaseConfigured } from './supabase';
import { SweetItem, ReviewItem, CartItem } from '../types';
import { FEATURED_SWEETS, GOOGLE_REVIEWS, BRAND_NAME, BRAND_PHONE, BRAND_WHATSAPP, BRAND_ADDRESS, BRAND_HOURS } from '../data/sweetsData';

export interface AdminProduct extends SweetItem {
  stockKg: number;
  isEnabled: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFestivalSpecial?: boolean;
  images?: string[];
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  isVisible: boolean;
  displayOrder: number;
}

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

  // NOTIFICATIONS
  async getNotifications(): Promise<NotificationRecord[]> {
    return getLocal<NotificationRecord[]>('notifications', [
      {
        id: 'n-1',
        createdAt: new Date().toISOString(),
        type: 'order',
        title: 'System Initialized',
        message: 'Aggarwal Sweets Admin Console connected & active.',
        isRead: false,
      },
    ]);
  },

  async addNotification(n: { type: NotificationRecord['type']; title: string; message: string }): Promise<void> {
    const notifications = await this.getNotifications();
    notifications.unshift({
      id: `n-${Date.now()}`,
      createdAt: new Date().toISOString(),
      type: n.type,
      title: n.title,
      message: n.message,
      isRead: false,
    });
    setLocal('notifications', notifications.slice(0, 30));
  },

  async markNotificationRead(id: string): Promise<void> {
    const notifications = await this.getNotifications();
    const item = notifications.find((n) => n.id === id);
    if (item) item.isRead = true;
    setLocal('notifications', notifications);
  },
};
