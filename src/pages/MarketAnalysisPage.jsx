import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ShieldAlert,
  BarChart3,
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function MarketAnalysisPage({ rates }) {
  const gold18kPrice = rates.gold18k.price;

  // محاسبه دقیق ارزش ذاتی سکه بر اساس وزن طلای ۲۲ عیار (۹۰۰) معادل ۱۸ عیار (۷۵۰):
  // هر گرم ۲۲ عیار = (۹۰۰ / ۷۵۰) = ۱.۲ برابر ۱ گرم ۱۸ عیار
  const emamiIntrinsic = Math.round(8.133 * 1.2 * gold18kPrice);
  const halfIntrinsic = Math.round(4.066 * 1.2 * gold18kPrice);
  const quarterIntrinsic = Math.round(2.033 * 1.2 * gold18kPrice);
  const mesghalIntrinsic = Math.round(4.3318 * gold18kPrice);

  const emamiBubble = Math.max(0, rates.coinEmami.price - emamiIntrinsic);
  const baharBubble = Math.max(0, rates.coinBahar.price - emamiIntrinsic);
  const halfBubble = Math.max(0, rates.coinHalf.price - halfIntrinsic);
  const quarterBubble = Math.max(0, rates.coinQuarter.price - quarterIntrinsic);

  const emamiBubblePct = ((emamiBubble / emamiIntrinsic) * 100).toFixed(1);
  const baharBubblePct = ((baharBubble / emamiIntrinsic) * 100).toFixed(1);
  const halfBubblePct = ((halfBubble / halfIntrinsic) * 100).toFixed(1);
  const quarterBubblePct = ((quarterBubble / quarterIntrinsic) * 100).toFixed(1);

  // Coin bubble dynamic analysis
  const coinsBubble = [
    {
      name: 'سکه تمام طرح جدید (امامی)',
      price: rates.coinEmami.price,
      intrinsicValue: emamiIntrinsic,
      bubble: emamiBubble,
      bubblePercent: emamiBubblePct,
      riskLevel: 'متوسط',
      riskColor: 'text-amber-400 bg-amber-950/30 border-amber-800/40',
      purity: '۸.۱۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'سکه بهار آزادی (طرح قدیم)',
      price: rates.coinBahar.price,
      intrinsicValue: emamiIntrinsic,
      bubble: baharBubble,
      bubblePercent: baharBubblePct,
      riskLevel: 'کم‌ریسک‌تر از امامی',
      riskColor: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40',
      purity: '۸.۱۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'نیم سکه بهار آزادی',
      price: rates.coinHalf.price,
      intrinsicValue: halfIntrinsic,
      bubble: halfBubble,
      bubblePercent: halfBubblePct,
      riskLevel: 'حباب بالا',
      riskColor: 'text-rose-400 bg-rose-950/30 border-rose-800/40',
      purity: '۴.۰۶۶ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'ربع سکه بهار آزادی',
      price: rates.coinQuarter.price,
      intrinsicValue: quarterIntrinsic,
      bubble: quarterBubble,
      bubblePercent: quarterBubblePct,
      riskLevel: 'بسیار پرریسک (بیشترین حباب)',
      riskColor: 'text-rose-500 bg-rose-950/40 border-rose-800/50',
      purity: '۲.۰۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'طلای آب‌شده (مظنه بازار تهران)',
      price: rates.mesghal.price,
      intrinsicValue: mesghalIntrinsic,
      bubble: 0,
      bubblePercent: 0.0,
      riskLevel: 'صفر حباب (ایمن‌ترین پس‌انداز)',
      riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40 font-bold',
      purity: '۴.۶۰۸ گرم طلای ۱۷ عیار (۷۰۵)',
    }
  ];

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-10">

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>اتاق تحلیل و دیده‌بان بازار طلا و سکه تهران</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          تحلیل حباب، قیمت ذاتی و شاخص‌های فنی طلا
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          بررسی موشکافانه ارزش ذاتی سکه‌ها، طلای ۱۸ عیار و مثقال طلا جهت شناسایی بهترین زمان خرید و جلوگیری از زیان ناشی از حباب‌های کاذب قیمتی.
        </p>
      </div>

      {/* Macro Indicators Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 block font-medium">طلای ۱۸ عیار (گرم)</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-white">{formatToman(rates.gold18k.price)}</span>
            <span className="text-xs text-emerald-400 font-bold">+{rates.gold18k.changePercent}٪</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">سطح حمایتی کلیدی: ۲۶,۸۰۰,۰۰۰ تومان</span>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 block font-medium">انس جهانی طلا</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-[#F5D77F]">${rates.globalOunce.price}</span>
            <span className="text-xs text-emerald-400 font-bold">+{rates.globalOunce.changePercent}٪</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">شاخص قدرت نسبی RSI: ۶۱ (صعودی ملایم)</span>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 block font-medium">مثقال طلا (مظنه تهران)</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-white">{formatToman(rates.mesghal.price)}</span>
            <span className="text-xs text-emerald-400 font-bold">+{rates.mesghal.changePercent}٪</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">مبنای معاملات بنکداران بازار</span>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 block font-medium">سکه تمام طرح جدید (امامی)</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-amber-400">{formatToman(rates.coinEmami.price)}</span>
            <span className="text-xs text-zinc-400 font-mono">حباب: {emamiBubblePct}٪</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">توصیه: ترجیح خرید آب‌شده بر سکه</span>
        </div>
      </div>

      {/* Coin Bubble Comprehensive Table */}
      <div className="bg-[#111319] border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>جدول محاسبه دقیق ارزش ذاتی و حباب انواع سکه و طلای آب‌شده</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              فرمول اتحادیه: ارزش ذاتی = وزن خالص × عیار ۲۲ به ۱۸ (ضریب ۱.۲) × نرخ روز ۱۸ عیار
            </p>
          </div>
          <div className="text-xs bg-[#181B22] border border-zinc-700 px-3 py-1.5 rounded-xl text-zinc-300">
            محاسبه خودکار و همگام با نرخ لحظه‌ای ۱۸ عیار
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#0A0B0E] text-zinc-400 border-b border-zinc-800">
                <th className="p-3 font-bold">نوع مسکوک یا طلا</th>
                <th className="p-3 font-bold">عیار و وزن خالص</th>
                <th className="p-3 font-bold">قیمت روز بازار (تومان)</th>
                <th className="p-3 font-bold">ارزش ذاتی طلای خام</th>
                <th className="p-3 font-bold">مبلغ حباب (تومان)</th>
                <th className="p-3 font-bold">درصد حباب</th>
                <th className="p-3 font-bold text-center">ریسک سرمایه‌گذاری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {coinsBubble.map((coin, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="p-3 font-bold text-white">{coin.name}</td>
                  <td className="p-3 text-zinc-400 font-light">{coin.purity}</td>
                  <td className="p-3 font-bold text-white font-mono" dir="ltr">{formatToman(coin.price)}</td>
                  <td className="p-3 text-zinc-300 font-mono" dir="ltr">{formatToman(coin.intrinsicValue)}</td>
                  <td className="p-3 font-bold text-amber-400 font-mono" dir="ltr">{formatToman(coin.bubble)}</td>
                  <td className="p-3 font-extrabold text-white font-mono" dir="ltr">{coin.bubblePercent}٪</td>
                  <td className="p-3 text-center">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border ${coin.riskColor}`}>
                      {coin.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expert Weekly Advice Box */}
      <div className="bg-gradient-to-r from-[#171922] via-[#1F1C15] to-[#171922] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#F5D77F] font-bold text-sm">
          <AlertCircle className="w-5 h-5 text-[#D4AF37]" />
          <span>دیدگاه تحلیلی کارشناسان ارشد گالری زرین‌شاهکار:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300 leading-relaxed font-light">
          <div className="bg-[#0B0C0E]/70 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-white text-xs">۱. چرا ربع‌سکه بیشترین حباب را دارد؟</h4>
            <p>
              به علت نقدینگی کمتر مورد نیاز برای خرید ربع‌سکه، تقاضای هیجانی آن در بازار بیشتر است و حباب آن اغلب بین ۲۰٪ تا ۴۰٪ نوسان می‌کند. در افت‌های بازار، حباب زودتر از قیمت طلا تخلیه می‌شود.
            </p>
          </div>

          <div className="bg-[#0B0C0E]/70 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-xs">۲. مزیت استراتژیک طلای آب‌شده</h4>
            <p>
              طلای آب‌شده دقیقاً بر مبنای عیارسنجی ری‌گیری و بدون حتی یک ریال حباب یا اجرت معامله می‌شود. سرمایه‌گذاران حرفه‌ای برای حفظ ارزش ریال صرفاً به سمت آب‌شده یا شمش‌های ۲۴ عیار می‌روند.
            </p>
          </div>

          <div className="bg-[#0B0C0E]/70 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-[#F5D77F] text-xs">۳. راهنمای خرید مصنوعات طلا</h4>
            <p>
              اگر هدف شما استفاده زینتی همراه با حفظ ارزش است، کارهای تراش‌خورده کم‌اجرت (زیر ۹ درصد) و بدون نگین را انتخاب کنید تا هنگام تعویض یا فروش، حداکثر بازگشت سرمایه را داشته باشید.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
