import motichoorImg from '../assets/images/motichoor_laddu_1784720664466.jpg';
import kajuKatliImg from '../assets/images/kaju_katli_1784720676885.jpg';
import gulabJamunImg from '../assets/images/gulab_jamun_1784720688978.jpg';
import rasgullaImg from '../assets/images/rasgulla_1784720700024.jpg';
import milkCakePedaImg from '../assets/images/milk_cake_peda_1784720719954.jpg';
import dryFruitBarfiImg from '../assets/images/dry_fruit_barfi_1784720733007.jpg';
import luxuryGiftBoxImg from '../assets/images/luxury_gift_box_1784720744591.jpg';
import diwaliBoxImg from '../assets/images/diwali_festival_box_1784720755422.jpg';

import startingShopImg from '../../images 2/starting shop.png';
import ladooCounterImg from '../../images 2/ladoo ka counter.png';
import fullInteriorImg from '../../images/full interior.png';
import ladooImg from '../../images/ladoo.png';
import customerImg from '../../images/customer.png';
import ladooKaCounter1Img from '../../images/ladoo ka counter.png';

import {
  SweetItem,
  WhyUsFeature,
  ProcessStep,
  FestivalItem,
  GiftBoxItem,
  GalleryItem,
  ReviewItem,
  CounterItem,
  FAQItem,
} from '../types';

export const BRAND_NAME = 'Aggarwal Sweets & Bakery';
export const BRAND_TAGLINE = 'Artisanal Indian Mithai & Fine Bakery Since 2004';
export const BRAND_PHONE = '+91 83685 76164';
export const BRAND_WHATSAPP = '918368576164';
export const BRAND_ADDRESS = 'Plot 42, Main Market, Rajouri Garden, New Delhi, 110027';
export const BRAND_HOURS = 'Monday – Sunday: 8:00 AM – 10:30 PM';

// Section 1: Featured Sweets
export const FEATURED_SWEETS: SweetItem[] = [
  {
    id: 'motichoor-laddu',
    name: 'Motichoor Laddu',
    category: 'Ghee Sweets',
    description: 'Handcrafted melt-in-mouth tiny boondi laddus churned in pure desi ghee, infused with Iranian saffron and pistachios.',
    pricePerKg: 640,
    halfKgPrice: 330,
    image: motichoorImg,
    freshToday: true,
    rating: 4.9,
    ingredients: ['Pure Desi Ghee', 'Gram Flour', 'Saffron', 'Pistachio', 'Cardamom'],
  },
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    category: 'Dry Fruit Sweets',
    description: 'Silky smooth diamond slices made from premium Goan cashews, subtle silver varq foil, and natural cardamom aroma.',
    pricePerKg: 980,
    halfKgPrice: 500,
    image: kajuKatliImg,
    freshToday: true,
    rating: 5.0,
    ingredients: ['Goan Cashews', 'Silver Varq', 'Green Cardamom', 'Pure Sugar'],
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    category: 'Syrup Sweets',
    description: 'Soft, golden-fried khoya dumplings gently soaked in warm, fragrant saffron and rose water syrup.',
    pricePerKg: 520,
    halfKgPrice: 270,
    image: gulabJamunImg,
    freshToday: true,
    rating: 4.9,
    ingredients: ['Fresh Khoya', 'Rose Water', 'Saffron', 'Cardamom', 'Pistachios'],
  },
  {
    id: 'rasgulla',
    name: 'Rasgulla',
    category: 'Bengali Sweets',
    description: 'Light, spongy cottage cheese spheres boiled in light aromatic sugar syrup, made fresh every morning.',
    pricePerKg: 480,
    halfKgPrice: 250,
    image: rasgullaImg,
    freshToday: true,
    rating: 4.8,
    ingredients: ['Fresh Chhena', 'Light Sugar Syrup', 'Kewra Essence'],
  },
  {
    id: 'milk-cake',
    name: 'Milk Cake',
    category: 'Milk Sweets',
    description: 'Rich, caramelized grainy milk fudge slow-cooked for hours to achieve a dual-tone amber hue and deep caramel taste.',
    pricePerKg: 680,
    halfKgPrice: 350,
    image: milkCakePedaImg,
    freshToday: true,
    rating: 4.9,
    ingredients: ['Pure Buffalo Milk', 'Desi Ghee', 'Cardamom', 'Almonds'],
  },
  {
    id: 'peda',
    name: 'Kesar Peda',
    category: 'Milk Sweets',
    description: 'Traditional Mathura-style thickened milk sweet scented with Kashmiri kesar, nutmeg, and crushed pistachios.',
    pricePerKg: 620,
    halfKgPrice: 320,
    image: milkCakePedaImg,
    freshToday: true,
    rating: 4.7,
    ingredients: ['Condensed Khoya', 'Kashmiri Saffron', 'Nutmeg', 'Pistachio'],
  },
  {
    id: 'barfi',
    name: 'Pista Khoya Barfi',
    category: 'Milk Sweets',
    description: 'Delicate double-layered barfi made with reduced full-cream milk and generously encrusted with roasted pistachios.',
    pricePerKg: 660,
    halfKgPrice: 340,
    image: dryFruitBarfiImg,
    freshToday: true,
    rating: 4.8,
    ingredients: ['Pure Milk Khoya', 'Pistachios', 'Silver Leaf', 'Cardamom'],
  },
  {
    id: 'dry-fruit-sweets',
    name: 'Royal Dry Fruit Anjeer Roll',
    category: 'Dry Fruit Sweets',
    description: 'Sugar-free luxury roll crafted from Turkish figs, California almonds, dates, and roasted cashew nuts.',
    pricePerKg: 1250,
    halfKgPrice: 650,
    image: dryFruitBarfiImg,
    freshToday: true,
    rating: 5.0,
    ingredients: ['Turkish Figs', 'Dates', 'Almonds', 'Cashews', 'Walnuts'],
  },
];

// Section 2: Why Choose Us
export const WHY_CHOOSE_US: WhyUsFeature[] = [
  {
    id: 'fresh',
    title: 'Fresh Every Day',
    description: 'Prepared fresh in small batch rounds every morning using milk harvested same-day.',
    icon: 'Sparkles',
  },
  {
    id: 'desi-ghee',
    title: 'Pure Desi Ghee',
    description: 'Zero hydrogenated oils. Crafted exclusively in 100% pure A2 cow and buffalo desi ghee.',
    icon: 'Award',
  },
  {
    id: 'premium-ingredients',
    title: 'Premium Ingredients',
    description: 'Kashmiri saffron, Goan cashews, Iranian pistachios, and organic spices.',
    icon: 'Gem',
  },
  {
    id: 'traditional',
    title: 'Traditional Recipes',
    description: 'Authentic halwai craftsmanship passed down across generations since 2004.',
    icon: 'Flame',
  },
  {
    id: 'varieties',
    title: '100+ Sweet Varieties',
    description: 'From timeless regional classics to modern sugar-free & dry fruit creations.',
    icon: 'Layers',
  },
  {
    id: 'hygienic',
    title: 'Hygienic Kitchen',
    description: 'ISO-certified spotless kitchen with automated temperature-controlled storage.',
    icon: 'ShieldCheck',
  },
];

// Section 3: Sweet Making Process
export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Fresh Milk',
    subtitle: 'Farm Direct Procurement',
    description: 'Sourced daily at dawn from trusted organic dairy farms to ensure unmatched richness and purity.',
    icon: 'Milk',
  },
  {
    stepNumber: 2,
    title: 'Premium Ingredients',
    subtitle: 'Hand-Selected Spices & Nuts',
    description: 'Real Kashmiri saffron threads, hand-shelled nuts, and pure A2 desi ghee are measured to perfection.',
    icon: 'Sparkles',
  },
  {
    stepNumber: 3,
    title: 'Traditional Preparation',
    subtitle: 'Master Halwai Cooking',
    description: 'Slow-churned in traditional copper kadhai to achieve signature textures and rich, authentic flavor profiles.',
    icon: 'Flame',
  },
  {
    stepNumber: 4,
    title: 'Quality Inspection',
    subtitle: 'Strict Hygiene Check',
    description: 'Every batch undergoes sensory and hygiene testing before receiving our hallmark seal of quality.',
    icon: 'CheckCircle2',
  },
  {
    stepNumber: 5,
    title: 'Fresh Serving',
    subtitle: 'Luxury Packaging & Delivery',
    description: 'Hand-packed in insulated royal gold boxes to preserve warmth, freshness, and delicate texture.',
    icon: 'Gift',
  },
];

// Section 4: Festival Collection
export const FESTIVAL_COLLECTION: FestivalItem[] = [
  {
    id: 'diwali',
    name: 'Diwali Grand Festivities',
    tagline: 'Illuminate Every Home With Golden Mithai Boxes',
    description: 'An opulent assemblage of Kaju Katli, Moti Boondi Laddu, Anjeer Barfi, and roasted dry fruits adorned with festive golden packaging.',
    image: diwaliBoxImg,
    highlights: ['Custom Gold Foil Box', 'Free Brass Diya Included', 'Corporate Custom Branding'],
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan Sweets',
    tagline: 'A Sweet Promise of Pure Sibling Affection',
    description: 'Handcrafted Kesar Peda, Gulab Jamun, and Royal Mix Mithai bundled with handcrafted designer Rakhis and roli-chawal hampers.',
    image: luxuryGiftBoxImg,
    highlights: ['Designer Rakhi Combo', 'Personalized Gift Cards', 'Express Nationwide Delivery'],
  },
  {
    id: 'holi',
    name: 'Holi Gujiya & Thandai Special',
    tagline: 'Colors of Joy & Crispy Mawa Gujiya',
    description: 'Traditional khoya-stuffed fried Gujiya, dry fruit Kesar Thandai mix, and saffron Mathri crafted for vibrant spring celebrations.',
    image: milkCakePedaImg,
    highlights: ['Crispy Organic Mawa Gujiya', 'Organic Natural Colors', 'Instant Party Hampers'],
  },
  {
    id: 'wedding-specials',
    name: 'Wedding & Reception Sweets',
    tagline: 'Royal Mithai Displays & Guest Favors',
    description: 'Bespoke mithai counters, customized bridal invitation boxes, and royal dry fruit hampers designed for grand Indian weddings.',
    image: kajuKatliImg,
    highlights: ['Bespoke Box Customization', 'Live Mithai Counter Service', 'Luxury Velvet Packaging'],
  },
  {
    id: 'corporate-gifts',
    name: 'Corporate Gifting Solutions',
    tagline: 'Elevate Business Relationships With Taste',
    description: 'Premium curated sweet and dry fruit hampers customized with your corporate logo, foil printing, and bulk fulfillment.',
    image: dryFruitBarfiImg,
    highlights: ['Logo Embossed Boxes', 'Pan-India Bulk Dispatch', 'Tax Compliant Invoicing'],
  },
];

// Section 5: Premium Gift Boxes
export const GIFT_BOXES: GiftBoxItem[] = [
  {
    id: 'silver-box',
    title: 'Royal Silver Box',
    badge: 'Popular Choice',
    price: 1250,
    description: 'A refined selection of 4 signature sweets presented in an embossed silver-foil rigid box.',
    image: luxuryGiftBoxImg,
    itemsIncluded: ['Kaju Katli (250g)', 'Motichoor Laddu (250g)', 'Milk Cake (250g)', 'Dry Fruit Barfi (250g)'],
  },
  {
    id: 'gold-box',
    title: 'Empress Gold Edition',
    badge: 'Luxury Signature',
    price: 2100,
    description: 'A majestic 1.5kg velvet-lined gold chest featuring our finest dry fruit rolls and saffron laddus.',
    image: diwaliBoxImg,
    itemsIncluded: ['Royal Anjeer Roll (350g)', 'Goan Kaju Katli (350g)', 'Desi Ghee Laddu (400g)', 'Roasted Pistachios (400g)'],
  },
  {
    id: 'wedding-collection',
    title: 'Shahi Vivah Collection',
    badge: 'Bridal Favorite',
    price: 3400,
    description: 'A multi-tier wooden hamper crafted for wedding invitations, engagements, and VIP wedding guests.',
    image: kajuKatliImg,
    itemsIncluded: ['Assorted Dry Fruit Sweets (500g)', 'Special Khoya Mithai (500g)', 'Premium Cashews & Almonds (500g)', 'Saffron Gulab Jamun Jar'],
  },
  {
    id: 'corporate-collection',
    title: 'Executive Corporate Chest',
    badge: 'B2B Special',
    price: 1850,
    description: 'Elegantly branded minimalist luxury box ideal for festive employee appreciation and client gifts.',
    image: dryFruitBarfiImg,
    itemsIncluded: ['Sugar-Free Date Bites (300g)', 'Kaju Pista Roll (300g)', 'Kesar Peda (300g)', 'Exotic Dry Fruits (300g)'],
  },
];

// Section 6: Our Gallery
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Fresh Desi Ghee Laddu Counter',
    category: 'Fresh Sweets',
    image: ladooKaCounter1Img,
    caption: 'Freshly prepared boondi and besan laddus loaded in our daily display counters at Aggarwal Sweets.',
  },
  {
    id: 'g2',
    title: 'Fresh Desi Ghee Laddu Counter',
    category: 'Fresh Sweets',
    image: ladooCounterImg,
    caption: 'Freshly prepared boondi and besan laddus loaded in our daily display counters.',
  },
  {
    id: 'g3',
    title: 'Full Store Interior & Sweet Displays',
    category: 'Kitchen',
    image: fullInteriorImg,
    caption: 'Pristine, temperature controlled glass counters with over 100+ fresh sweet varieties.',
  },
  {
    id: 'g4',
    title: 'Warm Store Guests & Happy Customers',
    category: 'Customers',
    image: customerImg,
    caption: 'Generations of satisfied customers experiencing authentic sweet perfection.',
  },
  {
    id: 'g5',
    title: 'Artisanal Golden Laddu Preparation',
    category: 'Fresh Sweets',
    image: ladooImg,
    caption: 'Melt-in-mouth golden laddus churned in 100% pure organic A2 desi ghee.',
  },
  {
    id: 'g6',
    title: 'Diwali Festive Hamper Display',
    category: 'Festivals',
    image: diwaliBoxImg,
    caption: 'Glowing lights and handcrafted sweet hampers ready for festive celebrations.',
  },
];

// Section 7: Google Reviews
export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Rajesh Sharma',
    location: 'Rajouri Garden, New Delhi',
    rating: 5,
    comment: 'Aggarwal Sweets & Bakery has been our family’s go-to spot for 15+ years. Their Motichoor Laddu made in pure ghee melts in your mouth! Simply unmatched quality.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    date: '2 days ago',
    verified: true,
  },
  {
    id: 'r2',
    name: 'Priya Verma',
    location: 'Punjabi Bagh, New Delhi',
    rating: 5,
    comment: 'Ordered 50 custom Diwali gift boxes for our corporate clients. The gold packaging looked extremely regal, and everyone praised the fresh Kaju Katli and Anjeer Roll!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    date: '1 week ago',
    verified: true,
  },
  {
    id: 'r3',
    name: 'Vikramaditya Gupta',
    location: 'Janakpuri, New Delhi',
    rating: 5,
    comment: 'The Gulab Jamun served hot in syrup is pure heaven! Also love their bakery section — fresh patties and butter cookies are super delicious.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    date: '3 weeks ago',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Ananya Malhotra',
    location: 'Patel Nagar, New Delhi',
    rating: 5,
    comment: 'We booked Aggarwal Sweets for our daughter’s wedding invitation hampers. Pristine presentation, supreme taste, and prompt delivery!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    date: '1 month ago',
    verified: true,
  },
];

// Section 8: Counters
export const COUNTERS_DATA: CounterItem[] = [
  {
    id: 'exp',
    value: 20,
    suffix: '+',
    label: 'Years Experience',
    sublabel: 'Crafting Authentic Indian Flavors Since 2004',
  },
  {
    id: 'cust',
    value: 500,
    suffix: '+',
    label: 'Happy Customers Daily',
    sublabel: 'Serving Smiles Across Delhi NCR',
  },
  {
    id: 'varieties',
    value: 100,
    suffix: '+',
    label: 'Sweet Varieties',
    sublabel: 'From Traditional Khoya to Sugar-Free Delights',
  },
  {
    id: 'rating',
    value: 4.8,
    suffix: '★',
    label: 'Google Rating',
    sublabel: 'Based on 4,500+ Verified Customer Reviews',
  },
];

// Section 11: FAQ
export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Are all your sweets prepared fresh every day?',
    answer: 'Yes! All our sweets, khoya items, and bakery goods are prepared fresh every morning in our hygienic kitchen using same-day organic milk and 100% pure A2 desi ghee. We never use artificial preservatives.',
    category: 'Quality',
  },
  {
    question: 'Do you accept bulk & festival custom orders?',
    answer: 'Absolutely. We specialize in bulk festive orders for Diwali, Raksha Bandhan, weddings, and family functions. We offer custom box printing, personalized gift notes, and flexible quantity tiers.',
    category: 'Orders',
  },
  {
    question: 'Do you offer corporate gifting packages?',
    answer: 'Yes, we work with over 200+ corporate clients across India. We provide logo-embossed luxury gold boxes, curated dry fruit combos, GST-compliant billing, and pan-India doorstep delivery.',
    category: 'Corporate',
  },
  {
    question: 'Can I order custom sweet hampers for weddings?',
    answer: 'Yes! We create bespoke Shahi Vivah hampers, invitation box favors, and live mithai counters for wedding functions. You can schedule a tasting session at our Rajouri Garden store.',
    category: 'Weddings',
  },
  {
    question: 'Is same-day home delivery available in Delhi NCR?',
    answer: 'Yes! We offer fast, temperature-controlled home delivery across Delhi, Gurgaon, Noida, and Faridabad via our delivery partners or direct store dispatch.',
    category: 'Delivery',
  },
];

// Instagram Grid
export const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    image: motichoorImg,
    likes: '1.2k',
    comments: '84',
    caption: 'Golden Motichoor Laddus made with pure desi ghee and saffron. Pure happiness! ✨ #AggarwalSweets',
  },
  {
    id: 'ig2',
    image: kajuKatliImg,
    likes: '2.4k',
    comments: '142',
    caption: 'Shine like silver foil! Goan Kaju Katli fresh off the marble tray. 💎 #MithaiLove',
  },
  {
    id: 'ig3',
    image: gulabJamunImg,
    likes: '1.8k',
    comments: '96',
    caption: 'Warm syrup, soft khoya, and rose petals. Gulab Jamun perfection. 🌹 #DelhiFoodie',
  },
  {
    id: 'ig4',
    image: diwaliBoxImg,
    likes: '3.1k',
    comments: '210',
    caption: 'Festive season is here! Unboxing our Empress Gold gift hamper. 🎁 #DiwaliGifting',
  },
  {
    id: 'ig5',
    image: rasgullaImg,
    likes: '980',
    comments: '62',
    caption: 'Spongy Bengali Rasgullas chilled to perfection. Light & delicious! 🍨 #DesiSweets',
  },
  {
    id: 'ig6',
    image: dryFruitBarfiImg,
    likes: '1.5k',
    comments: '118',
    caption: 'Healthy luxury: Sugar-free Anjeer Dry Fruit rolls for guilt-free indulgence. 🌰 #HealthySweets',
  },
];
