import React, { useState } from 'react';
import {
  X,
  Calculator,
  Scale,
  Sparkles,
  Info,
  CheckCircle,
  Percent,
  Coins,
  ArrowRightLeft,
  Share2,
  FileText
} from 'lucide-react';
import {
  calculateGoldPrice,
  calculateScrapGoldSale,
  formatToman,
  numberToPersianWords,
  DEFAULT_PROFIT_PERCENT,
  DEFAULT_VAT_PERCENT
} from '../utils/goldCalculator';

export default function GoldCalculatorModal({ isOpen, onClose, currentGoldPrice }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('buy'); // 'buy', 'sell_scrap', 'investment'

  // Tab 1: Buy Made Gold states
  const [weight, setWeight] = useState(4.25);
  const [wagePercent, setWagePercent] = useState(14);
  const [profitPercent, setProfitPercent] = useState(DEFAULT_PROFIT_PERCENT);
  const [vatPercent, setVatPercent] = useState(DEFAULT_VAT_PERCENT);
  const [customGoldPrice, setCustomGoldPrice] = useState(currentGoldPrice);
  const [stonePrice, setStonePrice] = useState(0);

  // Tab 2: Sell Used Gold states
  const [scrapWeight, setScrapWeight] = useState(5.0);
  const [deductionPercent, setDeductionPercent] = useState(1.5);

  // Tab 3: Budget to Gold weight calculation
  const [targetBudget, setTargetBudget] = useState(20000000); // 20 million Toman

  // Calculations
  const buyCalculation = calculateGoldPrice({
    weight,
    wagePercent,
    goldGramPrice: customGoldPrice,
    profitPercent,
    vatPercent,
    stonePrice,
  });

  const scrapCalculation = calculateScrapGoldSale(
    scrapWeight,
    customGoldPrice,
    deductionPercent
  );

  // Budget calculation (آب‌شده با کارمزد ۱٪)
  const meltedFeePercent = 1.0;
  const pricePerGramMelted = customGoldPrice * (1 + meltedFeePercent / 100);
  const purchasableWeight = targetBudget > 0 ? (targetBudget / pricePerGramMelted).toFixed(3) : 0;
  const mesghalEquivalent = (purchasableWeight / 4.608).toFixed(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-gradient-to-r from-[#171922] via-[#1A1D26] to-[#171922]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#F5D77F] to-[#D4AF37] text-black shadow-md">
              <Calculator className="w-5 h-5 font-black" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                ماشین‌حساب هوشمند طلا و فاکتور اتحادیه
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-normal">
                  مطابق آخرین مصوبه سازمان مالیاتی
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                محاسبه شفاف و قانونی قیمت خرید مصنوعات طلا و طلای دست‌دوم
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="grid grid-cols-3 border-b border-zinc-800 bg-[#0E1015] text-[10px] sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('buy')}
            className={`py-2.5 sm:py-3 px-1 sm:px-2 flex items-center justify-center gap-1 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'buy'
                ? 'text-[#F5D77F] border-[#D4AF37] bg-[#161820]'
                : 'text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <span>خرید طلا</span>
          </button>
          <button
            onClick={() => setActiveTab('sell_scrap')}
            className={`py-2.5 sm:py-3 px-1 sm:px-2 flex items-center justify-center gap-1 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'sell_scrap'
                ? 'text-emerald-400 border-emerald-400 bg-[#161820]'
                : 'text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span>فروش دست دوم</span>
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`py-2.5 sm:py-3 px-1 sm:px-2 flex items-center justify-center gap-1 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'investment'
                ? 'text-amber-400 border-amber-400 bg-[#161820]'
                : 'text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>تبدیل بودجه</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* TAB 1: BUY GOLD CALCULATOR */}
          {activeTab === 'buy' && (
            <div className="space-y-6">

              {/* Informative legal formula banner */}
              <div className="bg-[#151820] border border-[#D4AF37]/25 rounded-xl p-3.5 flex items-start gap-3 text-xs text-zinc-300">
                <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-[#F5D77F]">فرمول مصوب اتحادیه طلا و جواهر و مجلس شورای اسلامی:</div>
                  <div className="font-mono text-[11px] text-zinc-300 bg-black/40 p-1.5 rounded border border-zinc-800" dir="ltr">
                    قیمت کل = طلای خام + اجرت ساخت + سود فروشنده (۷٪) + [۹٪ مالیات ارزش افزوده از (اجرت + سود)]
                  </div>
                  <p className="text-[11px] text-emerald-400">
                    * توجه: اصل طلای خام طبق قانون به کلی از ۹ درصد مالیات معاف است و مالیات صرفاً بر دستمزد و سود اعمال می‌شود.
                  </p>
                </div>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Weight */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium flex justify-between">
                    <span>وزن طلا (گرم):</span>
                    <span className="text-[#D4AF37] font-bold">{weight} گرم</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.05"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 18k Gram Price */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium flex justify-between">
                    <span>نرخ هر گرم طلای ۱۸ عیار (تومان):</span>
                    <span className="text-zinc-400 font-normal">تابلوی زنده</span>
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={customGoldPrice}
                    onChange={(e) => setCustomGoldPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                </div>

                {/* Wage Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium flex justify-between">
                    <span>درصد اجرت ساخت:</span>
                    <span className="text-[#F5D77F] font-bold">{wagePercent}٪</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="40"
                      value={wagePercent}
                      onChange={(e) => setWagePercent(parseFloat(e.target.value) || 0)}
                      className="w-24 bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-sm outline-none text-center"
                    />
                    <div className="flex-1 flex gap-1 text-[10px]">
                      {[0, 7, 12, 16].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setWagePercent(p)}
                          className={`flex-1 rounded-lg border font-semibold ${
                            wagePercent === p
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600'
                          }`}
                        >
                          {p}٪
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profit Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium flex justify-between">
                    <span>درصد سود مصوب اتحادیه:</span>
                    <span className="text-zinc-400 font-normal">عرف قانونی: ۷٪</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="15"
                      value={profitPercent}
                      onChange={(e) => setProfitPercent(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Comprehensive Calculation Breakdown Card */}
              <div className="bg-[#0B0C0E] border-2 border-[#D4AF37]/30 rounded-2xl p-5 space-y-3.5 shadow-xl">
                <div className="text-xs font-bold text-[#F5D77F] pb-2 border-b border-zinc-800 flex justify-between">
                  <span>ریز محاسبات صدور فاکتور رسمی اتحادیه:</span>
                  <span>وزن: {weight} گرم عیار ۷۵۰</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">۱. ارزش طلای خام ({weight} گرم × {formatToman(customGoldPrice)}):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(buyCalculation.rawGoldValue)} تومان</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">۲. اجرت ساخت ({wagePercent}٪ طلای خام):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(buyCalculation.wageValue)} تومان</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">۳. سود قانونی طلافروشی ({profitPercent}٪ طلا + اجرت):</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(buyCalculation.profitValue)} تومان</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span>۴. مالیات بر ارزش افزوده (۹٪ بر اجرت و سود):</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1 rounded">معافیت طلا لحاظ شد</span>
                    </span>
                    <span className="text-zinc-200 font-semibold">{formatToman(buyCalculation.vatValue)} تومان</span>
                  </div>

                  {stonePrice > 0 && (
                    <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                      <span className="text-zinc-400">۵. ارزش سنگ/نگین:</span>
                      <span className="text-zinc-200 font-semibold">{formatToman(stonePrice)} تومان</span>
                    </div>
                  )}
                </div>

                {/* Total Final Line */}
                <div className="pt-3 border-t-2 border-[#D4AF37]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-xs text-zinc-400 block">مبلغ نهایی قابل پرداخت فاکتور:</span>
                    <span className="text-[11px] text-zinc-500">
                      {numberToPersianWords(buyCalculation.totalPrice)}
                    </span>
                  </div>
                  <div className="text-left" dir="ltr">
                    <span className="text-2xl sm:text-3xl font-black gold-gradient-text">
                      {formatToman(buyCalculation.totalPrice)}
                    </span>
                    <span className="text-xs text-zinc-400 mr-1.5">تومان</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SELL USED / SCRAP GOLD TO STORE */}
          {activeTab === 'sell_scrap' && (
            <div className="space-y-6">

              <div className="bg-[#151820] border border-emerald-500/30 rounded-xl p-3.5 text-xs text-zinc-300 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  خرید نقدی طلای دست‌دوم شما با واریز آنی پایا و ساتنا
                </div>
                <p className="text-[11px] text-zinc-400">
                  اگر قصد فروش طلای بدون استفاده، شکسته یا مستعمل خود را دارید، گالری زرین‌شاهکار آن را بر اساس مظنه روز بازار و کمترین کسر عیارسنجی (معمولاً ۱.۵٪) به صورت نقد درجا خریداری می‌کند.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium">وزن طلای شما برای فروش (گرم):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={scrapWeight}
                    onChange={(e) => setScrapWeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#181B22] border border-zinc-700 focus:border-emerald-400 rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium">درصد کسر ذوب و ری‌گیری:</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="3"
                      value={deductionPercent}
                      onChange={(e) => setDeductionPercent(parseFloat(e.target.value) || 0)}
                      className="w-24 bg-[#181B22] border border-zinc-700 focus:border-emerald-400 rounded-xl px-3 py-2 text-white text-sm outline-none text-center"
                    />
                    <span className="text-xs text-zinc-400 flex items-center">عرف بازار: ۱٪ الی ۲٪</span>
                  </div>
                </div>
              </div>

              {/* Scrap Calculation Result */}
              <div className="bg-[#0B0C0E] border-2 border-emerald-500/30 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                  <span className="text-emerald-400 font-bold">رسید تخمینی دریافت وجه نقد فروش طلا</span>
                  <span className="text-zinc-400">عیار ۷۵۰ (۱۸ عیار)</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>ارزش کل خام بر مبنای نرخ روز:</span>
                    <span className="text-zinc-200 font-semibold">{formatToman(scrapCalculation.baseValue)} تومان</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>کسر هزینه ذوب و آزمایشگاه ({deductionPercent}٪):</span>
                    <span className="text-rose-400 font-semibold">- {formatToman(scrapCalculation.deduction)} تومان</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-zinc-300 block font-bold">مبلغ خالص واریزی به حساب شما:</span>
                    <span className="text-[11px] text-zinc-500">{numberToPersianWords(scrapCalculation.payout)}</span>
                  </div>
                  <div className="text-left" dir="ltr">
                    <span className="text-2xl font-black text-emerald-400">
                      {formatToman(scrapCalculation.payout)}
                    </span>
                    <span className="text-xs text-zinc-400 mr-1.5">تومان</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BUDGET TO MELTED GOLD CONVERTER */}
          {activeTab === 'investment' && (
            <div className="space-y-6">

              <div className="bg-[#151820] border border-amber-500/30 rounded-xl p-3.5 text-xs text-zinc-300 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  خرید طلای آب‌شده انگ‌دار (بهترین روش ضدتورمی)
                </div>
                <p className="text-[11px] text-zinc-400">
                  طلای آب‌شده فاقد هرگونه اجرت ساخت، بدون مالیات و با کارمزد بسیار اندک (۱٪) عرضه می‌شود. بودجه خود را وارد کنید تا مقدار طلایی که به شما تعلق می‌گیرد را دقیق ببینید.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-zinc-300 font-medium flex justify-between">
                  <span>بودجه سرمایه‌گذاری شما (تومان):</span>
                  <span className="text-amber-400 font-bold">{formatToman(targetBudget)} تومان</span>
                </label>
                <input
                  type="number"
                  step="1000000"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#181B22] border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-base outline-none font-bold"
                />
                <div className="flex gap-2 text-xs">
                  {[10000000, 20000000, 50000000, 100000000].map((b) => (
                    <button
                      key={b}
                      onClick={() => setTargetBudget(b)}
                      className={`flex-1 py-1.5 rounded-lg border text-[11px] transition-colors ${
                        targetBudget === b
                          ? 'bg-amber-400 text-black font-bold border-amber-400'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      {b / 1000000} میلیون
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Output */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B0C0E] border border-amber-500/30 rounded-2xl p-4 text-center space-y-1">
                  <span className="text-xs text-zinc-400 block">وزن طلای آب‌شده دریافتی:</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400" dir="ltr">
                    {purchasableWeight} <span className="text-xs text-zinc-400">گرم</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">عیار استاندارد ۷۵۰ با انگ آزمایشگاه</span>
                </div>

                <div className="bg-[#0B0C0E] border border-zinc-800 rounded-2xl p-4 text-center space-y-1">
                  <span className="text-xs text-zinc-400 block">معادل به مثقال طلا:</span>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-200" dir="ltr">
                    {mesghalEquivalent} <span className="text-xs text-zinc-400">مثقال</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">هر مثقال = ۴.۶۰۸ گرم عیار ۷۰۵</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#0E1015] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-zinc-400">
            تأییدیه اتحادیه صنف طلا، جواهر، نقره و سکه تهران
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all"
            >
              بستن ماشین‌حساب
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
