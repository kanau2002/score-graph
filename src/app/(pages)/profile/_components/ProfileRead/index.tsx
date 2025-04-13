import { ROUTES } from "@/constants";
import { UserData } from "@/type/userType";
import { CircleUserRound, UserRoundPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userData: UserData;
};
export default function ProfileRead({ userData }: Props) {
  const userId = 100;

  return (
    <div className="p-4 rounded-lg shadow-sm bg-white pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 m-2 relative">
            {userData.thumbnailUrl ? (
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
          <p className="font-bold">{userData.userName}</p>
          
        </div>
        <div className="flex justify-end">
          <Link href={ROUTES.PROFILE_UPDATE}>
            <UserRoundPen />
          </Link>
        </div>
      </div>
      <p className="text-sm mb-2">
        〜志望校〜
        <br />・{userData.targetUniversities[0]}
        <br />・{userData.targetUniversities[1]}
        <br />・{userData.targetUniversities[2]}
      </p>
      <p className="mt-1 text-sm whitespace-pre-wrap">{userData.memo}</p>
      <p className="mr-4 text-gray-500 text-sm text-right">userID：{userId}</p>
    </div>
  );
}
