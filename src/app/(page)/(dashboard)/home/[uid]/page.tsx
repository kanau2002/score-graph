import CardRead from "@/components/(card)/CardRead";
import ProfileRead from "@/components/(profile)/ProfileRead";
import { cardService } from "@/core/Service/cardService";
import { userService } from "@/core/Service/userService";

type Props = {
  params: {
    uid: string;
  };
};
export default async function UserPage({ params }: Props) {
  const userId = Number(params.uid);
  // userごとの全科目のカードを取得 (返り値：CardAllData[]型)
  const [profileData, cardAllDatas] = await Promise.all([
    userService.fetchProfileData(userId),
    cardService.fetchCardAllDatas(userId),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead profileData={profileData} />
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} isHome={true} />
      ))}
    </div>
  );
}
