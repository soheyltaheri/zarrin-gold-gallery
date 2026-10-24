import React, { useRef } from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import { formatToman, numberToPersianWords } from '../utils/goldCalculator';

export default function OfficialInvoiceModal({
  isOpen,
  onClose,
  cartItems,
  currentGoldPrice,
  customerInfo = {
    name: 'جناب آقای / سرکار خانم خریدار محترم',
    nationalCode: '۰۰۱******۴',
    phone: '۰۹۱۲***۴۵۶۷',
    address: 'تهران، خیابان ولیعصر، بالاتر از ظفر، پلاک ۱۱۸',
  }
}) {
  if (!isOpen) return null;

  const invoiceNumber = 'ZS-1403-9942';
  const todayDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const totalWeight = cartItems.reduce((acc, item) => acc + (item.weight * (item.quantity || 1)), 0).toFixed(2);
  const totalRawGold = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.rawGoldValue || 0) * (item.quantity || 1)), 0);
  const totalWage = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.wageValue || 0) * (item.quantity || 1)), 0);
  const totalProfit = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.profitValue || 0) * (item.quantity || 1)), 0);
  const totalVat = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.vatValue || 0) * (item.quantity || 1)), 0);
  const totalFinal = cartItems.reduce((acc, item) => acc + ((item.calculatedPrice || 0) * (item.quantity || 1)), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141A] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-auto print:m-0 print:border-none print:shadow-none print:w-full">

        {/* Action Top Bar (Hidden in print) */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#161820] print:hidden">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <span>پیش‌فاکتور رسمی الکترونیکی اتحادیه صنف طلا و جواهر</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black rounded-lg text-xs font-bold transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body (Paper Style) */}
        <div className="p-6 sm:p-8 bg-white text-zinc-900 font-['Vazirmatn'] space-y-6 max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-4">

          {/* Header of the Official Tax Invoice */}
          <div className="border-2 border-amber-900/40 rounded-xl p-4 bg-amber-50/30">
            <div className="grid grid-cols-12 gap-4 items-center">

              {/* Logo & Seller Info */}
              <div className="col-span-8 space-y-1 text-right">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-950 font-serif">
                    گالری طلای زرین‌شاهکار تهران
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold border border-amber-300">
                    پروانه کسب اتحادیه: ۷۵۴۱-۹۸
                  </span>
                </div>
                <p className="text-xs text-zinc-600">
                  شناسه ملی: ۱۴۰۰۸۹۱۲۳۴۵ • کد اقتصادی مالیاتی: ۴۱۱۵۸۹۷۴۱۲ • کد پستی: ۱۹۳۹۵-۴۵۶۷
                </p>
                <p className="text-xs text-zinc-600">
                  نشانی: تهران، بازار بزرگ، سرای زرگران، پلاک ۴۲ • تلفن پشتیبانی: ۰۲۱-۸۸۹۹۷۷۶۶
                </p>
              </div>

              {/* Invoice Serial & Date */}
              <div className="col-span-4 text-left border-r border-amber-900/20 pr-4 space-y-1">
                <div className="text-xs text-zinc-500">شماره سریال رسمی:</div>
                <div className="text-sm font-black text-amber-900 font-mono" dir="ltr">
                  {invoiceNumber}
                </div>
                <div className="text-xs text-zinc-500">تاریخ صدور:</div>
                <div className="text-xs font-bold text-zinc-800">{todayDate}</div>
              </div>

            </div>
          </div>

          {/* Buyer Details Strip */}
          <div className="border border-zinc-300 rounded-lg p-3 bg-zinc-50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-zinc-500 block text-[11px]">مشخصات خریدار:</span>
              <span className="font-bold text-zinc-900">{customerInfo.name}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[11px]">کد ملی / شناسه یکتا:</span>
              <span className="font-bold text-zinc-900 font-mono">{customerInfo.nationalCode}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[11px]">شماره تماس:</span>
              <span className="font-bold text-zinc-900 font-mono">{customerInfo.phone}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[11px]">مبنای قیمت روز ۱۸ عیار:</span>
              <span className="font-bold text-amber-800 font-mono">{formatToman(currentGoldPrice)} تومان</span>
            </div>
          </div>

          {/* Legal Product Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] sm:text-xs text-right border-collapse border border-zinc-300">
              <thead>
                <tr className="bg-amber-100/70 text-amber-950 font-bold border-b border-zinc-300">
                  <th className="p-2 border border-zinc-300 text-center w-8">ردیف</th>
                  <th className="p-2 border border-zinc-300">شرح مصنوعات طلا و جواهر</th>
                  <th className="p-2 border border-zinc-300 text-center">کد T استاندارد</th>
                  <th className="p-2 border border-zinc-300 text-center">عیار</th>
                  <th className="p-2 border border-zinc-300 text-center">وزن (گرم)</th>
                  <th className="p-2 border border-zinc-300 text-center">اجرت</th>
                  <th className="p-2 border border-zinc-300 text-center">طلای خام</th>
                  <th className="p-2 border border-zinc-300 text-center">اجرت ساخت</th>
                  <th className="p-2 border border-zinc-300 text-center">سود ۷٪</th>
                  <th className="p-2 border border-zinc-300 text-center">مالیات ۹٪</th>
                  <th className="p-2 border border-zinc-300 text-center">مبلغ کل (تومان)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {cartItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/40">
                    <td className="p-2 border border-zinc-300 text-center font-mono">{idx + 1}</td>
                    <td className="p-2 border border-zinc-300 font-semibold">
                      {item.name}
                      {item.selectedSize && (
                        <span className="text-[10px] text-zinc-500 mr-1">({item.selectedSize})</span>
                      )}
                      {item.engraving && (
                        <span className="text-[10px] text-amber-800 mr-1 font-normal block">
                          حکاکی: {item.engraving.text}
                        </span>
                      )}
                    </td>
                    <td className="p-2 border border-zinc-300 text-center font-mono text-[10px]">{item.standardPurityCode}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{item.karat}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono font-bold">{item.weight}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{item.wagePercent}٪</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(item.priceBreakdown?.rawGoldValue)}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(item.priceBreakdown?.wageValue)}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(item.priceBreakdown?.profitValue)}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(item.priceBreakdown?.vatValue)}</td>
                    <td className="p-2 border border-zinc-300 text-center font-mono font-black text-amber-950">
                      {formatToman(item.calculatedPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-amber-50 font-bold border-t-2 border-zinc-400">
                  <td colSpan={4} className="p-2 border border-zinc-300 text-center">
                    جمع کل اقلام:
                  </td>
                  <td className="p-2 border border-zinc-300 text-center font-mono font-black">{totalWeight} گرم</td>
                  <td className="p-2 border border-zinc-300 text-center">-</td>
                  <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(totalRawGold)}</td>
                  <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(totalWage)}</td>
                  <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(totalProfit)}</td>
                  <td className="p-2 border border-zinc-300 text-center font-mono">{formatToman(totalVat)}</td>
                  <td className="p-2 border border-zinc-300 text-center font-mono text-sm font-black text-amber-950">
                    {formatToman(totalFinal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legal Explanations & VAT Exemption Note */}
          <div className="border border-amber-300 rounded-lg p-3 bg-amber-50/60 text-[11px] text-zinc-700 space-y-1">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>مستند قانونی مالیات بر ارزش افزوده و ضمانت عیار طلا:</span>
            </div>
            <p className="leading-relaxed">
              به استناد قانون دائمی مالیات بر ارزش افزوده مصوب مجلس شورای اسلامی، <strong>اصل طلا، پلاتین و جواهر از پرداخت ۹ درصد مالیات معاف می‌باشد</strong> و مالیات مندرج در جدول فوق صرفاً بر روی حاصل جمع اجرت ساخت و سود قانونی فروشنده محاسبه گردیده است. عیار تمامی مصنوعات ۷۵۰ مورد تأیید ری‌گیری رسمی اتحادیه تضمین می‌گردد.
            </p>
          </div>

          {/* Amount in Words */}
          <div className="border border-zinc-300 rounded-lg p-3 bg-zinc-50 flex justify-between items-center text-xs">
            <span className="text-zinc-600 font-medium">مبلغ قابل پرداخت به حروف:</span>
            <span className="font-extrabold text-amber-950 text-sm">
              {numberToPersianWords(totalFinal)}
            </span>
          </div>

          {/* Signatures & Seal section */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-300 items-center">
            {/* Gallery Seal */}
            <div className="text-center space-y-1">
              <span className="text-xs text-zinc-600 block">مهر و امضای متصدی واحد صنفی:</span>
              <div className="w-28 h-20 border-2 border-dashed border-amber-900/40 rounded-xl mx-auto flex flex-col items-center justify-center bg-amber-50/50">
                <span className="text-[10px] font-bold text-amber-900">گالری زرین‌شاهکار</span>
                <span className="text-[8px] text-zinc-500">پروانه کسب ۷۵۴۱</span>
                <span className="text-[8px] text-emerald-700 font-bold">تأییدیه الکترونیکی اتحادیه</span>
              </div>
            </div>

            {/* QR Code Verification */}
            <div className="text-center space-y-1">
              <span className="text-xs text-zinc-600 block">بارکد استعلام سامانه جامع:</span>
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-lg flex items-center justify-center mx-auto p-1">
                <QrCode className="w-12 h-12 text-white" />
              </div>
              <span className="text-[9px] text-zinc-500 font-mono block">SCAN TO VERIFY</span>
            </div>

            {/* Buyer Signature */}
            <div className="text-center space-y-1">
              <span className="text-xs text-zinc-600 block">امضا و تأیید خریدار:</span>
              <div className="w-28 h-20 border-2 border-dashed border-zinc-300 rounded-xl mx-auto flex items-center justify-center text-[10px] text-zinc-400">
                تحویل شد
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#161820] flex justify-between items-center text-xs text-zinc-400 print:hidden">
          <span>این فاکتور دارای شناسه رهگیری دیجیتال در سامانه اتحادیه طلا و جواهر است.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl"
          >
            بستن فاکتور
          </button>
        </div>

      </div>
    </div>
  );
}
