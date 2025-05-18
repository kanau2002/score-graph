export interface ProfileData {
  userId: number;
  fullName: string;
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl: string;
}

export interface ProfileUpdateData {
  fullName: string;
  userName: string;
  targetUniversities: string[];
  memo: string;
  thumbnailUrl?: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
}
