import {createClient, SupabaseClient} from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

let supabase: SupabaseClient;

if(supabaseKey && supabaseUrl) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  throw new Error('Missing SUPABASE_API_KEY or SUPABASE_API_URL environment variable');
}

export async function getChatMessageFromId(messageId: string) {

}

export async function saveChatMessage(role: string, text: string, parentMessageId?: string) {
    const { data, error } = await supabase.from('messages')
      .insert([
        { content: {
            role,
            text
          },
          parentMessageId
        }
      ])
      .select();

    if (error) {
        throw error;
    }

    return data;
}