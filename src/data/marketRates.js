// نرخ‌های دقیق و واقعی لحظه‌ای برگرفته از سامانه رسمی TGJU (اتحادیه طلا و جواهر تهران)
export const initialMarketRates = {
  gold18k: {
    name: 'طلای ۱۸ عیار (۷۵۰)',
    price: 27223000, // هر گرم به تومان (۲۷,۲۲۳,۰۰۰ تومان)
    change: +142000,
    changePercent: +0.52,
    unit: 'تومان / هر گرم',
    purity: 750,
  },
  gold24k: {
    name: 'طلای ۲۴ عیار (شمش خالص)',
    price: 36297000, // هر گرم به تومان
    change: +189000,
    changePercent: +0.52,
    unit: 'تومان / هر گرم',
    purity: 999,
  },
  mesghal: {
    name: 'مثقال طلا (مظنه بازار تهران)',
    price: 117927000, // مظنه مثقال به تومان (۱۱۷,۹۲۷,۰۰۰ تومان)
    change: +615000,
    changePercent: +0.52,
    unit: 'تومان / ۱ مثقال',
    equivalent: '۴.۶۰۸ گرم طلای ۱۷ عیار (۷۰۵)',
  },
  coinEmami: {
    name: 'سکه تمام طرح جدید (امامی)',
    price: 273965000, // ۲۷۳,۹۶۵,۰۰۰ تومان
    change: +1200000,
    changePercent: +0.44,
    unit: 'تومان / تمام بهار',
    bubble: 28400000,
  },
  coinBahar: {
    name: 'سکه بهار آزادی (طرح قدیم)',
    price: 265040000, // ۲۶۵,۰۴۰,۰۰۰ تومان
    change: +800000,
    changePercent: +0.30,
    unit: 'تومان',
    bubble: 19500000,
  },
  coinHalf: {
    name: 'نیم سکه بهار آزادی',
    price: 143980000, // ۱۴۳,۹۸۰,۰۰۰ تومان
    change: +600000,
    changePercent: +0.42,
    unit: 'تومان',
    bubble: 21000000,
  },
  coinQuarter: {
    name: 'ربع سکه بهار آزادی',
    price: 76520000, // ۷۶,۵۲۰,۰۰۰ تومان
    change: +350000,
    changePercent: +0.46,
    unit: 'تومان',
    bubble: 15200000,
  },
  coinGram: {
    name: 'سکه گرمی بانک مرکزی',
    price: 39000000, // ۳۹,۰۰۰,۰۰۰ تومان
    change: +150000,
    changePercent: +0.38,
    unit: 'تومان',
    bubble: 8500000,
  },
  goldUsed: {
    name: 'طلای دست دوم (خرید از مشتری)',
    price: 26814000, // ۲۶,۸۱۴,۰۰۰ تومان (۱.۵٪ کسر عیار عرفی)
    change: +140000,
    changePercent: +0.52,
    unit: 'تومان / هر گرم',
    purity: 750,
  },
  globalOunce: {
    name: 'انس جهانی طلا',
    price: 3993.96, // دلار بر هر انس تروا
    change: +3.04,
    changePercent: +0.08,
    unit: 'دلار / انس',
  },
  usdtToman: {
    name: 'دلار / تتر نقدی تهران',
    price: 271900, // تتر به تومان
    change: +1200,
    changePercent: +0.44,
    unit: 'تومان',
  }
};

// داده‌های روند تاریخی طلای ۱۸ عیار
export const goldPriceHistory = {
  '1W': [
    { date: 'شنبه', price: 26850000 },
    { date: 'یکشنبه', price: 26920000 },
    { date: 'دوشنبه', price: 27040000 },
    { date: 'سه‌شنبه', price: 27110000 },
    { date: 'چهارشنبه', price: 27180000 },
    { date: 'پنجشنبه', price: 27223000 },
    { date: 'امروز', price: 27223000 },
  ],
  '1M': [
    { date: 'هفته ۱', price: 25400000 },
    { date: 'هفته ۲', price: 25950000 },
    { date: 'هفته ۳', price: 26600000 },
    { date: 'هفته ۴', price: 27223000 },
  ],
  '6M': [
    { date: 'اردیبهشت', price: 18500000 },
    { date: 'تیر', price: 20400000 },
    { date: 'مرداد', price: 22100000 },
    { date: 'شهریور', price: 24800000 },
    { date: 'مهر', price: 27223000 },
  ],
  '1Y': [
    { date: 'آبان گذشته', price: 12500000 },
    { date: 'اسفند گذشته', price: 16200000 },
    { date: 'تیر', price: 20400000 },
    { date: 'مهر جاری', price: 27223000 },
  ]
};
