import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Crown,
  Users,
  Compass
} from 'lucide-react';

export default function HeritagePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('شنبه آینده');
  const [timeSlot, setTimeSlot] = useState('۱۴:۰۰ الی ۱۶:۰۰');
  const [purpose, setPurpose] = useState('bridal');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-16">

      {/* Hero Heritage */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#161822] to-[#0E1015] border border-[#D4AF37]/30 p-8 sm:p-14 text-center space-y-6">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F] px-4 py-1.5 rounded-full text-xs font-semibold">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span>میراث زرگری تهران از سال ۱۳۷۸</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
          ربع قرن آفرینش هنر و وفاداری در قلب بازار بزرگ تهران
        </h1>

        <p className="text-xs sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
          گالری زرین‌شاهکار در سرای زرگران بازار بزرگ با هدف پیوند زدن ظرافت هنر قلم‌زنی و ریخته‌گری سنتی ایرانی با استانداردهای نوین طلای ۱۸ عیار و شفافیت مطلق فاکتورهای رسمی تأسیس شد.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-4xl mx-auto text-xs">
          <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
            <span className="text-2xl font-black gold-gradient-text">۲۵+</span>
            <span className="text-zinc-400 block font-medium">سال سابقه درخشان در صنف</span>
          </div>
          <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
            <span className="text-2xl font-black gold-gradient-text">۴۵,۰۰۰+</span>
            <span className="text-zinc-400 block font-medium">مشتری وفادار در سراسر کشور</span>
          </div>
          <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
            <span className="text-2xl font-black gold-gradient-text">۱۰۰٪</span>
            <span className="text-zinc-400 block font-medium">تضمین اصالت عیار ۷۵۰</span>
          </div>
          <div className="bg-[#0B0C0E]/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
            <span className="text-2xl font-black gold-gradient-text">۷۵۴۱</span>
            <span className="text-zinc-400 block font-medium">کد پروانه کسب اتحادیه</span>
          </div>
        </div>
      </div>

      {/* Values & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111319] border border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">استادکاران نامدار زرگری</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            همکاری با برجسته‌ترین مخراج‌کاران، قلم‌زنان و طراحان طلا در اصفهان، یزد و تهران جهت خلق قطعاتی که نه تنها زیور، بلکه اثری هنری و ماندگار برای نسل‌هاست.
          </p>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">شفافیت بی‌قیدوشرط فاکتور</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            ما اولین گالری پایه‌گذار تفکیک جزء به جزء ارزش طلای خام، اجرت خالص، سود و مالیات معاف‌شده در فاکتور چاپی هستیم تا خریدار همواره بداند بابت چه چیزی هزینه می‌کند.
          </p>
        </div>

        <div className="bg-[#111319] border border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">خرید و تحویل بیمه‌شده</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            تمامی محموله‌های ارسالی به سراسر ایران در بسته‌بندی پلمپ امنیتی و با پوشش کامل بیمه حوادث اداره پست تحویل داده می‌شوند.
          </p>
        </div>
      </div>

      {/* VIP Showroom Appointment Booking Form */}
      <div className="bg-[#111319] border-2 border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-5 space-y-4 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Calendar className="w-4 h-4" />
              <span>پذیرایی اختصاصی در گالری</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              رزرو وقت مشاوره و خرید حضوری VIP در بازار تهران
            </h2>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              اگر برای خرید سرویس عروس، حلقه ازدواج یا خرید شمش‌های کلان سرمایه‌گذاری تمایل به مراجعه حضوری و پرو شخصی دارید، وقت ملاقات خود را ثبت کنید تا با پذیرایی ویژه در سالن VIP گالری میزبان شما باشیم.
            </p>

            <div className="space-y-2 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>تهران، سبزه میدان، سرای زرگران، طبقه اول، گالری ۴۲</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>تلفن هماهنگی اختصاصی: ۰۲۱-۸۸۹۹۷۷۶۶</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0A0B0E] border border-zinc-800 rounded-2xl p-6">
            {booked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">نوبت VIP شما با موفقیت ثبت شد</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  همکاران تشریفات گالری جهت تأیید نهایی زمان حضور برای روز <strong className="text-[#F5D77F]">{date}</strong> با شما تماس خواهند گرفت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-medium">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلا: سارا محمدی"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#161820] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-medium">شماره موبایل جهت هماهنگی:</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#161820] border border-zinc-700 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-white outline-none font-mono text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-medium">روز مورد نظر برای حضور:</label>
                    <select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#161820] border border-zinc-700 text-white rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37]"
                    >
                      <option value="شنبه">شنبه</option>
                      <option value="یکشنبه">یکشنبه</option>
                      <option value="دوشنبه">دوشنبه</option>
                      <option value="سه‌شنبه">سه‌شنبه</option>
                      <option value="چهارشنبه">چهارشنبه</option>
                      <option value="پنجشنبه">پنجشنبه</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-medium">ساعت پیشنهادی:</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#161820] border border-zinc-700 text-white rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37]"
                    >
                      <option value="۱۰:۰۰ الی ۱۲:۰۰">۱۰:۰۰ الی ۱۲:۰۰ (صبح)</option>
                      <option value="۱۲:۰۰ الی ۱۴:۰۰">۱۲:۰۰ الی ۱۴:۰۰ (ظهر)</option>
                      <option value="۱۴:۰۰ الی ۱۶:۰۰">۱۴:۰۰ الی ۱۶:۰۰ (عصر)</option>
                      <option value="۱۶:۰۰ الی ۱۸:۰۰">۱۶:۰۰ الی ۱۸:۰۰ (غروب)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">موضوع جلسه:</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-[#161820] border border-zinc-700 text-white rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37]"
                  >
                    <option value="bridal">پرو و انتخاب سرویس طلای عروس و حلقه ازدواج</option>
                    <option value="investment">مشاوره تخصصی خرید شمش و طلای آب‌شده</option>
                    <option value="custom">سفارش ساخت اختصاصی طلا با طرح شخصی</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-black text-xs rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
                >
                  ثبت نوبت رزرو VIP در بازار بزرگ تهران
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
