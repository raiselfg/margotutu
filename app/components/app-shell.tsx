"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const tabs = [
  { href: "/schedule", label: "Расписание", icon: "schedule" },
  { href: "/", label: "Мои билеты", icon: "tickets" },
  { href: "/station", label: "Станции", icon: "station" },
  { href: "/other", label: "Настройки", icon: "more" },
];

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function DarkThemeSwitch() {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <button type="button" className="other-menu-row theme-row" role="switch" aria-checked={dark} onClick={toggle}>
      Темная тема
      <span className="theme-switch" aria-hidden="true" />
    </button>
  );
}

export function ScreenHeader({ children }: { children: ReactNode }) {
  return (
    <header className="screen-header">
      <div className="navigation-bar">{children}</div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentTab = tabs.find((tab) => tab.href === pathname);
  const scrollPositions = useRef<Record<string, number>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(true);
  const isTicket = pathname === "/ticket";
  const isCreateTicket = pathname === "/create-ticket";

  useEffect(() => {
    try {
      setDark(localStorage.getItem("theme") !== "light");
    } catch {
      // The current session can still change its theme.
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#34364d" : "#ffffff");
  }, [dark]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Keep the change in memory when storage is unavailable.
    }
  }

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = scrollPositions.current[pathname]
        ?? (pathname === "/" ? Number(sessionStorage.getItem("ticket-list-scroll")) : 0);
    }
  }, [pathname]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: toggleTheme }}>
      <div className={`app-shell${isCreateTicket ? " app-shell-create" : ""}`}>
        {!isTicket && <ScreenHeader>
          {isCreateTicket && <Link href="/other" className="back-button" aria-label="Назад в настройки"><svg viewBox="0 0 12 22" aria-hidden="true"><path d="M10 2 1 11l9 9" /></svg></Link>}
          <h1>{isCreateTicket ? "Получить билет" : currentTab?.label ?? "Мои билеты"}</h1>
        </ScreenHeader>}
        <div
          className="page-content"
          role={isTicket ? undefined : "main"}
          ref={contentRef}
          onScroll={(event) => {
            const scrollTop = event.currentTarget.scrollTop;
            scrollPositions.current[pathname] = scrollTop;
            if (pathname === "/") sessionStorage.setItem("ticket-list-scroll", String(scrollTop));
          }}
        >{children}</div>
        {!isTicket && <nav className="tab-bar" aria-label="Основная навигация">
          {tabs.map((tab) => (
            <Link key={tab.href} href={tab.href} className="tab" aria-current={pathname === tab.href || (isCreateTicket && tab.href === "/other") ? "page" : undefined}>
              <span className="tab-icon" style={{ maskImage: `url(/images/nav-${tab.icon}.png)` }} aria-hidden="true" />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>}
      </div>
    </ThemeContext.Provider>
  );
}
