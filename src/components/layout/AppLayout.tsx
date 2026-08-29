import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
      if (isSidebarOpen) {
        const firstFocusableElement =
          sidebarRef.current?.querySelector<HTMLElement>(
            "a[href], button:not([disabled])",
          );
        firstFocusableElement?.focus();
      }
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block"
        aria-label="Desktop navigation"
      >
        <Sidebar />
      </aside>

      {/* Tablet / mobile sidebar */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 cursor-default bg-brand-900/40 lg:hidden"
            onClick={closeSidebar}
          />

          {/* Drawer */}
          <aside
            ref={sidebarRef}
            className="fixed inset-y-0 left-0 z-50 w-60 lg:hidden"
            aria-label="Mobile navigation"
          >
            <Sidebar onNavigate={closeSidebar} />
          </aside>
        </>
      )}

      {/* Main application area */}
      <div className="lg:pl-60">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
