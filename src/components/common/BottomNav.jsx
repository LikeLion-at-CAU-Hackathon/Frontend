import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DEFAULT_PRODUCT_ID } from "../../mocks/products";
import useAppStore from "../../stores/useAppStore";
import productIcon from "../../assets/images/figma/navigation/nav-product.svg?raw";
import storyIcon from "../../assets/images/figma/navigation/nav-story.svg?raw";
import nfcIcon from "../../assets/images/figma/navigation/nav-nfc.svg?raw";
import aiIcon from "../../assets/images/figma/navigation/nav-ai.svg?raw";
import myIcon from "../../assets/images/figma/navigation/nav-my.svg?raw";

const getProductIdFromPath = (pathname) => {
  return pathname.match(/^\/product\/([^/]+)/)?.[1];
};

const createNavItems = (productId) => [
  { key: "product", label: "Product", path: `/product/${productId}`, icon: productIcon },
  { key: "story", label: "Story", path: `/product/${productId}/story`, icon: storyIcon },
  {
    key: "nfc",
    label: "NFC",
    path: `/product/${productId}/explore-more`,
    icon: nfcIcon,
    iconClassName: "h-[12px] w-[22.5px]",
  },
  { key: "ai", label: "AI", path: "/ai", icon: aiIcon },
  {
    key: "my",
    label: "My",
    path: "/my",
    icon: myIcon,
    iconClassName: "h-[12.682px] w-[12px]",
  },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

const isProductPathActive = (pathname, productId) => {
  const productBasePath = `/product/${productId}`;

  return (
    pathname === productBasePath ||
    pathname.startsWith(`${productBasePath}/stock`) ||
    pathname.startsWith(`${productBasePath}/size-compare`)
  );
};

const isItemActive = (item, pathname, productId) => {
  if (item.key === "product") {
    return isProductPathActive(pathname, productId);
  }

  if (item.key === "story") {
    return pathname.startsWith(`/product/${productId}/story`);
  }

  if (item.key === "nfc") {
    return pathname.startsWith(`/product/${productId}/explore-more`);
  }

  return pathname === item.path || pathname.startsWith(`${item.path}/`);
};

// SVG 아이콘 코드를 화면에 보여주는 기능
function SvgIcon({ svg, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={cx("block [&>svg]:size-full", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// 하단 네비게이션의 탭 버튼 하나
function BottomNavItem({ item, isActive }) {
  return (
    <NavLink
      to={item.path}
      aria-label={item.label}
      className={() =>
        cx(
          "flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[3px] border-t-2 no-underline",
          isActive ? "border-black text-[#0a0908]" : "border-transparent text-[#8a8078]",
        )
      }
    >
      {() => (
        <>
          <span className="flex h-[18px] w-[24px] shrink-0 items-center justify-center">
            <SvgIcon
              svg={item.icon}
              className={cx(
                item.iconClassName || "size-[18px]",
                "overflow-hidden",
              )}
            />
          </span>
          <span
            className={cx(
              "whitespace-nowrap text-center text-[12px] leading-[15px] tracking-[0.2px] text-current",
              isActive ? "font-semibold" : "font-normal",
            )}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

// 화면 아래에 고정되는 하단 네비게이션 바
function BottomNav({ className = "" }) {
  const { pathname } = useLocation();
  const productIdFromPath = getProductIdFromPath(pathname);
  const currentProductId = useAppStore((state) => state.currentProductId);
  const setCurrentProductId = useAppStore((state) => state.setCurrentProductId);
  const productId = productIdFromPath ?? currentProductId ?? DEFAULT_PRODUCT_ID;
  const navItems = createNavItems(productId);

  useEffect(() => {
    if (productIdFromPath && productIdFromPath !== currentProductId) {
      setCurrentProductId(productIdFromPath);
    }
  }, [currentProductId, productIdFromPath, setCurrentProductId]);

  return (
    <nav
      aria-label="Main navigation"
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[62px] w-full max-w-[430px] items-stretch justify-center border-t border-[#e5e0da] bg-white px-[5px]",
        className,
      )}
    >
      {navItems.map((item) => (
        <BottomNavItem
          key={item.key}
          item={item}
          isActive={isItemActive(item, pathname, productId)}
        />
      ))}
    </nav>
  );
}

export default BottomNav;
