import React, { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSweetsSection } from './components/FeaturedSweetsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { MakingProcessSection } from './components/MakingProcessSection';
import { FestivalCollectionSection } from './components/FestivalCollectionSection';
import { GiftBoxesSection } from './components/GiftBoxesSection';
import { GallerySection } from './components/GallerySection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { CountersSection } from './components/CountersSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { TeamSection } from './components/TeamSection';
import { FAQSection } from './components/FAQSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SweetDetailModal } from './components/SweetDetailModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TableBookingModal } from './components/TableBookingModal';
import { StaffAuthModal } from './components/Staff/StaffAuthModal';
import { StaffModal } from './components/Staff/StaffModal';

import { FEATURED_SWEETS, BRAND_WHATSAPP } from './data/sweetsData';
import { SweetItem, CartItem, FestivalItem, GiftBoxItem } from './types';

export function App() {
  const [sweets, setSweets] = useState<SweetItem[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return FEATURED_SWEETS;
  });

  React.useEffect(() => {
    const handleProductsUpdate = () => {
      const saved = localStorage.getItem('aggarwal_admin_products');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSweets(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('aggarwal_products_updated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);
    return () => {
      window.removeEventListener('aggarwal_products_updated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);

  // Features Modals
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isTableBookingOpen, setIsTableBookingOpen] = useState(false);

  // Staff Modals
  const [isStaffAuthOpen, setIsStaffAuthOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const handleOpenStaffPortal = () => {
    const isAuthed =
      localStorage.getItem('aggarwal_staff_auth') === 'true' ||
      localStorage.getItem('aggarwal_admin_auth') === 'true';
    if (isAuthed) {
      setIsStaffModalOpen(true);
      setIsStaffAuthOpen(false);
    } else {
      setIsStaffAuthOpen(true);
      setIsStaffModalOpen(false);
    }
  };

  // Support #staff, #staff-login, /staff/login hash & pathname navigation
  React.useEffect(() => {
    const checkHashAndPath = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (
        hash === '#staff' ||
        hash === '#staff-login' ||
        hash === '#admin' ||
        hash === '#admin-login' ||
        path.includes('/staff') ||
        path.includes('/admin')
      ) {
        handleOpenStaffPortal();
      }
    };
    checkHashAndPath();
    window.addEventListener('hashchange', checkHashAndPath);
    window.addEventListener('popstate', checkHashAndPath);
    return () => {
      window.removeEventListener('hashchange', checkHashAndPath);
      window.removeEventListener('popstate', checkHashAndPath);
    };
  }, []);

  const handleStaffLogout = () => {
    localStorage.removeItem('aggarwal_staff_auth');
    localStorage.removeItem('aggarwal_admin_auth');
    setIsStaffModalOpen(false);
    setIsStaffAuthOpen(false);
    if (
      window.location.hash === '#staff' ||
      window.location.hash === '#staff-login' ||
      window.location.hash === '#admin' ||
      window.location.hash === '#admin-login'
    ) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  // Cart operations
  const handleAddToCart = (sweet: SweetItem, qtyKg: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.sweet.id === sweet.id);
      if (existing) {
        return prevCart.map((item) =>
          item.sweet.id === sweet.id
            ? { ...item, quantityKg: item.quantityKg + qtyKg }
            : item
        );
      }
      return [...prevCart, { sweet, quantityKg: qtyKg }];
    });
  };

  const handleUpdateQty = (sweetId: string, newQtyKg: number) => {
    if (newQtyKg <= 0) {
      setCart((prev) => prev.filter((item) => item.sweet.id !== sweetId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.sweet.id === sweetId ? { ...item, quantityKg: newQtyKg } : item
        )
      );
    }
  };

  const handleClearCart = () => setCart([]);

  // Festival & Gift Box Inquiries
  const handleInquireFestival = (fest: FestivalItem) => {
    const text = `Hello%20Aggarwal%20Sweets,%20I%20am%20interested%20in%20your%20${encodeURIComponent(
      fest.name
    )}%20Festive%20Collection.`;
    window.open(`https://wa.me/${BRAND_WHATSAPP}?text=${text}`, '_blank');
  };

  const handleSelectGiftBox = (box: GiftBoxItem) => {
    const text = `Hello%20Aggarwal%20Sweets,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(
      box.title
    )}%20Gift%20Box%20(₹${box.price}).`;
    window.open(`https://wa.me/${BRAND_WHATSAPP}?text=${text}`, '_blank');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + 1, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D9D9D9] font-sans selection:bg-[#D4AF37] selection:text-black antialiased relative">
      {/* Sticky Navigation Bar */}
      <div className="relative z-20">
        <HeaderNavbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenStaff={handleOpenStaffPortal}
        />
      </div>

      {/* Main Website Sections */}
      <main className="relative z-10">
        {/* Hero Section with Luxury Video Background */}
        <HeroSection />

        {/* Section 1: Featured Sweets */}
        <FeaturedSweetsSection
          sweets={sweets}
          onSelectSweet={(sweet) => setSelectedSweet(sweet)}
        />

        {/* Section 2: Why Choose Us */}
        <WhyChooseUsSection />

        {/* Section 3: Our Sweet Making Process */}
        <MakingProcessSection />

        {/* Section 4: Festival Collection */}
        <FestivalCollectionSection
          onInquireFestival={handleInquireFestival}
        />

        {/* Section 5: Premium Gift Boxes */}
        <GiftBoxesSection onSelectGiftBox={handleSelectGiftBox} />

        {/* Section 6: Our Gallery */}
        <GallerySection />

        {/* Section 7: Google Reviews */}
        <GoogleReviewsSection />

        {/* Section 8: Counters */}
        <CountersSection />

        {/* Section 9: Our Location */}
        <LocationSection />

        {/* Section 10: Contact */}
        <ContactSection />

        {/* Section 11: Our Team */}
        <TeamSection />

        {/* Section 12: FAQ */}
        <FAQSection />

        {/* Section 12: Instagram */}
        <InstagramSection />
      </main>

      {/* Section 13: Footer */}
      <Footer onOpenStaff={handleOpenStaffPortal} />

      {/* Floating Action Buttons (WhatsApp, Call, Back To Top) */}
      <FloatingActions />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSweet={(sweet) => setSelectedSweet(sweet)}
      />

      <SweetDetailModal
        sweet={selectedSweet}
        onClose={() => setSelectedSweet(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Table Booking Modal */}
      <TableBookingModal
        isOpen={isTableBookingOpen}
        onClose={() => setIsTableBookingOpen(false)}
      />

      {/* Staff Auth Modal */}
      <StaffAuthModal
        isOpen={isStaffAuthOpen}
        onClose={() => setIsStaffAuthOpen(false)}
        onAuthenticated={() => {
          setIsStaffAuthOpen(false);
          setIsStaffModalOpen(true);
        }}
      />

      {/* Secure Staff Control Panel Modal */}
      <StaffModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onLogout={handleStaffLogout}
      />
    </div>
  );
}

export default App;

