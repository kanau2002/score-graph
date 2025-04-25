import { cardService } from "@/core/Service/cardService";
import CardRead from "../../../../components/(card)/CardRead";

export default async function HomePage() {
  const [cardAllDatas] = await Promise.all([
    cardService.fetchCardAllDatasAtHome(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} isHome={true} />
      ))}
    </div>
  );
}
