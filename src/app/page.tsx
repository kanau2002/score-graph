import Link from "next/link";
import Navigation from "../components/general/Navigation";
import { ROUTES } from "@/constants";

export default function RootPage() {
  return (
    <>
      <main className="relative top-16 flex">
        <div className="fixed hidden md:block">
          <Navigation />
        </div>
        <div className=" size-full min-h-[calc(100vh-64px)] px-4 py-8 md:ml-64">
          <div className="inline-block">
            <div className="focus:shadow-outline mt-8 inline-block rounded bg-[#D6722E] px-4 py-2 font-bold text-white focus:outline-none">
              <Link href={ROUTES.MYPAGE}>マイページ</Link>
            </div>
            <div className="focus:shadow-outline mt-8 inline-block rounded bg-[#D6722E] px-4 py-2 font-bold text-white focus:outline-none">
              <Link href={ROUTES.CONTACT}>お問い合わせ</Link>
            </div>
          </div>
          <div className="mt-4">
            <p>トップページ</p>
          </div>
        </div>
      </main>
    </>
  );
}
