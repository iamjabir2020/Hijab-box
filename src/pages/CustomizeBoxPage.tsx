import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { to4kUrl, handleImageError } from '../utils/imageUtils';

export const CustomizeBoxPage: React.FC = () => {
  const { addToCart } = useCart();

  const boxOptions = [
    {
      id: 'box-3',
      name: 'The Sisterhood 3-Scarf Keepsake Box',
      capacity: 3,
      basePrice: 1799,
      originalPrice: 2299,
      image: to4kUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCWtmSbABpq0Z7NDfVGeSu2VM7BglpbvSW6KlI1KyNJO9byDoPotDyAcMldKbBXKies3K5hkmZ7-jsmHfvWnehRPk-KOHlphqVDk2anLg1uZpXvarSToTa9SrJqlCCxX6TYDoJEjyyecHeeto0IUvRdEWsaYs2Ffr9KMfeJtDd4DMyv44jAMiZEgouwE_ZKJMnpbPrPf44pXemvRrr9rRCpYM2FQtZ_y0taLiQf2jTN_K7fKqKQHObg'),
      description: 'Signature rigid keepsake box with embossed rose gold foil lettering, organic scented tissue & wax seal.',
    },
    {
      id: 'box-5',
      name: 'The Grand 5-Scarf Box',
      capacity: 5,
      basePrice: 2699,
      originalPrice: 3399,
      image: to4kUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCRoKQBvENBHsy5Q0Zq9fs-nxRGsJVVI7v7BcnX112rj1WWe0bAbbeR8ABDdwRYxQHtoEALJVYX3qQUZNloCIXD0P916CQLQSDxl7VMWebkdKWkyj5Hrou7aGPCinXcCIuSpaypvz5nNT1sXZaexZ9HncsMcf3GEG2cjI9hCSUCUQWRXBYGfdNWjRNL5rp_oGiSDu2eVwQAcVSJRdxF5xjOycjAlIYmX1RGi5ujXR9A_FcJxu4f9X8a'),
      description: 'Generous multi-tier keepsake box designed to build your dream capsule modesty wardrobe.',
    },
  ];

  const [selectedBox, setSelectedBox] = useState(boxOptions[0]);
  const [selectedHijabs, setSelectedHijabs] = useState<Product[]>([
    PRODUCTS[0], // Ombre Rouge
    PRODUCTS[1], // Chantilly Lace
    PRODUCTS[3], // Fawn Modal
  ]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([
    'snag-free-hijab-magnets',
  ]);
  const [ribbonColor, setRibbonColor] = useState('Dusty Rose Silk');
  const [recipientNote, setRecipientNote] = useState('Dearest sister, may you always walk with grace and serenity.');

  const availableHijabs = PRODUCTS.filter(
    (p) => p.category === 'modal' || p.category === 'chiffon' || p.category === 'jersey' || p.category === 'printed'
  );

  const availableAccessories = PRODUCTS.filter((p) => p.category === 'accessories');

  const toggleHijab = (product: Product) => {
    if (selectedHijabs.some((h) => h.id === product.id)) {
      setSelectedHijabs(selectedHijabs.filter((h) => h.id !== product.id));
    } else {
      if (selectedHijabs.length < selectedBox.capacity) {
        setSelectedHijabs([...selectedHijabs, product]);
      }
    }
  };

  const toggleAccessory = (accId: string) => {
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter((id) => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  const handleAddBoxToCart = () => {
    const customProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `${selectedBox.name} (Custom Curated)`,
      category: 'boxes',
      subCategory: `${selectedHijabs.length} Scarves + ${selectedAccessories.length} Accessories`,
      tag: 'Handcrafted Box',
      badge: 'Artisanal',
      price: selectedBox.basePrice,
      originalPrice: selectedBox.originalPrice,
      rating: 5,
      reviewsCount: 1,
      image: selectedBox.image,
      imageAlt: selectedBox.name,
      dimensions: `Includes: ${selectedHijabs.map((h) => h.name).join(', ')}`,
      fabricDetails: `Finished with ${ribbonColor} ribbon, wax seal, and personal calligraphy note: "${recipientNote}"`,
      inStock: true,
    };
    addToCart(customProduct, 1);
  };

  return (
    <div className="flex flex-col w-full bg-[#fff8f6]">
      {/* Header Banner */}
      <section className="bg-[#F5EFEB] py-14 lg:py-20 border-b border-[#D8CCC4]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <span className="font-label-caps uppercase text-[#BA7A7C] tracking-[0.2em] text-xs font-semibold block mb-2">
            Bespoke Gifting Studio
          </span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-[#2B2523] mb-3 font-normal">
            Customize Your Keepsake Box
          </h1>
          <p className="font-body-lg text-[#524343] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Handpick your favorite drapes, complement them with snag-free hardware, and let our Baroda studio write a handwritten gold calligraphy note on textured paper.
          </p>
        </div>
      </section>

      {/* Main Builder Grid */}
      <section className="py-12 lg:py-16 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Step 1: Choose Box */}
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-xs font-bold">
                  01
                </span>
                <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">Select Your Box Silhouette</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {boxOptions.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => {
                      setSelectedBox(box);
                      if (selectedHijabs.length > box.capacity) {
                        setSelectedHijabs(selectedHijabs.slice(0, box.capacity));
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedBox.id === box.id
                        ? 'border-[#BA7A7C] bg-[#fdf1ed] ring-2 ring-[#BA7A7C]/20 shadow-sm'
                        : 'border-[#E8DFD8] bg-[#FAF8F5] hover:bg-white'
                    }`}
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-[#f7ebe8]">
                      <img
                        src={to4kUrl(box.image)}
                        alt={box.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline-sm text-base text-[#2B2523] font-medium">{box.name}</h4>
                      <span className="font-label-md text-sm font-semibold text-[#844C4E]">₹{box.basePrice}</span>
                    </div>
                    <p className="text-xs text-[#524343] mt-1 line-clamp-2">{box.description}</p>
                    <span className="inline-block mt-2 font-label-caps text-[10px] text-[#BA7A7C] uppercase font-bold tracking-wider">
                      Holds up to {box.capacity} Hijabs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Hijabs */}
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-xs font-bold">
                    02
                  </span>
                  <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">
                    Select Your Scarves ({selectedHijabs.length} / {selectedBox.capacity})
                  </h3>
                </div>
                <span className="text-xs text-[#524343]">
                  {selectedBox.capacity - selectedHijabs.length} slots remaining
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableHijabs.map((product) => {
                  const isSelected = selectedHijabs.some((h) => h.id === product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleHijab(product)}
                      className={`rounded-lg overflow-hidden border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#BA7A7C] ring-2 ring-[#BA7A7C] bg-[#fdf1ed]'
                          : 'border-[#E8DFD8] bg-[#FAF8F5] hover:border-[#BA7A7C]/60'
                      }`}
                    >
                      <div className="aspect-[3/4] relative overflow-hidden bg-[#f7ebe8]">
                        <img
                          src={to4kUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#BA7A7C] text-white flex items-center justify-center text-xs shadow">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <h5 className="font-body-md text-xs font-medium text-[#2B2523] truncate">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-[#524343]">{product.subCategory}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Accessories */}
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-xs font-bold">
                  03
                </span>
                <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">
                  Signature Hardware &amp; Essentials (Complimentary Included)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableAccessories.map((acc) => {
                  const isIncluded = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${
                        isIncluded
                          ? 'border-[#BA7A7C] bg-[#fdf1ed]'
                          : 'border-[#E8DFD8] bg-[#FAF8F5] hover:bg-white'
                      }`}
                    >
                      <img
                        src={to4kUrl(acc.image)}
                        alt={acc.name}
                        className="w-12 h-14 object-cover rounded bg-white shrink-0"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={handleImageError}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-body-md text-xs font-medium text-[#2B2523] truncate">{acc.name}</h5>
                        <span className="text-[10px] text-[#657150] font-semibold uppercase">Included in Box</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isIncluded}
                        readOnly
                        className="accent-[#BA7A7C] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Gifting & Calligraphy */}
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#f2e6e2] text-[#2B2523] flex items-center justify-center font-label-caps text-xs font-bold">
                  04
                </span>
                <h3 className="font-headline-sm text-lg text-[#2B2523] font-medium">
                  Bespoke Ribbon &amp; Gold Calligraphy
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-[#524343] mb-1 font-semibold uppercase">
                    Silk Ribbon Finish
                  </label>
                  <select
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="w-full bg-[#FAF8F5] px-3.5 py-2.5 rounded-lg text-[#2B2523] text-xs border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C]"
                  >
                    <option>Dusty Rose Silk</option>
                    <option>Champagne Sand</option>
                    <option>Sage Olive Organza</option>
                    <option>Espresso Noir Velvet</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-xs text-[#524343] mb-1 font-semibold uppercase">
                    Wax Seal Emblem
                  </label>
                  <select className="w-full bg-[#FAF8F5] px-3.5 py-2.5 rounded-lg text-[#2B2523] text-xs border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C]">
                    <option>Rose Gold Floral Seal</option>
                    <option>Warm Terracotta Monogram</option>
                    <option>Gold Pearl Modesty Seal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-xs text-[#524343] mb-1 font-semibold uppercase">
                  Handwritten Calligraphy Note (Gold Ink)
                </label>
                <textarea
                  rows={3}
                  value={recipientNote}
                  onChange={(e) => setRecipientNote(e.target.value)}
                  className="w-full bg-[#FAF8F5] p-3 rounded-lg text-[#2B2523] text-xs border border-[#D8CCC4] focus:outline-none focus:ring-1 focus:ring-[#BA7A7C] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sticky Summary & Visual Tally (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-md">
              <span className="font-label-caps text-xs uppercase text-[#BA7A7C] tracking-widest font-semibold block">
                Box Configuration
              </span>
              <h3 className="font-headline-sm text-xl text-[#2B2523] font-medium mt-1">Your Custom Box</h3>

              <div className="mt-4 aspect-[16/10] rounded-lg overflow-hidden bg-[#f7ebe8] border border-[#E8DFD8]">
                <img
                  src={to4kUrl(selectedBox.image)}
                  alt={selectedBox.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>

              {/* Chosen list */}
              <div className="mt-4 space-y-2 text-xs text-[#524343] border-y border-[#f2e6e2] py-3">
                <p className="font-medium text-[#2B2523]">Selected Scarves ({selectedHijabs.length}):</p>
                {selectedHijabs.map((h, i) => (
                  <div key={h.id} className="flex justify-between items-center text-[11px]">
                    <span className="truncate max-w-[200px]">{i + 1}. {h.name}</span>
                    <span className="text-[#657150]">Included</span>
                  </div>
                ))}
                {selectedHijabs.length < selectedBox.capacity && (
                  <p className="text-[11px] text-[#BA7A7C] italic">
                    + Please pick {selectedBox.capacity - selectedHijabs.length} more scarf
                  </p>
                )}
              </div>

              <div className="py-3 flex justify-between items-baseline">
                <span className="font-headline-sm text-base text-[#2B2523]">Custom Box Total</span>
                <div className="text-right">
                  <span className="font-headline-lg text-2xl font-bold text-[#844C4E]">
                    ₹{selectedBox.basePrice}
                  </span>
                  <span className="block text-[11px] text-[#657150]">Free Express Shipping</span>
                </div>
              </div>

              <button
                onClick={handleAddBoxToCart}
                disabled={selectedHijabs.length < selectedBox.capacity}
                className="w-full py-3.5 px-4 bg-[#BA7A7C] hover:bg-[#844c4e] disabled:opacity-50 text-white font-label-md text-xs font-semibold uppercase tracking-wider rounded shadow transition-all cursor-pointer"
              >
                {selectedHijabs.length < selectedBox.capacity
                  ? `Select ${selectedBox.capacity - selectedHijabs.length} More Scarf`
                  : 'Add Custom Box to Bag'}
              </button>

              <div className="mt-4 text-center text-[11px] text-[#524343] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#BA7A7C]">verified</span>
                <span>Hand-assembled &amp; wax-sealed in Baroda Studio</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
