import { ROUTES } from "@/constants";
import { ProfileData } from "@/type/userType";
import { CircleUserRound, UserRoundPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  profileData: ProfileData;
};
export default function ProfileRead({ profileData }: Props) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-white pb-6 text-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 m-2 relative">
            {profileData.thumbnailUrl ? (
              <Image
                src="/profile/kanau.JPG"
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <CircleUserRound className="w-full h-full" />
            )}
          </div>
          <p className="font-bold">{profileData.userName}</p>
        </div>
        <div className="flex justify-end">
          <Link href={ROUTES.PROFILE_UPDATE}>
            <UserRoundPen />
          </Link>
        </div>
      </div>
      <p className="text-sm mb-2">
        〜志望校〜
        <br />・{profileData.targetUniversities[0]}
        <br />・{profileData.targetUniversities[1]}
        <br />・{profileData.targetUniversities[2]}
      </p>
      <p className="mt-1 text-sm whitespace-pre-wrap">{profileData.memo}</p>
      <p className="mr-4 text-gray-500 text-sm text-right">
        userID：{profileData.userId}
      </p>
    </div>
  );
}
