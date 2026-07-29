export type StaffRole = 'Owner' | 'Manager' | 'Staff';
export type AdminRole = StaffRole; // Backward compatibility alias

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
  avatar?: string;
}
export type AdminUser = StaffUser;

export interface OrderItem {
  id: string;
  sweetName: string;
  quantityKg: number;
  pricePerKg: number;
  totalPrice: number;
}

export interface StaffOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: OrderStatus;
  createdAt: string;
  notes?: string;
}
export type AdminOrder = StaffOrder;

export interface FestivalCampaign {
  id: string;
  title: string;
  festivalName: string;
  bannerUrl: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  featuredProducts: string[];
  description: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrderValue: number;
  expiryDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
}

export interface TableBooking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  guestCount: number;
  bookingDate: string;
  bookingTime: string;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  tableNumber?: string;
}

export interface CustomerCRM {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  lastOrderDate: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: 'Kitchen' | 'Counter' | 'Billing' | 'Management';
  status: 'Active' | 'On Leave' | 'Inactive';
  joinedDate: string;
  permissions: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Dairy & Mawa' | 'Dry Fruits' | 'Flours & Grains' | 'Spices & Flavors' | 'Packaging';
  stockQuantity: number;
  unit: 'kg' | 'L' | 'packets' | 'boxes';
  minThreshold: number;
  unitPrice: number;
  supplierName: string;
  supplierPhone: string;
  lastRestocked: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'order' | 'product' | 'inventory' | 'staff' | 'system';
}
