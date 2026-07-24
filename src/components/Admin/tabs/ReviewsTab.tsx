import React, { useState } from 'react';
import { Star, Check, X, Trash2, Award } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../../../data/sweetsData';
import { ReviewItem } from '../../../types';

export const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(GOOGLE_REVIEWS);

  const toggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isVerified: !r.isVerified } : r))
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Google & Guest Reviews</h3>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{reviews.length} Verified Reviews</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif-luxury">{r.name}</h4>
                    <span className="text-[10px] text-gray-400">{r.location} • {r.date}</span>
                  </div>
                </div>
                <div className="flex items-center text-[#F4D03F]">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F4D03F]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-300 italic my-3">"{r.comment}"</p>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                ✓ Verified Purchaser
              </span>
              <button
                onClick={() => toggleFeatured(r.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer ${
                  r.isVerified
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#121212] text-gray-400 border-gray-700 hover:text-white'
                }`}
              >
                {r.isVerified ? 'Featured on Site' : 'Feature Review'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
