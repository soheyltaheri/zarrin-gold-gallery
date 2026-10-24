import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Scale } from 'lucide-react';
import { products } from '../data/products';
import { calculateGoldPrice, formatToman } from '../utils/goldCalculator';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
  currentGoldPrice,
}) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                علاقه‌مندی‌ها و نشان‌شده‌ها
              </h2>
              <p className="text-xs text-zinc-400">
                {wishlistedProducts.length} طلا و جواهر ذخیره شده برای خرید یا پیگیری قیمت
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
        <div className="p-4 sm:p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((p) => {
              const priceData = calculateGoldPrice({
                weight: p.weight,
                wagePercent: p.wagePercent,
                goldGramPrice: currentGoldPrice,
                stonePrice: p.stonePrice || 0,
              });

              return (
                <div
                  key={p.id}
                  className="bg-[#0B0C0E] border border-zinc-800/80 rounded-xl p-3 flex gap-3 items-center justify-between hover:border-zinc-700"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80';
                      }}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                    />
                    <div className="space-y-1 text-right">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                      <div className="flex gap-3 text-[11px] text-zinc-400">
                        <span>کد: {p.code}</span>
                        <span>وزن: {p.weight} گرم</span>
                        <span>اجرت: {p.wagePercent}٪</span>
                      </div>
                      <div className="text-xs font-black gold-gradient-text" dir="ltr">
                        {formatToman(priceData.totalPrice)} تومان
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onAddToCart({
                          ...p,
                          calculatedPrice: priceData.totalPrice,
                          priceBreakdown: priceData,
                        });
                      }}
                      className="p-2 sm:px-3 sm:py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                      title="افزودن به پیش‌فاکتور"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">افزودن به سبد</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-800"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-zinc-400 text-xs space-y-2">
              <Heart className="w-12 h-12 text-zinc-700 mx-auto" />
              <p>هیچ محصولی در لیست علاقه‌مندی‌های شما قرار ندارد.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#161820] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );
}
