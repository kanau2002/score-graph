import CardUpdate from "../../../../../../../../components/(card)/CardUpdate";
import { cardService } from "@/core/Service/cardService";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject }>;
};
export default async function CardUpdatePage({ params }: Props) {
  const { subject } = await params;
  // 合格最低点など、Cardで必要となる既に入力済みのデータを取得 (返り値：CardData型)
  const initialCardData = await cardService.fetchCardData(subject);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        <CardUpdate subject={subject} initialCardData={initialCardData} />
      </div>
    </div>
  );
}
