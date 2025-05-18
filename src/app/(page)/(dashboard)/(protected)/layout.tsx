import ProtectedRoute from "@/components/(auth)/ProtectedRoute";

// 未認証の場合はhomeへリダイレクトする
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
