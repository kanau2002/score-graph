import { Metadata } from "next";
import CardCreate from "./_components/CardCreate";
import { Subject } from "@/type/testType";

export const metadata: Metadata = {
  title: "科目カード作成 | サイト名",
  description: "新しい科目カードを作成してテスト結果や目標を管理します。",
};

type Props = {
  searchParams: {
    subject: Subject;
  };
};

export default async function CardCreatePage({ searchParams }: Props) {
  const subject = searchParams.subject;

  return (
    <div className="container mx-auto px-4 py-8">
      <CardCreate subject={subject} />
    </div>
  );
}
