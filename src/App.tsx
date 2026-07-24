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
import { AdminAuthModal } from './components/Admin/AdminAuthModal';
import { AdminModal } from './components/Admin/AdminModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TableBookingModal } from './components/TableBookingModal';

import { FEATURED_SWEETS, BRAND_WHATSAPP } from './data/sweetsData';
import { SweetItem, CartItem, FestivalItem, GiftBoxItem } from './types';

export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);

  // Admin & Features Modals
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isTableBookingOpen, setIsTableBookingOpen] = useState(false);

  const handleOpenAdminPortal = () => {
    const isAuthed = localStorage.getItem('aggarwal_admin_auth') === 'true';
    if (isAuthed) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('aggarwal_admin_auth');
    setIsAdminModalOpen(false);
    setIsAdminAuthOpen(false);
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
        />
      </div>

      {/* Main Website Sections */}
      <main className="relative z-10">
        {/* Hero Section with Luxury Video Background */}
        <HeroSection />

        {/* Section 1: Featured Sweets */}
        <FeaturedSweetsSection
          sweets={FEATURED_SWEETS}
          onAddToCart={handleAddToCart}
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

      {/* Section 13: Footer with Admin Login Button */}
      <Footer onOpenAdmin={handleOpenAdminPortal} />

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

      {/* Admin Auth Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticated={() => {
          setIsAdminAuthOpen(false);
          setIsAdminModalOpen(true);
        }}
      />

      {/* Secure Admin Control Panel Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}

export default App;

