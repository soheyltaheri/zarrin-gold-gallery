import React, { useState } from 'react';
import { X, Ruler, CheckCircle, Info, Sparkles } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose, defaultType = 'ring' }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(defaultType); // 'ring', 'bangle'

  const ringSizes = [
    { size: '50', circumference: '50 mm', diameter: '15.9 mm', standard: 'ظریف' },
    { size: '52', circumference: '52 mm', diameter: '16.5 mm', standard: 'استاندارد زنانه' },
    { size: '54', circumference: '54 mm', diameter: '17.2 mm', standard: 'پرطرفدار زنانه' },
    { size: '56', circumference: '56 mm', diameter: '17.8 mm', standard: 'زنانه متوسط' },
    { size: '58', circumference: '58 mm', diameter: '18.5 mm', standard: 'زنانه درشت / مردانه ظریف' },
    { size: '60', circumference: '60 mm', diameter: '19.1 mm', standard: 'مردانه استاندارد' },
    { size: '62', circumference: '62 mm', diameter: '19.7 mm', standard: 'مردانه بزرگ' },
    { size: '64', circumference: '64 mm', diameter: '20.4 mm', standard: 'مردانه پهن' },
  ];

  const bangleSizes = [
    { size: 'سایز ۱', wristCircumference: '۱۴ تا ۱۵ سانتی‌متر', innerDiameter: '۵۴ میلی‌متر', desc: 'مچ دست بسیار ظریف یا نوجوان' },
    { size: 'سایز ۲', wristCircumference: '۱۵ تا ۱۶.۵ سانتی‌متر', innerDiameter: '۵۷ میلی‌متر', desc: 'سایز استاندارد اکثریت بانوان' },
    { size: 'سایز ۳', wristCircumference: '۱۶.۵ تا ۱۸ سانتی‌متر', innerDiameter: '۶۰ میلی‌متر', desc: 'مچ دست متوسط به درشت' },
    { size: 'سایز ۴', wristCircumference: '۱۸ تا ۱۹.۵ سانتی‌متر', innerDiameter: '۶۳ میلی‌متر', desc: 'مچ دست پر و درشت' },
    { size: 'سایز ۵', wristCircumference: 'بیش از ۱۹.۵ سانتی‌متر', innerDiameter: '۶۶ میلی‌متر', desc: 'سایز بزرگ اختصاصی' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                راهنمای استاندارد تعیین سایز طلا و جواهرات
              </h2>
              <p className="text-xs text-zinc-400">
                نحوه اندازه‌گیری دقیق در منزل بر اساس استانداردهای بین‌المللی ISO و اتحادیه تهران
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

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-zinc-800 bg-[#0E1015] text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('ring')}
            className={`py-3 text-center border-b-2 transition-all ${
              activeTab === 'ring'
                ? 'text-[#F5D77F] border-[#D4AF37] bg-[#161820]'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            سایز انگشتر و حلقه ازدواج
          </button>
          <button
            onClick={() => setActiveTab('bangle')}
            className={`py-3 text-center border-b-2 transition-all ${
              activeTab === 'bangle'
                ? 'text-[#F5D77F] border-[#D4AF37] bg-[#161820]'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            سایز النگو و دستبند فنری
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {activeTab === 'ring' ? (
            <div className="space-y-6">
              {/* How to measure rings */}
              <div className="bg-[#151820] border border-zinc-800 rounded-xl p-4 space-y-3 text-xs text-zinc-300">
                <div className="font-bold text-[#F5D77F] flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>روش ساده اندازه‌گیری سایز انگشت با نخ یا نوار کاغذ:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed pr-1">
                  <li>یک نوار کاغذی یا تکه‌ای نخ غیرکشسان دور بند انگشت مورد نظر بپیچید.</li>
                  <li>نقطه اتصال را با خودکار علامت‌گذاری نمایید (مطمئن شوید کاغذ از مفصل انگشت عبور می‌کند).</li>
                  <li>طول نوار را بر حسب میلی‌متر با خط‌کش اندازه بگیرید و با ستون «محیط دور انگشت» جدول زیر مقایسه فرمایید.</li>
                </ol>
              </div>

              {/* Ring Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#1A1D24] text-zinc-300 border-b border-zinc-800">
                      <th className="p-2.5 font-bold">شماره سایز</th>
                      <th className="p-2.5 font-bold">محیط دور انگشت</th>
                      <th className="p-2.5 font-bold">قطر داخلی حلقه</th>
                      <th className="p-2.5 font-bold">توضیح</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {ringSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-zinc-900/50">
                        <td className="p-2.5 font-bold text-[#D4AF37]">{row.size}</td>
                        <td className="p-2.5 text-zinc-200">{row.circumference}</td>
                        <td className="p-2.5 text-zinc-300">{row.diameter}</td>
                        <td className="p-2.5 text-zinc-400">{row.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* How to measure bangles */}
              <div className="bg-[#151820] border border-zinc-800 rounded-xl p-4 space-y-3 text-xs text-zinc-300">
                <div className="font-bold text-[#F5D77F] flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>روش صحیح انتخاب سایز النگو:</span>
                </div>
                <p className="leading-relaxed text-zinc-300">
                  انگشتان دست خود را جمع کنید طوری که نوک شست روی بند اول انگشت کوچک قرار گیرد (درست مانند حالتی که می‌خواهید النگو را دست کنید). با متر خیاطی دور عریض‌ترین قسمت کف دست جمع‌شده را اندازه بگیرید.
                </p>
              </div>

              {/* Bangle Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#1A1D24] text-zinc-300 border-b border-zinc-800">
                      <th className="p-2.5 font-bold">سایز النگو</th>
                      <th className="p-2.5 font-bold">قطر داخلی النگو</th>
                      <th className="p-2.5 font-bold">دور مچ تقریبی</th>
                      <th className="p-2.5 font-bold">مناسب برای</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {bangleSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-zinc-900/50">
                        <td className="p-2.5 font-bold text-[#D4AF37]">{row.size}</td>
                        <td className="p-2.5 text-zinc-200">{row.innerDiameter}</td>
                        <td className="p-2.5 text-zinc-300">{row.wristCircumference}</td>
                        <td className="p-2.5 text-zinc-400">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guarantee notice */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>
              نگران نباشید! در صورت نامناسب بودن سایز، امکان تعویض رایگان سایز تا ۷ روز کاری برای تمام مشتریان فراهم است.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#0E1015] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C158] transition-all"
          >
            متوجه شدم، بازگشت به محصول
          </button>
        </div>

      </div>
    </div>
  );
}
