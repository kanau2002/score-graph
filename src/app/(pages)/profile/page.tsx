//src/app/(pages)/profile/page.tsx
import TestResultCard from "@/app/(pages)/profile/_components/TestResultCard";
import { profileService } from "@/core/profile/profileService";

export default async function ProfilePage() {
  const [profileInfo, cardDatas] = await Promise.all([
    profileService.fetchProfileData(),
    profileService.fetchCardDatas(),
  ]);

  return (
    <>
      {cardDatas.map((cardData, index) => (
        <TestResultCard
          key={index}
          profileInfo={profileInfo}
          cardData={cardData}
        />
      ))}
    </>
  );
}
