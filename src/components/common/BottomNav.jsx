import { NavLink } from "react-router-dom";
import productIcon from "../../assets/images/figma/navigation/nav-product.svg?raw";
import storyIcon from "../../assets/images/figma/navigation/nav-story.svg?raw";
import nfcIcon from "../../assets/images/figma/navigation/nav-nfc.svg?raw";
import aiIcon from "../../assets/images/figma/navigation/nav-ai.svg?raw";
import myIcon from "../../assets/images/figma/navigation/nav-my.svg?raw";

const navItems = [
  { key: "product", label: "Product", path: "/product", icon: productIcon },
  { key: "story", label: "Story", path: "/story", icon: storyIcon },
  { key: "nfc", label: "NFC", path: "/nfc", icon: nfcIcon, isCenter: true },
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
function BottomNavItem({ item }) {
  if (item.isCenter) {
    return (
      <NavLink
        to={item.path}
        aria-label={item.label}
        className={({ isActive }) =>
          cx(
            "flex h-full w-[88px] flex-none items-center justify-center border-t no-underline",
            isActive ? "border-black text-[#0a0908]" : "border-transparent text-[#8a8078]",
          )
        }
      >
        {({ isActive }) => (
          <span className="relative flex size-[40px] items-center justify-center">
            <span className="absolute left-[6.5px] top-[5.5px] size-[27px] overflow-hidden">
              <SvgIcon svg={item.icon} className="h-[13px] w-[24px]" />
              <span
                className={cx(
                  "absolute inset-x-0 top-[13px] text-center font-[Arial] text-[10px] leading-[17px]",
                  isActive ? "font-bold" : "font-normal",
                )}
              >
                NFC
              </span>
            </span>
          </span>
        )}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={item.path}
      aria-label={item.label}
      className={({ isActive }) =>
        cx(
          "flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[3px] border-t no-underline",
          isActive ? "border-black text-[#0a0908]" : "border-transparent text-[#8a8078]",
        )
      }
    >
      {({ isActive }) => (
        <>
          <SvgIcon
            svg={item.icon}
            className={cx(
              "size-[18px] shrink-0 overflow-hidden",
              item.iconClassName,
            )}
          />
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
  return (
    <nav
      aria-label="Main navigation"
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[62px] w-full max-w-[430px] items-stretch justify-center border-t border-[#e5e0da] bg-white px-[5px]",
        className,
      )}
    >
      {navItems.map((item) => (
        <BottomNavItem key={item.key} item={item} />
      ))}
    </nav>
  );
}

export default BottomNav;
