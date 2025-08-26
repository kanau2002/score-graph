import Header from "@/components/general/Header";
import BottomNavigation from "@/components/general/BottomNavigation";
import Navigation from "@/components/general/Navigation";
import { followService } from "@/core/Service/followService";
export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isBadge = await followService.isFollowersNotFollowingBack();
  return (
    <>
      <div className="md:hidden">
        <Header isBadge={isBadge} />
      </div>
      <main className="flex bg-gray-100 min-h-screen standalone-top-adjust">
        <div className="fixed hidden md:block">
          <Navigation />
        </div>
        <div className="relative w-full md:ml-64 top-16 md:top-0">
          {children}
        </div>
        <div className="standalone-only">
          <BottomNavigation />
        </div>
      </main>
    </>
  );
}
