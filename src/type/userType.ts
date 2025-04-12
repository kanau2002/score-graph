export interface UserData {
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl: string;
}

export interface UserUpdateData {
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl?: string;
}

export interface UserUpdateResponse {
  success: boolean;
  error?: string;
}
