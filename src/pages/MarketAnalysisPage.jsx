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
  const [selectedAsset, setSelectedAsset] = useState('gold18k');

  // Coin bubble analysis
  const coinsBubble = [
    {
      name: 'سکه تمام طرح جدید (امامی)',
      price: rates.coinEmami.price,
      intrinsicValue: 43500000,
      bubble: rates.coinEmami.bubble || 9400000,
      bubblePercent: 17.7,
      riskLevel: 'متوسط به بالا',
      riskColor: 'text-amber-400 bg-amber-950/30 border-amber-800/40',
      purity: '۸.۱۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'سکه بهار آزادی (طرح قدیم)',
      price: rates.coinBahar.price,
      intrinsicValue: 43500000,
      bubble: rates.coinBahar.bubble || 4800000,
      bubblePercent: 9.9,
      riskLevel: 'کم‌ریسک‌تر از امامی',
      riskColor: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40',
      purity: '۸.۱۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'نیم سکه بهار آزادی',
      price: rates.coinHalf.price,
      intrinsicValue: 21750000,
      bubble: rates.coinHalf.bubble || 6650000,
      bubblePercent: 23.4,
      riskLevel: 'حباب بالا',
      riskColor: 'text-rose-400 bg-rose-950/30 border-rose-800/40',
      purity: '۴.۰۶۶ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'ربع سکه بهار آزادی',
      price: rates.coinQuarter.price,
      intrinsicValue: 10875000,
      bubble: rates.coinQuarter.bubble || 7325000,
      bubblePercent: 40.2,
      riskLevel: 'بسیار پرریسک (بیشترین حباب)',
      riskColor: 'text-rose-500 bg-rose-950/40 border-rose-800/50',
      purity: '۲.۰۳۳ گرم طلای ۲۲ عیار (۹۰۰)',
    },
    {
      name: 'طلای آب‌شده (انگ‌دار)',
      price: rates.gold18k.price * 4.3318,
      intrinsicValue: rates.gold18k.price * 4.3318,
      bubble: 0,
      bubblePercent: 0.0,
      riskLevel: 'صفر حباب (ایمن‌ترین پس‌انداز)',
      riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40 font-bold',
      purity: '۴.۶۰۸ گرم طلای ۱۷ عیار (۷۰۵)',
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

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
          <span className="text-[11px] text-zinc-500 block">سطح حمایتی کلیدی: ۴,۴۵۰,۰۰۰ تومان</span>
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
          <span className="text-xs text-zinc-400 block font-medium">دلار آزاد / تتر</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-white">{formatToman(rates.usdtToman.price)}</span>
            <span className="text-xs text-emerald-400 font-bold">+{rates.usdtToman.changePercent}٪</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">محرک اصلی رشد نرخ طلای داخلی</span>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 block font-medium">شاخص حباب سکه امامی</span>
          <div className="flex items-baseline justify-between" dir="ltr">
            <span className="text-2xl font-black text-amber-400">۱۷.۷٪</span>
            <span className="text-xs text-zinc-400 font-mono">~ ۹.۴ میلیون ت</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">توصیه: ترجیح خرید آب‌شده بر سکه</span>
        </div>
      </div>

      {/* Coin Bubble Comprehensive Table */}
      <div className="bg-[#111319] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>جدول مقایسه ارزش ذاتی و حباب انواع سکه و طلای آب‌شده</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              فرمول حباب: تفاوت قیمت معامله در بازار با ارزش طلای ۲۲ عیار به کار رفته در سکه
            </p>
          </div>
          <div className="text-xs bg-[#181B22] border border-zinc-700 px-3 py-1.5 rounded-xl text-zinc-300">
            بروزرسانی زنده بر اساس مظنه سبزه میدان
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#0A0B0E] text-zinc-400 border-b border-zinc-800">
                <th className="p-3 font-bold">نوع مسکوک یا طلا</th>
                <th className="p-3 font-bold">عیار و وزن خالص</th>
                <th className="p-3 font-bold">قیمت روز بازار (تومان)</th>
                <th className="p-3 font-bold">ارزش ذاتی طلا</th>
                <th className="p-3 font-bold">مبلغ حباب</th>
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
            <h4 className="font-bold text-white text-xs">۱. چرا ربع‌سکه ریسک بالایی دارد؟</h4>
            <p>
              به علت توان خرید محدود عموم جامعه، تقاضا برای ربع‌سکه بالا رفته و حباب آن تا بالای ۴۰ درصد رشد کرده است. یعنی شما ۴۰ درصد از پول خود را برای هوای خالی پرداخت می‌کنید نه طلا!
            </p>
          </div>

          <div className="bg-[#0B0C0E]/70 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-xs">۲. مزیت استراتژیک طلای آب‌شده</h4>
            <p>
              طلای آب‌شده دقیقاً بر مبنای عیارسنجی ری‌گیری و بدون حتی یک ریال حباب یا اجرت معامله می‌شود. سرمایه‌گذاران حرفه‌ای برای حفظ سرمایه صرفاً به سمت آب‌شده یا شمش‌های ۲۴ عیار می‌روند.
            </p>
          </div>

          <div className="bg-[#0B0C0E]/70 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-[#F5D77F] text-xs">۳. پیش‌بینی روند طلا در ماه‌های آتی</h4>
            <p>
              با توجه به تثبیت انس جهانی در محدوده ۲۷۰۰ دلار و چسبندگی نرخ ارز آزاد، کف قیمتی طلای ۱۸ عیار حمایت مستحکمی نشان داده و استراتژی خرید پله‌ای در روزهای منفی بازار پیشنهاد می‌گردد.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
