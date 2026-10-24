import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Eye,
  ShieldCheck,
  Sparkles,
  Info,
  Check,
  Scale,
  Award,
  ChevronLeft
} from 'lucide-react';
import { calculateGoldPrice, formatToman } from '../utils/goldCalculator';

export default function ProductCard({
  product,
  currentGoldPrice,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  // Exact real-time price calculation according to Iranian legal formula
  const priceData = calculateGoldPrice({
    weight: product.weight,
    wagePercent: product.wagePercent,
    goldGramPrice: currentGoldPrice,
    stonePrice: product.stonePrice || 0,
  });

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      calculatedPrice: priceData.totalPrice,
      priceBreakdown: priceData,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case 'bestseller':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'investment':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'discount_wage':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'new':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-[#D4AF37]/20 text-[#F5D77F] border-[#D4AF37]/40';
    }
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-[#111319] hover:bg-[#161922] border border-zinc-800 hover:border-[#D4AF37]/50 rounded-2xl p-3 sm:p-4 transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/15 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Badges & Wishlist Trigger */}
      <div className="relative mb-3">
        {/* Photo Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#0A0B0E] border border-zinc-800/80">
          <img
            src={product.images[activeImageIdx] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Tag Pill */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10">
            {product.tagLabel && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${getTagColor(product.tag)}`}>
                {product.tagLabel}
              </span>
            )}
            <span className="text-[10px] bg-black/70 text-zinc-300 border border-zinc-700/80 px-2 py-0.5 rounded-full backdrop-blur-md">
              کد: {product.code}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-2.5 left-2.5 p-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-rose-400 border border-zinc-700/60 backdrop-blur-md transition-all z-10"
            title="افزودن به علاقه‌مندی‌ها"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Multi-image thumbnail bar on hover if multiple images */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImageIdx === idx ? 'bg-[#D4AF37] w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Specs Pill Row */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2.5 px-0.5">
          <div className="flex items-center gap-1 text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded-md">
            <Scale className="w-3 h-3 text-[#D4AF37]" />
            <span>وزن: <strong className="text-white font-bold">{product.weight}</strong> گرم</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded-md">
            <span className="text-zinc-400">اجرت:</span>
            <span className={`font-bold ${product.wagePercent === 0 ? 'text-emerald-400' : 'text-[#F5D77F]'}`}>
              {product.wagePercent === 0 ? 'صفر٪' : `${product.wagePercent}٪`}
            </span>
          </div>

          <span className="text-[10px] text-zinc-500">
            عیار {product.karat}
          </span>
        </div>
      </div>

      {/* Product Titles & Info */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-[#F5D77F] transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1 font-light">
            {product.craftsmanship}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2.5 border-t border-zinc-800/80 space-y-2.5">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] text-zinc-400">قیمت نهایی لحظه‌ای:</span>
            <div className="text-left" dir="ltr">
              <span className="text-base sm:text-lg font-black gold-gradient-text">
                {formatToman(priceData.totalPrice)}
              </span>
              <span className="text-[10px] text-zinc-400 mr-1">تومان</span>
            </div>
          </div>

          {/* Quick Legal Breakdown Accordion hint */}
          <div className="text-[10px] text-zinc-500 bg-zinc-950/60 p-1.5 rounded-lg flex justify-between items-center border border-zinc-900">
            <span>شامل طلای خام + سود ۷٪ + مالیات قانونی</span>
            <span className="text-emerald-400 font-medium">فاکتور رسمی</span>
          </div>

          {/* Add to Cart & Inspect buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                justAdded
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#D4AF37] hover:bg-[#E5C158] text-black hover:scale-[1.02]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>افزوده شد!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ثبت در پیش‌فاکتور</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              title="مشاهده شناسنامه و جدول مشخصات"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
