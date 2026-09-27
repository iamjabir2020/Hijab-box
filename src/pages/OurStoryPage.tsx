import React from 'react';
import { useCart } from '../context/CartContext';
import { to4kUrl, handleImageError } from '../utils/imageUtils';

export const OurStoryPage: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <div className="flex flex-col w-full bg-[#fff8f6]">
      {/* Hero Banner */}
      <section className="relative bg-[#F5EFEB] py-16 lg:py-24 border-b border-[#D8CCC4]/40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10 text-center">
          <span className="font-label-caps uppercase text-[#BA7A7C] tracking-[0.25em] text-xs font-semibold block mb-2">
            The Sisterhood Story
          </span>
          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#2B2523] mb-4 font-normal">
            Rooted in Modesty, Crafted with Love
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#524343] max-w-2xl mx-auto leading-relaxed">
            Founded by three sisters in Baroda with an unwavering commitment to natural textiles, unhurried modesty, and heartfelt sisterhood.
          </p>
        </div>
      </section>

      {/* Story Narrative Split */}
      <section className="py-16 lg:py-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Founders Vignette */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-[#F5EFEB] border border-[#D8CCC4]/50">
              <img
                src={to4kUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuDdof8kbGCrxcsdobl3yQeNRtx1ZOw2lMpA-WMFsvGpD_Xu7nGBX-25z4aZ9FvH_aB4CWPeEM3i1zzaqq-Lzf3QTlayhp3XkQnSQRIsmUin9cNaPqu7TJmaoI26PrUJprGWsKbHf9i8N8MHBL8BTTS0xYTagi5_wxI-V_IyF8qqTvwWGNbDXEVZt2yp6RXzAeAMXJrSJbyG9Fjs1Y2EqIM2ufKeWFQkf0_oEbKETX5k39NWfRYzQDxF")}
                alt="Three sister founders of Hijab Box in Baroda Studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-[#E8DFD8] hidden sm:block max-w-xs">
              <p className="font-serif italic text-sm text-[#2B2523]">
                “We created Hijab Box because we couldn’t find scarves that felt light as air, stayed in place, and honored our faith with dignified elegance.”
              </p>
              <span className="font-label-caps text-[10px] text-[#BA7A7C] uppercase tracking-wider block mt-2 font-semibold">
                — Farha, Zoya &amp; Anam
              </span>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#BA7A7C]"></span>
              <span className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-widest font-semibold">
                Our Genesis
              </span>
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#2B2523] font-normal leading-snug">
              Three Sisters, One Shared Vision in Baroda, Gujarat
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#524343] leading-relaxed font-sans">
              <p>
                In 2024, gathered around a wooden cutting table in our family home in Baroda, we dreamed of a brand that treated hijabs not merely as everyday accessories, but as sacred emblems of grace, confidence, and quiet strength.
              </p>
              <p>
                We spent months feeling swatches, testing natural modal weaves against humid Indian summers, and rejecting synthetic poly blends that slid, caught heat, or tore easily. Every weave in our collection is hand-tested and inspected at our studio seams.
              </p>
              <p>
                When you receive a parcel from Hijab Box, you are unboxing something packed by hand with prayer, wrapped in delicate tissue scented with organic rose, and stamped with our signature wax emblem.
              </p>
            </div>

            <div className="pt-2 flex gap-4">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#BA7A7C] hover:bg-[#844c4e] text-white text-xs font-label-md uppercase rounded tracking-wider transition-colors shadow font-medium cursor-pointer"
              >
                Shop The Archive
              </button>
              <button
                onClick={() => {
                  setActivePage('customize');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white border border-[#D8CCC4] hover:bg-[#F5EFEB] text-[#2B2523] text-xs font-label-md uppercase rounded tracking-wider transition-colors font-medium cursor-pointer"
              >
                Customize A Box
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Transparency Guide Section */}
      <section className="py-16 bg-[#F5EFEB] border-y border-[#D8CCC4]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-widest font-semibold block mb-1">
              Honest Textiles
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#2B2523] font-normal">
              Fabric Transparency Guide
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#524343] mt-2">
              We believe you deserve to know exactly what rests against your hair and skin every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <span className="material-symbols-outlined text-[#657150] text-3xl mb-2">eco</span>
              <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">100% Lenzing Modal</h3>
              <p className="text-xs text-[#524343] mt-2 leading-relaxed">
                Extracted from certified Austrian beechwood forests. Featherweight, zero static, breathable in 40°C heat, with an effortless liquid drape.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <span className="material-symbols-outlined text-[#BA7A7C] text-3xl mb-2">texture</span>
              <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">Crêpe Georgette</h3>
              <p className="text-xs text-[#524343] mt-2 leading-relaxed">
                Granular, non-slip crêpe finish with crisp structured pleats. Stays in place all day without constant adjustment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <span className="material-symbols-outlined text-[#2B2523] text-3xl mb-2">dry_cleaning</span>
              <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">Butter Stretch Jersey</h3>
              <p className="text-xs text-[#524343] mt-2 leading-relaxed">
                High-density 4-way stretch that requires zero pins. Fully opaque, gentle on hair volume, and machine washable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <span className="material-symbols-outlined text-[#844C4E] text-3xl mb-2">auto_awesome</span>
              <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">Festive Silk Organza</h3>
              <p className="text-xs text-[#524343] mt-2 leading-relaxed">
                Reflective champagne sheen woven for Nikah ceremonies, Eid celebrations, and evening occasions with majestic structure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
