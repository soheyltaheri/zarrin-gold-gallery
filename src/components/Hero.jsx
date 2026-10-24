import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Award,
  Zap,
  HelpCircle,
  Gem
} from 'lucide-react';
import { calculateGoldPrice, formatToman } from '../utils/goldCalculator';

export default function Hero({ currentGoldPrice, onOpenCalculator, onSelectCategory, onScrollToProducts }) {
  const [quickWeight, setQuickWeight] = useState(3.5);
  const [quickWage, setQuickWage] = useState(12);

  const quickCalc = calculateGoldPrice({
    weight: quickWeight,
    wagePercent: quickWage,
    goldGramPrice: currentGoldPrice,
  });

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-8 sm:pb-16 px-3 sm:px-6 lg:px-8 border-b border-zinc-900 bg-gradient-to-b from-[#0B0C0E] via-[#0E1015] to-[#12141A]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#D4AF37]/8 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#B8860B]/6 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-right">

            {/* Superbadge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#1A1D24] border border-[#D4AF37]/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#F5D77F]">
                تضمین بالاترین خلوص طلا • عیار استاندارد ۷۵۰ و ۹۹۵
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              درخشش بی‌پایان اصالت؛
              <br className="hidden sm:inline" />{' '}
              <span className="gold-gradient-text">شفافیت بی‌پرده در قیمت</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-light">
              در گالری <strong className="text-[#F5D77F] font-semibold">زرین‌شاهکار</strong>، هیچ هزینه پنهانی وجود ندارد. تمام مصنوعات با ریزمحاسبات قانونی اتحادیه طلا و جواهر، معافیت اصل طلا از مالیات و شناسنامه رسمی هولوگرام‌دار عرضه می‌شوند.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="text-[10px] sm:text-xs text-zinc-300 font-medium">معاف از مالیات طلا</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[10px] sm:text-xs text-zinc-300 font-medium">فاکتور رسمی اتحادیه</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-2.5 sm:p-3 col-span-2 sm:col-span-1 justify-center sm:justify-start">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                <span className="text-[10px] sm:text-xs text-zinc-300 font-medium">بیمه ۱۰۰٪ پستی مرسولات</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-4">
              <button
                onClick={onScrollToProducts}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C158] hover:to-[#D4AF37] text-black px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95"
              >
                <span>مشاهده ویترین طلا</span>
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#181B22] hover:bg-[#20242D] border border-[#D4AF37]/40 text-[#F5D77F] px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                <span>ماشین‌حساب طلا</span>
              </button>

              <button
                onClick={() => onSelectCategory('low_wage')}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-800/40 px-3.5 py-2.5 sm:py-3 rounded-xl transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>طلای آب‌شده کم‌اجرت (سرمایه‌گذاری)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Gold Price Estimator Box */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 to-[#8B6508]/30 rounded-2xl sm:rounded-3xl blur-xl opacity-75" />

              <div className="relative bg-[#13151B] border border-[#D4AF37]/35 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4 sm:space-y-5">

                {/* Header of estimator */}
                <div className="flex justify-between items-center pb-2.5 sm:pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-base">تخمین‌گر آنی قیمت طلا</h3>
                      <p className="text-[10px] sm:text-[11px] text-zinc-400">بر مبنای نرخ روز ۱۸ عیار</p>
                    </div>
                  </div>
                  <div className="text-left" dir="ltr">
                    <span className="text-[10px] text-zinc-400">نرخ روز:</span>
                    <div className="text-xs sm:text-sm font-extrabold text-[#F5D77F] font-mono">{formatToman(currentGoldPrice)} ت</div>
                  </div>
                </div>

                {/* Input 1: Weight slider & number */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium">وزن تقریبی:</span>
                    <span className="font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 font-mono">
                      {quickWeight} گرم
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.1"
                    value={quickWeight}
                    onChange={(e) => setQuickWeight(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer bg-zinc-800 h-2 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] text-zinc-500">
                    <span>۰.۵ گرم (کادویی)</span>
                    <span>۵ گرم (دستبند)</span>
                    <span>۲۵ گرم (سرویس)</span>
                  </div>
                </div>

                {/* Input 2: Wage choice */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium">درصد اجرت ساخت:</span>
                    <span className="font-bold text-[#F5D77F] bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 font-mono">
                      {quickWage}٪
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]">
                    {[
                      { label: '۰٪ (آب‌شده)', val: 0 },
                      { label: '۷٪ (کم‌اجرت)', val: 7 },
                      { label: '۱۲٪ (متوسط)', val: 12 },
                      { label: '۱۸٪ (لوکس)', val: 18 }
                    ].map((w) => (
                      <button
                        key={w.val}
                        onClick={() => setQuickWage(w.val)}
                        className={`py-1 sm:py-1.5 rounded-lg font-medium transition-all text-center border ${
                          quickWage === w.val
                            ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Breakdown Table */}
                <div className="bg-[#0B0C0E] border border-zinc-800 rounded-xl p-3 space-y-1.5 text-[11px] sm:text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>طلای خام ({quickWeight} گرم):</span>
                    <span className="text-zinc-200 font-semibold font-mono">{formatToman(quickCalc.rawGoldValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>اجرت ساخت ({quickWage}٪):</span>
                    <span className="text-zinc-200 font-semibold font-mono">{formatToman(quickCalc.wageValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>سود مصوب گالری (۷٪):</span>
                    <span className="text-zinc-200 font-semibold font-mono">{formatToman(quickCalc.profitValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>مالیات بر ارزش افزوده (۹٪ بر اجرت و سود):</span>
                    <span className="text-zinc-200 font-semibold font-mono">{formatToman(quickCalc.vatValue)} تومان</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                    <span className="font-bold text-zinc-100 text-xs sm:text-sm">مبلغ نهایی تمام‌شده:</span>
                    <span className="font-black text-sm sm:text-lg gold-gradient-text font-mono">
                      {formatToman(quickCalc.totalPrice)} <span className="text-[10px] text-zinc-400">تومان</span>
                    </span>
                  </div>
                </div>

                {/* Open Full Calculator link */}
                <button
                  onClick={onOpenCalculator}
                  className="w-full text-center text-[11px] sm:text-xs text-[#D4AF37] hover:text-[#F3E5AB] py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-all font-semibold"
                >
                  ماشین‌حساب پیشرفته با محاسبه فروش طلای دست‌دوم ←
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
