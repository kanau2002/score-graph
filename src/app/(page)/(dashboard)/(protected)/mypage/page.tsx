import CardRead from "../../../../../components/(card)/CardRead";
import ProfileRead from "../../../../../components/(profile)/ProfileRead";
import SubjectSelecter from "../../../../../components/(card)/SubjectSelecter";
import { cardService } from "@/core/Service/cardService";
import { userService } from "@/core/Service/userService";

export default async function MyPage() {
  const [profileData, cardAllDatas, unAnsweredSubjects] = await Promise.all([
    userService.fetchProfileData(),
    cardService.fetchCardAllDatasAtMypage(),
    cardService.fetchUnAnsweredSubjects(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead profileData={profileData} />
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} isHome={false} />
      ))}
      {unAnsweredSubjects.length > 0 && (
        <div className="text-center my-8">
          <SubjectSelecter unAnsweredSubjects={unAnsweredSubjects} />
        </div>
      )}
    </div>
  );
}
