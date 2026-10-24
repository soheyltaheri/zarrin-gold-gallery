import React from 'react';
import {
  Sparkles,
  Calculator,
  Wallet,
  ShoppingBag,
  Menu,
  Heart,
  Scale,
  Activity
} from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';

export default function MobileBottomNav({
  activePage,
  onSelectPage,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenCalculator,
  onOpenWishlist,
  onOpenRatesModal,
}) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0E1015]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] pb-safe">
      <div className="flex items-center justify-around">

        {/* 1. Store / ویترین */}
        <button
          onClick={() => onSelectPage('store')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activePage === 'store'
              ? 'text-[#F5D77F]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activePage === 'store' ? 'text-[#D4AF37]' : ''}`} />
          <span className="text-[10px] font-bold mt-0.5">ویترین</span>
        </button>

        {/* 2. Gold Vault / صندوق */}
        <button
          onClick={() => onSelectPage('savings_vault')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
            activePage === 'savings_vault'
              ? 'text-[#F5D77F]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Wallet className={`w-5 h-5 ${activePage === 'savings_vault' ? 'text-[#D4AF37]' : ''}`} />
          <span className="text-[10px] font-bold mt-0.5">صندوق طلا</span>
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
        </button>

        {/* 3. Center Highlight: Smart Calculator / ماشین‌حساب */}
        <button
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D77F] p-0.5 shadow-lg shadow-[#D4AF37]/30 group-active:scale-95 transition-transform">
            <div className="w-full h-full bg-[#0E1015] rounded-full flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
          <span className="text-[10px] font-black text-[#F5D77F] mt-1">ماشین‌حساب</span>
        </button>

        {/* 4. Market / حباب سکه */}
        <button
          onClick={() => onSelectPage('market_analysis')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activePage === 'market_analysis'
              ? 'text-[#F5D77F]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Activity className={`w-5 h-5 ${activePage === 'market_analysis' ? 'text-[#D4AF37]' : ''}`} />
          <span className="text-[10px] font-bold mt-0.5">دیده‌بان</span>
        </button>

        {/* 5. Cart / پیش‌فاکتور */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-zinc-400 hover:text-zinc-200 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">پیش‌فاکتور</span>
        </button>

      </div>
    </div>
  );
}
