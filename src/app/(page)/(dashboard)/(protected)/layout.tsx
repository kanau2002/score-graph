import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
