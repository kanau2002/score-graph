import CardRead from "../../../../../components/(card)/CardRead";
import ProfileRead from "../../../../../components/(profile)/ProfileRead";
import SubjectSelecter from "../../../../../components/(card)/SubjectSelecter";
import { cardService } from "@/core/Service/cardService";
import { userService } from "@/core/Service/userService";
import { getCurrentUserId } from "@/lib/auth";

export default async function MyPage() {
  const userId = await getCurrentUserId();
  // 自分のプロフィールデータを取得 (返り値：ProfileData型)
  // マイページの全科目のカードを取得 (返り値：CardAllData[]型)
  // カード作成のためにまだ未作成の科目データを取得 (返り値：Subject型)
  const [profileData, cardAllDatas, unAnsweredSubjects] = await Promise.all([
    userService.fetchProfileData(userId),
    cardService.fetchCardAllDatasAtMypage(),
    cardService.fetchUnAnsweredSubjects(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead profileData={profileData} where={"my"} />
      {cardAllDatas.map((cardAllData, index) => (
        <CardRead key={index} cardAllData={cardAllData} where={"my"} />
      ))}
      {unAnsweredSubjects.length > 0 && (
        <div className="text-center my-8">
          <SubjectSelecter unAnsweredSubjects={unAnsweredSubjects} />
        </div>
      )}
    </div>
  );
}
