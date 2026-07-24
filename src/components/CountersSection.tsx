import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { COUNTERS_DATA } from '../data/sweetsData';

export const CountersSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-[#121212] text-white relative overflow-hidden border-t border-b border-[#D4AF37]/20">
      {/* Decorative Golden Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#D4AF37]/20">
          {COUNTERS_DATA.map((counter) => (
            <div key={counter.id} className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif-luxury text-gold-gradient tracking-tight">
                {isInView ? (
                  <CountUpNumber endValue={counter.value} suffix={counter.suffix} />
                ) : (
                  `0${counter.suffix}`
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif-luxury uppercase tracking-wider">
                {counter.label}
              </h3>
              <p className="text-xs text-[#D9D9D9]/70 font-sans leading-relaxed">
                {counter.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Count-up Helper Component
const CountUpNumber: React.FC<{ endValue: number; suffix: string }> = ({
  endValue,
  suffix,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const steps = 50;
    const increment = endValue / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue]);

  const display = Number.isInteger(endValue)
    ? Math.floor(count)
    : count.toFixed(1);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

