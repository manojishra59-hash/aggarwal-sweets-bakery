import React, { useState } from 'react';
import { Plus, BookOpen, Edit2, Trash2, Save, X } from 'lucide-react';
import { BlogRecord } from '../../../lib/apiService';

interface BlogsTabProps {
  blogs: BlogRecord[];
}

export const BlogsTab: React.FC<BlogsTabProps> = ({ blogs }) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Halwai Stories & Mithai Blogs</h3>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{blogs.length} Published Articles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((b) => (
          <div key={b.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md">
            <div className="h-32 rounded-xl overflow-hidden mb-3 relative bg-black">
              <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover opacity-80" />
            </div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{b.author}</span>
            <h4 className="text-base font-bold font-serif-luxury text-white mt-0.5 mb-1">{b.title}</h4>
            <p className="text-xs text-gray-400 line-clamp-2">{b.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
