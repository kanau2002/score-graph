import { Metadata } from "next";
import LoginForm from "../../../../components/(auth)/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | ScoreGraph",
  description: "アカウントにログインしてサービスをご利用ください。",
};

export default function LoginPage() {
  return <LoginForm />;
}
