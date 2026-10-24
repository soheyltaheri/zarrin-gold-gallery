/**
 * محاسبات دقیق قیمت طلا طبق قوانین اتحادیه طلا و جواهر ایران و سازمان امور مالیاتی
 * قانون مالیات ارزش افزوده جدید: اصل طلا معاف از مالیات است؛ مالیات صرفاً بر روی اجرت ساخت + سود فروشنده اعمال می‌شود.
 */

// پیش‌فرض‌های قانونی اتحادیه
export const DEFAULT_PROFIT_PERCENT = 7; // ۷ درصد سود قانونی طلافروشی
export const DEFAULT_VAT_PERCENT = 9;   // ۹ درصد مالیات بر ارزش افزوده روی اجرت و سود

/**
 * محاسبه ریزقیمت طلا بر اساس نرخ ۱۸ عیار
 * @param {number} weight - وزن به گرم (مثلا ۳.۴۵)
 * @param {number} wagePercent - درصد اجرت ساخت (مثلا ۱۲)
 * @param {number} goldGramPrice - قیمت روز هر گرم طلای ۱۸ عیار به تومان
 * @param {number} [profitPercent=7] - درصد سود گالری
 * @param {number} [vatPercent=9] - درصد مالیات ارزش افزوده
 * @param {number} [stonePrice=0] - هزینه نگین یا سنگ جواهر
 */
export function calculateGoldPrice({
  weight,
  wagePercent = 0,
  goldGramPrice,
  profitPercent = DEFAULT_PROFIT_PERCENT,
  vatPercent = DEFAULT_VAT_PERCENT,
  stonePrice = 0,
}) {
  const safeWeight = Number(weight) || 0;
  const safeWagePercent = Number(wagePercent) || 0;
  const safeGoldPrice = Number(goldGramPrice) || 0;
  const safeProfitPercent = Number(profitPercent) || 0;
  const safeVatPercent = Number(vatPercent) || 0;
  const safeStonePrice = Number(stonePrice) || 0;

  // ۱. ارزش طلای خام
  const rawGoldValue = Math.round(safeWeight * safeGoldPrice);

  // ۲. اجرت ساخت
  const wageValue = Math.round(rawGoldValue * (safeWagePercent / 100));

  // ۳. سود فروشنده (بر روی ارزش طلای خام + اجرت ساخت)
  const taxableBase = rawGoldValue + wageValue;
  const profitValue = Math.round(taxableBase * (safeProfitPercent / 100));

  // ۴. مالیات بر ارزش افزوده (۹٪ از مجموع اجرت ساخت + سود فروشنده طبق قانون جدید)
  const vatValue = Math.round((wageValue + profitValue) * (safeVatPercent / 100));

  // ۵. قیمت کل نهایی
  const totalPrice = rawGoldValue + wageValue + profitValue + vatValue + safeStonePrice;

  return {
    weight: safeWeight,
    goldGramPrice: safeGoldPrice,
    wagePercent: safeWagePercent,
    profitPercent: safeProfitPercent,
    vatPercent: safeVatPercent,
    rawGoldValue,
    wageValue,
    profitValue,
    vatValue,
    stonePrice: safeStonePrice,
    totalPrice,
  };
}

/**
 * محاسبه ارزش فروش طلای مستعمل / دست دوم توسط مشتری به طلافروشی
 * @param {number} weight - وزن طلای مشتری
 * @param {number} goldGramPrice - قیمت لحظه‌ای هر گرم طلای ۱۸ عیار
 * @param {number} deductionPercent - درصد کسر آب‌کردن / عیارسنجی (معمولاً بین ۱٪ تا ۲٪)
 */
export function calculateScrapGoldSale(weight, goldGramPrice, deductionPercent = 1.5) {
  const safeWeight = Number(weight) || 0;
  const baseValue = safeWeight * goldGramPrice;
  const deduction = baseValue * (deductionPercent / 100);
  const payout = Math.round(baseValue - deduction);

  return {
    weight: safeWeight,
    goldGramPrice,
    deductionPercent,
    baseValue: Math.round(baseValue),
    deduction: Math.round(deduction),
    payout,
  };
}

/**
 * تبدیل اعداد به فرمت فارسی با جداکننده ارقام
 * @param {number|string} num
 * @param {boolean} [persianDigits=true]
 */
export function formatToman(num, persianDigits = true) {
  if (num === null || num === undefined || isNaN(num)) return '۰';
  const rounded = Math.round(Number(num));
  const formatted = rounded.toLocaleString('en-US');
  if (!persianDigits) return formatted;
  return toPersianDigits(formatted);
}

/**
 * تبدیل ارقام انگلیسی به فارسی
 */
export function toPersianDigits(str) {
  if (!str) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/[0-9]/g, (w) => persianDigits[+w]);
}

/**
 * تبدیل ارقام فارسی به انگلیسی (برای ورودی‌های کاربر)
 */
export function toEnglishDigits(str) {
  if (!str) return '';
  return String(str)
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
}

/**
 * تبدیل عدد به حروف فارسی (تومان)
 */
export function numberToPersianWords(num) {
  if (!num || isNaN(num)) return '';
  const n = Math.round(Number(num));
  if (n === 0) return 'صفر تومان';

  const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const scales = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

  function convertGroup(val) {
    let res = '';
    const h = Math.floor(val / 100);
    const t = Math.floor((val % 100) / 10);
    const o = val % 10;

    if (h > 0) res += hundreds[h];
    if (t === 1) {
      if (res) res += ' و ';
      res += teens[o];
    } else {
      if (t > 1) {
        if (res) res += ' و ';
        res += tens[t];
      }
      if (o > 0) {
        if (res) res += ' و ';
        res += ones[o];
      }
    }
    return res;
  }

  const parts = [];
  let temp = n;
  let scaleIndex = 0;

  while (temp > 0) {
    const chunk = temp % 1000;
    if (chunk > 0) {
      const groupText = convertGroup(chunk);
      const scaleText = scales[scaleIndex];
      parts.unshift(scaleText ? `${groupText} ${scaleText}` : groupText);
    }
    temp = Math.floor(temp / 1000);
    scaleIndex++;
  }

  return parts.join(' و ') + ' تومان';
}
