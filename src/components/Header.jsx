import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  Search,
  Heart,
  ShoppingBag,
  FileCheck2,
  Scale,
  Menu,
  X,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  RefreshCw,
  Wallet,
  Activity,
  BookOpen,
  Crown
} from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function Header({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCalculator,
  onOpenRatesModal,
  onOpenCustomOrder,
  onOpenVerifyInvoice,
  searchQuery,
  setSearchQuery,
  activeCategory,
  onSelectCategory,
  activePage,
  onSelectPage,
  isApiLive,
  isRefreshingRates,
  onRefreshRates,
  ratesLastUpdated,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navPages = [
    { id: 'store', label: 'ویترین و فروشگاه', icon: Sparkles },
    { id: 'savings_vault', label: 'صندوق طلای خرد', icon: Wallet, badge: 'پس‌انداز' },
    { id: 'market_analysis', label: 'دیده‌بان حباب و بازار', icon: Activity },
    { id: 'comparison', label: 'مقایسه محصولات', icon: Scale },
    { id: 'heritage', label: 'اصالت و نوبت VIP', icon: Crown },
    { id: 'blog_guide', label: 'دانشنامه طلا', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl transition-all">
      {/* Top micro bar for VIP helpline & trust */}
      <div className="hidden lg:block bg-gradient-to-r from-[#14161C] via-[#1D1B16] to-[#14161C] border-b border-[#D4AF37]/10 py-1.5 px-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              پروانه رسمی اتحادیه طلا و جواهر تهران • کد صنفی: ۷۵۴۱-۹۸
            </span>
            <span className="text-zinc-500">•</span>
            {/* Live API sync indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isApiLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-xs text-zinc-300">
                {isApiLive ? 'وب‌سرویس زنده نرخ‌های لحظه‌ای متصل' : 'تابلوی استعلام نرخ اتحادیه'}
              </span>
              <button
                onClick={onRefreshRates}
                disabled={isRefreshingRates}
                className="flex items-center gap-1 text-[11px] text-[#D4AF37] hover:text-[#F3E5AB] pr-1 disabled:opacity-50"
                title="به‌روزرسانی قیمت‌های لحظه‌ای"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshingRates ? 'animate-spin' : ''}`} />
                <span>بروزرسانی ({ratesLastUpdated || 'زنده'})</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors" onClick={onOpenVerifyInvoice}>
              پیگیری اصالت فاکتور رسمی
            </span>
            <span>•</span>
            <a href="tel:02188997766" className="flex items-center gap-1 text-[#D4AF37] hover:underline font-semibold" dir="ltr">
              <PhoneCall className="w-3 h-3" />
              ۰۲۱ - ۸۸ ۹۹ ۷۷ ۶۶
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-[#D4AF37] rounded-lg hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => onSelectPage('store')}
            className="flex items-center gap-3 group text-right cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8B6508] p-[1.5px] shadow-lg shadow-[#D4AF37]/20 group-hover:shadow-[#D4AF37]/40 transition-all">
              <div className="w-full h-full bg-[#0E1015] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight gold-gradient-text font-serif">
                  زرین‌شاهکار
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded font-medium">
                  عیار ۱۸ (۷۵۰)
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light hidden sm:block">
                گالری تخصصی طلا، جواهر و شمش سرمایه‌گذاری
              </p>
            </div>
          </button>
        </div>

        {/* Global Search with instant preview */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4 relative">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'store') onSelectPage('store');
              }}
              placeholder="جستجو در مصنوعات طلا، کد کالا یا دسته‌بندی..."
              className="w-full bg-[#14161C] border border-zinc-800 focus:border-[#D4AF37]/60 focus:bg-[#181B22] text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 rounded-full py-2.5 pr-10 pl-4 outline-none transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action icons & utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Smart Calculator button */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/15 to-[#B8860B]/20 hover:from-[#D4AF37]/25 hover:to-[#B8860B]/30 border border-[#D4AF37]/40 text-[#F5D77F] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-[1.02]"
            title="ماشین حساب محاسبه قیمت طلا با اجرت، سود و مالیات"
          >
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">ماشین‌حساب طلا</span>
          </button>

          {/* Rates Chart Button */}
          <button
            onClick={onOpenRatesModal}
            className="hidden lg:flex items-center gap-1.5 bg-[#161820] hover:bg-[#1E212B] border border-zinc-800 hover:border-[#D4AF37]/30 text-zinc-300 hover:text-white px-3 py-2 rounded-xl text-xs transition-all"
            title="تحلیل روند و نمودار قیمت طلا"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>نمودار نرخ</span>
          </button>

          {/* Custom Bespoke Order Button */}
          <button
            onClick={onOpenCustomOrder}
            className="hidden xl:flex items-center gap-1.5 bg-[#161820] hover:bg-[#1E212B] border border-zinc-800 hover:border-[#D4AF37]/30 text-zinc-300 hover:text-[#D4AF37] px-3 py-2 rounded-xl text-xs transition-all"
            title="طراحی و ساخت طلای اختصاصی بر اساس وزن و بودجه"
          >
            <Scale className="w-4 h-4 text-[#D4AF37]" />
            <span>سفارش ساخت</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 bg-[#161820] hover:bg-[#1E212B] border border-zinc-800 hover:border-[#D4AF37]/30 text-zinc-300 hover:text-rose-400 rounded-xl transition-all"
            title="لیست علاقه‌مندی‌ها"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B0C0E] shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart & Official Invoice Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02]"
            title="سبد خرید و صدور پیش‌فاکتور رسمی"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-right">
              <span className="leading-tight">پیش‌فاکتور</span>
              {cartTotal > 0 && (
                <span className="text-[10px] text-zinc-900 font-extrabold hidden sm:inline">
                  {formatToman(cartTotal)} ت
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Pages Multi-tab Navigation Bar */}
      <div className="bg-[#0E1015] border-t border-zinc-800/80 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-4 sm:gap-6">
            {navPages.map((pg) => {
              const Icon = pg.icon;
              const isActive = activePage === pg.id;
              return (
                <button
                  key={pg.id}
                  onClick={() => onSelectPage(pg.id)}
                  className={`flex items-center gap-1.5 font-bold transition-all whitespace-nowrap pb-1.5 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-[#F5D77F] border-[#D4AF37]'
                      : 'text-zinc-400 hover:text-zinc-200 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-500'}`} />
                  <span>{pg.label}</span>
                  {pg.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full font-normal">
                      {pg.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4 text-xs text-zinc-400">
            <button
              onClick={onOpenVerifyInvoice}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>استعلام آنلاین فاکتور اتحادیه</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1116] border-b border-zinc-800 p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'store') onSelectPage('store');
              }}
              placeholder="جستجو در نام یا کد طلا..."
              className="w-full bg-[#181B22] border border-zinc-700 text-sm rounded-xl py-2 pr-9 pl-3 text-white"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navPages.map((pg) => (
              <button
                key={pg.id}
                onClick={() => {
                  onSelectPage(pg.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-right border transition-all ${
                  activePage === pg.id
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F5D77F]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                }`}
              >
                {pg.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-zinc-800">
            <button
              onClick={() => { onOpenCalculator(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D77F] py-2 rounded-xl text-xs font-bold"
            >
              <Calculator className="w-4 h-4" />
              ماشین‌حساب طلا
            </button>
            <button
              onClick={() => { onOpenCustomOrder(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 py-2 rounded-xl text-xs text-white"
            >
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              سفارش ساخت
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
