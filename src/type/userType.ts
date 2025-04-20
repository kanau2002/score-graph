export interface ProfileData {
  userId: number;
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl: string;
}

export interface ProfileUpdateData {
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl?: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
}
