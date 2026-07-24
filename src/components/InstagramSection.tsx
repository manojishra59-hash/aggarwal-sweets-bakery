import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/sweetsData';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram" className="py-16 sm:py-24 bg-[#111111] relative border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#181818] border border-[#D4AF37]/40 text-[#F4D03F] font-bold text-xs uppercase tracking-[0.2em] shadow-md hover:scale-105 transition-transform mb-4"
          >
            <Instagram className="w-4 h-4" />
            <span>@aggarwalsweets.delhi</span>
          </a>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Follow Us On <span className="text-gold-gradient">Instagram</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9D9D9]/80 font-sans">
            Daily behind-the-scenes, fresh batch announcements, and royal sweet inspirations.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-[#141414] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 group cursor-pointer shadow-xl"
            >
              <img
                src={post.image}
                alt="Instagram post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95 group-hover:brightness-105"
              />

              {/* Soft Hover Overlay */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <ExternalLink className="w-4 h-4 text-[#F4D03F]" />
                </div>

                <div className="flex items-center justify-around font-bold text-xs text-[#F4D03F]">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-[#F4D03F] text-[#F4D03F]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-[#F4D03F] text-[#F4D03F]" />
                    <span>{post.comments}</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

