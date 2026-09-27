import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const Footer: React.FC = () => {
  const { setActivePage } = useCart();
  const { setAccountModalOpen } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      if (isSupabaseConfigured) {
        try {
          await supabase.from('newsletter_subscribers').insert({ email: email.trim() });
        } catch (err) {
          console.warn('Newsletter subscribe:', err);
        }
      }
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#f7f2ee] border-t border-[#e8ded9] text-[#2c2725] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e8ded9]">
          {/* Column 1 & 2: Brand / About Hijab Box */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#2c2725]">
                HIJAB BOX
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#ba7a7c] font-medium">
              Sister-Owned • Baroda, Gujarat
            </p>
            <p className="text-sm text-[#685e5b] leading-relaxed max-w-sm">
              Founded by three sisters with a passion for modest fashion and effortless style. Thoughtfully curated, high-quality hijabs and keepsake boxes designed to bring comfort, elegance, and confidence to your everyday journey.
            </p>
            <div className="pt-2 text-xs text-[#8c7e7a] space-y-1">
              <p>Baroda Studio: Mon–Sat, 10:00 AM – 7:00 PM IST</p>
              <p>Dispatched with love &amp; organic rose scent across India.</p>
            </div>
          </div>

          {/* Column 3: The Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.18em] uppercase text-[#2c2725] font-semibold">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#685e5b]">
              <li>
                <button
                  onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Premium Modal Hijabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Crêpe Georgette &amp; Chiffon
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Everyday Jersey Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Festive Silk Organza
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Artisanal Watercolor Prints
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('customize'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left font-medium text-[#ba7a7c]"
                >
                  Customize Your Hijab Box
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Sisterhood & Customer Care */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.18em] uppercase text-[#2c2725] font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#685e5b]">
              <li>
                <button
                  onClick={() => { setActivePage('order-confirmed'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Shipping &amp; Delivery Timelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  7-Day Studio Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#ba7a7c] transition-colors text-left"
                >
                  Fabric Transparency Guide
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/919512607726"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ba7a7c] transition-colors"
                >
                  WhatsApp Concierge: +91 95126 07726
                </a>
              </li>
              <li>
                <a
                  href="mailto:hijabbox13@gmail.com"
                  className="hover:text-[#ba7a7c] transition-colors"
                >
                  Email: hijabbox13@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: The Sisterhood Journal / Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.18em] uppercase text-[#2c2725] font-semibold">
              The Sisterhood
            </h4>
            <p className="text-xs text-[#685e5b] leading-relaxed">
              Join our intimate circle for early fabric drops, bespoke gifting previews, and drape tutorials.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-[#fdfaf8] border border-[#d8ccc6] text-xs px-3.5 py-2.5 text-[#2c2725] placeholder-[#a69894] focus:outline-none focus:border-[#ba7a7c] rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ba7a7c] hover:bg-[#a6686a] text-white text-xs tracking-wider uppercase font-medium py-2.5 px-4 rounded transition-colors"
              >
                {subscribed ? 'Welcome to Sisterhood ♡' : 'Subscribe'}
              </button>
            </form>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/hijabox__/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#ba7a7c] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Instagram: @hijabox__</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8c7e7a] gap-4">
          <p>Faith Inspires Modesty • © 2026 Hijab Box. Baroda. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={() => setAccountModalOpen(true)} className="text-[#ba7a7c] hover:underline transition-colors font-medium">Supabase Backend &amp; SQL</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#2c2725] transition-colors">Privacy Policy</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#2c2725] transition-colors">Terms of Service</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#2c2725] transition-colors">Shipping &amp; Returns</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#2c2725] transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
