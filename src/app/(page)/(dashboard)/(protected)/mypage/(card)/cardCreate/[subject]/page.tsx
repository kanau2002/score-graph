import { Metadata } from "next";
import CardCreate from "../../../../../../../../components/(card)/CardCreate";
import { Subject } from "@/type/testType";

export const metadata: Metadata = {
  title: "科目カード作成 | サイト名",
  description: "新しい科目カードを作成してテスト結果や目標を管理します。",
};

// Next.js 15ではparamsがPromiseになりました
type Props = {
  params: Promise<{ subject: Subject }>;
};

export default async function CardCreatePage({ params }: Props) {
  // paramsをawaitして値を取得
  const { subject } = await params;

  // Subject型にキャスト
  const subjectValue = subject as Subject;

  return (
    <div className="container mx-auto px-4 py-8">
      <CardCreate subject={subjectValue} />
    </div>
  );
}
