import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Printer, ArrowLeft, PackageCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatToman } from '../utils/goldCalculator';

export default function CheckoutSuccessModal({
  isOpen,
  onClose,
  orderNumber = 'ZS-1403-9942',
  totalAmount,
  onOpenInvoice,
}) {
  if (!isOpen) return null;

  useEffect(() => {
    // Fire confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5D77F', '#10B981', '#FFFFFF']
      });
    } catch (e) {
      // ignore if canvas unavailable
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#12141A] border-2 border-emerald-500/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-6 my-auto">

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold">
            تراکنش شاپرک با موفقیت انجام شد
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            سفارش شما با موفقیت ثبت و تأیید شد
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            فاکتور رسمی اتحادیه طلا برای سفارش شما صادر گردید و کد رهگیری پستی به شماره همراه شما پیامک خواهد شد.
          </p>
        </div>

        {/* Receipt specs */}
        <div className="bg-[#0B0C0E] border border-zinc-800 rounded-xl p-4 text-xs space-y-2 text-right">
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">شماره سریال فاکتور رسمی:</span>
            <span className="font-mono font-bold text-[#F5D77F]">{orderNumber}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">شماره مرجع پرداخت شاپرک:</span>
            <span className="font-mono text-zinc-300">SHP-992817402</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">مبلغ پرداخت شده:</span>
            <span className="font-bold text-white font-mono">{formatToman(totalAmount)} تومان</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-zinc-400">وضعیت ارسال:</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              آماده‌سازی پستی با بیمه کامل حوادث
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenInvoice();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#E5C158] text-black shadow-lg shadow-[#D4AF37]/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>مشاهده و چاپ پیش‌فاکتور رسمی اتحادیه</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all"
          >
            بازگشت به فروشگاه
          </button>
        </div>

      </div>
    </div>
  );
}
