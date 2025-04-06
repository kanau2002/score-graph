// src/app/(pages)/profile/cards/create/page.tsx
import { Metadata } from "next";
import CardCreate from "./CardCreate";
import { Subject } from "@/core/profile/type";

export const metadata: Metadata = {
  title: "科目カード作成 | サイト名",
  description: "新しい科目カードを作成してテスト結果や目標を管理します。",
};

type SearchParams = {
  subject: Subject;
};

export default async function CardCreatePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const subject = searchParams.subject;

  return (
    <div className="container mx-auto px-4 py-8">
      <CardCreate subject={subject} />
    </div>
  );
}
