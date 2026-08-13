import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BottomNav } from "./components/common";
import NfcFailedPage from "./pages/nfc/NfcFailedPage";
import NfcLoadingPage from "./pages/nfc/NfcLoadingPage";
import ProductExploreMorePage from "./pages/nfc/ProductExploreMorePage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import ProductSizeComparePage from "./pages/size/ProductSizeComparePage";
import ProductSizeCompareResultPage from "./pages/size/ProductSizeCompareResultPage";
import ProductStockPage from "./pages/stock/ProductStockPage";

const pages = [
  { path: "/story", title: "Story" },
  { path: "/nfc", title: "NFC" },
  { path: "/ai", title: "AI" },
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
  const isNfcTaggingPage = ["/nfc/loading", "/nfc/failed", "/nfc/staff-called"].includes(pathname);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f6f3]">
      <div
        className={`min-h-0 flex-1 overflow-y-auto ${
          isNfcTaggingPage ? "" : "pb-[calc(62px+env(safe-area-inset-bottom))]"
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/product" replace />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/product/stock" element={<ProductStockPage />} />
          <Route path="/product/explore-more" element={<ProductExploreMorePage />} />
          <Route path="/product/size-compare" element={<ProductSizeComparePage />} />
          <Route path="/product/size-compare/result" element={<ProductSizeCompareResultPage />} />
          <Route path="/nfc/loading" element={<NfcLoadingPage />} />
          <Route path="/nfc/failed" element={<NfcFailedPage />} />
          <Route path="/nfc/staff-called" element={<NfcFailedPage isStaffCalled />} />
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<PlaceholderPage title={page.title} />}
            />
          ))}
        </Routes>
      </div>
      {!isNfcTaggingPage && <BottomNav className="max-w-[440px]" />}
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
