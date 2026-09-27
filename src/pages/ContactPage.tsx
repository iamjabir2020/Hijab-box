import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { setActivePage } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    orderNumber: '',
    inquiryTopic: '',
    messageBody: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        orderNumber: '',
        inquiryTopic: '',
        messageBody: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  const faqs = [
    {
      q: 'Where is my order & how can I track it?',
      a: (
        <div className="space-y-2 text-[#524343] text-xs sm:text-sm">
          <p>
            Once your order is thoughtfully packed and leaves our Baroda studio, you will instantly receive an SMS and email notification with your active courier tracking number (via Bluedart, Delhivery, or DTDC).
          </p>
          <p>
            You can also track anytime by visiting our dedicated{' '}
            <button
              onClick={() => setActivePage('order-confirmed')}
              className="text-[#BA7A7C] font-medium underline underline-offset-4"
            >
              Track Your Order
            </button>{' '}
            page and entering your mobile number or 6-digit order ID.
          </p>
        </div>
      ),
    },
    {
      q: 'What are your shipping timelines across India?',
      a: (
        <div className="space-y-2 text-[#524343] text-xs sm:text-sm">
          <p>All parcels are dispatched within 24–48 hours from Baroda, Gujarat. Standard delivery takes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-[#2B2523]">Metro Cities (Mumbai, Delhi, Bengaluru, Hyderabad):</span> 2–4 business days.
            </li>
            <li>
              <span className="font-medium text-[#2B2523]">Rest of India:</span> 4–6 business days.
            </li>
          </ul>
          <p className="text-[#BA7A7C] font-medium">Free express shipping is automatically applied to all orders above ₹899.</p>
        </div>
      ),
    },
    {
      q: 'Can I customize a Hijab Box for gifting or weddings?',
      a: (
        <div className="space-y-2 text-[#524343] text-xs sm:text-sm">
          <p>
            Yes, absolutely! Creating personalized boxes is our favorite part of what we do. Use our interactive{' '}
            <button
              onClick={() => setActivePage('customize')}
              className="text-[#BA7A7C] font-medium underline underline-offset-4"
            >
              Custom Box Builder
            </button>{' '}
            to hand-pick your scarves, select accessories (snag-free magnets, ribbed undercaps, hair scrunchies), and compose a handwritten calligraphy gift note.
          </p>
          <p>
            For bridal hampers or bulk party favors (10+ boxes), kindly ping us on WhatsApp for tailored ribbon swatches and personalized wax seals.
          </p>
        </div>
      ),
    },
    {
      q: 'How do I choose between Modal, Chiffon, and Jersey fabrics?',
      a: (
        <div className="space-y-3 text-[#524343] text-xs sm:text-sm">
          <p>Each textile fulfills a distinct mood and requirement:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#D8CCC4]/40">
              <p className="font-medium text-[#2B2523]">Modal Silk</p>
              <p className="text-xs text-[#524343] mt-0.5">
                Ultra-breathable, featherweight, liquid drape, matte-luxe finish. Ideal for all-day comfort and heat.
              </p>
            </div>
            <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#D8CCC4]/40">
              <p className="font-medium text-[#2B2523]">Chiffon Silk</p>
              <p className="text-xs text-[#524343] mt-0.5">
                Airy, elevated, cascading folds with subtle texture. Best for formal wear and events (pair with undercap).
              </p>
            </div>
            <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#D8CCC4]/40">
              <p className="font-medium text-[#2B2523]">Everyday Jersey</p>
              <p className="text-xs text-[#524343] mt-0.5">
                Four-way stretch, pin-free security, completely opaque. Perfect for college, workouts, and busy errands.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      q: 'What is your return & exchange policy?',
      a: (
        <div className="space-y-2 text-[#524343] text-xs sm:text-sm">
          <p>
            We take deep pride in our craftsmanship and want you to truly love your pieces. We honor a{' '}
            <span className="font-medium text-[#2B2523]">7-day hassle-free exchange</span> for unused, unwashed items in their original brand tags and cloth packaging.
          </p>
          <p>
            Due to personal hygiene considerations, worn undercaps and opened scrunchie packs cannot be accepted unless defective upon initial unboxing.
          </p>
        </div>
      ),
    },
    {
      q: 'Are snag-free pins and tie-caps included with every box?',
      a: (
        <div className="space-y-2 text-[#524343] text-xs sm:text-sm">
          <p>
            Every curated Hijab Box and custom box order arrives with our signature complimentary set of{' '}
            <span className="font-medium text-[#2B2523]">rose-gold snag-free pins</span> nestled inside our keepsake matchbox container.
          </p>
          <p>
            Cotton modal tie-back undercaps can be selected as an optional add-on during box customisation or ordered separately from our accessories collection.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#fff8f6]">
      {/* Hero Section */}
      <section className="relative bg-[#F5EFEB] py-14 lg:py-20 overflow-hidden border-b border-[#D8CCC4]/40">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#BA7A7C]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[#657150]/5 blur-2xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] shadow-sm text-[#BA7A7C] font-label-caps text-xs uppercase tracking-widest mb-3 font-semibold border border-[#D8CCC4]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA7A7C] animate-pulse"></span>
              Sisterhood Care &amp; Inquiries • Baroda Studio
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-[#2B2523] font-normal tracking-tight mb-3">
              We’d Love To Hear From You
            </h1>
            <p className="font-serif italic text-base sm:text-xl text-[#524343] font-normal leading-relaxed max-w-2xl">
              Whether you have a question about your order, need fabric advice for a special occasion, or simply want to say hello, the three of us and our studio team are here for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-1 font-label-caps text-xs text-[#524343]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[16px]">schedule</span>
                <span>Avg. Response: 2–4 Hours</span>
              </div>
              <span className="text-[#BA7A7C]/40">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[16px]">verified</span>
                <span>Handled by Founding Sisters</span>
              </div>
              <span className="text-[#BA7A7C]/40">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#BA7A7C] text-[16px]">location_on</span>
                <span>Baroda, Gujarat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Channels & Form Grid */}
      <section className="py-12 lg:py-16 bg-[#fff8f6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Direct Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <p className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-widest font-semibold">
                    Connect Directly
                  </p>
                  <h2 className="font-headline-md text-xl sm:text-2xl text-[#2B2523] mt-0.5">
                    Sisterhood Channels
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#F5EFEB] font-label-caps text-[10px] text-[#2B2523] tracking-wider uppercase font-semibold">
                  Direct Access
                </span>
              </div>

              {/* Channel 1: WhatsApp */}
              <div className="bg-[#F5EFEB] rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group border border-[#D8CCC4]/40">
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#BA7A7C]"></div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#BA7A7C] shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-[#D8CCC4]/30">
                    <span className="material-symbols-outlined text-[24px]">chat</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-headline-sm text-base text-[#2B2523] font-medium">
                        Instant Sisterhood Support
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#657150]/15 text-[#657150] font-label-caps text-[9px] uppercase font-bold">
                        Fastest
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-[#524343] mt-1 leading-normal">
                      For real-time fabric questions, drape guidance, and quick order help via WhatsApp.
                    </p>
                    <div className="mt-3 flex flex-col gap-1 font-body-sm text-xs text-[#2B2523]">
                      <a
                        href="https://wa.me/919512607726"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#BA7A7C] transition-colors inline-flex items-center gap-1.5 font-medium"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#BA7A7C]">call</span>
                        +91 95126 07726
                      </a>
                      <a
                        href="https://wa.me/918200389937"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#BA7A7C] transition-colors inline-flex items-center gap-1.5 font-medium"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#BA7A7C]">call</span>
                        +91 82003 89937
                      </a>
                    </div>
                    <div className="mt-3 pt-1">
                      <a
                        href="https://wa.me/919512607726?text=Salam%20Hijab%20Box%20team,%20I'd%20love%20some%20help%20with..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#2B2523] hover:bg-[#1F1B1A] text-white font-label-md text-xs transition-colors shadow-sm font-semibold uppercase"
                      >
                        <span className="material-symbols-outlined text-[18px]">forum</span>
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel 2: Email */}
              <div className="bg-[#F5EFEB] rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group border border-[#D8CCC4]/40">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#BA7A7C] shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-[#D8CCC4]/30">
                    <span className="material-symbols-outlined text-[24px]">mail</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline-sm text-base text-[#2B2523] font-medium">
                      Studio Concierge
                    </h3>
                    <p className="font-body-sm text-xs text-[#524343] mt-1 leading-normal">
                      For bespoke gifting, bridal box inquiries, bulk corporate orders, and formal support.
                    </p>
                    <div className="mt-3">
                      <a
                        href="mailto:hijabbox13@gmail.com"
                        className="font-body-sm text-xs text-[#2B2523] hover:text-[#BA7A7C] font-medium transition-colors flex items-center gap-1.5 truncate"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#BA7A7C]">drafts</span>
                        hijabbox13@gmail.com
                      </a>
                    </div>
                    <div className="mt-3 pt-1">
                      <a
                        href="mailto:hijabbox13@gmail.com?subject=Studio%20Inquiry%20-%20Hijab%20Box"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#ece0dd] text-[#2B2523] font-label-md text-xs transition-colors shadow-sm border border-[#D8CCC4] font-semibold uppercase"
                      >
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        Email Our Team
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel 3: Instagram */}
              <div className="bg-[#F5EFEB] rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group border border-[#D8CCC4]/40">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#BA7A7C] shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-[#D8CCC4]/30">
                    <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline-sm text-base text-[#2B2523] font-medium">
                      Instagram Community
                    </h3>
                    <p className="font-body-sm text-xs text-[#524343] mt-1 leading-normal">
                      @hijabox__ — DM us anytime for styling inspo, drape videos, and sisterhood spotlights.
                    </p>
                    <div className="mt-3">
                      <a
                        href="https://instagram.com/hijabox__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label-caps text-xs text-[#BA7A7C] hover:text-[#2B2523] transition-colors inline-flex items-center gap-1 font-semibold"
                      >
                        @HIJABOX__ • 45K+ SISTERS
                        <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                      </a>
                    </div>
                    <div className="mt-3 pt-1">
                      <a
                        href="https://instagram.com/hijabox__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#ece0dd] text-[#2B2523] font-label-md text-xs transition-colors shadow-sm border border-[#D8CCC4] font-semibold uppercase"
                      >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        Visit @hijabox__
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Info Card */}
              <div className="bg-[#f7ebe8] rounded-xl p-4 shadow-sm space-y-2 border border-[#ece0dd]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#BA7A7C] text-[20px] mt-0.5">storefront</span>
                  <div>
                    <p className="font-label-caps text-xs uppercase text-[#2B2523] tracking-wider font-semibold">
                      Baroda Studio, Gujarat, India
                    </p>
                    <p className="font-body-sm text-xs text-[#524343] mt-0.5">
                      Monday to Saturday: 10:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <span className="material-symbols-outlined text-[#657150] text-[20px] mt-0.5">inventory_2</span>
                  <p className="font-body-sm text-xs text-[#524343]">
                    Orders are hand-inspected, wrapped in signature tissue, and dispatched within{' '}
                    <span className="font-medium text-[#2B2523]">24–48 hours</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F5EFEB] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md border border-[#D8CCC4]/50">
                <div className="mb-6">
                  <span className="font-label-caps text-xs uppercase text-[#BA7A7C] tracking-widest font-semibold block">
                    Sisterhood Inquiries
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#2B2523] mt-1 font-normal">
                    Send Us A Message
                  </h2>
                  <p className="font-body-sm text-xs sm:text-sm text-[#524343] mt-1">
                    Fill out the details below and we will get back to your inquiry promptly.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                        Full Name <span className="text-[#BA7A7C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Amina Patel"
                        className="w-full bg-[#FAF8F5] px-3.5 py-3 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm placeholder:text-[#524343]/40 shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="emailAddress" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                        Email Address <span className="text-[#BA7A7C]">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        required
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        placeholder="amina@example.com"
                        className="w-full bg-[#FAF8F5] px-3.5 py-3 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm placeholder:text-[#524343]/40 shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phoneNumber" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                        WhatsApp / Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF8F5] px-3.5 py-3 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm placeholder:text-[#524343]/40 shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="orderNumber" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                        Order Number <span className="text-[#524343]/60 lowercase text-[10px] font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        placeholder="#HB123456"
                        className="w-full bg-[#FAF8F5] px-3.5 py-3 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm placeholder:text-[#524343]/40 shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all border border-[#D8CCC4]/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="inquiryTopic" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                      Inquiry Topic <span className="text-[#BA7A7C]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="inquiryTopic"
                        required
                        value={formData.inquiryTopic}
                        onChange={(e) => setFormData({ ...formData, inquiryTopic: e.target.value })}
                        className="w-full bg-[#FAF8F5] px-3.5 py-3 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all appearance-none cursor-pointer border border-[#D8CCC4]/50"
                      >
                        <option value="" disabled>Select a topic that best fits</option>
                        <option value="order-status">Order Status &amp; Dispatch Tracking</option>
                        <option value="fabric-consultation">Fabric Consultation &amp; Shade Matching</option>
                        <option value="custom-box">Custom Hijab Box / Bridal Gifting</option>
                        <option value="returns-exchange">Returns &amp; Exchange Support</option>
                        <option value="wholesale">Wholesale, Collaborations &amp; Others</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#524343] text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="messageBody" className="font-label-caps text-xs text-[#2B2523] uppercase tracking-wider font-semibold">
                        Message <span className="text-[#BA7A7C]">*</span>
                      </label>
                      <span className="font-label-caps text-[10px] text-[#524343]/70">
                        {formData.messageBody.length} / 800
                      </span>
                    </div>
                    <textarea
                      id="messageBody"
                      rows={5}
                      required
                      maxLength={800}
                      value={formData.messageBody}
                      onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                      placeholder="Tell us how we can help you... If asking about color matching, let us know your outfit tone!"
                      className="w-full bg-[#FAF8F5] p-3.5 rounded-lg text-[#2B2523] font-body-md text-xs sm:text-sm placeholder:text-[#524343]/40 shadow-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#BA7A7C] transition-all resize-y border border-[#D8CCC4]/50"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded bg-[#BA7A7C] hover:bg-[#844c4e] text-white font-label-md text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 group font-medium cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>

                    {submitted && (
                      <div className="mt-3 p-3.5 rounded-lg bg-[#657150]/15 text-[#2B2523] font-body-sm text-xs flex items-center gap-2 border border-[#657150]/30 animate-in fade-in">
                        <span className="material-symbols-outlined text-[#657150] text-[20px]">check_circle</span>
                        <span>Thank you sister! Your message has been sent. We'll reply within 2–4 hours.</span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-center gap-1.5 text-center">
                      <span className="material-symbols-outlined text-[#BA7A7C] text-[16px]">favorite</span>
                      <p className="font-body-sm text-xs text-[#524343]">
                        We typically respond within 2–4 business hours. Packed with care from Baroda.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-14 lg:py-20 bg-[#F5EFEB] border-y border-[#D8CCC4]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-widest font-semibold block">
                Self-Serve Assistance
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#2B2523] font-normal mt-1">
                Frequently Asked Questions
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#524343] mt-2 max-w-xl mx-auto">
                Find immediate answers regarding dispatch schedules, fabric characteristics, and custom gift boxes.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm overflow-hidden transition-all border border-[#E8DFD8]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-[#FAF8F5]/60 transition-colors cursor-pointer"
                    >
                      <span className="font-headline-sm text-base sm:text-lg text-[#2B2523] font-normal">
                        {faq.q}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#BA7A7C] text-[22px] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-[#f2e6e2] mt-1 pt-3 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setActivePage('story')}
                className="inline-flex items-center gap-1.5 font-label-md text-xs text-[#BA7A7C] hover:text-[#2B2523] transition-colors group cursor-pointer font-semibold uppercase tracking-wider"
              >
                <span>View All FAQs, Fabric Guides &amp; Studio Policies</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sisterhood Note Quote */}
      <section className="py-14 bg-[#fff8f6] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="relative bg-gradient-to-br from-[#F5EFEB] via-[#FAF8F5] to-[#F5EFEB] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-md overflow-hidden border border-[#D8CCC4]/50">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#BA7A7C]/10 blur-2xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[#BA7A7C]"></span>
                  <span className="font-label-caps text-xs text-[#BA7A7C] uppercase tracking-widest font-semibold">
                    Sisterhood Note
                  </span>
                </div>
                <blockquote className="font-serif text-2xl lg:text-3xl text-[#2B2523] leading-relaxed italic">
                  “Every parcel leaving our studio carries our prayer for your ease and grace.”
                </blockquote>
                <p className="font-body-sm text-xs text-[#524343] pt-1">
                  — Farha, Zoya &amp; Anam • Founders of Hijab Box, Baroda
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 pt-2 lg:pt-0">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm border border-[#D8CCC4]/40">
                  <div className="w-9 h-9 rounded-full bg-[#BA7A7C]/10 flex items-center justify-center text-[#BA7A7C]">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-[#524343] uppercase tracking-wider font-semibold">
                      Happy Sisters
                    </p>
                    <p className="font-headline-sm text-base text-[#2B2523] font-semibold">12,000+ Delivered</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm border border-[#D8CCC4]/40">
                  <div className="w-9 h-9 rounded-full bg-[#657150]/15 flex items-center justify-center text-[#657150]">
                    <span className="material-symbols-outlined text-[20px]">eco</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-[#524343] uppercase tracking-wider font-semibold">
                      Conscious Studio
                    </p>
                    <p className="font-headline-sm text-base text-[#2B2523] font-semibold">100% Plastic-Free Drape</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
