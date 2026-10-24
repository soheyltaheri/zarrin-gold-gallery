import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  HelpCircle,
  Scale
} from 'lucide-react';

export default function BlogGuidePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 'art-01',
      title: 'فرق طلای ۱۸ عیار با ۲۴ عیار؛ کدامیک برای سرمایه‌گذاری مناسب‌تر است؟',
      readTime: '۵ دقیقه مطالعه',
      date: '۱۴۰۳/۰۸/۱۸',
      category: 'راهنمای خرید',
      summary: 'آشنایی با درصد خلوص آلیاژ طلا، تفاوت مقاومت فیزیکی طلای ۷۵۰ با شمش ۹۹۹ و بهترین انتخاب برای زیورآلات و پس‌انداز.',
      content: `
        طلا با عیار ۲۴ خالص‌ترین شکل طلا (۹۹.۹٪ خلوص) است، اما به دلیل نرمی و انعطاف‌پذیری فوق‌العاده بالا، نمی‌توان از آن برای ساخت زیورآلات ظریف مانند انگشتر یا النگو استفاده کرد چون به راحتی تغییر شکل می‌دهد و سنگ‌ها از آن جدا می‌شوند.

        به همین دلیل در استاندارد ایران و خاورمیانه، طلای ۱۸ عیار (۷۵۰ در هزار) استاندارد اصلی زرگری است؛ یعنی ۷۵ درصد آن طلای خالص و ۲۵ درصد دیگر فلزات مقاوم‌کننده مانند مس و نقره است.

        نتیجه‌گیری: برای استفاده روزمره و زیورآلات، طلای ۱۸ عیار به دلیل دوام و استحکام بهترین انتخاب است. اما برای سرمایه‌گذاری محض و نگهداری در گاوصندوق، شمش‌های ۲۴ عیار ون‌ورس با سرتیفیکیت رسمی بازدهی بالاتری دارند.
      `
    },
    {
      id: 'art-02',
      title: 'حباب سکه چیست و چگونه پیش از خرید محاسبه می‌شود؟',
      readTime: '۷ دقیقه مطالعه',
      date: '۱۴۰۳/۰۸/۱۰',
      category: 'اقتصاد و بازار',
      summary: 'چرا قیمت سکه امامی و بهار آزادی از ارزش طلای آن گران‌تر است؟ راهنمای کامل فرمول محاسبه حباب ربع و نیم‌سکه.',
      content: `
        حباب سکه به اختلاف بین ارزش ذاتی طلای موجود در سکه و قیمتی که در بازار خرید و فروش می‌شود می‌گویند.

        فرمول ارزش ذاتی سکه:
        وزن سکه (۸.۱۳۳ گرم) × عیار سکه (۰.۹۰۰ معادل ۲۲ عیار) × قیمت طلای روز + حق ضرب بانک مرکزی

        هنگامی که تقاضای روانی در جامعه برای خرید سکه بالا می‌رود، دلالان سکه را گران‌تر از ارزش طلایش می‌فروشند که به این اختلاف «حباب مثبت» گفته می‌شود. در مواقعی حباب ربع‌سکه به بالای ۴۰٪ می‌رسد، یعنی خریدار ۴۰ درصد پول بیشتری برای چیزی پرداخت می‌کند که در صورت افت تب بازار بلافاصله دود می‌شود!
      `
    },
    {
      id: 'art-03',
      title: 'چرا طلای آب‌شده بهترین گزینه پس‌انداز ضدتورمی در ایران است؟',
      readTime: '۶ دقیقه مطالعه',
      date: '۱۴۰۳/۰۷/۲۵',
      category: 'سرمایه‌گذاری',
      summary: 'بررسی مزایای طلای آب‌شده انگ‌دار: صفر درصد اجرت ساخت، بدون مالیات و قابلیت نقدشوندگی درجا در تمام طلافروشی‌های کشور.',
      content: `
        طلای آب‌شده قطعات ذوب‌شده طلاست که در آزمایشگاه‌های معتبر ری‌گیری زیر نظر اتحادیه عیارسنجی شده و شماره رهگیری (انگ) روی آن ضرب می‌شود.

        مزایای بی‌رقیب طلای آب‌شده:
        ۱. بدون اجرت ساخت: شما حتی ۱ ریال بابت هزینه طراحی و ساخت پرداخت نمی‌کنید.
        ۲. معاف از ۹٪ مالیات ارزش افزوده: طلا به عنوان ماده خام مشمول مالیات نیست.
        ۳. نقدشوندگی فوق‌سریع: در هر ساعت از روز، هر طلافروشی در سراسر ایران طلای آب‌شده را به مظنه روز نقد خریداری می‌کند.
      `
    },
    {
      id: 'art-04',
      title: '۵ ترفند ساده برای تشخیص طلای اصل از تقلبی در منزل',
      readTime: '۴ دقیقه مطالعه',
      date: '۱۴۰۳/۰۷/۱۵',
      category: 'آموزش تخصصی',
      summary: 'تست آهنربا، بررسی کد حکاکی استاندارد T، تست سرکه سفید و بررسی فاکتور رسمی اتحادیه.',
      content: `
        ۱. تست کد استاندارد: روی تمام مصنوعات اصل طلا باید کد عیار (750 یا 18K) به همراه کد حرف انگلیسی شهر سازنده (مثلاً T برای تهران، E برای اصفهان، Y برای یزد) به صورت لیزری حک شده باشد.
        ۲. تست آهنربا: طلا فلزی پارامغناطیس است و به هیچ وجه نباید توسط قوی‌ترین آهنرباها جذب شود.
        ۳. تست سرکه: یک قطره سرکه سفید روی طلا بریزید؛ اگر رنگ طلا سیاه یا تیره شد، با آلیاژ تقلبی روبرو هستید چون طلا در برابر اسیدهای ملایم کاملاً پایدار است.
        ۴. فاکتور رسمی: طلای معتبر همیشه با فاکتور چاپی دارای شماره پروانه کسب و مشخصات صادرکننده فروخته می‌شود.
      `
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F] px-4 py-1.5 rounded-full text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-[#D4AF37]" />
          <span>دانشنامه و آکادمی طلا و جواهر زرین</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          راهنمای جامع خرید، عیارشناسی و سرمایه‌گذاری طلا
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          مجموعه مقالات تخصصی و آموزشی با قلم اساتید زرگری جهت افزایش آگاهی، جلوگیری از پرداخت هزینه‌های گزاف حباب و انتخاب بهترین زیورآلات.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-[#111319] border border-zinc-800 hover:border-[#D4AF37]/40 rounded-3xl p-6 sm:p-7 space-y-4 transition-all hover:bg-[#151822] shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="bg-[#D4AF37]/15 text-[#F5D77F] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full font-semibold">
                  {art.category}
                </span>
                <span className="text-zinc-500 font-light">{art.readTime} • {art.date}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {art.summary}
              </p>
            </div>

            {selectedArticle === art.id ? (
              <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs text-zinc-300 leading-relaxed bg-[#0A0B0E] p-4 rounded-2xl">
                <p className="whitespace-pre-line font-light">{art.content.trim()}</p>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold"
                >
                  بستن متن کامل مقاله ↑
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-zinc-800/80">
                <button
                  onClick={() => setSelectedArticle(art.id)}
                  className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
                >
                  <span>مطالعه کامل این مقاله</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
