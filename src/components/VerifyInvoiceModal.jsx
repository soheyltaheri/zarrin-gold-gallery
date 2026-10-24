import React, { useState } from 'react';
import { X, Search, ShieldCheck, CheckCircle2, AlertCircle, FileText, QrCode } from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function VerifyInvoiceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [code, setCode] = useState('ZS-1403-9942');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setSearched(true);
    if (code.trim().toUpperCase().includes('ZS') || code.trim().toUpperCase().includes('ZAR') || code.length > 4) {
      setResult({
        valid: true,
        invoiceNumber: code.toUpperCase(),
        issueDate: '۱۴۰۳/۰۸/۲۴ - ساعت ۱۱:۴۲',
        status: 'تأیید شده و ثبت رسمی در سامانه جامع تجارت',
        buyerName: 'مشتری گرامی گالری زرین‌شاهکار',
        goldPurity: 'عیار ۷۵۰ (۱۸ عیار استاندارد اتحادیه تهران)',
        assayLabCode: 'ری‌گیری تابان - کد تاییدیه ۹۸۱-T',
        taxClearance: 'معافیت کامل اصل طلا اعمال گردیده و مالیات قانونی پرداخت شده است',
        seller: 'گالری زرین‌شاهکار - پروانه کسب ۷۵۴۱',
      });
    } else {
      setResult({ valid: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                سامانه استعلام اصالت فاکتور رسمی اتحادیه
              </h2>
              <p className="text-xs text-zinc-400">
                بررسی شناسه الکترونیکی، عیارسنجی ری‌گیری و وضعیت مالیاتی
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          <form onSubmit={handleVerify} className="space-y-3">
            <label className="text-xs text-zinc-300 font-semibold block">
              شماره سریال فاکتور یا کد رهگیری خرید:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثلاً ZS-1403-9942 یا کد روی فاکتور"
                className="flex-1 bg-[#181B22] border border-zinc-700 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono text-center uppercase"
                dir="ltr"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>استعلام آنلاین</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-500">
              نکته: برای تست، می‌توانید دکمه استعلام را با همین کد پیش‌فرض بفشارید.
            </p>
          </form>

          {/* Verification Results */}
          {searched && (
            result?.valid ? (
              <div className="bg-[#0B0C0E] border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-zinc-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>فاکتور رسمی معتبر است و اصالت طلای آن تضمین شده است</span>
                </div>

                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">شماره سریال:</span>
                    <span className="font-mono font-bold text-white">{result.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">تاریخ و ساعت ثبت:</span>
                    <span>{result.issueDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">عیارسنجی رسمی:</span>
                    <span className="font-semibold text-[#F5D77F]">{result.goldPurity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">آزمایشگاه ری‌گیری:</span>
                    <span className="font-mono text-emerald-300">{result.assayLabCode}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">واحد صنفی صادرکننده:</span>
                    <span className="font-semibold text-white">{result.seller}</span>
                  </div>
                  <div className="pt-2 text-[11px] text-zinc-400 leading-relaxed">
                    وضعیت مالیات: {result.taxClearance}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5 text-center space-y-2 text-xs text-rose-300">
                <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
                <div className="font-bold">فاکتوری با این شماره یافت نشد</div>
                <p className="text-zinc-400">
                  لطفاً از صحت ارقام و حروف انگلیسی کد وارد شده اطمینان حاصل فرمایید یا با پشتیبانی گالری تماس حاصل نمایید.
                </p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#161820] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );
}
