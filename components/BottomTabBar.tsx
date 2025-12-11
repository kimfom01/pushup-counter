"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dumbbell, History, Home, ChartNoAxesCombined } from "lucide-react";

const BottomTabBar = () => {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Counter", href: "/dashboard/counter", icon: Dumbbell },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: ChartNoAxesCombined,
    },
    { name: "History", href: "/dashboard/history", icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-background/70 backdrop-blur-xl flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className="flex flex-col items-center gap-1 group"
          >
            <Icon
              className={cn(
                "h-6 w-6 transition-colors group-hover:text-primary",
                active ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors group-hover:text-primary",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
