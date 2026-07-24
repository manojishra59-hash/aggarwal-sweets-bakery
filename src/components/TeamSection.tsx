import React from 'react';
import { Award, ShieldCheck, HeartHandshake, ChefHat } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Master Halwai Rameshwar Aggarwal',
    role: 'Founder & Head Sweet Artisan',
    experience: '35+ Years Experience',
    specialty: 'Desi Ghee Motichoor Laddu & Shahi Kaju Katli',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Chef Suresh Kumar',
    role: 'Senior Halwai & Chhena Specialist',
    experience: '22 Years Experience',
    specialty: 'Bengali Rasgulla & Creamy Rasmalai',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Vikram Aggarwal',
    role: 'Operations & Quality Director',
    experience: '15 Years Experience',
    specialty: 'Hygiene Standards & Modern Packaging',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 sm:py-24 bg-[#111111] relative border-t border-[#D4AF37]/15 cv-auto gpu-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Master Culinary Artisans
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Meet Our <span className="text-gold-gradient">Master Craftsmen</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9D9D9]/80 font-sans">
            The legendary halwais and artisans behind 3 decades of authentic North Indian taste and purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#121212] rounded-3xl border border-[#D4AF37]/25 p-6 shadow-xl relative group hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 border border-[#D4AF37]/40 text-[#F4D03F] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                    {member.experience}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase mb-1">
                  <ChefHat className="w-4 h-4" />
                  <span>{member.role}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-serif-luxury mb-2">
                  {member.name}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed bg-[#181818] p-3 rounded-xl border border-white/5">
                  <span className="text-[#F4D03F] font-bold">Specialty: </span>
                  {member.specialty}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Certified Pure Desi Ghee</span>
                </span>
                <span className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Halwai Master</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
