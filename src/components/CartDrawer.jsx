import React from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  FileText,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { formatToman, numberToPersianWords } from '../utils/goldCalculator';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenOfficialInvoice,
  onCheckout,
}) {
  if (!isOpen) return null;

  // Aggregate totals
  const totalWeight = cartItems.reduce((acc, item) => acc + (item.weight * (item.quantity || 1)), 0).toFixed(2);
  const totalRawGold = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.rawGoldValue || 0) * (item.quantity || 1)), 0);
  const totalWage = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.wageValue || 0) * (item.quantity || 1)), 0);
  const totalProfit = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.profitValue || 0) * (item.quantity || 1)), 0);
  const totalVat = cartItems.reduce((acc, item) => acc + ((item.priceBreakdown?.vatValue || 0) * (item.quantity || 1)), 0);
  const totalFinal = cartItems.reduce((acc, item) => acc + ((item.calculatedPrice || 0) * (item.quantity || 1)), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-start">
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#12141A] border-l border-[#D4AF37]/30 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300">

        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-[#161820] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37] text-black font-black">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                سبد خرید و پیش‌فاکتور رسمی
                <span className="text-[10px] bg-zinc-800 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  {cartItems.length} قلم
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                مجموع وزن طلا: <strong className="text-white">{totalWeight}</strong> گرم
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

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="bg-[#0B0C0E] border border-zinc-800/80 rounded-xl p-3 flex gap-3 relative hover:border-zinc-700 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1 text-right">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                      title="حذف از سبد"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400">
                    <span>کد: {item.code}</span>
                    <span>•</span>
                    <span>وزن: <strong className="text-zinc-200">{item.weight} گرم</strong></span>
                    <span>•</span>
                    <span>اجرت: {item.wagePercent === 0 ? 'بدون اجرت' : `${item.wagePercent}٪`}</span>
                  </div>

                  {item.selectedSize && (
                    <div className="text-[10px] text-amber-300">
                      سایز انتخابی: {item.selectedSize}
                    </div>
                  )}

                  {item.engraving && (
                    <div className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      حکاکی اختصاصی: <span className="text-[#F5D77F] font-semibold">{item.engraving.text}</span>
                    </div>
                  )}

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-white">{item.quantity || 1}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-left" dir="ltr">
                      <span className="text-sm font-black gold-gradient-text">
                        {formatToman((item.calculatedPrice || 0) * (item.quantity || 1))}
                      </span>
                      <span className="text-[10px] text-zinc-400 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-900 text-zinc-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm text-zinc-400 font-medium">سبد خرید شما در حال حاضر خالی است.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
              >
                مشاهده محصولات گالری
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Legal Summary and CTAs */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#161820] space-y-4">

            {/* Legal Tax Breakdown Accordion */}
            <div className="bg-[#0B0C0E] border border-zinc-800 rounded-xl p-3 space-y-1.5 text-[11px] text-zinc-400">
              <div className="flex justify-between">
                <span>مجموع طلای خام خالص ({totalWeight} گرم):</span>
                <span className="text-zinc-200 font-medium">{formatToman(totalRawGold)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>مجموع اجرت ساخت:</span>
                <span className="text-zinc-200 font-medium">{formatToman(totalWage)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>سود قانونی ۷٪ اتحادیه:</span>
                <span className="text-zinc-200 font-medium">{formatToman(totalProfit)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>مالیات قانونی ۹٪ (فقط روی اجرت و سود):</span>
                <span className="text-emerald-400 font-medium">{formatToman(totalVat)} تومان</span>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center font-bold text-xs">
                <span className="text-white">مبلغ نهایی پیش‌فاکتور:</span>
                <div className="text-left" dir="ltr">
                  <span className="text-base font-black gold-gradient-text">{formatToman(totalFinal)}</span>
                  <span className="text-[10px] text-zinc-400 mr-1">تومان</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onOpenOfficialInvoice}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1F232D] hover:bg-[#282C38] text-[#F5D77F] border border-[#D4AF37]/40 transition-all"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>مشاهده و چاپ پیش‌فاکتور رسمی اتحادیه</span>
              </button>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black bg-[#D4AF37] hover:bg-[#E5C158] text-black shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
              >
                <span>تکمیل خرید و پرداخت امن شاپرک</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>پرداخت تضمین‌شده از طریق درگاه مستقیم بانک مرکزی (شاپرک)</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
