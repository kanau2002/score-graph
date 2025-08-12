import { cardService } from "@/core/Service/cardService";
import CardRead from "../../../../components/(card)/CardRead";
import { unstable_noStore } from "next/cache";

export default async function HomePage() {
  // キャッシュを無効にして毎回新しいデータを取得
  unstable_noStore();

  // homeの全科目のカードを取得 (返り値：CardAllData[]型)
  const cardAllDatas = await cardService.fetchCardAllDatas();

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} where={"home"} />
      ))}
    </div>
  );
}
