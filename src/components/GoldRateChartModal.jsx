import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  Info,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { formatToman } from '../utils/goldCalculator';
import { goldPriceHistory } from '../data/marketRates';

export default function GoldRateChartModal({ isOpen, onClose, rates }) {
  if (!isOpen) return null;

  const [timeframe, setTimeframe] = useState('1W'); // '1W', '1M', '6M', '1Y'
  const historyData = goldPriceHistory[timeframe] || goldPriceHistory['1W'];

  // Calculate min & max for SVG scaling
  const prices = historyData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.98;
  const maxPrice = Math.max(...prices) * 1.02;
  const priceRange = maxPrice - minPrice || 1;

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  // Generate points
  const points = historyData.map((item, idx) => {
    const x = paddingX + (idx / (historyData.length - 1)) * graphWidth;
    const y = svgHeight - paddingY - ((item.price - minPrice) / priceRange) * graphHeight;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const [hoveredPoint, setHoveredPoint] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#161820]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                تابلوی زنده نرخ‌ها و نمودار تحلیلی طلا و سکه
              </h2>
              <p className="text-xs text-zinc-400">
                استعلام مستقیم از مظنه بازار تهران، طلافروشان سبزه میدان و اونس جهانی
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Timeframe selector & Current 18k Highlight */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0B0C0E] border border-zinc-800/80 p-4 rounded-xl">
            <div>
              <div className="text-xs text-zinc-400">قیمت طلای ۱۸ عیار (۷۵۰) در این لحظه:</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black gold-gradient-text" dir="ltr">
                  {formatToman(rates.gold18k.price)}
                </span>
                <span className="text-xs text-zinc-400">تومان / هر گرم</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  +{rates.gold18k.changePercent}٪
                </span>
              </div>
            </div>

            {/* Timeframe buttons */}
            <div className="flex gap-1.5 bg-[#171922] p-1 rounded-xl border border-zinc-800">
              {[
                { label: '۱ هفته', key: '1W' },
                { label: '۱ ماه', key: '1M' },
                { label: '۶ ماه', key: '6M' },
                { label: '۱ سال', key: '1Y' },
              ].map((tf) => (
                <button
                  key={tf.key}
                  onClick={() => { setTimeframe(tf.key); setHoveredPoint(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    timeframe === tf.key
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="bg-[#0E1015] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-zinc-400 font-medium">روند تغییرات طلای ۱۸ عیار ({timeframe}):</span>
              {hoveredPoint ? (
                <div className="text-xs bg-[#1A1D26] border border-[#D4AF37]/40 px-3 py-1 rounded-lg text-white">
                  <span className="text-zinc-400">{hoveredPoint.date}: </span>
                  <span className="font-bold text-[#F5D77F]">{formatToman(hoveredPoint.price)} تومان</span>
                </div>
              ) : (
                <span className="text-[11px] text-zinc-500">برای مشاهده قیمت، ماوس را روی نمودار حرکت دهید</span>
              )}
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-52 sm:h-64 overflow-visible"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                {[0, 0.33, 0.66, 1].map((pct, i) => {
                  const y = paddingY + pct * graphHeight;
                  const priceLabel = Math.round(maxPrice - pct * priceRange);
                  return (
                    <g key={i}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#22252E"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 8}
                        y={y + 4}
                        fill="#71717A"
                        fontSize="9"
                        textAnchor="end"
                      >
                        {formatToman(priceLabel)}
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area */}
                <path d={areaD} fill="url(#goldGradient)" />

                {/* Main Stroke Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points on Line */}
                {points.map((pt, idx) => (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPoint?.date === pt.date ? "6" : "3.5"}
                      fill={hoveredPoint?.date === pt.date ? "#FFF" : "#D4AF37"}
                      stroke="#0E1015"
                      strokeWidth="2"
                      className="transition-all"
                    />
                    <text
                      x={pt.x}
                      y={svgHeight - 10}
                      fill="#A1A1AA"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {pt.date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Detailed Rates Grid with Coins & Gold types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(rates).map(([key, item]) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={key}
                  className="bg-[#0B0C0E] border border-zinc-800/80 rounded-xl p-3.5 space-y-2 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-semibold">{item.name}</span>
                    <span className={`flex items-center text-[11px] font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? '+' : ''}{item.changePercent}٪
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline" dir="ltr">
                    <span className="text-base font-extrabold text-white">
                      {formatToman(item.price)}
                    </span>
                    <span className="text-[10px] text-zinc-500">{item.unit}</span>
                  </div>

                  {item.bubble && (
                    <div className="text-[10px] text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-800/30 flex justify-between">
                      <span>حباب سکه:</span>
                      <span className="font-bold">{formatToman(item.bubble)} تومان</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#0E1015] flex justify-between items-center text-xs text-zinc-400">
          <span>منبع قیمت‌ها: سامانه معاملات اتحادیه طلا و صرافی ملی</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
}
