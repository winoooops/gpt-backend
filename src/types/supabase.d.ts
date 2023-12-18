export interface SupabaseMessage {
  createdAt: string;
  content: {
    role: string;
    text: string;
  };
  parentMessageId?: string;
}
