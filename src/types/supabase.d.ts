export interface SupabaseMessage {
  id: string;
  createdAt: string;
  content: {
    role: string;
    text: string;
  };
  conversationId: string;
  parentMessageId?: string;
}
