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
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-gradient-to-b from-[#0B0C0E] via-[#0E1015] to-[#12141A]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#B8860B]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Main Hero Copy - Left / Right in RTL */}
          <div className="lg:col-span-7 space-y-6 text-right">

            {/* Superbadge */}
            <div className="inline-flex items-center gap-2 bg-[#1A1D24] border border-[#D4AF37]/30 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold text-[#F5D77F]">
                تضمین بالاترین خلوص طلا • عیار استاندارد ۷۵۰ و ۹۹۵
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight">
              درخشش بی‌پایان اصالت؛
              <br />
              <span className="gold-gradient-text">شفافیت بی‌پرده در قیمت</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-light">
              در گالری <strong className="text-[#F5D77F] font-semibold">زرین‌شاهکار</strong>، هیچ هزینه پنهانی وجود ندارد. تمام زیورآلات، النگوها و شمش‌ها با ریزمحاسبات دقیق قانونی اتحادیه طلا و جواهر، معافیت کامل اصل طلا از مالیات، و شناسنامه رسمی هولوگرام‌دار عرضه می‌شوند.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-zinc-300 font-medium">معاف از مالیات اصل طلا</span>
              </div>
              <div className="flex items-center gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs text-zinc-300 font-medium">فاکتور رسمی اتحادیه</span>
              </div>
              <div className="flex items-center gap-2 bg-[#13151B] border border-zinc-800/80 rounded-xl p-3 col-span-2 sm:col-span-1">
                <Lock className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs text-zinc-300 font-medium">بیمه پستی ۱۰۰٪ ارزش کالا</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onScrollToProducts}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C158] hover:to-[#D4AF37] text-black px-6 py-3.5 rounded-xl font-black text-sm transition-all shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02]"
              >
                <span>مشاهده کالکشن و خرید آنلاین</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 bg-[#181B22] hover:bg-[#20242D] border border-[#D4AF37]/40 text-[#F5D77F] px-5 py-3.5 rounded-xl font-bold text-sm transition-all hover:border-[#D4AF37]"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>ماشین‌حساب هوشمند طلا</span>
              </button>

              <button
                onClick={() => onSelectCategory('low_wage')}
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-800/40 px-3.5 py-3 rounded-xl transition-all"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 to-[#8B6508]/30 rounded-3xl blur-xl opacity-75" />

              <div className="relative bg-[#13151B] border border-[#D4AF37]/35 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5">

                {/* Header of estimator */}
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">تخمین‌گر آنی قیمت طلا</h3>
                      <p className="text-[11px] text-zinc-400">بر مبنای نرخ زنده طلای ۱۸ عیار</p>
                    </div>
                  </div>
                  <div className="text-left" dir="ltr">
                    <span className="text-xs text-zinc-400">نرخ روز:</span>
                    <div className="text-sm font-extrabold text-[#F5D77F]">{formatToman(currentGoldPrice)} ت</div>
                  </div>
                </div>

                {/* Input 1: Weight slider & number */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium">وزن تقریبی مورد نظر شما:</span>
                    <span className="font-bold text-white bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700">
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
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>۰.۵ گرم (ظریف/کادویی)</span>
                    <span>۵ گرم (النگو/دستبند)</span>
                    <span>۲۵ گرم (سرویس کامل)</span>
                  </div>
                </div>

                {/* Input 2: Wage choice */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium">درصد اجرت ساخت طلا:</span>
                    <span className="font-bold text-[#F5D77F] bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
                      {quickWage}٪
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                    {[
                      { label: '۰٪ (آب‌شده)', val: 0 },
                      { label: '۷٪ (کم‌اجرت)', val: 7 },
                      { label: '۱۲٪ (استاندارد)', val: 12 },
                      { label: '۱۸٪ (لوکس)', val: 18 }
                    ].map((w) => (
                      <button
                        key={w.val}
                        onClick={() => setQuickWage(w.val)}
                        className={`py-1.5 rounded-lg font-medium transition-all text-center border ${
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
                <div className="bg-[#0B0C0E] border border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>ارزش طلای خام ({quickWeight} گرم):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(quickCalc.rawGoldValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>اجرت ساخت ({quickWage}٪):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(quickCalc.wageValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>سود مصوب گالری (۷٪):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(quickCalc.profitValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span>مالیات ارزش افزوده (۹٪ از اجرت و سود):</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1 rounded">قانون جدید</span>
                    </span>
                    <span className="text-zinc-200 font-semibold">{formatToman(quickCalc.vatValue)} تومان</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                    <span className="font-bold text-zinc-100 text-sm">مبلغ نهایی تمام‌شده:</span>
                    <span className="font-black text-lg gold-gradient-text">
                      {formatToman(quickCalc.totalPrice)} <span className="text-xs text-zinc-400">تومان</span>
                    </span>
                  </div>
                </div>

                {/* Open Full Calculator link */}
                <button
                  onClick={onOpenCalculator}
                  className="w-full text-center text-xs text-[#D4AF37] hover:text-[#F3E5AB] py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-all font-semibold"
                >
                  باز کردن ماشین‌حساب تخصصی با محاسبه فروش طلای مستعمل ←
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
