///src/app/(mypage)/layout.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import Header from "../components/general/Header";
import Navigation from "../components/general/Navigation";
import "./../globals.css";
import BottomNavigation from "../components/general/BottomNavigation";

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* NextUIのPaginationを使用するにはNextUIProviderで囲う必要がある */}
      <NextUIProvider>
        <Header />
        <main className="relative top-16 flex">
          <div className="fixed hidden md:block">
            <Navigation />
          </div>
          <div className="w-full bg-[#FDF4EC] p-2 md:ml-64 md:p-6">
            {children}
          </div>
          <div className="md:hidden">
            <BottomNavigation />
          </div>
        </main>
      </NextUIProvider>
    </>
  );
}
