import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, CheckCircle2, ArrowRight, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_WHATSAPP } from '../data/sweetsData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (sweetId: string, newQtyKg: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.sweet.pricePerKg * item.quantityKg,
    0
  );

  const handleCheckoutWhatsApp = () => {
    setIsOrdered(true);
    // Format WhatsApp message text
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.sweet.name} (${item.quantityKg} kg) - ₹${
            item.sweet.pricePerKg * item.quantityKg
          }`
      )
      .join('%0A');

    const msg = `Hello%20Aggarwal%20Sweets!%20I%20would%20like%20to%20place%20an%20order:%0A%0A${itemsList}%0A%0ATotal%20Amount:%20₹${totalPrice}`;

    setTimeout(() => {
      window.open(`https://wa.me/${BRAND_WHATSAPP}?text=${msg}`, '_blank');
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#D4AF37]/30 shadow-2xl text-white p-6 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-6 h-6 text-[#F4D03F]" />
                <h2 className="text-xl font-bold font-serif-luxury tracking-wide text-white">Your Royal Sweet Selection</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-[#D9D9D9] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isOrdered ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#F4D03F] mx-auto" />
                <h3 className="text-2xl font-bold font-serif-luxury text-white">Redirecting to WhatsApp...</h3>
                <p className="text-sm text-[#D9D9D9]/80 max-w-xs mx-auto font-sans">
                  Your royal sweet box order is ready! Opening WhatsApp for instant store concierge confirmation.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center text-[#D9D9D9]/50 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-[#D4AF37]/40" />
                <p className="text-sm font-medium text-[#D9D9D9]">Your sweet box is empty.</p>
                <p className="text-xs text-[#A3A3A3]">
                  Select your favorite delicacies from our Featured collection.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.sweet.id}
                    className="flex items-center justify-between bg-[#181818] p-3.5 rounded-xl border border-[#D4AF37]/20 shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.sweet.image}
                        alt={item.sweet.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/20"
                      />
                      <div>
                        <h4 className="font-bold text-sm font-serif-luxury text-white">{item.sweet.name}</h4>
                        <span className="text-xs text-[#F4D03F] font-semibold">
                          ₹{item.sweet.pricePerKg} / kg
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D4AF37]/30 rounded-lg bg-[#0A0A0A] px-1 py-0.5 text-xs font-bold space-x-1">
                        <button
                          onClick={() => onUpdateQty(item.sweet.id, item.quantityKg - 0.5)}
                          className="p-1 text-[#D4AF37] hover:text-[#F4D03F] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1 text-xs font-mono text-white">{item.quantityKg} kg</span>
                        <button
                          onClick={() => onUpdateQty(item.sweet.id, item.quantityKg + 0.5)}
                          className="p-1 text-[#D4AF37] hover:text-[#F4D03F] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQty(item.sweet.id, 0)}
                        className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isOrdered && cart.length > 0 && (
            <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
              <div className="flex items-center justify-between text-base font-bold font-serif-luxury">
                <span className="text-[#D9D9D9]">Total Amount:</span>
                <span className="text-2xl text-[#F4D03F] font-extrabold">
                  ₹{totalPrice}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClearCart}
                  className="py-3 px-4 rounded-xl border border-[#D4AF37]/30 text-[#D9D9D9] hover:bg-white/5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Clear Box
                </button>
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="py-3 px-4 rounded-xl btn-gold text-[#0A0A0A] text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

