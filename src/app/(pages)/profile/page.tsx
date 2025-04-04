//src/app/(pages)/profile/page.tsx
import TestResultCard from "@/app/(pages)/profile/_components/TestResultCard";
import { profileService } from "@/core/profile/profileService";
import ProfileRead from "./_components/ProfileRead";

export default async function ProfilePage() {
  const [profileInfo, cardDatas] = await Promise.all([
    profileService.fetchProfileData(),
    profileService.fetchCardDatas(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg">
      <ProfileRead profileInfo={profileInfo} />
      {cardDatas.map((cardData, index) => (
        <TestResultCard
          key={index}
          profileInfo={profileInfo}
          cardData={cardData}
        />
      ))}
    </div>
  );
}
