import { followService } from "@/core/Service/followService";
import FriendPageClient from "./_components/FriendPageClient";
import BackMypageLink from "@/components/general/BackMypageLink";

export default async function FriendPage() {
  // Server Componentでデータ取得
  const [followersNotFollowingBack, mutualFollows] = await Promise.all([
    followService.fetchFollowersNotFollowingBack(),
    followService.fetchMutualFollows(),
  ]);

  return (
    <>
      <div className="max-w-md mx-auto text-gray-700 bg-white rounded-lg p-4 mb-6 shadow-sm min-h-screen">
        <FriendPageClient
          followersNotFollowingBack={followersNotFollowingBack}
          mutualFollows={mutualFollows}
        />
        <div className="mt-16">
          <BackMypageLink />
        </div>
      </div>
    </>
  );
}
