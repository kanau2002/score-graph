import React from "react";
import { followService } from "@/core/Service/followService";
import FriendPageClient from "./_components/FriendPageClient";

export default async function FriendPage() {
  // Server Componentでデータ取得
  const [followersNotFollowingBack, mutualFollows] = await Promise.all([
    followService.fetchFollowersNotFollowingBack(),
    followService.fetchMutualFollows(),
  ]);

  return (
    <FriendPageClient
      followersNotFollowingBack={followersNotFollowingBack}
      mutualFollows={mutualFollows}
    />
  );
}
