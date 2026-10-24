import React from 'react';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  FileCheck2,
  PhoneCall
} from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'فاکتور رسمی اتحادیه طلا',
      desc: 'همراه با کد شناسایی استاندارد T و مهر برجسته گالری معتبر تهران',
      color: 'text-[#D4AF37]',
      bg: 'bg-[#D4AF37]/10',
    },
    {
      icon: Award,
      title: 'تضمین مادام‌العمر عیار ۷۵۰',
      desc: 'تأیید شده در مجهزترین آزمایشگاه‌های ری‌گیری معتبر با برگه اصالت',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      icon: Truck,
      title: 'ارسال ایمن و ۱۰۰٪ بیمه‌شده',
      desc: 'تحویل محرمانه درب منزل با پست ویژه و پوشش کامل خسارت تا سقف ۱ میلیارد',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10',
    },
    {
      icon: RotateCcw,
      title: '۷ روز ضمانت تعویض و عودت',
      desc: 'امکان مرجوعی یا تعویض سایز و مدل بدون کسر ریالی از ارزش طلای خام',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="bg-[#111319] border border-zinc-800/80 hover:border-[#D4AF37]/40 rounded-2xl p-5 space-y-3 transition-all hover:bg-[#161822] group"
            >
              <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${b.color}`} />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#F5D77F] transition-colors">
                {b.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
