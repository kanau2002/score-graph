//src/app/(pages)/profile/page.tsx
import { profileService } from "@/core/profile/profileService";
import ProfileRead from "./_components/ProfileRead";
import { cardService } from "@/core/card/cardService";
import TestResultCard from "./_components/TestResultCard";
import SubjectSelecter from "./_components/SubjectSelecter";


export default async function ProfilePage() {
  const [profileInfo, cardDatas, unAnsweredSubjects] = await Promise.all([
    profileService.fetchProfileData(),
    profileService.fetchCardDatas(),
    cardService.fetchUnAnsweredSubjects(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead profileInfo={profileInfo} />
      {cardDatas.map((cardData, index) => (
        <TestResultCard
          key={index}
          profileInfo={profileInfo}
          cardData={cardData}
        />
      ))}
      {unAnsweredSubjects.length > 0 && (
        <div className="text-center my-8">
          <SubjectSelecter unAnsweredSubjects={unAnsweredSubjects} />
        </div>
      )}
    </div>
  );
}
