export interface ProfileData {
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
