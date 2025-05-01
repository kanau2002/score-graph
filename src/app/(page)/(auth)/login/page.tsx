import { Metadata } from "next";
import LoginForm from "../../../../components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ログイン | アプリ名",
  description: "アカウントにログインしてサービスをご利用ください。",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen text-gray-700 flex items-center justify-center">
      <div className="shadow rounded-xl w-full max-w-md bg-white/30 backdrop-blur">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
