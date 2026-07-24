import React, { useState } from 'react';
import { Search, ShoppingBag, MapPin, Info, X, Menu } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenKnowUs: () => void;
  onOpenCloseBy: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenKnowUs,
  onOpenCloseBy,
  onOpenCart,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <nav className="flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
            {/* Custom Ice-cream/slice icon matching screenshot */}
            <svg
              className="w-6 h-6 text-white drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8 2 5 5 5 9c0 3.5 2.5 6.5 6 7.5V21a1 1 0 0 0 2 0v-4.5c3.5-1 6-4 6-7.5 0-4-3-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" />
              <path d="M10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-white tracking-wide font-sans leading-tight drop-shadow-md">
              Bekzod
            </span>
            <span className="text-sm font-bold text-white/90 tracking-wider font-sans leading-none drop-shadow-sm">
              Shirinliklari
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="#home"
            className="text-white font-semibold text-base tracking-wide border-b-2 border-white pb-0.5 transition-all"
          >
            Home
          </a>
          <button
            onClick={onOpenKnowUs}
            className="text-white/80 hover:text-white font-medium text-base tracking-wide transition-colors cursor-pointer"
          >
            Know Us
          </button>
          <button
            onClick={onOpenCloseBy}
            className="text-white/80 hover:text-white font-medium text-base tracking-wide transition-colors cursor-pointer"
          >
            Close By
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            title="Search menu"
            id="nav-search-btn"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            title="Shopping cart"
            id="nav-cart-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-rose-950">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title="Menu"
            id="nav-menu-btn"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
              <span className="w-4 h-0.5 bg-white rounded-full"></span>
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-rose-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl text-white space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="font-bold text-lg">Menu Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col space-y-3 font-medium">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-white/10 text-white font-semibold"
            >
              Home
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKnowUs();
              }}
              className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 flex items-center space-x-2"
            >
              <Info className="w-4 h-4" />
              <span>Know Us</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCloseBy();
              }}
              className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Close By</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
