// src/app/(pages)/profile/edit/page.tsx

import { profileService } from "@/core/profile/profileService";
import ProfileUpdate from "../_components/ProfileUpdate";


export default async function ProfileUpdatePage() {
  // 現在のプロフィール情報を取得
  const profileInfo = await profileService.fetchProfileData();

  return (
    <div className="max-w-md mx-auto">
      <ProfileUpdate initialData={profileInfo} />
    </div>
  );
}
