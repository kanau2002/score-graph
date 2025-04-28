import { Metadata } from "next";
import { Subject } from "@/type/testType";
import CardUpdate from "../../../../../../../components/(card)/CardUpdate";
import { cardService } from "@/core/Service/cardService";

export const metadata: Metadata = {
  title: "科目カード編集 | 学習管理アプリ",
  description: "科目カードの情報を編集します",
};

type Props = {
  searchParams: { subject: Subject };
};

export default async function CardUpdatePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const initialCardData = await cardService.fetchCardData(subject);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-xl font-bold mb-4">科目カード編集</h1>
        <CardUpdate subject={subject} initialCardData={initialCardData} />
      </div>
    </div>
  );
}
