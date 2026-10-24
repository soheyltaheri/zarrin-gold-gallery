import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Clock,
  Mail,
  Send,
  HelpCircle,
  ChevronDown,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function Footer({ onOpenCalculator, onOpenVerifyInvoice, onOpenCustomOrder }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [smsPhone, setSmsPhone] = useState('');
  const [smsSubscribed, setSmsSubscribed] = useState(false);

  const faqs = [
    {
      q: 'آیا خرید طلا به صورت آنلاین امن و دارای فاکتور قانونی است؟',
      a: 'بله کاملاً. گالری زرین‌شاهکار دارای پروانه کسب رسمی از اتحادیه طلا و جواهر تهران و نماد اعتماد الکترونیکی است. همراه هر سفارش، فاکتور رسمی معتبر چاپی با شماره سریال، هولوگرام ضدجعل، وزن دقیق و کد استاندارد T ارسال می‌شود و محموله تا سقف ۱ میلیارد تومان توسط شرکت پست بیمه حوادث کامل می‌گردد.'
    },
    {
      q: 'قانون جدید مالیات بر ارزش افزوده طلا چگونه عمل می‌کند؟',
      a: 'طبق قانون مصوب مجلس شورای اسلامی، اصل ارزش طلای خام ۱۰۰٪ از مالیات معاف است. ۹ درصد مالیات بر ارزش افزوده منحصراً بر روی مجموع «اجرت ساخت + سود ۷ درصدی فروشنده» محاسبه می‌شود. در گالری زرین‌شاهکار این فرمول به طور دقیق و خودکار در فاکتور تفکیک می‌شود.'
    },
    {
      q: 'آیا وزن نگین‌ها از وزن طلای محصول کسر می‌شود؟',
      a: 'بله، تمامی محصولات نگین‌دار در گالری ما با نگین کسرشده وزن‌کشی می‌شوند؛ به این معنا که وزن نگین در وزن خالص طلای فاکتور محاسبه نمی‌گردد و در هنگام فروش به طلافروشی هیچ افتی متوجه وزن طلای شما نخواهد بود.'
    },
    {
      q: 'طلای آب‌شده بدون اجرت چیست و چرا برای پس‌انداز بهترین گزینه است؟',
      a: 'طلای آب‌شده قطعات ذوب‌شده استاندارد با عیار ۷۵۰ است که شماره انگ آزمایشگاه ری‌گیری معتبر روی آن حک شده است. این طلا فاقد هرگونه اجرت ساخت، بدون مالیات و با کمترین کارمزد ممکن به عنوان مطمئن‌ترین دارایی ضدتورمی به فروش می‌رسد.'
    }
  ];

  const handleSmsSubscribe = (e) => {
    e.preventDefault();
    if (smsPhone.trim().length >= 10) {
      setSmsSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#08090C] border-t border-zinc-800 text-zinc-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <HelpCircle className="w-4 h-4" />
              <span>راهنمای خرید طلا و سوالات متداول</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              پاسخ به ابهامات متداول خریداران طلا و جواهر
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#101217] border border-zinc-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-right flex justify-between items-center gap-3 hover:text-white"
                >
                  <span className="font-bold text-zinc-200 text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-zinc-400 text-xs leading-relaxed border-t border-zinc-800/60 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gold Alert SMS Newsletter */}
        <div className="bg-gradient-to-r from-[#14161F] via-[#1D1B14] to-[#14161F] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="text-base sm:text-lg font-black text-white">
                سامانه پیامکی نوسانات مهم نرخ طلا و سکه
              </h4>
            </div>
            <p className="text-xs text-zinc-300 max-w-xl font-light">
              با عضویت در باشگاه زرین، مهم‌ترین سیگنال‌های نوسان نرخ طلا، زمان مناسب خرید آب‌شده و تخفیف‌های اجرت کالکشن‌های جدید را دریافت کنید.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {smsSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-5 py-3 rounded-xl font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>شماره شما با موفقیت در سامانه پیامکی نرخ‌ها ثبت شد.</span>
              </div>
            ) : (
              <form onSubmit={handleSmsSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={smsPhone}
                  onChange={(e) => setSmsPhone(e.target.value)}
                  className="bg-[#0B0C0E] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white outline-none font-mono text-left w-full"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl shrink-0 transition-all shadow-md"
                >
                  عضویت رایگان
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-8 border-t border-zinc-900">

          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5D77F] to-[#D4AF37] p-0.5">
                <div className="w-full h-full bg-[#0E1015] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-xl font-black gold-gradient-text font-serif">
                گالری طلای زرین‌شاهکار
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              با بیش از ربع قرن حضور مستمر در سرای زرگران بازار بزرگ تهران، متعهد به عرضه زیورآلات اصیل، شمش‌های استاندارد و طلای آب‌شده با حداکثر شفافیت محاسباتی و رعایت کامل ضوابط اتحادیه طلا و جواهر هستیم.
            </p>

            <div className="space-y-2 text-xs text-zinc-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>تهران، بازار بزرگ، سبزه میدان، سرای زرگران، طبقه اول، پلاک ۴۲</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>تلفن مشاوره و پشتیبانی: ۰۲۱-۸۸۹۹۷۷۶۶ (۹ صبح تا ۸ شب)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>ساعات خرید حضوری در بازار: شنبه تا چهارشنبه ۱۰:۰۰ الی ۱۷:۳۰</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick links */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">دسترسی سریع</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCalculator} className="hover:text-[#D4AF37] transition-colors">
                  ماشین‌حساب هوشمند طلا
                </button>
              </li>
              <li>
                <button onClick={onOpenVerifyInvoice} className="hover:text-[#D4AF37] transition-colors">
                  پیگیری و استعلام فاکتور رسمی
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomOrder} className="hover:text-[#D4AF37] transition-colors">
                  سفارش طراحی و ساخت اختصاصی
                </button>
              </li>
              <li>
                <a href="#products-section" className="hover:text-[#D4AF37] transition-colors">
                  طلای بدون اجرت و آب‌شده
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-[#D4AF37] transition-colors">
                  حلقه ازدواج و انگشتر سولیتر
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Standards */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">قوانین و ضمانت‌ها</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-zinc-200 cursor-pointer">دستورالعمل معافیت مالیاتی طلا</li>
              <li className="hover:text-zinc-200 cursor-pointer">شرایط تعویض و عودت ۷ روزه کالا</li>
              <li className="hover:text-zinc-200 cursor-pointer">بیمه‌نامه پستی مرسولات طلا</li>
              <li className="hover:text-zinc-200 cursor-pointer">نحوه عیارسنجی در آزمایشگاه ری‌گیری</li>
              <li className="hover:text-zinc-200 cursor-pointer">رویه خرید طلای دست‌دوم مشتریان</li>
            </ul>
          </div>

          {/* Col 5: Official Trust Badges & Union Stamps */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">مجوزها و نمادهای رسمی</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#111319] border border-zinc-800 p-2.5 rounded-xl text-center space-y-1">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto" />
                <span className="text-[10px] text-zinc-300 block font-bold">پروانه اتحادیه</span>
                <span className="text-[8px] text-zinc-500 block">کد صنفی: ۷۵۴۱</span>
              </div>

              <div className="bg-[#111319] border border-zinc-800 p-2.5 rounded-xl text-center space-y-1">
                <Award className="w-6 h-6 text-emerald-400 mx-auto" />
                <span className="text-[10px] text-zinc-300 block font-bold">اینماد ۵ ستاره</span>
                <span className="text-[8px] text-zinc-500 block">مرکز تجارت الکترونیک</span>
              </div>

              <div className="bg-[#111319] border border-zinc-800 p-2.5 rounded-xl text-center space-y-1">
                <Sparkles className="w-6 h-6 text-sky-400 mx-auto" />
                <span className="text-[10px] text-zinc-300 block font-bold">استاندارد T</span>
                <span className="text-[8px] text-zinc-500 block">کد ملی استاندارد ایران</span>
              </div>

              <div className="bg-[#111319] border border-zinc-800 p-2.5 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-purple-400 mx-auto" />
                <span className="text-[10px] text-zinc-300 block font-bold">درگاه شاپرک</span>
                <span className="text-[8px] text-zinc-500 block">شاپرک بانک مرکزی</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div>
            تمامی حقوق مادی و معنوی، عکس‌ها و فرمول‌های محاسباتی متعلق به <strong>گالری طلای زرین‌شاهکار</strong> می‌باشد. © ۱۴۰۳
          </div>
          <div className="text-[11px] text-zinc-600">
            توسعه یافته بر پایه آخرین ضوابط رسمی اتحادیه صنف طلا و جواهر تهران
          </div>
        </div>

      </div>
    </footer>
  );
}
