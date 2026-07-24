export interface SweetItem {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerKg: number;
  halfKgPrice: number;
  image: string;
  freshToday: boolean;
  rating: number;
  ingredients: string[];
}

export interface WhyUsFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface FestivalItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GiftBoxItem {
  id: string;
  title: string;
  badge: string;
  price: number;
  description: string;
  image: string;
  itemsIncluded: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kitchen' | 'Fresh Sweets' | 'Bakery' | 'Customers' | 'Festivals';
  image: string;
  caption: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
}

export interface CounterItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  sweet: SweetItem;
  quantityKg: number; // in kg (0.5, 1, 2, etc.)
}
