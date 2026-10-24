import React, { useState } from 'react';
import { X, Sparkles, Scale, Upload, CheckCircle2, Phone, MessageSquare, Gem } from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function CustomDesignModal({ isOpen, onClose, currentGoldPrice }) {
  if (!isOpen) return null;

  const [category, setCategory] = useState('ring');
  const [karat, setKarat] = useState('18k');
  const [color, setColor] = useState('yellow');
  const [targetWeight, setTargetWeight] = useState(4.0);
  const [stoneType, setStoneType] = useState('none');
  const [budget, setBudget] = useState(25000000);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Approximate estimate based on target weight & standard craftsmanship wage (approx 14%)
  const estimatedWage = 14;
  const estimatedRaw = targetWeight * currentGoldPrice;
  const estimatedTotal = Math.round(estimatedRaw * 1.14 * 1.07 * 1.015); // with profit & tax approximation

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#F5D77F] to-[#D4AF37] text-black">
              <Sparkles className="w-5 h-5 font-black" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                آتلیه طراحی و ساخت اختصاصی طلا و جواهر
              </h2>
              <p className="text-xs text-zinc-400">
                طراحی سه‌بعدی رایگان بر اساس بودجه، وزن دلخواه یا ایده اختصاصی شما
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">درخواست طراحی شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                طراحان ارشد آتلیه زرین‌شاهکار طرح اولیه سه‌بعدی (3D Render) را به همراه برآورد قطعی وزن و هزینه ظرف حداکثر ۲۴ ساعت آینده از طریق واتساپ به شماره <span className="text-[#F5D77F] font-bold" dir="ltr">{phone || 'شما'}</span> ارسال خواهند نمود.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C158]"
              >
                بازگشت به سایت
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">

              {/* Item Type */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-300 font-semibold block">نوع زیورآلات مورد نظر:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'ring', label: 'انگشتر / حلقه ست' },
                    { id: 'pendant', label: 'پلاک اسم / مدال' },
                    { id: 'bracelet', label: 'دستبند یا النگو' },
                    { id: 'set', label: 'سرویس / نیم‌ست' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        category === cat.id
                          ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gold Color & Karat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-semibold block">رنگ طلای مورد نظر:</label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
                  >
                    <option value="yellow">طلای زرد ۱۸ عیار کلاسیک</option>
                    <option value="white">طلای سفید رودیم اندود</option>
                    <option value="rosegold">طلای رزگلد مدرن</option>
                    <option value="bicolor">ترکیبی (زرد و سفید)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-semibold block">نوع نگین و گوهر:</label>
                  <select
                    value={stoneType}
                    onChange={(e) => setStoneType(e.target.value)}
                    className="w-full bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
                  >
                    <option value="none">بدون نگین (طلای خالص)</option>
                    <option value="zirconia">اتمی درجه یک سوئیسی (کسر از وزن طلا)</option>
                    <option value="diamond">الماس و برلیان اصل با شناسنامه GIA</option>
                    <option value="natural">سنگ‌های قیمتی طبیعی (یاقوت، زمرد، فیروزه)</option>
                  </select>
                </div>
              </div>

              {/* Target Weight Slider */}
              <div className="space-y-2 bg-[#0E1015] p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">وزن هدف برای ساخت:</span>
                  <span className="font-extrabold text-[#F5D77F] bg-zinc-800 px-2.5 py-0.5 rounded border border-zinc-700">
                    {targetWeight} گرم
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#D4AF37] h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-900">
                  <span className="text-zinc-400">تخمین حدودی هزینه تمام‌شده:</span>
                  <span className="font-bold text-white font-mono" dir="ltr">
                    ~ {formatToman(estimatedTotal)} تومان
                  </span>
                </div>
              </div>

              {/* Description & Idea */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300 font-semibold block">
                  توضیحات و جزئیات طرح درخواستی:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مثلا: می‌خواهم یک حلقه نامزدی با نگین تک شبیه عکس پیوستی باشد که داخل حلقه تاریخ عقدمان حکاکی شود..."
                  className="w-full bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl p-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Phone number */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300 font-semibold block">
                  شماره موبایل جهت ارسال طرح سه‌بعدی و هماهنگی:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181B22] border border-zinc-700 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37] font-mono text-left"
                  dir="ltr"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C158] hover:to-[#D4AF37] text-black font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                ثبت درخواست و شروع طراحی سه‌بعدی اختصاصی
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
