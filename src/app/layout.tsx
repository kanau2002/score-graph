import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ScoreGraph",
  description: "センター過去問の点数記録App",
  manifest: "/site.webmanifest",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "ScoreGraph",
    capable: true, // フルスクリーンモード有効化（オプション）
  },
};
export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="text-gray-700">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
