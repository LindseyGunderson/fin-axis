import type { LucideIcon } from "lucide-react";
import {
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: Wallet,
  },
  {
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
];

export const secondaryNavigation: NavigationItem[] = [
  {
    label: "Settings",
    href: "#",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "#",
    icon: HelpCircle,
  },
];
