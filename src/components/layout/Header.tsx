import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center border-b border-white/10 bg-brand-900 px-4 text-white sm:px-6 lg:px-8">
      {/* Mobile / Tablet menu */}
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="inline-flex size-9 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </button>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        className="relative ml-auto flex size-9 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Bell aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />

        <span
          aria-hidden="true"
          className="absolute right-2 top-2 size-1.5 rounded-full bg-accent-coral"
        />
      </button>
    </header>
  );
}

export default Header;
