import { supabase } from "@/lib/supabase";

const get = async (id: string) =>
  await supabase.from("games").select().eq("id", id).single();

export const gamesClient = {
  get,
};
