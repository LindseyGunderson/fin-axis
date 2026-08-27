import { Bell } from "lucide-react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-end border-b border-white/10 bg-brand-900 px-8 text-white">
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex size-9 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Bell className="size-[18px]" strokeWidth={1.8} />

        <span
          aria-hidden="true"
          className="absolute right-2 top-2 size-1.5 rounded-full bg-accent-coral"
        />
      </button>
    </header>
  );
}

export default Header;
