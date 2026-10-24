import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Scale,
  Clock,
  CheckCircle2,
  RefreshCw,
  Coins,
  History,
  Lock
} from 'lucide-react';
import { formatToman, numberToPersianWords } from '../utils/goldCalculator';

export default function DigitalGoldVault({ currentGoldPrice, onOpenOfficialInvoice }) {
  // Vault state
  const [goldBalanceGrams, setGoldBalanceGrams] = useState(2.35); // Initial simulated balance in grams
  const [mode, setMode] = useState('buy'); // 'buy', 'sell'
  const [amountToman, setAmountToman] = useState(10000000); // 10 million Toman
  const [sellWeight, setSellWeight] = useState(1.0);
  const [transactions, setTransactions] = useState([
    { id: 'TX-9821', type: 'buy', amount: 1.5, price: 6870000, date: '۱۴۰۳/۰۸/۱۲', status: 'تکمیل شده' },
    { id: 'TX-9750', type: 'buy', amount: 0.85, price: 3893000, date: '۱۴۰۳/۰۸/۰۲', status: 'تکمیل شده' },
  ]);
  const [actionDone, setActionDone] = useState(false);

  // Fee calculation (1% platform fee for digital gold)
  const feePercent = 1.0;
  const pricePerGramWithFee = currentGoldPrice * (1 + feePercent / 100);
  const purchasableGrams = amountToman > 0 ? (amountToman / pricePerGramWithFee).toFixed(3) : 0;

  // Selling scrap/vault gold back (at 99% of current spot rate)
  const sellPayout = Math.round(sellWeight * currentGoldPrice * 0.99);

  // Total balance value in Toman
  const totalBalanceValue = Math.round(goldBalanceGrams * currentGoldPrice);
  const totalProfitPercent = +8.4; // Simulated profit since purchase

  const handleExecuteTransaction = () => {
    if (mode === 'buy') {
      const addedGrams = parseFloat(purchasableGrams);
      setGoldBalanceGrams((prev) => parseFloat((prev + addedGrams).toFixed(3)));
      setTransactions((prev) => [
        {
          id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
          type: 'buy',
          amount: addedGrams,
          price: amountToman,
          date: 'امروز',
          status: 'تکمیل شده و تحویل در خزانه'
        },
        ...prev
      ]);
    } else {
      const removedGrams = Math.min(goldBalanceGrams, sellWeight);
      setGoldBalanceGrams((prev) => Math.max(0, parseFloat((prev - removedGrams).toFixed(3))));
      setTransactions((prev) => [
        {
          id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
          type: 'sell',
          amount: removedGrams,
          price: sellPayout,
          date: 'امروز',
          status: 'واریز نقدی به حساب شبا'
        },
        ...prev
      ]);
    }
    setActionDone(true);
    setTimeout(() => setActionDone(false), 3000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F] px-4 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>صندوق پس‌انداز طلای خرد زرین‌بانک</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          سرمایه‌گذاری هوشمند و بدون اجرت در طلا
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          با هر بودجه‌ای (حتی از ۱۰۰ هزار تومان)، طلای خام آب‌شده ۱۸ عیار با کد استاندارد اتحادیه بخرید، سود کنید و هر زمان که خواستید شمش فیزیکی تحویل بگیرید یا درجا به ریال نقد کنید.
        </p>
      </div>

      {/* Top Portfolio Stats Card */}
      <div className="bg-gradient-to-r from-[#161822] via-[#201D16] to-[#161822] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Balance */}
          <div className="md:col-span-7 space-y-2 text-right">
            <span className="text-xs text-zinc-400 font-medium block">
              دارایی طلای ذخیره‌شده شما در گالری زرین‌شاهکار:
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black gold-gradient-text" dir="ltr">
                {goldBalanceGrams}
              </span>
              <span className="text-lg font-bold text-zinc-300">گرم طلای ۱۸ عیار (۷۵۰)</span>
            </div>
            <div className="text-sm text-zinc-300 flex items-center gap-2 pt-1">
              <span>ارزش روز دارایی:</span>
              <strong className="text-white font-mono text-base">{formatToman(totalBalanceValue)} تومان</strong>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                +{totalProfitPercent}٪ سود کل
              </span>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-[#F5D77F] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>پشتوانه ۱۰۰٪ فیزیکی</span>
              </div>
              <p className="text-[11px] text-zinc-400">نگهداری در خزانه ایمن بانک کارگشایی</p>
            </div>

            <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ArrowDownLeft className="w-4 h-4" />
                <span>تحویل فیزیکی شمش</span>
              </div>
              <p className="text-[11px] text-zinc-400">امکان دریافت فیزیکی از ۵ گرم به بالا</p>
            </div>

            <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>معاف از مالیات</span>
              </div>
              <p className="text-[11px] text-zinc-400">طلای خام طبق قانون بدون مالیات است</p>
            </div>

            <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Coins className="w-4 h-4" />
                <span>تسویه آنی پایا</span>
              </div>
              <p className="text-[11px] text-zinc-400">واریز وجه فروش در سیکل پایا</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Terminal Section (Buy & Sell) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Trade Box */}
        <div className="lg:col-span-7 bg-[#111319] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">

          {/* Trade Mode Switch */}
          <div className="grid grid-cols-2 p-1 bg-[#0A0B0E] rounded-2xl border border-zinc-800 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setMode('buy')}
              className={`py-3 rounded-xl transition-all ${
                mode === 'buy'
                  ? 'bg-[#D4AF37] text-black shadow-lg font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              خرید طلای خرد (پس‌انداز)
            </button>
            <button
              onClick={() => setMode('sell')}
              className={`py-3 rounded-xl transition-all ${
                mode === 'sell'
                  ? 'bg-emerald-500 text-black shadow-lg font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              فروش موجودی به گالری (دریافت پول)
            </button>
          </div>

          {actionDone && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-center text-xs text-emerald-300 font-bold animate-in fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تراکنش شما با موفقیت انجام و در صندوق ثبت گردید!</span>
            </div>
          )}

          {mode === 'buy' ? (
            <div className="space-y-5">
              {/* Buy Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">مبلغ مورد نظر برای خرید طلا (تومان):</span>
                  <span className="text-zinc-400 font-mono">نرخ روز: {formatToman(currentGoldPrice)} ت</span>
                </div>

                <input
                  type="number"
                  step="500000"
                  min="100000"
                  value={amountToman}
                  onChange={(e) => setAmountToman(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-2xl px-4 py-3.5 text-lg font-black text-white outline-none"
                />

                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {[2000000, 5000000, 10000000, 25000000, 50000000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmountToman(val)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                        amountToman === val
                          ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {val / 1000000} میلیون
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Output Box */}
              <div className="bg-[#0B0C0E] border border-zinc-800 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>طلای دریافتی خالص شما:</span>
                  <span className="text-base font-extrabold text-[#F5D77F]" dir="ltr">
                    {purchasableGrams} گرم
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>کارمزد پلتفرم و نگهداری در خزانه:</span>
                  <span className="text-zinc-300 font-medium">۱٪ (کمترین کارمزد بازار)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>مالیات بر ارزش افزوده:</span>
                  <span className="text-emerald-400 font-bold">۰ تومان (معافیت قانونی)</span>
                </div>
              </div>

              <button
                onClick={handleExecuteTransaction}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C158] hover:to-[#D4AF37] text-black font-black text-sm rounded-2xl shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
              >
                واریز و خرید {purchasableGrams} گرم طلا در خزانه
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Sell Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">وزن طلایی که قصد فروش آن را دارید:</span>
                  <span className="text-zinc-400 font-mono">حداکثر موجودی: {goldBalanceGrams} گرم</span>
                </div>

                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max={goldBalanceGrams}
                  value={sellWeight}
                  onChange={(e) => setSellWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#181B22] border border-zinc-700 focus:border-emerald-400 rounded-2xl px-4 py-3.5 text-lg font-black text-white outline-none"
                />

                <input
                  type="range"
                  min="0.1"
                  max={goldBalanceGrams || 1}
                  step="0.05"
                  value={sellWeight}
                  onChange={(e) => setSellWeight(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sell Payout Breakdown */}
              <div className="bg-[#0B0C0E] border border-zinc-800 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>مبلغ واریزی به حساب بانکی:</span>
                  <span className="text-base font-extrabold text-emerald-400" dir="ltr">
                    {formatToman(sellPayout)} تومان
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>نحوه تسویه:</span>
                  <span className="text-zinc-300">واریز شبا بانک مرکزی (پایا)</span>
                </div>
              </div>

              <button
                disabled={goldBalanceGrams <= 0}
                onClick={handleExecuteTransaction}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01]"
              >
                فروش قطعی {sellWeight} گرم و تسویه به حساب
              </button>
            </div>
          )}

        </div>

        {/* Transactions History */}
        <div className="lg:col-span-5 bg-[#111319] border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <History className="w-4 h-4 text-[#D4AF37]" />
              <span>تاریخچه تراکنش‌های صندوق</span>
            </div>
            <span className="text-zinc-400">{transactions.length} تراکنش</span>
          </div>

          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-[#0B0C0E] border border-zinc-800/80 p-3 rounded-xl flex justify-between items-center text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${tx.type === 'buy' ? 'bg-[#D4AF37]' : 'bg-emerald-400'}`} />
                    <span className="font-bold text-zinc-200">
                      {tx.type === 'buy' ? 'خرید طلا در صندوق' : 'فروش طلا'}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">({tx.id})</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 block">{tx.date} • {tx.status}</span>
                </div>

                <div className="text-left" dir="ltr">
                  <div className="font-bold text-white font-mono">
                    {tx.type === 'buy' ? '+' : '-'}{tx.amount} gr
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {formatToman(tx.price)} ت
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded-xl border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>تمامی دارایی‌های طلای خرد تحت نظارت و امانت بانک مرکزی نگهداری می‌شوند.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
