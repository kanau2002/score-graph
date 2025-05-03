export interface ContactSubmitData {
  message: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  contactId?: number;
  error?: string;
}
