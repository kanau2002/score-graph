import CardRead from "@/components/(card)/CardRead";
import ProfileRead from "@/components/(profile)/ProfileRead";
import { cardService } from "@/core/Service/cardService";
import { userService } from "@/core/Service/userService";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function PersonalPage({ params }: Props) {
  const { uid } = await params;

  const profileData = await userService.fetchProfileData(Number(uid));
  const cardAllDatas = await cardService.fetchCardAllDatasAtPersonal(
    Number(uid)
  );

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead profileData={profileData} where={"personal"} />
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} where={"personal"} />
      ))}
    </div>
  );
}
