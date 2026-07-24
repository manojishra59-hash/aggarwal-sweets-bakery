import React from 'react';
import { Plus } from 'lucide-react';

interface CategoryFilterBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCustomizer: () => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenCustomizer,
}) => {
  return (
    <div className="flex flex-row md:flex-col items-center gap-3 bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
      {/* 1. Sundae / Cup Icon */}
      <button
        onClick={() =>
          onSelectCategory(activeCategory === 'cup' ? 'all' : 'cup')
        }
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          activeCategory === 'cup'
            ? 'bg-white text-rose-950 shadow-lg scale-105 font-bold'
            : 'bg-white/15 text-white hover:bg-white/25 hover:scale-105'
        }`}
        title="Filter Cups"
        id="cat-cup-btn"
      >
        {/* Sundae cup icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M18 4H6a2 2 0 0 0-2 2v2c0 3.31 2.69 6 6 6v3H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-2v-3c3.31 0 6-2.69 6-6V6a2 2 0 0 0-2-2zm0 4H6V6h12v2z" />
        </svg>
      </button>

      {/* 2. Scoop Bowl Icon */}
      <button
        onClick={() =>
          onSelectCategory(activeCategory === 'bowl' ? 'all' : 'bowl')
        }
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          activeCategory === 'bowl'
            ? 'bg-white text-rose-950 shadow-lg scale-105 font-bold'
            : 'bg-white/15 text-white hover:bg-white/25 hover:scale-105'
        }`}
        title="Filter Bowls"
        id="cat-bowl-btn"
      >
        {/* Dessert bowl icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 4a7 7 0 0 0-7 7c0 .34.03.67.08 1h13.84c.05-.33.08-.66.08-1a7 7 0 0 0-7-7zm-8.8 10A8.96 8.96 0 0 0 12 21a8.96 8.96 0 0 0 8.8-7H3.2z" />
        </svg>
      </button>

      {/* 3. Ice Cream Cone Icon */}
      <button
        onClick={() =>
          onSelectCategory(activeCategory === 'cone' ? 'all' : 'cone')
        }
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          activeCategory === 'cone'
            ? 'bg-white text-rose-950 shadow-lg scale-105 font-bold'
            : 'bg-white/15 text-white hover:bg-white/25 hover:scale-105'
        }`}
        title="Filter Cones"
        id="cat-cone-btn"
      >
        {/* Ice Cream Cone icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2a5 5 0 0 0-5 5c0 1.25.46 2.39 1.22 3.26L12 22l3.78-11.74A4.98 4.98 0 0 0 17 7a5 5 0 0 0-5-5zm0 15.22L9.43 10.2A2.98 2.98 0 0 1 9 8.5 3 3 0 0 1 12 5a3 3 0 0 1 3 3.5c0 .63-.2 1.22-.57 1.7L12 17.22z" />
        </svg>
      </button>

      {/* 4. Plus / Add Flavor Icon */}
      <button
        onClick={onOpenCustomizer}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-white/15 text-white hover:bg-white/25 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
        title="Add Custom Flavor"
        id="cat-custom-btn"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
