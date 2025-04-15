export interface FollowUser {
  id: number;
  userName: string;
}

export interface FollowStatus {
  isFollowing: boolean;
  isFollowedBy: boolean;
  isMutual: boolean;
}

// API 用の型定義
export interface FollowRequest {
  userId: number;
  friendId: number;
}

export interface FollowResponse {
  success: boolean;
  isFollowing: boolean;
  isFollowedBy: boolean;
  isMutual: boolean;
}

export interface FollowsListResponse {
  following: FollowUser[];
  followers: FollowUser[];
  mutualFollows: FollowUser[];
}
