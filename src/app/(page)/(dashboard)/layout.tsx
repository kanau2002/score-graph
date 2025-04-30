import Header from "@/components/general/Header";
import BottomNavigation from "@/components/general/BottomNavigation";
import Navigation from "@/components/general/Navigation";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:hidden">
        <Header />
      </div>
      <main className="flex bg-gray-100 min-h-screen">
        <div className="fixed hidden md:block">
          <Navigation />
        </div>
        <div className="relative w-full md:ml-64 top-16 md:top-0">
          {children}
        </div>
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </main>
    </>
  );
}
