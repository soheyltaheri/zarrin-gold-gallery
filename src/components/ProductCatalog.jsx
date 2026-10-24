import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Search,
  Gem,
  Percent,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductCatalog({
  currentGoldPrice,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
}) {
  // Advanced filters state
  const [weightFilter, setWeightFilter] = useState('all'); // 'all', 'under_3', '3_to_7', 'above_7'
  const [wageFilter, setWageFilter] = useState('all'); // 'all', 'zero', 'low', 'normal'
  const [colorFilter, setColorFilter] = useState('all'); // 'all', 'yellow', 'white', 'rosegold', 'bicolor'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price_asc', 'price_desc', 'wage_asc', 'weight_desc'
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (activeCategory !== 'all') {
          if (activeCategory === 'low_wage') {
            if (p.wagePercent > 8) return false;
          } else if (p.category !== activeCategory) {
            return false;
          }
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCode = p.code.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          if (!matchName && !matchCode && !matchCategory) return false;
        }

        // Weight Filter
        if (weightFilter === 'under_3' && p.weight >= 3) return false;
        if (weightFilter === '3_to_7' && (p.weight < 3 || p.weight > 7)) return false;
        if (weightFilter === 'above_7' && p.weight <= 7) return false;

        // Wage Filter
        if (wageFilter === 'zero' && p.wagePercent !== 0) return false;
        if (wageFilter === 'low' && (p.wagePercent <= 0 || p.wagePercent > 10)) return false;
        if (wageFilter === 'normal' && p.wagePercent <= 10) return false;

        // Color Filter
        if (colorFilter !== 'all' && p.goldColor !== colorFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.weight - b.weight;
        }
        if (sortBy === 'price_desc') {
          return b.weight - a.weight;
        }
        if (sortBy === 'wage_asc') {
          return a.wagePercent - b.wagePercent;
        }
        if (sortBy === 'weight_desc') {
          return b.weight - a.weight;
        }
        // Default featured/bestseller
        return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
      });
  }, [activeCategory, searchQuery, weightFilter, wageFilter, colorFilter, sortBy]);

  const activeFiltersCount =
    (weightFilter !== 'all' ? 1 : 0) +
    (wageFilter !== 'all' ? 1 : 0) +
    (colorFilter !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setWeightFilter('all');
    setWageFilter('all');
    setColorFilter('all');
  };

  return (
    <section id="products-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">

      {/* Catalog Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ویترین تخصصی زرین‌شاهکار</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مجموعه طلا، جواهرات و شمش سرمایه‌گذاری
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            تمامی مصنوعات با شناسنامه عیار ۷۵۰، کد T اتحادیه و برچسب قیمت زنده
          </p>
        </div>

        {/* Counter of products */}
        <div className="text-xs text-zinc-400 flex items-center gap-2">
          <span>تعداد کالاهای مطابق فیلتر:</span>
          <span className="font-extrabold text-white bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700">
            {filteredProducts.length} مورد
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                : 'bg-[#13151B] text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Control Bar: Filters & Sorting */}
      <div className="bg-[#111319] border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Quick Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-400 font-medium hidden sm:inline">فیلترها:</span>

          {/* Weight select */}
          <select
            value={weightFilter}
            onChange={(e) => setWeightFilter(e.target.value)}
            className="bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            <option value="all">تمام وزن‌ها</option>
            <option value="under_3">زیر ۳ گرم (ظریف/کادویی)</option>
            <option value="3_to_7">۳ الی ۷ گرم (متوسط)</option>
            <option value="above_7">بالای ۷ گرم (سنگین/لوکس)</option>
          </select>

          {/* Wage select */}
          <select
            value={wageFilter}
            onChange={(e) => setWageFilter(e.target.value)}
            className="bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            <option value="all">تمام اجرت‌ها</option>
            <option value="zero">صفر درصد (آب‌شده)</option>
            <option value="low">کم‌اجرت (زیر ۱۰٪)</option>
            <option value="normal">اجرت استاندارد و لوکس</option>
          </select>

          {/* Color select */}
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            <option value="all">تمام رنگ‌های طلا</option>
            <option value="yellow">طلای زرد ۱۸ عیار</option>
            <option value="white">طلای سفید</option>
            <option value="rosegold">طلای رزگلد</option>
            <option value="bicolor">دو یا سه رنگ (البرناردو)</option>
          </select>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-800/40 px-2.5 py-1.5 rounded-xl transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>حذف فیلترها ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto text-xs">
          <ArrowUpDown className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-zinc-400 font-medium">مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#181B22] border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            <option value="featured">محبوب‌ترین و برگزیده</option>
            <option value="price_asc">کم‌وزن‌ترین (قیمت کمتر)</option>
            <option value="price_desc">سنگین‌ترین (ارزش بالاتر)</option>
            <option value="wage_asc">کمترین درصد اجرت ساخت</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentGoldPrice={currentGoldPrice}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">محصولی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            لطفاً عبارت جستجو یا فیلترهای وزن و اجرت را تغییر دهید.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              resetFilters();
              onSelectCategory('all');
            }}
            className="px-5 py-2.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C158] transition-all"
          >
            مشاهده تمام محصولات
          </button>
        </div>
      )}
    </section>
  );
}
