import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/common";

const pages = [
  { path: "/product", title: "Product" },
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
    <div className="mx-auto min-h-screen max-w-[430px] bg-[#f8f6f3] pb-[calc(62px+env(safe-area-inset-bottom))]">
      <Routes>
        <Route path="/" element={<Navigate to="/ai" replace />} />
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<PlaceholderPage title={page.title} />}
          />
        ))}
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
