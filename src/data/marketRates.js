// داده‌های اولیه نرخ‌های زنده بازار طلا و سکه تهران
export const initialMarketRates = {
  gold18k: {
    name: 'طلای ۱۸ عیار (۷۵۰)',
    price: 4580000, // هر گرم به تومان
    change: +24000,
    changePercent: +0.53,
    unit: 'تومان / هر گرم',
    purity: 750,
  },
  gold24k: {
    name: 'طلای ۲۴ عیار (شمش)',
    price: 6105000,
    change: +32000,
    changePercent: +0.53,
    unit: 'تومان / هر گرم',
    purity: 999,
  },
  mesghal: {
    name: 'مثقال طلا (مظنه بازار تهران)',
    price: 19840000,
    change: +104000,
    changePercent: +0.52,
    unit: 'تومان / ۱ مثقال',
    equivalent: '۴.۶۰۸ گرم طلای ۱۷ عیار (۷۰۵)',
  },
  coinEmami: {
    name: 'سکه تمام طرح جدید (امامی)',
    price: 52900000,
    change: -150000,
    changePercent: -0.28,
    unit: 'تومان / تمام بهار',
    bubble: 9400000,
  },
  coinBahar: {
    name: 'سکه بهار آزادی (طرح قدیم)',
    price: 48300000,
    change: +50000,
    changePercent: +0.10,
    unit: 'تومان',
    bubble: 4800000,
  },
  coinHalf: {
    name: 'نیم سکه بهار آزادی',
    price: 28400000,
    change: +100000,
    changePercent: +0.35,
    unit: 'تومان',
    bubble: 6600000,
  },
  coinQuarter: {
    name: 'ربع سکه بهار آزادی',
    price: 18200000,
    change: 0,
    changePercent: 0.0,
    unit: 'تومان',
    bubble: 7300000,
  },
  goldUsed: {
    name: 'طلای دست دوم (خرید از شما)',
    price: 4510000,
    change: +24000,
    changePercent: +0.53,
    unit: 'تومان / هر گرم',
    purity: 750,
  },
  globalOunce: {
    name: 'انس جهانی طلا',
    price: 2748.5,
    change: +6.2,
    changePercent: +0.23,
    unit: 'دلار / انس',
  },
  usdtToman: {
    name: 'دلار / تتر نقدی تهران',
    price: 69400,
    change: +350,
    changePercent: +0.51,
    unit: 'تومان',
  }
};

// داده‌های نمودار تاریخی روند قیمت طلای ۱۸ عیار
export const goldPriceHistory = {
  '1W': [
    { date: 'شنبه', price: 4510000 },
    { date: 'یکشنبه', price: 4525000 },
    { date: 'دوشنبه', price: 4540000 },
    { date: 'سه‌شنبه', price: 4530000 },
    { date: 'چهارشنبه', price: 4565000 },
    { date: 'پنجشنبه', price: 4580000 },
    { date: 'امروز', price: 4580000 },
  ],
  '1M': [
    { date: 'هفته ۱', price: 4320000 },
    { date: 'هفته ۲', price: 4410000 },
    { date: 'هفته ۳', price: 4490000 },
    { date: 'هفته ۴', price: 4580000 },
  ],
  '6M': [
    { date: 'اردیبهشت', price: 3650000 },
    { date: 'خرداد', price: 3820000 },
    { date: 'تیر', price: 3950000 },
    { date: 'مرداد', price: 4120000 },
    { date: 'شهریور', price: 4350000 },
    { date: 'مهر', price: 4580000 },
  ],
  '1Y': [
    { date: 'آبان ۱۴۰۲', price: 2450000 },
    { date: 'بهمن ۱۴۰۲', price: 2850000 },
    { date: 'اردیبهشت ۱۴۰۳', price: 3650000 },
    { date: 'مرداد ۱۴۰۳', price: 4120000 },
    { date: 'آبان ۱۴۰۳', price: 4580000 },
  ]
};
