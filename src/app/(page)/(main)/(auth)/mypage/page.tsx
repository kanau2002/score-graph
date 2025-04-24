import CardRead from "./_components/CardRead";
import ProfileRead from "./_components/ProfileRead";
import SubjectSelecter from "./_components/SubjectSelecter";
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
        <CardRead key={index} cardAllData={cardAllData} />
      ))}
      {unAnsweredSubjects.length > 0 && (
        <div className="text-center my-8">
          <SubjectSelecter unAnsweredSubjects={unAnsweredSubjects} />
        </div>
      )}
    </div>
  );
}
