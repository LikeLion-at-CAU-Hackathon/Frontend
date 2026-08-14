import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/common/BottomNav";
import ErrorPage from "./pages/common/ErrorPage";
import NfcFailedPage from "./pages/nfc/NfcFailedPage";
import NfcLoadingPage from "./pages/nfc/NfcLoadingPage";
import ProductExploreMorePage from "./pages/nfc/ProductExploreMorePage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import ProductSizeComparePage from "./pages/size/ProductSizeComparePage";
import ProductSizeCompareResultPage from "./pages/size/ProductSizeCompareResultPage";
import ProductStockPage from "./pages/stock/ProductStockPage";
import ProductStoryPage from "./pages/story/ProductStoryPage";
import AiLoadingPage from "./pages/ai/AiLoadingPage";
import { DEFAULT_PRODUCT_ID } from "./mocks/products";

const pages = [
  { path: "/nfc", title: "NFC" },
  { path: "/my", title: "My" },
];

function PlaceholderPage({ title }) {
  return (
    <main className="px-5 py-8">
      <p className="text-sm font-medium text-[#8a8078]">Current tab</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#0a0908]">{title}</h1>
    </main>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isFullScreenPage = ["/nfc/loading", "/nfc/failed", "/nfc/staff-called"].includes(pathname);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f6f3]">
      <div
        className={`scrollbar-hidden min-h-0 flex-1 overflow-y-auto ${
          isFullScreenPage ? "" : "pb-[calc(62px+env(safe-area-inset-bottom))]"
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}`} replace />} />
          <Route path="/product" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}`} replace />} />
          <Route path="/story" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}/story`} replace />} />
          <Route path="/product/stock" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}/stock`} replace />} />
          <Route path="/product/explore-more" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}/explore-more`} replace />} />
          <Route path="/product/size-compare" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}/size-compare`} replace />} />
          <Route path="/product/size-compare/result" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}/size-compare/result`} replace />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/product/:productId/story" element={<ProductStoryPage />} />
          <Route path="/product/:productId/stock" element={<ProductStockPage />} />
          <Route path="/product/:productId/explore-more" element={<ProductExploreMorePage />} />
          <Route path="/product/:productId/size-compare" element={<ProductSizeComparePage />} />
          <Route path="/product/:productId/size-compare/result" element={<ProductSizeCompareResultPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/nfc/loading" element={<NfcLoadingPage />} />
          <Route path="/nfc/failed" element={<NfcFailedPage />} />
          <Route path="/nfc/staff-called" element={<NfcFailedPage isStaffCalled />} />
          <Route path="/ai" element={<AiLoadingPage />} />
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<PlaceholderPage title={page.title} />}
            />
          ))}
        </Routes>
      </div>
      {!isFullScreenPage && <BottomNav className="max-w-[440px]" />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
