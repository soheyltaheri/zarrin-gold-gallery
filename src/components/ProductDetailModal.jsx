import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Scale,
  ShieldCheck,
  Award,
  Ruler,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Type,
  PhoneCall,
  Clock,
  RotateCcw,
  Truck
} from 'lucide-react';
import { calculateGoldPrice, formatToman, numberToPersianWords } from '../utils/goldCalculator';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  currentGoldPrice,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) {
  if (!isOpen || !product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'استاندارد');
  const [enableEngraving, setEnableEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState('nastaliq'); // 'nastaliq', 'tahriri', 'english'
  const [justAdded, setJustAdded] = useState(false);

  // Exact live legal calculation
  const priceData = calculateGoldPrice({
    weight: product.weight,
    wagePercent: product.wagePercent,
    goldGramPrice: currentGoldPrice,
    stonePrice: product.stonePrice || 0,
  });

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      calculatedPrice: priceData.totalPrice,
      priceBreakdown: priceData,
      selectedSize,
      engraving: enableEngraving && engravingText.trim() ? {
        text: engravingText.trim(),
        font: engravingFont,
      } : null,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-black/60 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full font-mono">
              کد رهگیری: {product.code}
            </span>
            <span className="text-xs text-zinc-400">
              {product.standardPurityCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-rose-400 transition-colors"
              title="افزودن به علاقه‌مندی‌ها"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">

          {/* Left Column (in RTL: Right visual column): Images Gallery */}
          <div className="md:col-span-5 space-y-4">
            {/* Main Active Photo */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0A0B0E] border border-zinc-800/80 group">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#F5D77F] border border-[#D4AF37]/30 font-medium">
                عیار {product.karat}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#D4AF37] scale-105 shadow-md shadow-[#D4AF37]/20'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Certificate Box */}
            <div className="bg-[#0B0C0E] border border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#F5D77F]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>شناسنامه و گارانتی رسمی اصالت:</span>
              </div>
              <ul className="space-y-1 text-zinc-400 text-[11px]">
                <li className="flex justify-between">
                  <span>عیار تضمینی:</span>
                  <strong className="text-zinc-200">۷۵۰ (۱۸ عیار استاندارد اتحادیه)</strong>
                </li>
                <li className="flex justify-between">
                  <span>کد انگ ری‌گیری:</span>
                  <span className="text-zinc-200 font-mono">{product.standardPurityCode}</span>
                </li>
                <li className="flex justify-between">
                  <span>وضعیت نگین:</span>
                  <span className="text-emerald-400">{product.stoneName}</span>
                </li>
                <li className="flex justify-between">
                  <span>ضمانت عودت و تعویض:</span>
                  <span className="text-zinc-200">۷ روز کاری بدون کسر کارمزد</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Specifications, Live Calculation, Sizing, Engraving & Cart */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Specs Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-[#161820] border border-zinc-800 p-2.5 rounded-xl text-center">
                <span className="text-zinc-400 text-[10px] block">وزن طلا</span>
                <span className="font-extrabold text-white text-sm">{product.weight} گرم</span>
              </div>
              <div className="bg-[#161820] border border-zinc-800 p-2.5 rounded-xl text-center">
                <span className="text-zinc-400 text-[10px] block">درصد اجرت</span>
                <span className="font-extrabold text-[#F5D77F] text-sm">
                  {product.wagePercent === 0 ? 'بدون اجرت' : `${product.wagePercent}٪`}
                </span>
              </div>
              <div className="bg-[#161820] border border-zinc-800 p-2.5 rounded-xl text-center">
                <span className="text-zinc-400 text-[10px] block">رنگ آبکاری</span>
                <span className="font-extrabold text-zinc-200 text-xs">{product.colorName}</span>
              </div>
              <div className="bg-[#161820] border border-zinc-800 p-2.5 rounded-xl text-center">
                <span className="text-zinc-400 text-[10px] block">سود طلافروش</span>
                <span className="font-extrabold text-zinc-200 text-sm">۷٪ قانونی</span>
              </div>
            </div>

            {/* Live Legal Price Breakdown Box */}
            <div className="bg-[#0B0C0E] border-2 border-[#D4AF37]/35 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800 text-xs font-bold text-[#F5D77F]">
                <span>جدول شفاف فاکتور رسمی اتحادیه:</span>
                <span className="text-zinc-400 text-[11px]">مبنای هر گرم ۱۸ عیار: {formatToman(currentGoldPrice)} ت</span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">۱. ارزش طلای خام خالص ({product.weight} گرم):</span>
                  <span className="text-zinc-200 font-semibold">{formatToman(priceData.rawGoldValue)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">۲. اجرت ساخت و پرداخت ({product.wagePercent}٪):</span>
                  <span className="text-zinc-200 font-semibold">{formatToman(priceData.wageValue)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">۳. سود مصوب فروشنده (۷٪):</span>
                  <span className="text-zinc-200 font-semibold">{formatToman(priceData.profitValue)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <span>۴. مالیات بر ارزش افزوده (۹٪ بر اجرت و سود):</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1 rounded">معافیت طلا</span>
                  </span>
                  <span className="text-zinc-200 font-semibold">{formatToman(priceData.vatValue)} تومان</span>
                </div>
                {product.stonePrice > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>۵. هزینه گوهرشناسی و نگین:</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(product.stonePrice)} تومان</span>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-zinc-800 flex justify-between items-center">
                <div>
                  <span className="text-xs text-zinc-400 block font-semibold">مبلغ نهایی تمام‌شده:</span>
                  <span className="text-[11px] text-zinc-500">{numberToPersianWords(priceData.totalPrice)}</span>
                </div>
                <div className="text-left" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black gold-gradient-text">
                    {formatToman(priceData.totalPrice)}
                  </span>
                  <span className="text-xs text-zinc-400 mr-1.5">تومان</span>
                </div>
              </div>
            </div>

            {/* Size Selector & Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">انتخاب سایز:</span>
                  <button
                    onClick={() => onOpenSizeGuide(product.sizeType || 'ring')}
                    className="flex items-center gap-1 text-[#D4AF37] hover:underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>راهنمای سایز {product.sizeType === 'bangle' ? 'النگو' : 'انگشتر'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === s
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Laser Engraving Feature */}
            {product.canEngrave && (
              <div className="bg-[#14161E] border border-zinc-800 rounded-xl p-3.5 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-200">
                  <input
                    type="checkbox"
                    checked={enableEngraving}
                    onChange={(e) => setEnableEngraving(e.target.checked)}
                    className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>حکاکی اختصاصی نام یا تاریخ با لیزر روی طلا (هدیه رایگان گالری)</span>
                </label>

                {enableEngraving && (
                  <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                    <input
                      type="text"
                      maxLength={30}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="متن دلخواه (مثلاً: علی & سارا - 1403/09/25)"
                      className="w-full bg-[#0D0F14] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />

                    {/* Preview simulated on gold banner */}
                    {engravingText.trim() && (
                      <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#241E12] via-[#332A15] to-[#241E12] border border-[#D4AF37]/40 text-center">
                        <span className="text-[10px] text-zinc-400 block mb-1">پیش‌نمایش نمادین حکاکی روی بدنه طلا:</span>
                        <span className="text-sm font-bold text-[#F5D77F] italic tracking-widest">
                          « {engravingText} »
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm transition-all shadow-xl ${
                  justAdded
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#D4AF37] hover:bg-[#E5C158] text-black hover:scale-[1.01] shadow-[#D4AF37]/20'
                }`}
              >
                {justAdded ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>به پیش‌فاکتور رسمی اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>افزودن به پیش‌فاکتور رسمی و خرید</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/989121112233?text=${encodeURIComponent(`سلام، درباره محصول ${product.name} با کد ${product.code} سوال دارم.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-700"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>مشاوره واتساپ</span>
              </a>
            </div>

            {/* Shipping & Guarantees badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-zinc-400 text-center">
              <div className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>پست ویژه بیمه‌شده</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>۷ روز ضمانت بازگشت</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>شناسنامه عیار ۷۵۰</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
