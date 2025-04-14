"use client";

import Link from "next/link";
import { Button } from "./components/general";
import Navigation from "./components/general/Navigation";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export default function RootPage() {
  const router = useRouter();

  const handleLogout = async () => {
    // try {
    //   const response = await fetch('/api/test-logout', {
    //     method: 'POST',
    //   })
    //   const data = await response.json()
    //   if (data.success) {
    //     // 成功時にリダイレクト
    //     router.replace('/auth')
    //   } else {
    //     alert('ログアウトに失敗しました。')
    //   }
    // } catch (error) {
    //   console.error('ログインエラー:', error)
    //   alert('ログイン中にエラーが発生しました。')
    // }
  };

  return (
    <>
      <main className="relative top-16 flex">
        <div className="fixed hidden md:block">
          <Navigation />
        </div>
        <div className=" size-full min-h-[calc(100vh-64px)] px-4 py-8 md:ml-64">
          <div className="inline-block">
            <Button onClick={handleLogout}>ログアウト</Button>

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
          <Button
            onClick={() => {
              router.push(ROUTES.HOME);
            }}
          />
        </div>
      </main>
    </>
  );
}
