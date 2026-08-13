import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/common";
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

function App() {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[393px] flex-col overflow-hidden bg-[#f8f6f3]">
      <div className="min-h-0 flex-1 overflow-y-auto pb-[calc(62px+env(safe-area-inset-bottom))]">
        <Routes>
          <Route path="/" element={<Navigate to="/product" replace />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/product/stock" element={<ProductStockPage />} />
          <Route path="/product/explore-more" element={<ProductExploreMorePage />} />
          <Route path="/product/size-compare" element={<ProductSizeComparePage />} />
          <Route path="/product/size-compare/result" element={<ProductSizeCompareResultPage />} />
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<PlaceholderPage title={page.title} />}
            />
          ))}
        </Routes>
      </div>
      <BottomNav className="!max-w-[393px]" />
    </div>
  );
}

export default App;
