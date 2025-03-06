// app/components/BottomNavigation.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UsersRound, Pencil, CircleUserRound } from "lucide-react";

import { ROUTES } from "@/constants";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "ホーム",
      href: ROUTES.HOME,
      icon: HomeIcon,
      activeIcon: HomeIcon,
    },
    {
      label: "フレンド",
      href: ROUTES.FRIEND,
      icon: UsersRound,
      activeIcon: UsersRound,
    },
    {
      label: "入力",
      href: ROUTES.INPUT,
      icon: Pencil,
      activeIcon: Pencil,
    },
    {
      label: "プロフィール",
      href: ROUTES.PROFILE,
      icon: CircleUserRound,
      activeIcon: CircleUserRound,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-11 w-full h-18 bg-white border-t border-gray-200">
      <div className="grid h-full grid-cols-4 mx-auto max-w-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center"
            >
              <Icon
                className={`w-8 h-8 ${isActive ? "font-bold" : "font-normal"}`}
                stroke="black"
                strokeWidth={isActive ? 2.5 : 1.5}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
