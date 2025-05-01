import { Metadata } from "next";
import RegisterForm from "./_components/RegisterForm";

export const metadata: Metadata = {
  title: "新規登録 | Score Graph",
  description: "アカウントを作成して、サービスをご利用ください。",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen text-gray-700 flex items-center justify-center">
      <div className="shadow rounded-xl w-full max-w-md bg-white/30 backdrop-blur">
        <RegisterForm />
      </div>
    </div>
  );
}
