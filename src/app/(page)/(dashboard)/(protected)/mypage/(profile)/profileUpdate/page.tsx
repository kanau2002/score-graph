import { userService } from "@/core/Service/userService";
import ProfileUpdate from "../../../../../../../components/(profile)/ProfileUpdate";
import { getCurrentUserId } from "@/lib/auth";

export default async function ProfileUpdatePage() {
  const userId = await getCurrentUserId();
  // userのプロフィール情報を取得 (返り値：ProfileData型)
  const profileInfo = await userService.fetchProfileData(userId);

  return (
    <div className="max-w-md mx-auto">
      <ProfileUpdate initialData={profileInfo} />
    </div>
  );
}
