import { NavLink } from "react-router";
import { primaryNavigation, secondaryNavigation } from "../../app/navigation";

type SidebarProps = {
  onNavigate?: () => void;
};

function NavigationSection({
  items,
  onNavigate,
}: {
  items: typeof primaryNavigation;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-md px-3 py-2.5",
                "text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-white/70",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            {" "}
            <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />{" "}
            <span>{item.label}</span>{" "}
          </NavLink>
        );
      })}
    </nav>
  );
}

function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-brand-900 text-white">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-white text-sm font-bold text-brand-900">
            F
          </div>

          <span className="text-base font-semibold tracking-tight">
            Fin Axis
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col px-3 py-6">
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Business
          </p>

          <NavigationSection
            items={primaryNavigation}
            onNavigate={onNavigate}
          />
        </div>

        <div className="mt-auto">
          <NavigationSection
            items={secondaryNavigation}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* User */}
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            SC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Sarah Chen
            </p>

            <p className="truncate text-xs text-white/50">Acme Studio</p>
          </div>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
