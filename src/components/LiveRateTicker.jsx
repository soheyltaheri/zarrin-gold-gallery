import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, ArrowUpRight, Sliders } from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function LiveRateTicker({ rates, onOpenRatesModal, onOpenCalculator, onOpenRateEditor }) {
  const [lastUpdate, setLastUpdate] = useState('چند لحظه پیش');
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
      const now = new Date();
      setLastUpdate(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'طلای ۱۸ عیار', price: rates.gold18k.price, change: rates.gold18k.changePercent, unit: 'تومان/گرم' },
    { label: 'طلای ۲۴ عیار', price: rates.gold24k.price, change: rates.gold24k.changePercent, unit: 'تومان/گرم' },
    { label: 'مثقال طلا', price: rates.mesghal.price, change: rates.mesghal.changePercent, unit: 'مظنه تهران' },
    { label: 'سکه تمام امامی', price: rates.coinEmami.price, change: rates.coinEmami.changePercent, unit: 'تومان' },
    { label: 'نیم سکه بهار', price: rates.coinHalf.price, change: rates.coinHalf.changePercent, unit: 'تومان' },
    { label: 'ربع سکه بهار', price: rates.coinQuarter.price, change: rates.coinQuarter.changePercent, unit: 'تومان' },
    { label: 'طلای دست دوم (خرید)', price: rates.goldUsed.price, change: rates.goldUsed.changePercent, unit: 'تومان/گرم' },
    { label: 'انس جهانی', price: rates.globalOunce.price, change: rates.globalOunce.changePercent, unit: 'دلار' },
  ];

  return (
    <div className="bg-[#121418] border-b border-[#D4AF37]/20 text-xs py-1.5 px-3 sm:px-4 select-none relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">

        {/* Status indicator & Quick Rate Editor Button */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-[#1C1F26] border border-[#D4AF37]/30 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 ${pulse ? 'animate-ping' : ''}`} />
            <span className="text-emerald-400 font-medium text-[10px] sm:text-xs">تابلوی رسمی TGJU</span>
            <span className="text-zinc-500 text-[9px] sm:text-[10px] hidden xs:inline">({lastUpdate})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenRateEditor}
              className="flex items-center gap-1 text-[#F5D77F] hover:text-white bg-[#D4AF37]/20 border border-[#D4AF37]/40 py-0.5 px-2 rounded-lg transition-colors font-semibold text-[10px] sm:text-xs"
              title="تغییر یا تنظیم نرخ دلخواه طلای ۱۸ عیار"
            >
              <Sliders className="w-3 h-3 text-[#D4AF37]" />
              <span>تنظیم مظنه</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors py-0.5 px-2 rounded hover:bg-[#D4AF37]/10 text-xs"
            >
              <span>فرمول</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Scrolling / Marquee Ticker */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar w-full md:w-auto py-0.5 touch-pan-x">
          {items.map((item, idx) => {
            const isPositive = item.change >= 0;
            return (
              <div
                key={idx}
                onClick={onOpenRatesModal}
                className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer hover:bg-[#1A1D24] px-1.5 py-0.5 rounded transition-all shrink-0"
              >
                <span className="text-zinc-400 font-medium text-[11px] sm:text-xs">{item.label}:</span>
                <span className="text-zinc-100 font-bold text-[11px] sm:text-xs font-mono">{formatToman(item.price)}</span>
                <span className="text-zinc-500 text-[9px] sm:text-[10px]">{item.unit}</span>
                <span className={`flex items-center text-[10px] sm:text-[11px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />}
                  {Math.abs(item.change)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Market Alert / Info */}
        <div className="hidden xl:flex items-center gap-1.5 text-zinc-400 text-[11px] shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>تمام محاسبات مطابق آخرین مصوبه مالیاتی اتحادیه طلا و جواهر است</span>
        </div>
      </div>
    </div>
  );
}
