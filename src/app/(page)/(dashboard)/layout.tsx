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
      <main className="relative top-16 flex bg-gray-100 md:top-0">
        <div className="fixed hidden md:block">
          <Navigation />
        </div>
        <div className="w-full md:ml-64">{children}</div>
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </main>
    </>
  );
}
