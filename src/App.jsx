import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LiveRateTicker from './components/LiveRateTicker';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import GoldCalculatorModal from './components/GoldCalculatorModal';
import GoldRateChartModal from './components/GoldRateChartModal';
import SizeGuideModal from './components/SizeGuideModal';
import CartDrawer from './components/CartDrawer';
import OfficialInvoiceModal from './components/OfficialInvoiceModal';
import CustomDesignModal from './components/CustomDesignModal';
import VerifyInvoiceModal from './components/VerifyInvoiceModal';
import WishlistModal from './components/WishlistModal';
import CheckoutSuccessModal from './components/CheckoutSuccessModal';
import TrustBadges from './components/TrustBadges';
import Footer from './components/Footer';

// New Multi-Page Views
import DigitalGoldVault from './pages/DigitalGoldVault';
import MarketAnalysisPage from './pages/MarketAnalysisPage';
import ComparisonPage from './pages/ComparisonPage';
import HeritagePage from './pages/HeritagePage';
import BlogGuidePage from './pages/BlogGuidePage';

import { initialMarketRates } from './data/marketRates';
import { products } from './data/products';
import { calculateGoldPrice } from './utils/goldCalculator';
import { fetchLiveMarketRates } from './services/goldApiService';

export default function App() {
  // 1. Live Gold Rates State
  const [rates, setRates] = useState(initialMarketRates);
  const [isApiLive, setIsApiLive] = useState(false);
  const [isRefreshingRates, setIsRefreshingRates] = useState(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState('چند لحظه پیش');
  const currentGoldPrice = rates.gold18k.price;

  // Real-time API Fetcher Function
  const loadLiveRates = useCallback(async () => {
    setIsRefreshingRates(true);
    try {
      const data = await fetchLiveMarketRates();
      if (data && data.rates) {
        setRates(data.rates);
        setIsApiLive(data.isApiLive);
        setRatesLastUpdated(data.timestamp);
      }
    } catch (e) {
      console.warn('Live rate sync error:', e);
    } finally {
      setIsRefreshingRates(false);
    }
  }, []);

  // Fetch on mount and setup background periodic sync
  useEffect(() => {
    loadLiveRates();
    const interval = setInterval(() => {
      loadLiveRates();
    }, 45000); // sync every 45s
    return () => clearInterval(interval);
  }, [loadLiveRates]);

  // 2. Multi-Page Navigation State ('store', 'savings_vault', 'market_analysis', 'comparison', 'heritage', 'blog_guide')
  const [activePage, setActivePage] = useState('store');

  // 3. Cart State (pre-loaded with one sample luxury ring for instant visual delight)
  const [cartItems, setCartItems] = useState([
    {
      ...products[0],
      quantity: 1,
      selectedSize: '54',
      engraving: { text: 'A & M 1403', font: 'nastaliq' },
      calculatedPrice: calculateGoldPrice({
        weight: products[0].weight,
        wagePercent: products[0].wagePercent,
        goldGramPrice: initialMarketRates.gold18k.price,
        stonePrice: products[0].stonePrice,
      }).totalPrice,
      priceBreakdown: calculateGoldPrice({
        weight: products[0].weight,
        wagePercent: products[0].wagePercent,
        goldGramPrice: initialMarketRates.gold18k.price,
        stonePrice: products[0].stonePrice,
      }),
    }
  ]);

  // Recalculate cart items whenever gold price updates
  useEffect(() => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const freshBreakdown = calculateGoldPrice({
          weight: item.weight,
          wagePercent: item.wagePercent,
          goldGramPrice: currentGoldPrice,
          stonePrice: item.stonePrice || 0,
        });
        return {
          ...item,
          calculatedPrice: freshBreakdown.totalPrice,
          priceBreakdown: freshBreakdown,
        };
      })
    );
  }, [currentGoldPrice]);

  // 4. Wishlist State
  const [wishlist, setWishlist] = useState(['prod-02', 'prod-04']);

  // 5. Category & Search State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 6. Modals State
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isRatesChartOpen, setIsRatesChartOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isVerifyInvoiceOpen, setIsVerifyInvoiceOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOfficialInvoiceOpen, setIsOfficialInvoiceOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sizeGuideType, setSizeGuideType] = useState('ring');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (productWithDetails) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === productWithDetails.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity = (updated[existingIdx].quantity || 1) + 1;
        return updated;
      }
      return [...prev, { ...productWithDetails, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + ((item.calculatedPrice || 0) * (item.quantity || 1)), 0);

  const scrollToProducts = () => {
    setActivePage('store');
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E8E6E3] font-['Vazirmatn'] selection:bg-[#D4AF37] selection:text-black">

      {/* Top Live Gold & Currency Rate Ticker */}
      <LiveRateTicker
        rates={rates}
        onOpenRatesModal={() => setIsRatesChartOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Luxury Header with multi-tab navigation */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenRatesModal={() => setIsRatesChartOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        onOpenVerifyInvoice={() => setIsVerifyInvoiceOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('store');
        }}
        activePage={activePage}
        onSelectPage={setActivePage}
        isApiLive={isApiLive}
        isRefreshingRates={isRefreshingRates}
        onRefreshRates={loadLiveRates}
        ratesLastUpdated={ratesLastUpdated}
      />

      {/* Dynamic Multi-Page Router Rendering */}
      <main className="transition-all duration-300">
        {activePage === 'store' && (
          <>
            {/* Hero Section with Live Estimator */}
            <Hero
              currentGoldPrice={currentGoldPrice}
              onOpenCalculator={() => setIsCalculatorOpen(true)}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                scrollToProducts();
              }}
              onScrollToProducts={scrollToProducts}
            />

            {/* Main Interactive Product Showcase */}
            <ProductCatalog
              currentGoldPrice={currentGoldPrice}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Trust & Guarantee Badges */}
            <TrustBadges />
          </>
        )}

        {/* 2. Digital Gold Savings Vault */}
        {activePage === 'savings_vault' && (
          <DigitalGoldVault
            currentGoldPrice={currentGoldPrice}
            onOpenOfficialInvoice={() => setIsOfficialInvoiceOpen(true)}
          />
        )}

        {/* 3. Gold & Coin Market Analysis & Bubble Monitor */}
        {activePage === 'market_analysis' && (
          <MarketAnalysisPage rates={rates} />
        )}

        {/* 4. Side-by-Side Product Comparison Tool */}
        {activePage === 'comparison' && (
          <ComparisonPage
            currentGoldPrice={currentGoldPrice}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* 5. 25-Year Heritage & VIP Showroom Appointment Booking */}
        {activePage === 'heritage' && (
          <HeritagePage />
        )}

        {/* 6. Gold Buying Academy & Knowledge Magazine */}
        {activePage === 'blog_guide' && (
          <BlogGuidePage />
        )}
      </main>

      {/* Comprehensive Persian Jewelry Footer */}
      <Footer
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenVerifyInvoice={() => setIsVerifyInvoiceOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currentGoldPrice={currentGoldPrice}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={(type) => {
          setSizeGuideType(type);
          setIsSizeGuideOpen(true);
        }}
      />

      {/* 2. Interactive Gold Calculator Modal */}
      <GoldCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        currentGoldPrice={currentGoldPrice}
      />

      {/* 3. Gold Rates Chart & Market Analysis Modal */}
      <GoldRateChartModal
        isOpen={isRatesChartOpen}
        onClose={() => setIsRatesChartOpen(false)}
        rates={rates}
      />

      {/* 4. Ring & Bangle Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultType={sizeGuideType}
      />

      {/* 5. Cart & Official Invoice Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenOfficialInvoice={() => {
          setIsCartOpen(false);
          setIsOfficialInvoiceOpen(true);
        }}
        onCheckout={handleCheckout}
      />

      {/* 6. Printable Official Union Tax Invoice Modal */}
      <OfficialInvoiceModal
        isOpen={isOfficialInvoiceOpen}
        onClose={() => setIsOfficialInvoiceOpen(false)}
        cartItems={cartItems}
        currentGoldPrice={currentGoldPrice}
      />

      {/* 7. Bespoke Custom Jewelry Design Modal */}
      <CustomDesignModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        currentGoldPrice={currentGoldPrice}
      />

      {/* 8. Invoice Verification Modal */}
      <VerifyInvoiceModal
        isOpen={isVerifyInvoiceOpen}
        onClose={() => setIsVerifyInvoiceOpen(false)}
      />

      {/* 9. Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        currentGoldPrice={currentGoldPrice}
      />

      {/* 10. Checkout Success & Digital Receipt Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        totalAmount={cartTotal}
        onOpenInvoice={() => setIsOfficialInvoiceOpen(true)}
      />

    </div>
  );
}
