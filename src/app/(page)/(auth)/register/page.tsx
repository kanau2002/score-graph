import { Metadata } from "next";
import RegisterForm from "../../../../components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "新規登録 | ScoreGraph",
  description: "アカウントを作成して、サービスをご利用ください。",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
