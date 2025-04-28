import { userService } from "@/core/Service/userService";
import ProfileUpdate from "../../../../../../../components/(profile)/ProfileUpdate";

export default async function ProfileUpdatePage() {
  // 現在のプロフィール情報を取得
  const profileInfo = await userService.fetchProfileData();

  return (
    <div className="max-w-md mx-auto">
      <ProfileUpdate initialData={profileInfo} />
    </div>
  );
}
