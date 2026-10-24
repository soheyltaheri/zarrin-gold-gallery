import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function RateEditorModal({
  isOpen,
  onClose,
  currentGoldPrice,
  onUpdateGoldPrice,
  onResetToLive,
  tgjuLivePrice = 27223000,
}) {
  if (!isOpen) return null;

  const [inputPrice, setInputPrice] = useState(currentGoldPrice);

  const handleApply = (e) => {
    e.preventDefault();
    if (inputPrice > 100000) {
      onUpdateGoldPrice(inputPrice);
      onClose();
    }
  };

  const presets = [
    { label: 'نرخ لحظه‌ای TGJU اتحادیه', val: tgjuLivePrice },
    { label: '۲۷,۰۰۰,۰۰۰ تومان', val: 27000000 },
    { label: '۲۷,۵۰۰,۰۰۰ تومان', val: 27500000 },
    { label: '۲۶,۵۰۰,۰۰۰ تومان', val: 26500000 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#12141A] border border-[#D4AF37]/50 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-5 my-auto">

        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">تنظیم دقیق نرخ مبنای طلای ۱۸ عیار</h3>
              <p className="text-[11px] text-zinc-400">قیمت تمام کالاها و فاکتورها بلافاصله بروز می‌شود</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleApply} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-300 font-semibold block">قیمت هر گرم طلای ۱۸ عیار (تومان):</label>
            <input
              type="number"
              step="1000"
              value={inputPrice}
              onChange={(e) => setInputPrice(parseInt(e.target.value) || 0)}
              className="w-full bg-[#181B22] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-base font-black text-white outline-none"
            />
            <div className="text-[11px] text-[#F5D77F] font-semibold text-left" dir="ltr">
              {formatToman(inputPrice)} تومان
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] text-zinc-400 block">انتخاب سریع نرخ‌های متداول:</span>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputPrice(p.val)}
                  className={`p-2 rounded-lg border text-right transition-all ${
                    inputPrice === p.val
                      ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="block text-[10px] text-zinc-400">{p.label}</span>
                  <span className="font-mono font-bold text-xs">{formatToman(p.val)} ت</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-black rounded-xl transition-all shadow-md"
            >
              اعمال در کل سایت و فاکتورها
            </button>
            <button
              type="button"
              onClick={() => {
                onResetToLive();
                onClose();
              }}
              className="px-3 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-medium"
              title="همگام‌سازی مجدد با TGJU"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
