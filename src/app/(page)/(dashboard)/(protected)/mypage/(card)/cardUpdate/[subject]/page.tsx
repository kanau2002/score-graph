import { Metadata } from "next";

import CardUpdate from "../../../../../../../../components/(card)/CardUpdate";
import { cardService } from "@/core/Service/cardService";
import { Subject } from "@/type/testType";

export const metadata: Metadata = {
  title: "科目カード編集 | 学習管理アプリ",
  description: "科目カードの情報を編集します",
};

type Props = {
  params: Promise<{ subject: Subject }>;
};
export default async function CardUpdatePage({ params }: Props) {
  const { subject } = await params;
  const initialCardData = await cardService.fetchCardData(subject);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        <CardUpdate subject={subject} initialCardData={initialCardData} />
      </div>
    </div>
  );
}
