import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className="h-full text-gray-700">
        <AuthProvider>
          <div className="min-h-full">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
