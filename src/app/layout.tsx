//app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
// import { ToastProvider } from '../hooks/useToast'

export const metadata: Metadata = {
  title: "score-graph",
  description: "センター過去問の点数記録App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full">
        {/* <ToastProvider> */}
        <div className="min-h-full bg-[#FDF4EC]">{children}</div>
        {/* </ToastProvider> */}
      </body>
    </html>
  );
}
