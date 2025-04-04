//src/app/(pages)/profile/page.tsx
import TestResultCard from "@/app/(pages)/profile/_components/TestResultCard";
import { profileService } from "@/core/profile/profileService";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

export default async function ProfilePage() {
  const [profileInfo, cardDatas] = await Promise.all([
    profileService.fetchProfileData(),
    profileService.fetchCardDatas(),
  ]);
  const userId = 100;

  return (
    <div className="max-w-md mx-auto rounded-lg">
      <div className="p-4 rounded-lg shadow-sm bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 m-2 relative">
              {profileInfo.thumbnailUrl ? (
                <Image
                  src="/profile/kanau.JPG"
                  alt="プロフィール画像"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <CircleUserRound className="w-full h-full"/>
              )}
            </div>
            <p className="font-bold">{profileInfo.userName}</p>
          </div>
          <p className="mr-4 text-gray-500">userID：{userId}</p>
        </div>
        <div className="my-2">
          <p className="text-sm mb-2">
            〜志望校〜
            <br />・{profileInfo.targetUniversities[0]}
            <br />・{profileInfo.targetUniversities[1]}
            <br />・{profileInfo.targetUniversities[2]}
          </p>
          <p className="mt-1 text-sm">{profileInfo.memo}</p>
        </div>
      </div>
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
