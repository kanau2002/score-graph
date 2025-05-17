import { userService } from "@/core/Service/userService";
import ProfileUpdate from "../../../../../../../components/(profile)/ProfileUpdate";

export default async function ProfileUpdatePage() {
  // userのプロフィール情報を取得 (返り値：ProfileData型)
  const profileInfo = await userService.fetchProfileData();

  return (
    <div className="max-w-md mx-auto">
      <ProfileUpdate initialData={profileInfo} />
    </div>
  );
}
