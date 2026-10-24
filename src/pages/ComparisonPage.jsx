import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  X,
  Plus,
  ShieldCheck,
  Award
} from 'lucide-react';
import { products } from '../data/products';
import { calculateGoldPrice, formatToman } from '../utils/goldCalculator';

export default function ComparisonPage({ currentGoldPrice, onAddToCart, onSelectProduct }) {
  // Compared products IDs (default first 3 products)
  const [selectedIds, setSelectedIds] = useState(['prod-01', 'prod-02', 'prod-06']);

  const comparedItems = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const handleRemove = (id) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleAdd = (id) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const remainingProducts = products.filter((p) => !selectedIds.includes(p.id));

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-10">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F] px-4 py-1.5 rounded-full text-xs font-semibold">
          <Scale className="w-4 h-4 text-[#D4AF37]" />
          <span>ابزار مقایسه هوشمند مصنوعات طلا</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          مقایسه ریزمحاسبات، اجرت و ارزش سرمایه‌گذاری
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          تا ۳ کالا را کنار هم قرار دهید تا تفاوت دقیق وزن، اجرت ساخت، ارزش طلای خام و قیمت نهایی تمام‌شده را با شفافیت کامل بررسی کنید.
        </p>
      </div>

      {/* Add More Dropdown selector if < 3 */}
      {selectedIds.length < 3 && (
        <div className="bg-[#111319] border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 max-w-2xl mx-auto">
          <span className="text-xs text-zinc-300 font-medium">افزودن کالای دیگر برای مقایسه:</span>
          <select
            onChange={(e) => {
              if (e.target.value) handleAdd(e.target.value);
            }}
            defaultValue=""
            className="bg-[#181B22] border border-zinc-700 text-xs text-white rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            <option value="" disabled>انتخاب طلا یا جواهر...</option>
            {remainingProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.weight} گرم - اجرت {p.wagePercent}٪)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Comparison Grid */}
      {comparedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparedItems.map((item) => {
            const priceData = calculateGoldPrice({
              weight: item.weight,
              wagePercent: item.wagePercent,
              goldGramPrice: currentGoldPrice,
              stonePrice: item.stonePrice || 0,
            });

            return (
              <div
                key={item.id}
                className="bg-[#111319] border-2 border-zinc-800 hover:border-[#D4AF37]/50 rounded-3xl p-5 space-y-5 transition-all shadow-xl relative flex flex-col justify-between"
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 left-4 p-1.5 rounded-full bg-black/60 text-zinc-400 hover:text-rose-400 border border-zinc-700 z-10"
                  title="حذف از مقایسه"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Photo & Header */}
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 text-[10px] bg-black/70 text-[#F5D77F] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full backdrop-blur-md">
                      کد: {item.code}
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light">
                    {item.craftsmanship}
                  </p>
                </div>

                {/* Comparison Specs Table */}
                <div className="bg-[#0B0C0E] border border-zinc-800/80 rounded-2xl p-4 space-y-2 text-xs divide-y divide-zinc-900">

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">وزن خالص طلا:</span>
                    <strong className="text-white text-sm font-bold">{item.weight} گرم</strong>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">درصد اجرت ساخت:</span>
                    <span className={`font-bold ${item.wagePercent === 0 ? 'text-emerald-400' : 'text-[#F5D77F]'}`}>
                      {item.wagePercent === 0 ? 'بدون اجرت (۰٪)' : `${item.wagePercent}٪`}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">عیار استاندارد:</span>
                    <span className="text-zinc-200 font-mono">{item.karat} ({item.karat === 995 ? '۲۴ عیار' : '۱۸ عیار'})</span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">رنگ آبکاری:</span>
                    <span className="text-zinc-300">{item.colorName}</span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">ارزش طلای خام:</span>
                    <span className="text-zinc-200 font-mono">{formatToman(priceData.rawGoldValue)} ت</span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">مبلغ اجرت ساخت:</span>
                    <span className="text-zinc-200 font-mono">{formatToman(priceData.wageValue)} ت</span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">سود مصوب (۷٪):</span>
                    <span className="text-zinc-200 font-mono">{formatToman(priceData.profitValue)} ت</span>
                  </div>

                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">مالیات ارزش افزوده:</span>
                    <span className="text-emerald-400 font-mono">{formatToman(priceData.vatValue)} ت</span>
                  </div>

                  <div className="flex justify-between py-2 pt-3 font-bold text-sm">
                    <span className="text-white">قیمت کل لحظه‌ای:</span>
                    <span className="gold-gradient-text font-black font-mono">
                      {formatToman(priceData.totalPrice)} ت
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      onAddToCart({
                        ...item,
                        calculatedPrice: priceData.totalPrice,
                        priceBreakdown: priceData,
                      });
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black bg-[#D4AF37] hover:bg-[#E5C158] text-black shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به پیش‌فاکتور</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(item)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
                  >
                    مشاهده شناسنامه و عکس‌ها
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-zinc-400 space-y-3 bg-[#111319] rounded-3xl border border-zinc-800 p-8">
          <Scale className="w-12 h-12 text-zinc-600 mx-auto" />
          <p className="text-sm">هیچ کالایی برای مقایسه انتخاب نشده است.</p>
        </div>
      )}

    </div>
  );
}
