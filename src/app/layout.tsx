import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import GoogleAnalyticsInitializer from "@/components/general/GoogleAnalyticsInitializer";

export const metadata: Metadata = {
  title: "ScoreGraph",
  description: "センター過去問の点数記録App",
  icons: {
    icon: [
      { url: "/graph.png", sizes: "32x32" },
      { url: "/graph.png", sizes: "192x192" },
    ],
    apple: [{ url: "/graph.png", sizes: "180x180" }],
  },
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
        <Suspense fallback={null}>
          <GoogleAnalyticsInitializer />
        </Suspense>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
